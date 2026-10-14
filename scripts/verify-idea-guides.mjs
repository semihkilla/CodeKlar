import guides from '../src/ideaGuides.json' with { type: 'json' };
import { javaNextProjects } from '../src/javaNextProjects.js';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFile, spawn } from 'node:child_process';
import { promisify } from 'node:util';
import { once } from 'node:events';
const exec = promisify(execFile);
const root = await mkdtemp(join(tmpdir(), 'codeklar-idea-'));
const run = args => exec('java', args, { cwd: root, timeout: 20000 });
let server;
try {
  const sources = [];
  for (const [i, guide] of guides.entries()) {
    const dir = join(root, 'idea' + i); await mkdir(dir);
    const file = join(dir, 'Main.java');
    await writeFile(file, 'package idea' + i + ';\n' + guide.source); sources.push(file);
  }
  const badDir = join(root, 'ideaBad'); await mkdir(badDir);
  const badFile = join(badDir, 'Main.java');
  await writeFile(badFile, 'package ideaBad;\n' + guides.find(g => g.id === 'transfer').source.replace('/sum?a=2&b=3', '/sum?a=x&b=3'));
  sources.push(badFile);
  const apiFile = join(root, 'Api.java');
  await writeFile(apiFile, javaNextProjects.find(p => p.id === 'java-mini-api').files['Api.java']);
  sources.push(apiFile);
  const classes = join(root, 'classes');
  const compiler = ['-m', 'jdk.compiler/com.sun.tools.javac.Main'];
  try { await run([...compiler, '--release', '17', '-encoding', 'UTF-8', '-d', classes, ...sources]); }
  catch (error) {
    if (!error.stderr?.includes('release version 17 not supported')) throw error;
    console.warn('Java 17 API signatures unavailable; source/target 17 checked against installed JDK.');
    await run([...compiler, '-source', '17', '-target', '17', '-encoding', 'UTF-8', '-d', classes, ...sources]);
  }
  server = spawn('java', ['-cp', classes, 'Api', '0'], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] });
  const base = await new Promise((resolve, reject) => {
    let text = '';
    const timer = setTimeout(() => reject(new Error('Server startup timeout')), 10000);
    server.once('error', error => { clearTimeout(timer); reject(error); });
    server.once('exit', code => { clearTimeout(timer); reject(new Error('Server exited: ' + code)); });
    server.stdout.on('data', chunk => {
      text += chunk;
      const match = text.match(/http:\/\/127\.0\.0\.1:\d+/);
      if (match) { clearTimeout(timer); resolve(match[0]); }
    });
  });
  for (const [i, guide] of guides.entries()) {
    const args = ['-cp', classes, 'idea' + i + '.Main', ...(guide.id === 'transfer' ? [base] : [])];
    const result = await run(args);
    if (result.stdout.trimEnd() !== guide.output) throw new Error(guide.id + ': unexpected output ' + result.stdout);
    console.log(guide.id + ': expected output verified');
  }
  const invalid = await run(['-cp', classes, 'ideaBad.Main', base]);
  if (invalid.stdout.trim() !== 'Serverfehler: 400') throw new Error('HTTP error status not handled');
  const index = guides.findIndex(g => g.id === 'transfer');
  // Stop the actual server, then verify the learner-facing connection-error path.
  const stopped = once(server, 'exit'); server.kill('SIGTERM'); await stopped;
  const missing = await run(['-cp', classes, 'idea' + index + '.Main', base]);
  if (missing.stdout.trim() !== 'Verbindung fehlgeschlagen') throw new Error('Connection failure not handled');
  console.log(`${guides.length} idea-to-code Java programs and real HTTP/connection-failure behavior verified.`);
} finally {
  if (server && server.exitCode === null) server.kill('SIGTERM');
  await rm(root, { recursive: true, force: true });
}

// Execute the learner-facing Python source with CPython, never a JS simulation.
import { pythonLessonPack } from '../src/pythonLessons.js';
import { pythonProjects } from '../src/pythonProjects.js';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { execFile, spawn } from 'node:child_process';
const python = process.env.CODEKLAR_PYTHON || 'python3';
const root = await mkdtemp(join(tmpdir(), 'codeklar-python-'));
const runtimeEnv = { ...process.env, XDG_CACHE_HOME: join(root, 'cache'), MPLCONFIGDIR: join(root, 'matplotlib') };
const normalized = value => value.replaceAll('\r\n', '\n').trimEnd();
const run = (args, { input = '', cwd = root, env = runtimeEnv, timeout = 15000 } = {}) => new Promise((resolve, reject) => {
  const child = execFile(python, args, { cwd, env, timeout, maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => error ? reject(Object.assign(error, { stdout, stderr })) : resolve({ stdout, stderr }));
  child.stdin.on('error', error => { if (error.code !== 'EPIPE') reject(error); });
  child.stdin.end(input);
});
function require(ok, message) { if (!ok) throw new Error(message); }
try {
  await mkdir(runtimeEnv.XDG_CACHE_HOME, { recursive: true });
  await mkdir(runtimeEnv.MPLCONFIGDIR, { recursive: true });
  // Build the shared font cache once, before parallel examples import Matplotlib.
  await run(['-I', '-c', 'import matplotlib; matplotlib.use("Agg"); from matplotlib import font_manager'], { timeout: 60000 });
  console.log(normalized((await run(['--version'])).stdout));
  const programs = pythonLessonPack.flatMap(lesson => [{ id: lesson.id, source: lesson.example, output: lesson.expectedOutput, stdin: lesson.stdin }, ...(lesson.practice ? [{ id: lesson.id + '-practice', source: lesson.practice.example, output: lesson.practice.output }] : [])]);
  let next = 0;
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (next < programs.length) {
      const program = programs[next++];
      const result = await run(['-I', '-c', program.source], { input: program.stdin || '' });
      require(normalized(result.stdout) === normalized(program.output), `${program.id}: expected ${JSON.stringify(program.output)}, received ${JSON.stringify(result.stdout)}`);
      require(!result.stderr, `${program.id}: unexpected stderr: ${result.stderr}`);
    }
  }));
  console.log(`${pythonLessonPack.length} Python examples and ${programs.length - pythonLessonPack.length} exercise solutions matched expected output.`);
  for (const project of pythonProjects) {
    const cwd = join(root, project.id); await mkdir(cwd);
    for (const [name, source] of Object.entries(project.files)) { const file = join(cwd, name); await mkdir(dirname(file), { recursive: true }); await writeFile(file, source); }
    let env = runtimeEnv;
    if (project.pythonWheel) {
      const wheels = join(cwd, 'wheels'), site = join(cwd, 'installed');
      await run(['-m', 'pip', 'wheel', '--disable-pip-version-check', '--no-build-isolation', '--no-deps', '--no-index', '--wheel-dir', wheels, '.'], { cwd });
      const { readdir } = await import('node:fs/promises');
      const archives = (await readdir(wheels)).filter(name => name.endsWith('.whl'));
      require(archives.length === 1, 'Expected one package wheel');
      await run(['-m', 'pip', 'install', '--disable-pip-version-check', '--no-deps', '--no-index', '--target', site, join(wheels, archives[0])], { cwd });
      env = { ...runtimeEnv, PYTHONPATH: site };
      const outside = await run(['-m', 'lernkarten', join(cwd, 'beispiel.json'), '--output', join(root, 'karten.html')], { cwd: root, env });
      require(outside.stdout.includes('3 Karten exportiert.'), 'Installed wheel CLI failed outside source tree');
      require((await readFile(join(root, 'karten.html'), 'utf8')).includes('Package'), 'Installed template resource missing');
      const consoleScript = join(site, process.platform === 'win32' ? 'Scripts' : 'bin', 'codeklar-karten');
      if (process.platform !== 'win32') {
        const entry = await run([consoleScript, join(cwd, 'beispiel.json'), '--output', join(root, 'entry.html')], { cwd: root, env });
        require(entry.stdout.includes('3 Karten exportiert.'), 'Installed console entry failed');
      }
      console.log('Wheel built offline, installed and started outside the source tree, including its template and console entry.');
    }
    const result = await run(project.pythonTestCommand, { cwd, env });
    require(/Ran \d+ tests?/.test(result.stderr) && /\bOK\b/.test(result.stderr), `${project.id}: no successful test run`);
    console.log(`${project.id}: ${result.stderr.match(/Ran \d+ tests?/)[0]}, OK`);
  }
  const tasks = join(root, 'python-task-cli');
  const file = join(tasks, 'cli-tasks.json');
  const command = (...args) => run(['-m', 'codeklar_tasks', '--file', file, ...args], { cwd: tasks });
  await command('add', 'Üben'); await command('done', '1');
  require(normalized((await command('list')).stdout) === '1. [x] Üben', 'CLI task state did not persist across separate processes');
  const saved = await readFile(file, 'utf8');
  try { await command('done', '99'); throw new Error('Missing ID accepted'); } catch (error) { require(error.code === 1 && error.stderr.includes('nicht gefunden'), 'Expected CLI failure missing'); }
  require(await readFile(file, 'utf8') === saved, 'Failed command changed saved tasks');
  await command('remove', '1'); require((await command('list')).stdout.includes('Noch keine Aufgaben'), 'Remove failed');
  const report = join(root, 'python-word-report');
  const result = await run(['report.py', 'beispiel.txt', '--top', '2', '--csv', 'report.csv'], { cwd: report });
  require(result.stdout.includes('python: 2') && result.stdout.includes('lernen: 2'), 'Word report CLI failed');
  require((await readFile(join(report, 'report.csv'), 'utf8')).includes('python,2'), 'CSV export missing');
  const maze = join(root, 'python-maze-bfs');
  const original = await readFile(join(maze, 'maps/einfach.txt'), 'utf8');
  const solved = await run(['maze.py', 'maps/einfach.txt', '--output', 'geloest.txt'], { cwd: maze });
  require(solved.stdout.includes('8 Schritte') && (await readFile(join(maze, 'geloest.txt'), 'utf8')).includes('*'), 'Maze CLI solution/export failed');
  try { await run(['maze.py', 'maps/einfach.txt', '--output', 'maps/einfach.txt'], { cwd: maze }); throw new Error('Existing output accepted'); }
  catch (error) { require(error.code === 2 && error.stderr.includes('Fehler:'), 'Expected export refusal missing'); }
  require(await readFile(join(maze, 'maps/einfach.txt'), 'utf8') === original, 'Maze input changed');
  try { await run(['maze.py', 'maps/gesperrt.txt'], { cwd: maze }); throw new Error('Unreachable map accepted'); }
  catch (error) { require(error.code === 1 && error.stdout.includes('Kein Weg'), 'Unreachable CLI result missing'); }
  const logs = join(root, 'python-log-report');
  const sourceLog = await readFile(join(logs, 'beispiel.log'), 'utf8');
  await run(['log_report.py', 'beispiel.log', '--json', 'report.json'], { cwd: logs });
  const logReport = JSON.parse(await readFile(join(logs, 'report.json'), 'utf8'));
  require(logReport.count === 3 && logReport.mean_ms === 40 && logReport.first_utc === '2026-01-02T10:00:00+00:00', 'Log report statistics/UTC failed');
  const filtered = await run(['log_report.py', 'beispiel.log', '--level', 'ERROR'], { cwd: logs });
  require(filtered.stdout.includes('Ausgewertete Einträge: 1') && filtered.stdout.includes('60.00 ms'), 'Log report filter failed');
  try { await run(['log_report.py', 'mit_fehler.log'], { cwd: logs }); throw new Error('Bad log accepted'); }
  catch (error) { require(error.code === 1 && error.stderr.includes('Zeile 4'), 'Strict log failure missing'); }
  const skipped = await run(['log_report.py', 'mit_fehler.log', '--skip-invalid'], { cwd: logs });
  require(skipped.stdout.includes('Ausgewertete Einträge: 3') && skipped.stdout.includes('Ungültige Zeilen: 1'), 'Skip-invalid result failed');
  try { await run(['log_report.py', 'beispiel.log', '--json', 'beispiel.log'], { cwd: logs }); throw new Error('Log overwrite accepted'); }
  catch (error) { require(error.code === 1 && error.stderr.includes('Fehler:'), 'Log export refusal missing'); }
  require(await readFile(join(logs, 'beispiel.log'), 'utf8') === sourceLog, 'Log input changed');
  const api = join(root, 'python-local-api');
  async function withApi(action) {
    const child = spawn(python, ['server.py', '--database', 'live-api.db', '--port', '0'], { cwd: api });
    const exited = new Promise(resolve => child.once('exit', resolve));
    let diagnostics = '';
    child.stderr.on('data', data => { diagnostics = (diagnostics + data).slice(-2000); });
    try {
      const base = await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('API startup timed out: ' + diagnostics)), 5000);
        let output = '';
        child.once('error', error => { clearTimeout(timeout); reject(error); });
        child.once('exit', () => { clearTimeout(timeout); reject(new Error('API exited before ready: ' + diagnostics)); });
        child.stdout.on('data', data => {
          output += data;
          const found = output.match(/Listening on (http:\/\/127\.0\.0\.1:\d+)/);
          if (found) { clearTimeout(timeout); resolve(found[1]); }
        });
      });
      await action(base);
    } finally {
      child.kill('SIGTERM');
      await exited;
    }
  }
  let apiId;
  await withApi(async base => {
    const created = JSON.parse((await run(['client.py', '--base', base, 'add', 'HTTP Grüße'], { cwd: api })).stdout);
    apiId = created.id;
    require(created.title === 'HTTP Grüße' && created.done === false, 'API client create failed');
    const changed = JSON.parse((await run(['client.py', '--base', base, 'done', String(apiId)], { cwd: api })).stdout);
    require(changed.done === true, 'API client update failed');
    try { await run(['client.py', '--base', base, 'add', 'HTTP Grüße'], { cwd: api }); throw new Error('Duplicate API title accepted'); }
    catch (error) { require(error.code === 1 && error.stderr.includes('HTTP 409'), 'API conflict response missing'); }
  });
  await withApi(async base => {
    const task = JSON.parse((await run(['client.py', '--base', base, 'get', String(apiId)], { cwd: api })).stdout);
    require(task.title === 'HTTP Grüße' && task.done === true, 'API data lost after server restart');
    const removed = await run(['client.py', '--base', base, 'delete', String(apiId)], { cwd: api });
    require(normalized(removed.stdout) === 'null', 'API 204 client handling failed');
    try { await run(['client.py', '--base', base, 'get', String(apiId)], { cwd: api }); throw new Error('Deleted API task found'); }
    catch (error) { require(error.code === 1 && error.stderr.includes('HTTP 404'), 'API missing-task response missing'); }
  });
  const expenses = join(root, 'python-expense-report');
  const exportResult = await run(['report.py', 'beispiel.csv', '--output', 'ausgaben.html'], { cwd: expenses });
  require(exportResult.stdout.includes('3 Buchungen: 10,00 €'), 'Expense report terminal output failed');
  const html = await readFile(join(expenses, 'ausgaben.html'), 'utf8');
  require(html.includes('7,00 €') && html.includes('2026-01-01'), 'Expense report HTML totals or date range missing');
  const inputBefore = await readFile(join(expenses, 'beispiel.csv'), 'utf8');
  try { await run(['report.py', 'beispiel.csv', '--output', 'beispiel.csv'], { cwd: expenses }); throw new Error('Expense input overwrite accepted'); }
  catch (error) { require(error.code === 1 && error.stderr.includes('Fehler:'), 'Expense overwrite refusal missing'); }
  require(await readFile(join(expenses, 'beispiel.csv'), 'utf8') === inputBefore, 'Expense input changed');
  const contact = join(root, 'python-contact-sheet');
  await run(['examples.py'], { cwd: contact });
  const samplePath = join(contact, 'beispielbilder', '01-breit.png');
  const sampleBefore = await readFile(samplePath);
  const contactRun = await run(['contact.py', 'beispielbilder', '--columns', '2', '--output', 'bogen.png'], { cwd: contact });
  require(contactRun.stdout.includes('3 Bilder: 448 x 408 Pixel'), 'Contact sheet terminal output failed');
  const png = await readFile(join(contact, 'bogen.png'));
  require(png.readUInt32BE(16) === 448 && png.readUInt32BE(20) === 408, 'Contact sheet PNG dimensions failed');
  require((await readFile(samplePath)).equals(sampleBefore), 'Contact sheet changed its input');
  console.log('Separate-process persistence, CSV, maze, logs, expense export, contact PNG and real HTTP client/server restart checks passed.');
} finally { await rm(root, { recursive: true, force: true }); }

// Verifies the actual learner-facing programs, not a JavaScript reimplementation.
import { javaLessonPack } from '../src/javaLessons.js';
import { javaProjects } from '../src/javaProjects.js';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
const exec = promisify(execFile);
const root = await mkdtemp(join(tmpdir(), 'codeklar-java-'));
const run = (args, options = {}) => exec('java', args, { timeout: 20000, maxBuffer: 1024 * 1024, ...options });
const normalized = text => text.replaceAll('\r\n', '\n').trimEnd();
async function compile(files, output) {
  const compiler = ['-m', 'jdk.compiler/com.sun.tools.javac.Main'];
  try {
    await run([...compiler, '--release', '17', '-encoding', 'UTF-8', '-d', output, ...files]);
  } catch (error) {
    if (!error.stderr?.includes('release version 17 not supported')) throw error;
    // Some stripped execution environments include the compiler but no ct.sym API signatures.
    console.warn('Java 17 API signatures unavailable; checking source/bytecode level 17 against the installed JDK.');
    await run([...compiler, '-source', '17', '-target', '17', '-encoding', 'UTF-8', '-d', output, ...files]);
  }
}
function require(condition, message) { if (!condition) throw new Error(message); }
try {
  const version = await run(['-version']);
  console.log(normalized(version.stderr).split('\n')[0]);
  const sources = [];
  for (const [index, lesson] of javaLessonPack.entries()) {
    const dir = join(root, `sample${index}`); await mkdir(dir);
    const file = join(dir, 'Main.java');
    await writeFile(file, `package sample${index};\n${lesson.example}`);
    sources.push(file);
  }
  const classes = join(root, 'classes'); await compile(sources, classes);
  let cursor = 0;
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (cursor < javaLessonPack.length) {
      const index = cursor++, lesson = javaLessonPack[index];
      const result = await run(['-cp', classes, `sample${index}.Main`]);
      require(normalized(result.stdout) === lesson.expectedOutput,
        `${lesson.id}: expected ${JSON.stringify(lesson.expectedOutput)}, received ${JSON.stringify(result.stdout)}`);
    }
  }));
  console.log(`${javaLessonPack.length} Java examples compiled and produced the expected output.`);
  const projectFiles = [];
  for (const project of javaProjects) {
    const dir = join(root, project.id); await mkdir(dir);
    for (const [name, source] of Object.entries(project.files)) {
      const file = join(dir, name); await writeFile(file, source); projectFiles.push(file);
    }
  }
  const projectClasses = join(root, 'project-classes'); await compile(projectFiles, projectClasses);
  for (const name of ['Calculator', 'TicTacToe', 'Notebook']) {
    const result = await run(['-cp', projectClasses, name, 'test']);
    require(result.stdout.includes('Tests') || result.stdout.includes('tests bestanden'), `${name}: test success missing`);
    console.log(normalized(result.stdout));
  }
  async function withInput(name, input) {
    return new Promise((resolve, reject) => {
      const child = execFile('java', ['-cp', projectClasses, name], { timeout: 15000 }, (error, stdout, stderr) => error ? reject(error) : resolve({ stdout, stderr }));
      child.stdin.end(input);
    });
  }
  const calculator = await withInput('Calculator', '12 + 3\n5 / 2\n1 / 0\nq\n');
  require(calculator.stdout.includes('\n15\n2\n') && calculator.stdout.includes('Division durch null'), 'Calculator interactive flow failed');
  const game = await withInput('TicTacToe', '1\n4\n2\n5\n3\n');
  require(game.stdout.includes('X gewinnt!'), 'Interactive game win failed');
  const notebookDir = join(root, 'notebook-data'); await mkdir(notebookDir);
  const notebook = args => run(['-cp', projectClasses, 'Notebook', ...args], { cwd: notebookDir });
  await notebook(['add', 'Java lernen']);
  require((await notebook(['list'])).stdout.includes('1 [ ] Java lernen'), 'Notebook creation failed');
  await notebook(['done', '1']);
  require((await notebook(['list'])).stdout.includes('1 [x] Java lernen'), 'Notebook persistence failed');
  let rejected = false;
  try { await notebook(['done', '99']); } catch (error) { rejected = error.code === 1 && error.stderr.includes('ID nicht gefunden'); }
  require(rejected, 'Notebook accepted an unknown ID');
  console.log('All project tests and interactive/persistence checks passed.');
} finally { await rm(root, { recursive: true, force: true }); }

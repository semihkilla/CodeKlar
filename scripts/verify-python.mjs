// Execute the learner-facing Python source with CPython, never a JS simulation.
import { pythonLessonPack } from '../src/pythonLessons.js';
import { pythonProjects } from '../src/pythonProjects.js';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { execFile } from 'node:child_process';
const root = await mkdtemp(join(tmpdir(), 'codeklar-python-'));
const normalized = value => value.replaceAll('\r\n', '\n').trimEnd();
const run = (args, { input = '', cwd = root } = {}) => new Promise((resolve, reject) => {
  const child = execFile('python3', args, { cwd, timeout: 15000, maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => error ? reject(Object.assign(error, { stdout, stderr })) : resolve({ stdout, stderr }));
  child.stdin.on('error', error => { if (error.code !== 'EPIPE') reject(error); });
  child.stdin.end(input);
});
function require(ok, message) { if (!ok) throw new Error(message); }
try {
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
    const result = await run(project.pythonTestCommand, { cwd });
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
  console.log('Separate-process task persistence, invalid-command preservation, real CSV export and maze CLI/export checks passed.');
} finally { await rm(root, { recursive: true, force: true }); }

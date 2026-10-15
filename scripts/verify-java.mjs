// Verifies the actual learner-facing programs, not a JavaScript reimplementation.
import { javaLessonPack } from '../src/javaLessons.js';
import { javaProjects } from '../src/javaProjects.js';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname, delimiter } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
const exec = promisify(execFile);
const root = await mkdtemp(join(tmpdir(), 'codeklar-java-'));
const run = (args, options = {}) => exec('java', args, { timeout: 20000, maxBuffer: 1024 * 1024, ...options });
const normalized = text => text.replaceAll('\r\n', '\n').trimEnd();
async function compile(files, output, classpath) {
  const dependencies = classpath ? ['-cp', classpath] : [];
  const compiler = ['-m', 'jdk.compiler/com.sun.tools.javac.Main'];
  try {
    await run([...compiler, '--release', '17', '-encoding', 'UTF-8', '-d', output, ...dependencies, ...files]);
  } catch (error) {
    if (!error.stderr?.includes('release version 17 not supported')) throw error;
    // Some stripped execution environments include the compiler but no ct.sym API signatures.
    console.warn('Java 17 API signatures unavailable; checking source/bytecode level 17 against the installed JDK.');
    await run([...compiler, '-source', '17', '-target', '17', '-encoding', 'UTF-8', '-d', output, ...dependencies, ...files]);
  }
}
function require(condition, message) { if (!condition) throw new Error(message); }
try {
  const version = await run(['-version']);
  console.log(normalized(version.stderr).split('\n')[0]);
  const programs = javaLessonPack.flatMap(lesson => [{ id: lesson.id, example: lesson.example, expectedOutput: lesson.expectedOutput }, ...(lesson.practice ? [{ id: lesson.id + '-practice', example: lesson.practice.example, expectedOutput: lesson.practice.output }] : [])]);
  const sources = [];
  for (const [index, lesson] of programs.entries()) {
    const dir = join(root, `sample${index}`); await mkdir(dir);
    const file = join(dir, 'Main.java');
    await writeFile(file, `package sample${index};\n${lesson.example}`);
    sources.push(file);
  }
  const classes = join(root, 'classes'); await compile(sources, classes);
  let cursor = 0;
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (cursor < programs.length) {
      const index = cursor++, lesson = programs[index];
      const result = await run(['-cp', classes, `sample${index}.Main`]);
      require(normalized(result.stdout) === lesson.expectedOutput,
        `${lesson.id}: expected ${JSON.stringify(lesson.expectedOutput)}, received ${JSON.stringify(result.stdout)}`);
    }
  }));
  console.log(`${javaLessonPack.length} Java examples and ${programs.length - javaLessonPack.length} exercise solutions compiled and produced the expected output.`);
  const dependencyFiles = [];
  const dependencies = new Map(javaProjects.flatMap(p => p.javaDependencies || []).map(d => [d.name, d]));
  const libraries = join(root, 'libraries'); await mkdir(libraries);
  for (const dependency of dependencies.values()) {
    const file = join(libraries, dependency.name);
    await exec('curl', ['--fail', '--location', '--silent', '--show-error', '--max-time', '60', '--output', file, dependency.url], { timeout: 65000 });
    dependencyFiles.push(file);
  }
  const projectFiles = [];
  for (const project of javaProjects) {
    const dir = join(root, project.id); await mkdir(dir);
    for (const [name, source] of Object.entries(project.files)) {
      const file = join(dir, name); await mkdir(dirname(file), { recursive: true }); await writeFile(file, source); if (name.endsWith('.java')) projectFiles.push(file);
    }
  }
  const projectClasses = join(root, 'project-classes'); await compile(projectFiles, projectClasses, dependencyFiles.join(delimiter));
  for (const project of javaProjects) for (const [name, source] of Object.entries(project.files)) {
    const prefix = 'src/main/resources/';
    if (name.startsWith(prefix)) { const target = join(projectClasses, name.slice(prefix.length)); await mkdir(dirname(target), { recursive: true }); await writeFile(target, source); }
  }
  const projectClasspath = [projectClasses, ...dependencyFiles].join(delimiter);
  for (const name of javaProjects.flatMap(project => project.javaMainClass ? [project.javaMainClass] : Object.keys(project.files).filter(file => file.endsWith('.java')).map(file => file.slice(0, -5)))) {
    const result = await run(['-Djava.awt.headless=true', '-cp', projectClasspath, name, 'test']);
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
  const report = await run(['-cp', projectClasses, 'WordReport', 'sample.txt'], { cwd: join(root, 'java-word-report') });
  require(report.stdout.includes('Wörter: 17 · Unterschiedlich: 14') && report.stdout.includes('java: 2') && report.stdout.includes('äpfel: 2'), 'UTF-8 report integration failed');
  const basket = await run(['-cp', projectClasses, 'Basket']);
  require(basket.stdout.includes('Ohne Rabatt: 6.50 EUR') && basket.stdout.includes('Mit 10 Prozent Rabatt: 5.85 EUR'), 'Basket integration failed');
  const route = await run(['-cp', projectClasses, 'RoutePlanner']);
  require(route.stdout.includes('Kosten: 3') && route.stdout.includes('Route: [0, 2, 1, 3]'), 'Route reconstruction failed');
  const unreachable = await run(['-cp', projectClasses, 'RoutePlanner', '4']);
  require(unreachable.stdout.trim() === 'Kein Weg', 'Unreachable route output failed');
  const csvDir = join(root, 'java-csv-report');
  const csv = await run(['-cp', projectClasses, 'CsvReport', 'einkauf.csv'], { cwd: csvDir });
  require(csv.stdout.trim() === 'Einträge: 3\nSumme: 6.00', 'CSV file/UTF-8 integration failed');
  await writeFile(join(csvDir, 'invalid.csv'), 'name,betrag\nAda,-2.00\n');
  let csvRejected = false;
  try { await run(['-cp', projectClasses, 'CsvReport', 'invalid.csv'], { cwd: csvDir }); }
  catch (error) { csvRejected = error.code === 1 && error.stderr.includes('Zeile 2'); }
  require(csvRejected, 'CSV invalid amount was accepted');
  const configDir = join(root, 'java-config-check');
  const config = await run(['-cp', projectClasses, 'ConfigCheck', 'lernen.properties'], { cwd: configDir });
  require(config.stdout.trim() === 'Titel: Java üben\nAktiv: true\nLimit: 20', 'UTF-8 config integration failed');
  await writeFile(join(configDir, 'invalid.properties'), 'titel=Java\naktiv=treu\n');
  let configRejected = false;
  try { await run(['-cp', projectClasses, 'ConfigCheck', 'invalid.properties'], { cwd: configDir }); }
  catch (error) { configRejected = error.code === 1 && error.stderr.includes('aktiv: true oder false nötig'); }
  require(configRejected, 'Invalid boolean config was accepted');
  console.log('All project tests and interactive/persistence checks passed.');
} finally { await rm(root, { recursive: true, force: true }); }

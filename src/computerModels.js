// Small bounded teaching models. No eval, native instructions or network access.
export const cpuOpcodes = { HALT: 0, SET: 1, ADD: 2, LOAD: 3, STORE: 4, JZ: 5, JMP: 6 };
export function parseCpuProgram(text) {
  if (typeof text !== "string" || text.length > 4000) throw new Error("Das Programm darf höchstens 4.000 Zeichen haben.");
  const lines = text.split(/\r?\n/).map(line => line.split("#")[0].trim()).filter(Boolean);
  if (!lines.length || lines.length > 64) throw new Error("Nutze 1 bis 64 Befehle.");
  const program = lines.map((line, index) => {
    const [op, operand, ...extra] = line.toUpperCase().split(/\s+/);
    if (!Object.hasOwn(cpuOpcodes, op)) throw new Error(`Befehl ${index}: unbekannte Operation ${op}.`);
    if (op === "HALT") {
      if (operand !== undefined) throw new Error(`Befehl ${index}: HALT hat keinen Operanden.`);
      return { op, value: 0, bytes: [cpuOpcodes[op], 0] };
    }
    if (extra.length || !/^\d{1,3}$/.test(operand ?? "")) throw new Error(`Befehl ${index}: verwende einen ganzzahligen Operanden.`);
    const value = Number(operand);
    const max = ["LOAD", "STORE"].includes(op) ? 15 : ["JZ", "JMP"].includes(op) ? lines.length - 1 : 255;
    if (value > max) throw new Error(`Befehl ${index}: ${op} erwartet einen Wert von 0 bis ${max}.`);
    return { op, value, bytes: [cpuOpcodes[op], value] };
  });
  return program;
}
export function initialCpuState() {
  return { pc: 0, register: 0, ram: Array(16).fill(0), steps: 0, halted: false, error: "", last: "Bereit." };
}
export function stepCpu(program, state) {
  if (state.halted || state.error) return state;
  if (state.steps >= 128) return { ...state, error: "Schrittlimit 128 erreicht. Prüfe deine Schleife." };
  const command = program[state.pc];
  if (!command) return { ...state, error: "Kein Befehl an dieser Position. Ergänze HALT oder einen gültigen Sprung." };
  const { op, value } = command;
  const next = { ...state, ram: [...state.ram], steps: state.steps + 1, pc: state.pc + 1, last: `${state.pc}: ${op}${op === "HALT" ? "" : ` ${value}`}` };
  switch (op) {
    case "SET": next.register = value; break;
    case "ADD": next.register = (state.register + value) & 255; break;
    case "LOAD": next.register = state.ram[value]; break;
    case "STORE": next.ram[value] = state.register; break;
    case "JZ": if (state.register === 0) next.pc = value; break;
    case "JMP": next.pc = value; break;
    case "HALT": next.halted = true; next.pc = state.pc; break;
  }
  return next;
}
export function addFourBits(a, b) {
  let carry = 0;
  const rows = [];
  let value = 0;
  for (let place = 0; place < 4; place++) {
    const x = (a >> place) & 1, y = (b >> place) & 1;
    const sum = x ^ y ^ carry;
    const out = (x & y) | ((x ^ y) & carry);
    rows.push({ place, a: x, b: y, incoming: carry, sum, outgoing: out });
    value |= sum << place;
    carry = out;
  }
  return { rows, value, carry };
}

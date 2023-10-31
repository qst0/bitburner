// Bitburner v2.5.0 (b87b8b4be)
// https://qst0.com // https://qst4.com
// src: https://github.com/qst0/bitburner

// Autocomplete will only work in game when using:
/** @param {NS} ns */

// Autocomplete in vscode using:
// https://github.com/bitburner-official/bitburner-src/blob/stable/src/ScriptEditor/NetscriptDefinitions.d.ts
// save this file as index.d.ts in the dir where you edit your scripts. 
/** @param {import(".").NS } ns */

export async function main(ns) {
  ns.tprint("INFO No need to run this script, it's an example.")
  ns.tprint("ERROR did you make sure to follow the instructions?")
  ns.tprint("SUCCESS you now have autocomplete for all `ns.` commands.")
  const hackingLevel = ns.getHackingLevel();
}
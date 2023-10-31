// autocomplete.js
// Bitburner v2.5.0
// wget https://raw.githubusercontent.com/qst0/bitburner/main/autocomplete.js autocomplete.js

// Autocomplete in vscode using :

/** @param {import(".").NS } ns */

// https://github.com/bitburner-official/bitburner-src/blob/stable/src/ScriptEditor/NetscriptDefinitions.d.ts
// save this file as 'index.d.ts'
// in the directory where you edit your scripts. 


export async function main(ns) {
  ns.tprint("INFO No need to run this script, it's an example.")
  ns.tprint("ERROR Did you make sure to follow the instructions?")
  ns.tprint("SUCCESS you now have autocomplete for all `ns.` commands.")
  const hackingLevel = ns.getHackingLevel();
}
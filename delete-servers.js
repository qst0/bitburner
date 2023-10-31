// delete-servers.js
// Bitburner v2.5.0 (b87b8b4be)
// wget https://github.com/qst0/bitburner/blob/main/delete-servers.js delete-servers.js

// Coding Autocomplete
// /** @param {NS} ns */ // in-game editor
/** @param {import(".").NS } ns */ // vscode

// delete servers
export async function main(ns) {
    let servers = ns.getPurchasedServers();
    console.log("Servers:", servers)
    for (let i = 0; i<servers.length; i++) {
      ns.killall(servers[i])
      ns.deleteServer(servers[i])
    }
    console.log("Deleted all purchased servers", servers)
}
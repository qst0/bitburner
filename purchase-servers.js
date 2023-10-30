// purchase-servers.js
// Bitburner v2.5.0 (b87b8b4be)
// qst: https://qst0.com // https://qst4.com
// src: https://github.com/qst0/bitburner

/** @param {NS} ns */
export async function main(ns) {
    const ram = 4;
    const mem_work = ns.getScriptRam('work.js')
    const hostname_prefix = 'qst';
    let i = 0;
    while (i < ns.getPurchasedServerLimit()) {
        if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
            let hostname = hostname_prefix + i
            ns.purchaseServer(hostname, ram);
            ns.scp("work.js", hostname);
            ns.exec("work.js", hostname, Math.floor(ram/mem_work));
            ++i;
        }
        await ns.sleep(1000);
    }
}
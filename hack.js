// hack.hs
// Bitburner v2.5.0
// wget https://github.com/qst0/bitburner/blob/main/hack.js hack.js

/** @param {import(".").NS } ns */

//Just hack all the servers I've copied into here.
//hack them down to $0 and move on.

const HARD_DATA = ['solaris', 'defcomm', 'taiyang-digital', 'aerocorp', 'icarus', 'infocomm', 'galactic-cyber', 'omnia', 'deltaone', 'syscore', 'zeus-med', 'zb-institute', 'darkweb', 'univ-energy', 'unitalife', 'nova-med', 'global-pharm', 'zb-def', 'snap-fitness', 'lexo-corp', 'alpha-ent', 'aevum-police', 'millenium-fitness', 'rho-construction', 'summit-uni', 'rothman-uni', 'catalyst', 'netlink', 'I.I.I.I', 'computek', 'johnson-ortho', 'the-hub', 'crush-fitness', 'avmnite-02h', 'omega-net', 'silver-helix', 'phantasy', 'iron-gym', 'max-hardware', 'zer0', 'CSEC', 'neo-net', 'harakiri-sushi', 'hong-fang-tea', 'nectar-net', 'joesguns', 'sigma-cosmetics', 'n00dles', 'foodnstuff']

export async function main(ns) {
    async function hack_everything(hostnames){
        for (let i = hostnames.length-1; i >= 0; i--) {
            let target = hostnames[String(i)];
            let targetMoney = ns.getServerMoneyAvailable(target)
            while (targetMoney > 0) {
                let money = await ns.hack(target)
                console.log(target + " hacked for " + money + " of " + targetMoney);
            }
        }
    }
    await hack_everything(HARD_DATA);
}
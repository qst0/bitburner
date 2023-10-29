/** @param {NS} ns */
export async function main(ns) {
  const hack_level = 391;
  //const target = 'n00dles' // 0 ports level 1
  //const target = 'max-hardware' // 1 port level 100
  //const target = 'silver-helix' // 2 port level 200?
  //const target = 'omega-net' // 2 port level 300?
  const target = 'the-hub' // ?
  //const target = 'johnson-ortho' // ?

  const moneyThresh = ns.getServerMaxMoney(target);
  const securityThresh = ns.getServerMinSecurityLevel(target);
  const justhack = false; //true;

  // Infinite loop that continously hacks/grows/weakens the target server
  while (true) {
    if (justhack) {
      await ns.hack(target);
    } else if (ns.getServerSecurityLevel(target) > securityThresh) {
      await ns.weaken(target);
    } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
      await ns.grow(target);
    } else {
      await ns.hack(target);
    }
  }
}
/** @param {NS} ns */
export async function main(ns) {
  //const data = ns.args[0]
  //TODO pass all the main data? might be slow?
  const hack_level = ns.args[0];
  const ports_open = ns.args[1];

  // Gerenate server data, don't hard code
  // or use copy pasta fix thisGPT lol
  // as you can see below tho, it works.
  // scan-analyze 10
  // copy the data and ask for it in the right form, sort in python
  // server_data.sort(key=lambda x: (x[2], x[1]), reverse=True)
  const server_data = [['solaris', 912, 5],
  ['defcomm', 903, 5],
  ['taiyang-digital', 888, 5],
  ['aerocorp', 887, 5],
  ['icarus', 885, 5],
  ['infocomm', 876, 5],
  ['galactic-cyber', 869, 5],
  ['omnia', 853, 5],
  ['deltaone', 849, 5],
  ['syscore', 849, 5],
  ['zeus-med', 832, 5],
  ['zb-institute', 726, 5],
  ['darkweb', 1, 5],
  ['univ-energy', 840, 4],
  ['unitalife', 813, 4],
  ['nova-med', 786, 4],
  ['global-pharm', 777, 4],
  ['zb-def', 776, 4],
  ['snap-fitness', 711, 4],
  ['lexo-corp', 689, 4],
  ['alpha-ent', 600, 4],
  ['aevum-police', 441, 4],
  ['millenium-fitness', 525, 3],
  ['rho-construction', 510, 3],
  ['summit-uni', 466, 3],
  ['rothman-uni', 430, 3],
  ['catalyst', 409, 3],
  ['netlink', 401, 3],
  ['I.I.I.I', 340, 3],
  ['computek', 320, 3],
  ['johnson-ortho', 292, 2],
  ['the-hub', 280, 2],
  ['crush-fitness', 246, 2],
  ['avmnite-02h', 212, 2],
  ['omega-net', 205, 2],
  ['silver-helix', 150, 2],
  ['phantasy', 100, 2],
  ['iron-gym', 100, 1],
  ['max-hardware', 80, 1],
  ['zer0', 75, 1],
  ['CSEC', 53, 1],
  ['neo-net', 50, 1],
  ['harakiri-sushi', 40, 0],
  ['hong-fang-tea', 30, 0],
  ['nectar-net', 20, 0],
  ['joesguns', 10, 0],
  ['sigma-cosmetics', 5, 0],
  ['n00dles', 1, 0],
  ['foodnstuff', 1, 0]]

  function select_target(hackLevel, portsOpen, data) {
    let highestValue = -1; // Init with a low value
    let target = null;

    for (let i = 0; i < data.length; i++) {
      let serverHackLevel = data[i][1];
      let serverPortsOpen = data[i][2];

      if (serverHackLevel <= hackLevel && serverPortsOpen <= portsOpen) {
        // use a better formula here this just avoids hacking home and dark-net
        let value = serverHackLevel * serverPortsOpen;

        if (value > highestValue) {
          highestValue = value;
          target = data[i][0];
        }
      }
    }

    return target;
  }

  let target = select_target(hack_level, ports_open, server_data);

  console.log("work.js", "target: " + target, ns.args)

  const moneyThresh = ns.getServerMaxMoney(target);
  const securityThresh = ns.getServerMinSecurityLevel(target);
  const justhack = false; //true;
  const time_options = {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'};

  // Infinite loop that continously hacks/grows/weakens the target server
  while (true) {
    let currentTime = new Date();
    let formattedTime = currentTime.toLocaleTimeString('en-US', time_options);
    ns.print(formattedTime);
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
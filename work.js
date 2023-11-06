// work.js
// Bitburner v2.5.0 (b87b8b4be)
// wget https://raw.githubusercontent.com/qst0/bitburner/main/work.js work.js
/** @param {import(".").NS } ns */

export async function main(ns) {
  const worker_version = 0.2
  ns.print("Worker version: " + worker_version)

  const args = ns.flags([
    ["help", false],
    ["hack", false],
  ]);
  if (args.help) {
    ns.tprint("help \n Typically, use main.js to deploy workers.\n" +
      " main.js will configure the workers for you\n" +
      " run work.js <target> <maxMoney> <minSecurity>")
    return;
  }

  let target = ns.args[0]; if (args.target) { target = args.target }
  const targetMaxMoney = ns.args[1];
  const targetMinSecurityLevel = ns.args[2];
  const minSecurityLevelThresh = 1.2; // 20% margin of error
  const targetMoneyThresh = 0.8; //20% margin of error
  const time_options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

  // Infinite loop that continously hacks/grows/weakens the target server
  while (true) {
    let currentTime = new Date();
    let formattedTime = currentTime.toLocaleTimeString('en-US', time_options);
    let targetSecurityLevel = ns.getServerSecurityLevel(target)
    let targetMoney = ns.getServerMoneyAvailable(target)

    ns.print(formattedTime);

    // Print info so we can see what is going on.
    ns.print("INFO Target Info:\n"
      + "$" + Math.round(targetMoney) + "\n"
      + "$" + targetMaxMoney * targetMoneyThresh + "\n"
      + 100 * (targetMoney / (targetMaxMoney * targetMoneyThresh)) + "%\n"
      + Math.round(targetSecurityLevel) + "<" + targetMinSecurityLevel * minSecurityLevelThresh)

    let result = "ERROR";
    if (args.hack) { //flag --hack for just hacking
      console.log(await ns.hack(target));
    } else if (targetSecurityLevel > targetMinSecurityLevel * minSecurityLevelThresh) {
      result = await ns.weaken(target);
    } else if (targetMoney < targetMaxMoney * targetMoneyThresh) {
      result = await ns.grow(target);
    } else {
      result = await ns.hack(target)
    }
    ns.print("WARN" + result);
  }
}
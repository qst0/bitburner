// work.js
// Bitburner v2.5.0 (b87b8b4be)
// wget https://github.com/qst0/bitburner/blob/main/work.js work.js
/** @param {import(".").NS } ns */

export async function main(ns) {
  const args = ns.flags([
    ["help", false],
    ["hack", false],
  ]);
  if (args.help) {
    return;
  }

  let target = ns.args[0]; if (args.target) { target = args.target }
  const targetMaxMoney = ns.args[1];
  const targetMinSecurityLevel = ns.args[2];
  const minSecurityLevelThresh = 1.2; // 20% margin of error
  const targetMoneyThresh = 0.8; //20% margin of error
  const time_options = {hour: '2-digit',minute: '2-digit',second: '2-digit'};

  // Infinite loop that continously hacks/grows/weakens the target server
  while (true) {
    // Print the time, so we can more easily check how long work has been going.
    // TODO improve this, we can calculate how long jobs take and print them rather
    // rather than just getting the default output
    let currentTime = new Date();
    let formattedTime = currentTime.toLocaleTimeString('en-US', time_options);
    ns.print(formattedTime);
    // TODO, move this logic up another level, there are only three work orders
    // we can save space because of the cost these in memory
    // if the main.js knows, or can learn, the server security and money
    // that should be passed along to the work order as needed.
    
    let targetSecurityLevel = ns.getServerSecurityLevel(target)
    let targetMoney = ns.getServerMoneyAvailable(target)
    ns.print("INFO\n"
    +Math.round(targetMoney)+"\n"+targetMaxMoney*targetMoneyThresh+"\n"
    +Math.round((targetMoney/(targetMaxMoney*targetMoneyThresh))) + "%\n"
    +Math.round(targetSecurityLevel)+"<"+targetMinSecurityLevel*minSecurityLevelThresh)
    if (args.hack) { //flag --hack for just hacking
      console.log(await ns.hack(target));
    } else if (targetSecurityLevel > targetMinSecurityLevel*minSecurityLevelThresh) {
      await ns.weaken(target);
    } else if (targetMoney < targetMaxMoney*targetMoneyThresh) {
      await ns.grow(target);
    } else {
      await ns.hack(target);
    }
  }
}
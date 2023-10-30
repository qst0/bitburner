/** @param {import(".").NS } ns */

export async function main(ns) {
  const target = ns.args[0];
  const targetMaxMoney = ns.args[1];
  const targetMinSecurityLevel = ns.args[2];
  const justhack = false; //TODO make this a flag or remove it
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
    //
    
    let targetSecurityLevel = ns.getServerSecurityLevel(target)
    let targetMoney = ns.getServerMoneyAvailable(target)
    ns.print("INFO "+targetMoney+"/"+targetMaxMoney+"\n"+targetSecurityLevel+"->"+targetMinSecurityLevel)
    if (justhack) {
      await ns.hack(target);
    } else if (targetSecurityLevel > targetMinSecurityLevel) {
      await ns.weaken(target);
    } else if (targetMoney < targetMaxMoney) {
      await ns.grow(target);
    } else {
      await ns.hack(target);
    }
  }
}
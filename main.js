/** @param {NS} ns */

/* TODO
WIP work script updates with hacking level
save config to localstorage, config flag
fix reset flag and local storage
backdoor solution?
integrate purchasing of servers for reset
work script has data calls that could be replaced with hard numbers to save ram.
project / goal management or rank
*/

//        //  
/* CONFIG */
//        //

const this_filename = 'core.js'
const work_script_filename = 'work.js'
const hostname_prefix = 'qst';
let upgrade_servers_on = false;
let roll_out_on = false;
let server_dict = localStorage.getItem('server_dict');

if (!server_dict) {
  console.log("Setting server_dict for the first time")
  server_dict = {}
  localStorage.setItem('server_dict', JSON.stringify(server_dict));
} else {
  server_dict = JSON.parse(server_dict);
}

let server_dict_len = Object.keys(server_dict).length;
// prepare ns update_data vars
let mem_core, mem_work, home_ram, hacking_level, server_limit, money, ports_open;

//      //
/* MAIN */
//      //
export async function main(ns) {
  ns.tprint('Program START');
  // Args NOT USED, use flags!
  //Print the args
  for (let i = 0; i < ns.args.length; i++) {
    console.log(ns.args[i])
  }

  //.......//
  // Flags //
  //.......//
  // Setup the flags
  const args = ns.flags([
    ["help", false],
    ["purchase-servers", false],
    ["buy", false],
    ["deploy", false],
  ]);
  if (args.help) {
    ns.tprint("This is the main qst script.");
    ns.tprint(`Usage: run ${ns.getScriptName()}`);
    ns.tprint("Example:");
    ns.tprint(`> run ${ns.getScriptName()}`);
    ns.tprint("Flags: --help            - This message");
    ns.tprint("       --purchase-severs - Purchase the first round of servers");
    return;
  } else if (args.purchase_servers || args.buy) {
    purchase_servers()
  } else if (args.deploy) {
    roll_out_on = true;
  }

  //            //
  /* FUNCTIONS  */
  //            //

  function save_server_dict() { // to localStorage
    localStorage.setItem('server_dict', JSON.stringify(server_dict));
    server_dict_len = Object.keys(server_dict).length;
    //console.log(server_dict, server_dict_len)
  }


  function update_data() {
    mem_core = ns.getScriptRam(this_filename);
    mem_core = ns.getScriptRam(this_filename);
    mem_work = ns.getScriptRam(work_script_filename)
    home_ram = ns.getServerMaxRam("home")
    hacking_level = ns.getHackingLevel()
    server_limit = ns.getPurchasedServerLimit()
    money = ns.getServerMoneyAvailable("home")
    ports_open = 0;
    if (ns.fileExists("BruteSSH.exe", "home")) {
      ports_open++;
    }
    if (ns.fileExists("FTPCrack.exe", "home")) {
      ports_open++;
    }
    if (ns.fileExists("relaySMTP.exe", "home")) {
      ports_open++;
    }
    if (ns.fileExists("HTTPWorm.exe", "home")) {
      ports_open++;
    }
    if (ns.fileExists("SQLInject.exe", "home")) {
      ports_open++;
    }
  }

  // Discover other servers
  function discover_servers(current_server) {
    const server_list = ns.scan(current_server);
    for (const server of server_list) {
      if (!server_dict.hasOwnProperty(server)) {
        server_dict[server] = ns.getServer(server);
      }
    }
  }

  function run_each_server(targets) {
    let servers_rolled_out = 0
    for (const target in targets) {
      let server = ns.getServer(target)
      discover_servers(target)

      let port_opener_count = 5
      if (!server.hasAdminRights || server.openPortCount < port_opener_count) {
        if (ns.fileExists("BruteSSH.exe", "home")) {
          ns.brutessh(target)
        }
        if (ns.fileExists("FTPCrack.exe", "home")) {
          ns.ftpcrack(target)
        }
        if (ns.fileExists("relaySMTP.exe", "home")) {
          ns.relaysmtp(target)
        }
        if (ns.fileExists("HTTPWorm.exe", "home")) {
          ns.httpworm(target)
        }
        if (ns.fileExists("SQLInject.exe", "home")) {
          ns.sqlinject(target)
        }

        if (server.openPortCount >= server.numOpenPortsRequired) {
          ns.nuke(target);
        }
      }

      if (roll_out_on
        && server.maxRam > mem_work
        && server.hostname != 'home') {
        ns.scp(work_script_filename, target)
        ns.killall(target)
        ns.exec(work_script_filename, target, Math.floor(server.maxRam / mem_work), hacking_level, ports_open)
        servers_rolled_out++;
      }

    }
    // Finished roll out, turn it off.
    if (roll_out_on) {
      console.log("Finished rolling out to " + servers_rolled_out + " servers!")
      roll_out_on = false;
    }

  }

  //..................//
  // async functions  //
  //..................//

  async function purchase_servers() {
    const purchase_ram = 4;
    let i = 0;
    while (i < ns.getPurchasedServerLimit()) {
      if (money > ns.getPurchasedServerCost(purchase_ram)) {
        let hostname = hostname_prefix + i
        ns.purchaseServer(hostname, purchase_ram);
        ns.scp(work_script_filename, hostname);
        ns.exec(work_script_filename, hostname, Math.floor(purchase_ram / mem_work));
        ++i;
      }
      await ns.sleep(1000);
    }
  }

  async function upgrade_servers() {
    for (let i = 0; i < server_limit; i++) {
      let hostname = hostname_prefix + i
      let ram = ns.getServerMaxRam(hostname) * 2
      let cost = ns.getPurchasedServerCost(ram)
      if (money > cost) {
        console.log("Upgrading " + hostname + " to " + ram)
        ns.upgradePurchasedServer(hostname, ram);
        //spin up another worker
        ns.killall(hostname)
        ns.exec(work_script_filename, hostname, Math.floor(ram / mem_work));

      } else {
        //console.log("Cannot Upgrade " + hostname + " to " + ram + "\n" +
        //"$" + Math.floor(money) + " < Cost $" + cost + "\n" +
        //"Short $" + Math.floor(cost - money))
      }
      await ns.sleep(500);
    }
  }

  // Home Work
  update_data();
  //ns.killall('home') // why doesn't it stop itself lol
  console.log(home_ram,mem_core,home_ram-mem_core)
  //TODO rename mem_core to mem_main
  //TODO fix this... why need to *2 why won't work run?
  let home_mem_left = home_ram-mem_core*2
  ns.exec(work_script_filename,"home", Math.floor(home_mem_left / mem_work), hacking_level, ports_open)
  
  // Functions END
  let question = "Would you like to configure?"
  let reset_config = await (ns.prompt(question))

  // Yes or No Prompt Interactive Configuration
  if (reset_config) {
    question = "Reset local storage?"
    if (await (ns.prompt(question))) {
      console.log("RESETTING LOCAL STORAGE")
      ns.tprint("RESETING LOCAL STORAGE")
      localStorage.clear()
    }

    question = "Deploy on all servers?"
    roll_out_on = await (ns.prompt(question))

    question = "Upgrade servers?"
    upgrade_servers_on = await (ns.prompt(question))

    reset_config = false;
  }

  // Move these to config?
  let searching = true;
  discover_servers('home')
  let known_highest_server_count = 96;

  while (searching || upgrade_servers_on) {
    update_data();
    if (searching) {
      run_each_server(server_dict);
      save_server_dict();
      // TODO, make sure this is true
      // I'm done searching if I find 96 servers
      if (server_dict_len >= known_highest_server_count){
        console.log("search complete", server_dict, server_dict_len)
        searching = false;
      }
    }
    if (upgrade_servers_on) {
      await upgrade_servers()
    }
    ns.tprint('cycle complete')
    await ns.sleep(1000)
  }
  ns.tprint('Program END');
}
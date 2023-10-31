// main.js
// Bitburner v2.5.0 (b87b8b4be)
// wget https://raw.githubusercontent.com/qst0/bitburner/main/work.js work.js
// wget https://raw.githubusercontent.com/qst0/bitburner/main/main.js main.js

/** @param {import(".").NS } ns */

//        //  
/* CONFIG */
//        //

const this_filename = 'core.js'
const work_script_filename = 'work.js'
const hostname_prefix = 'qst';
let upgrade_servers_on = false;
let deploy_on = false;
let server_dict = localStorage.getItem('server_dict');

if (!server_dict) {
  console.log("Setting server_dict for the first time")
  server_dict = {}
  localStorage.setItem('server_dict', JSON.stringify(server_dict));
} else {
  server_dict = JSON.parse(server_dict);
  console.log("Loaded Server Data from localStorage:", server_dict, Object.keys(server_dict).length)
}

let server_dict_len = Object.keys(server_dict).length;
// prepare ns update_data vars
let mem_main, mem_work, home_ram, hacking_level, server_limit, money, ports_open;

//      //
/* MAIN */
//      //
export async function main(ns) {
  console.log("ns:", ns);
  ns.tprint('Program START');
  //Print the args in the console, if there are any
  if (ns.args.length) {
    let msg = " "
    for (let i = 0; i < ns.args.length; i++) {
      msg = msg + " " + ns.args[i]
    }
    console.log(msg.trim())
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
    deploy_on = true;
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
    mem_main = ns.getScriptRam(this_filename);
    console.log("mem_main", mem_main)
    if (mem_main == 0) {
      mem_main = 7.45
    }
    mem_work = ns.getScriptRam(work_script_filename)
    home_ram = ns.getServerMaxRam("home")
    hacking_level = ns.getHackingLevel()
    server_limit = ns.getPurchasedServerLimit()
    money = ns.getServerMoneyAvailable("home")
    // if we get a new hacking program, we need to know.
    // for now, just always recheck on update to confirm
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

  // USES HARD DATA FROM TOP OF FILE. TODO use SERVER DATA/DICT
  function select_target(hackLevel, portsOpen) {
    let highestValue = -1; // Init with a low value
    let target = null;
    Object.getOwnPropertyNames(server_dict).forEach((key) => {
      let serverHackLevel = server_dict[key]['requiredHackingSkill'];
      let numOpenPortsRequired = server_dict[key]['numOpenPortsRequired'];
      if (serverHackLevel <= hackLevel && numOpenPortsRequired <= portsOpen) {
        // use a better formula here? this just avoids hacking home and dark-net
        let value = serverHackLevel // * serverPortsOpen;
        if (value > highestValue) {
          highestValue = value;
          target = key;
        }
      }
    });
    console.log("Targeting: ", target,
     "Hacking Level: ", hackLevel,
    "Hack Req: ", highestValue,
    "Difficulty: ", server_dict[target]['hackDifficulty'])
    return target;
  }

function run_each_server(hostnames) {
  let servers_deployed_to = 0
  for (const hostname in hostnames) {
    let server = ns.getServer(hostname)
    discover_servers(hostname)

    if (!server.hasAdminRights || server.openPortCount < ports_open) {
      if (ns.fileExists("BruteSSH.exe", "home")) {
        ns.brutessh(hostname)
      }
      if (ns.fileExists("FTPCrack.exe", "home")) {
        ns.ftpcrack(hostname)
      }
      if (ns.fileExists("relaySMTP.exe", "home")) {
        ns.relaysmtp(hostname)
      }
      if (ns.fileExists("HTTPWorm.exe", "home")) {
        ns.httpworm(hostname)
      }
      if (ns.fileExists("SQLInject.exe", "home")) {
        ns.sqlinject(hostname)
      }

      if (server.openPortCount >= server.numOpenPortsRequired) {
        ns.nuke(hostname);
      }
    }

    if (deploy_on && server.maxRam > mem_work && server.hostname != 'home') {
      ns.scp(work_script_filename, hostname)
      ns.killall(hostname)
      hacking_level = ns.getHackingLevel()
      target = select_target(hacking_level, ports_open)
      ns.exec(work_script_filename, hostname, Math.floor(server.maxRam / mem_work),
        target, server_dict[target].moneyMax, server_dict[target].minDifficulty)
      servers_deployed_to++;
    }

  }
  // Finished roll out, turn it off.
  if (deploy_on) {
    console.log("Finished deploying workers to " + servers_deployed_to + " servers!")
    deploy_on = false;
  }

}


//..................//
// async functions  //
//..................//

async function purchase_servers() {
  ns.exec('purchase-servers.js', 'home')
  ns.tprint("ERROR: Please `run purchase-servers.js` instead")
  /* 
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
  */
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
      let target = select_target(hacking_level, ports_open)
      ns.exec(work_script_filename, hostname, Math.floor(ram / mem_work),
        target, server_dict[target].moneyMax, server_dict[target].minDifficulty)

    } else {
      //console.log("Cannot Upgrade " + hostname + " to " + ram + "\n" +
      //"$" + Math.floor(money) + " < Cost $" + cost + "\n" +
      //"Short $" + Math.floor(cost - money))
    }
    await ns.sleep(500);
  }
}

// Home Work
update_data(); // Make sure we have the most up to date data
ns.killall('home') // it doesn't stop itself ;-)
console.log("homeram", home_ram)
console.log("memmain", mem_main)
let home_mem_left = home_ram - mem_main
console.log("home_mem_left", home_ram - mem_main)
let target = select_target(hacking_level, ports_open)
let threads = Math.floor(home_mem_left / mem_work)
console.log("threads", threads)
console.log("target", target)
let moneyMax = 1000000000
let minDifficulty = 100
if (server_dict[target]) {
  moneyMax = server_dict[target].moneyMax;
  minDifficulty = server_dict[target].minDifficulty;
}
ns.exec(
  work_script_filename,
  "home",
  threads,
  target,
  moneyMax,
  minDifficulty
)

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
  deploy_on = await (ns.prompt(question))

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
    // TODO is this true? I'm done searching if I find 96 servers
    if (server_dict_len >= known_highest_server_count) {
      console.log("search complete", server_dict, server_dict_len)
      searching = false;
    }
  }
  if (upgrade_servers_on) {
    await upgrade_servers()
  }
  console.log("cycle complete")
  await ns.sleep(1000)
}
ns.tprint('Program END');
}
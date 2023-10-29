/** @param {NS} ns */

/* TODO
work script updates with hacking level?
fix reset flag and local storage
backdoor solution?
integrate purchasing of servers for reset
work script has data calls that could be replaced with hard numbers to save ram.
project / goal management or rank
*/

// config
const this_filename = 'core.js'
const work_script_filename = 'work.js'
const hostname_prefix = 'qst';
let upgrade_servers_on = false;
let roll_out_on = false;
// check for reset_server_dict
let reset_server_dict = localStorage.getItem('reset_server_dict');

// create or load our server info to localStorage
let server_dict = localStorage.getItem('server_dict');
if (!server_dict || reset_server_dict) {
  server_dict = {}
  reset_server_dict = false
} else {
  server_dict = JSON.parse(server_dict);
}
let server_dict_len = Object.keys(server_dict).length;


export async function main(ns) {
  //look at NetScript it more:
  console.log(ns)
  for(let i=0;i<ns.args.length;i++){
    console.log(ns.args[i])
  }

  // Prepare updatable values
  let mem_core, mem_work, home_ram, hacking_level, server_limit, money;
  function update_data() {
    mem_core = ns.getScriptRam(this_filename);
    mem_work = ns.getScriptRam(work_script_filename)
    home_ram = ns.getServerMaxRam("home")
    hacking_level = ns.getHackingLevel()
    server_limit = ns.getPurchasedServerLimit()
    money = ns.getServerMoneyAvailable("home")
  }
  update_data()

  // Yes or No Prompt Configs
  let question = "Reset Server Data?"
  reset_server_dict = await (ns.prompt(question))

  question = "Deploy on all servers?"
  roll_out_on = await (ns.prompt(question))

  question = "Upgrade Servers?"
  upgrade_servers_on = await (ns.prompt(question))


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
    let servers_rolled_out = 0;
    for (const target in targets) {
      let server = ns.getServer(target)
      discover_servers(target)

      if (!server.hasAdminRights) {
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
        ns.exec(work_script_filename, target, Math.floor(server.maxRam / mem_work))
        servers_rolled_out++;
      }

    }
    // Finished roll out, turn it off.
    if (roll_out_on) {
      console.log("Finished rolling out to " + servers_rolled_out + " servers!")
      roll_out_on = false;
    }

  }

  async function upgrade_servers() {
    for (let i = 0; i < server_limit; i++) {
      let hostname = hostname_prefix + i
      let ram = ns.getServerMaxRam(hostname) * 2
      let cost = ns.getPurchasedServerCost(ram)
      if (money > cost) {
        //console.log("Upgrading " + hostname + " to " + ram)
        ns.upgradePurchasedServer(hostname, ram);
        //spin up another worker
        ns.killall(hostname)
        ns.exec("work.js", hostname, Math.floor(ram/mem_work));
        
      } else {
        //console.log("Cannot Upgrade " + hostname + " to " + ram + "\n" +
        //"$" + Math.floor(money) + " < Cost $" + cost + "\n" +
        //"Short $" + Math.floor(cost - money))
      }
      await ns.sleep(500);
    }
  }

  // Home Work
  discover_servers('home')
  ns.killall("home") // why doesn't it stop itself lol
  console.log(home_ram, mem_core, mem_work, (home_ram - mem_core) / mem_work);
  ns.exec(work_script_filename, "home", Math.floor((home_ram - mem_core) / mem_work))

  // Save the server_dict to localStorage
  function save_server_dict(){
    localStorage.setItem('reset_server_dict', reset_server_dict);
    localStorage.setItem('server_dict', JSON.stringify(server_dict));
    server_dict_len = Object.keys(server_dict).length;
    console.log(server_dict, server_dict_len)
  }
  save_server_dict();

  // core while-loop
  while (true) {
    update_data();
    run_each_server(server_dict);
    if (upgrade_servers_on) {
      await upgrade_servers()
    }
    await ns.sleep(1000);
    save_server_dict();
    console.log("core looping")
  }
}
# BitBurner

While looking for games that help with coding/automation mindset I discovered Bitburner.

play: [https://bitburner-official.github.io/](https://bitburner-official.github.io/)
src: [https://github.com/bitburner-official/bitburner-src](https://github.com/bitburner-official/bitburner-src)

Bitburner is an incremental / idling game where you can write js (javascript) using a library called ns (netscript) to hack a 2077 cyberpunk world.

# What's this code?

These are my net scripts I've been using to automate the discovery and hacking of targets in the game. Using the dev in game instructions and the dev tools I continue to improve them.

I have tried my best to figure everything out from the in-game instructions but have used the dev tools and the docs a few times to obtain knowledge. I think it's in the spirit of the game to do so, but I've been trying to challenge myself since this gamification of coding has turned out to be really fun.

## TODO

* main.js script is bigger than 8GB and won't work on the starting home server.
* WIP work script updates with hacking level
* save config to localstorage, config flag
* fix reset flag and local storage
* backdoor solution?
* integrate purchasing of servers for reset
* work script has data calls that could be replaced with hard numbers to save ram.
* project / goal management or rank

## Thoughts about the game as I play it:


### Oct 30th
I've moved some of the project tracking into the repo.

I left everything running overnight, I woke up and the server I was targeting has no money left. Figuring out a way to move forward from that would be good. I think just updating the data and rolling out again, that is deploying work.js again to all of the purchased servers with my updated hacking level, port opener count and target when I see the server has nothing left could work. Testing it live will take time, so maybe I should write tests? I'll check my todo-list. I'm trying to get a few more augmentations from The Black Hand before I reset. I'm sitting on 400b but I need a bit more to upgrade the cores on my home computer and I still want to buy more augmentations before I install them. The game loop is very fun and I think when I get to the end game I want to look at the codebase more. I bought Formulas.exe last time and I didn't use it. A waste of 5b. But I don't really know how, so I need to figure that out. I'm at 775~ hacking level now, and you can write Formulas.exe yourself at 1000. But I think buying it might be faster. I scale faster with my private servers. I wonder if installing more frequently is a better tactic?

--

Since last Augmentation installation

7 hours 9 minutes 3 seconds

Total

2 days 14 hours 18 minutes 19 seconds

It's the 30th of Oct 2023 now, I've been playing for two days or so, I had some tiem tonight to rework almost everything about the way main launches work. Now to make it smarter...

I'll update my todo list, but I think I'm making good progress and my js skills are coming back.

--

### Oct 29th

I've been playing for about an entire day now, mainly tinkering on my scripts and discovering what I can do. I have the whole network mapped out I think, and I discover it automatically as I get access to more servers. I've found a good way to get back on my feet after Augmentation installs too. When I next "install" or reset, which I think would be best to do in the morning, I'll see how hands-off I can be. The biggest missing piece is automation for picking my target. It's a mess because I don't know all the details right now, so I've just been picking some targets I found manually and aimming all my servers at them.

Probably time to review the docs and check my todo list in main.js

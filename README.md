# BitBurner

While looking for games that help with coding/automation mindset I discovered Bitburner.

play: [https://bitburner-official.github.io/](https://bitburner-official.github.io/)
src: [https://github.com/bitburner-official/bitburner-src](https://github.com/bitburner-official/bitburner-src)

Bitburner is an incremental / idling game where you can write js (javascript) using a library called ns (netscript) to hack a 2077 cyberpunk world.

## What are these files anyway?

These are my net scripts I've been using to automate the discovery and hacking of targets in the game. Using the dev in game instructions and the dev tools I continue to improve them.

I have tried my best to figure everything out from the in-game instructions but have used the dev tools and the docs a few times to obtain knowledge. I think it's in the spirit of the game to do so, but I've been trying to challenge myself since this gamification of coding has turned out to be really fun.

## TODO

* save config to localstorage, config flag
* automate backdoor / reach singularity.
* work script has data calls that could be replaced with hard numbers to save ram.
* move to github issue tracking?

## Hack/Dev Log + Thoughts about Bitburner as I play it:

### Oct 31st

It's 0120h and I've finished the goal, I no longer need the hard data.
But I need to fix hack.js that just hacks up the chain now...
Also, I think I should target lower than the higest possible target...
Not sure what tho.

Halloween! Spooky Bitburnin'

Goals for this day: hack based on server_data, not HARD_DATA


### Oct 30th

The break wasn't very long, I peeked back around 2300H or so and the rep was past 75k so I grabbed all of the augmentations and installed. I found errors in my main.js and approach... I need to make the server picker select_target or whatever I can it, a lot better. I have the data. So I just need to use it, and I need to think about how I don't have the data at first and how I get it by searching a few loops. I'm not doing things in the right order. Anyway, now I think it's going along well. It just needs to pick new targets without my intervertion...

I spent some time cleaning up the repo and updating the README because I like that sort of thing. Kinda silly but fun. Now I should seriously take that break :-)

Time Played:

Since last Augmentation installation 5 hours 59 minutes 37 seconds

Total: 3 days 9 hours 48 minutes 42 seconds


It's almost the 31st, ~2220H now I've hit a bit of a slump in my motivation. I need to figure out what I want to do next, after I get the rep and agumentations for Tian Di Hui, which is what I'm having the character focus on now. I should make the server finder smarter and not just find the hardest thing to weaken/grow/hack and go for it with all of the power. But I need a plan for that. I should look at the formulas.exe again but before that I know I can at least use the server_data/dict that I make when searching to pick the servers like I do now, but a bit smarter and with a complete list, which I think is 96 hosts, but I can't confirm that yet. 10k rep left. I guess I'll let it idle and find something else to do for a bit. Let my brain settle before this feels like work instead of fun-work. I joined the discord. I'm still in the early game, since I haven't finished fl1ght.exe! But that's all I asked/looked at for the most part. Don't want to spoil it for myself.

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

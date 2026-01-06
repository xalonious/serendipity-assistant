const CURRENCY = "<a:coins:1371147181721124924>";

const beg = {
  failed: [
    "nah, would rather not feed your gambling addiction",
    "I can't even afford a McChicken, let alone give you coins",
    "HAHAHAHAHAHA no",
    "honestly why are you even begging, get a job",
    "how about no",
    "is monopoly money ok? no? sounds like a you problem",
    "Begging isn't a sustainable career choice, you know.",
    "If I had a penny for every time someone begged me for coins...",
    "The begging department is currently closed for renovations.",
    "I'd rather donate to a charity for needy bots.",
    "Your begging skills need some serious leveling up.",
    "I'm allergic to panhandling, sorry.",
    "Not today, not tomorrow, not ever.",
    "Maybe try a more convincing sob story next time.",
    "Even if I wanted to give you coins, I'd probably drop them in a sewer.",
    "If begging were an Olympic sport, you wouldn't even qualify.",
    "I'm fresh out of sympathy coins, sorry.",
    "Begging is for amateurs, try negotiating like a pro.",
    "I'm allergic to handing out freebies.",
    "You're as likely to get coins from me as winning the lottery without buying a ticket.",
    "I'd rather spend my coins on virtual bubble wrap popping.",
    "If I had a coin for every beggar, I'd probably have... well, still nothing.",
    "My generosity meter is at an all-time low.",
    "If wishes were coins, you'd still be broke.",
    "Sorry, I'm allergic to handing out freebies.",
    "I'd rather invest my coins in a 'make-believe' stock market.",
    "You have a better chance of winning a staring contest with a brick wall.",
    "If I had a nickel for every beggar, I'd probably have... well, still nothing.",
    "I'd rather spend my coins on imaginary unicorn rides.",
    "You're as likely to get coins from me as finding a needle in a haystack.",
    "Even if I wanted to, I'd probably forget where I put the coins.",
    "I'd rather use my coins as bait in a virtual fishing game.",
    "I'd rather use my coins as confetti at a paperless party.",
    "You have a better chance of catching a unicorn than getting coins from me.",
    "Sorry, I'm allergic to being begged at.",
    "Even if I wanted to, I'd probably accidentally donate the coins to a virtual museum.",
    "I'd rather use my coins to play a virtual game of 'pirate treasure hunt'.",
    "Even if I wanted to, I'd probably spend the coins on a novelty mug instead.",
    "You're as likely to get coins from me as winning a game of rock-paper-scissors with a rock.",
    "Even if I wanted to, I'd probably accidentally buy virtual socks instead.",
    "I'd rather use my coins to buy virtual real estate on Mars.",
    "Sorry, my coins are on strike, demanding better treatment.",
    "Even if I wanted to, I'd probably spend the coins on virtual fireworks.",
    "You're as likely to get coins from me as winning a game of hide and seek with a ghost.",
    "I'd rather use my coins to buy virtual stars and name them after myself.",
    "Even if I wanted to, I'd probably get distracted and forget to give you coins.",
    "You have a better chance of finding a leprechaun's pot of gold."
  ]
};


const crime = {
  success: [
    `${CURRENCY} You disguise yourself as a pizza delivery person and successfully infiltrate the bank's security. You walk away with a hefty sum of **__{amount}__** coins! The perfect crime.`,
    `${CURRENCY} You hack into the city's traffic light system and orchestrate the perfect distraction. While chaos ensues on the streets, you calmly rob the jewelry store and make off with **__{amount}__** coins. Smooth.`,
    `${CURRENCY} Disguised as a maintenance worker, you sneak into the museum and replace the Mona Lisa with a convincing replica. You sell the original for **__{amount}__** coins to a private collector.`,
    `${CURRENCY} You stage a daring heist on a moving train, bypassing security and making off with a fortune in cash and jewels. Your take: **__{amount}__** coins. Mission accomplished.`,
    `${CURRENCY} Under the cover of darkness, you break into the mayor's mansion and crack open the safe. Inside, you find **__{amount}__** coins in cold, hard cash. Not bad for a night's work.`,
    `${CURRENCY} You pose as a celebrity chef and infiltrate a high-profile gala. While everyone is distracted by your culinary delights, you discreetly make off with **__{amount}__** coins from the charity auction.`,
    `${CURRENCY} With the help of your trusty sidekick, you pull off a daring casino heist worthy of Hollywood. You walk away with **__{amount}__** coins in chips and a grin on your face.`,
    `${CURRENCY} You engineer an elaborate Ponzi scheme that fools even the savviest investors. When the dust settles, you're left with **__{amount}__** coins in ill-gotten gains.`,
    `${CURRENCY} You infiltrate the annual art auction disguised as a wealthy collector. As the bidding war heats up, you quietly secure the winning bid on a priceless painting, pocketing **__{amount}__** coins in profit.`,
    `${CURRENCY} You hack into the central bank's mainframe and transfer a substantial sum of money into your offshore account. Your balance now reads **__{amount}__** coins richer.`,
    `${CURRENCY} Posing as a master forger, you create impeccable replicas of rare artifacts and sell them to unsuspecting collectors. Your latest sale nets you **__{amount}__** coins in profit.`,
    `${CURRENCY} You orchestrate a daring escape from prison, outsmarting the guards and disappearing without a trace. As a free person, you help yourself to **__{amount}__** coins from the local bank vault.`,
    `${CURRENCY} You infiltrate a high-security government facility and hack into their classified database. Inside, you find valuable intel worth **__{amount}__** coins to the right buyer.`,
    `${CURRENCY} With nerves of steel, you stage a daring jewelry heist during rush hour. The chaos of the city provides the perfect cover as you make off with **__{amount}__** coins in precious gems.`,
    `${CURRENCY} In a stroke of genius, you develop a counterfeit currency so convincing that it fools even the most sophisticated banks. You flood the market and walk away with **__{amount}__** coins in legitimate profit.`,
    `${CURRENCY} You masquerade as a wealthy aristocrat and charm your way into the inner circle of high society. With access to their vaults, you help yourself to **__{amount}__** coins in priceless artifacts.`,
    `${CURRENCY} Posing as a renowned art thief, you pull off a daring museum heist worthy of the history books. Your take: **__{amount}__** coins in stolen masterpieces.`,
    `${CURRENCY} You enlist the help of a skilled hacker to infiltrate a cryptocurrency exchange. Together, you siphon off **__{amount}__** coins in digital currency before disappearing into the dark web.`,
    `${CURRENCY} With nerves of steel, you stage a daring casino heist during a celebrity poker tournament. As the chips fly, you make off with **__{amount}__** coins in winnings.`,
    `${CURRENCY} In a stroke of brilliance, you stage a fake alien invasion to distract the authorities while you rob a priceless artifact from the museum. Your take: **__{amount}__** coins in ancient treasure.`,
    `${CURRENCY} You hatch a plan to steal the crown jewels from the royal palace. With nerves of steel, you execute the heist flawlessly and make off with **__{amount}__** coins in royal treasures.`,
    `${CURRENCY} Posing as a renowned art collector, you infiltrate a private auction and outbid the competition on a rare painting. The artwork is worth **__{amount}__** coins to the right buyer.`,
    `${CURRENCY} You pull off a daring bank heist using only a pair of wire cutters and a fake moustache. As the dust settles, you're left with **__{amount}__** coins in unmarked bills.`,
    `${CURRENCY} With nerves of steel, you stage a daring train robbery straight out of the Wild West. The loot: **__{amount}__** coins in gold bars.`,
    `${CURRENCY} You masquerade as a celebrity chef and infiltrate a high-profile food festival. While the crowds are distracted by your cooking, you discreetly help yourself to **__{amount}__** coins from the event's cash register.`,
    `${CURRENCY} You infiltrate a high-security research facility and steal a prototype for a revolutionary new technology. The blueprint is worth **__{amount}__** coins to the right buyer.`,
    `${CURRENCY} You pose as a famous author and host a book signing event. While fans clamor for your signature, you discreetly slip **__{amount}__** coins from the bookstore's safe.`,
    `${CURRENCY} With the help of your trusty sidekick, you orchestrate a daring jewel heist during a high-society gala. The gems are worth **__{amount}__** coins on the black market.`,
    `${CURRENCY} You pull off a daring bank robbery with military precision, outsmarting the security systems and making off with **__{amount}__** coins in cash.`,
    `${CURRENCY} With nerves of steel, you stage a daring art heist during a high-profile museum exhibition. As the security guards scramble, you make off with **__{amount}__** coins in priceless masterpieces.`,
    `${CURRENCY} You orchestrate a daring heist on a luxury yacht, outmaneuvering the crew and making off with **__{amount}__** coins in cash and jewels.`,
    `${CURRENCY} You infiltrate a high-security government facility and steal top-secret documents. The intel is worth **__{amount}__** coins to the right buyer.`,
    `${CURRENCY} Posing as a famous archaeologist, you lead an expedition to uncover ancient treasures. Along the way, you help yourself to **__{amount}__** coins in priceless artifacts.`,
    `${CURRENCY} You orchestrate a daring heist on a luxury cruise ship, outmaneuvering the crew and making off with **__{amount}__** coins in cash and jewels.`,
    `${CURRENCY} You disguise yourself as a janitor and sneak into the bank after hours. With a carefully timed distraction, you crack the vault and walk away with **__{amount}__** coins in cash.`,
    `${CURRENCY} Using your skills as a master hacker, you breach the security of a major corporation and transfer **__{amount}__** coins to your offshore account.`,
    `${CURRENCY} You pose as a wealthy investor and convince a group of executives to invest in your fake company. With their money in hand, you disappear with **__{amount}__** coins in profits.`,
    `${CURRENCY} Posing as a delivery driver, you infiltrate a high-security warehouse and make off with **__{amount}__** coins worth of goods.`,
    `${CURRENCY} You orchestrate a sophisticated blackmail scheme, threatening to expose a politician's scandalous secrets unless they pay up. Your payout: **__{amount}__** coins in hush money.`,
    `${CURRENCY} With the help of an inside accomplice, you infiltrate a secure government facility and steal **__{amount}__** coins in classified documents.`,
    `${CURRENCY} You pose as a tourist and sneak onto a private island owned by a billionaire. While the guards are distracted, you help yourself to **__{amount}__** coins worth of luxury items.`,
    `${CURRENCY} Posing as a wealthy socialite, you attend a high-profile charity gala and discreetly pocket **__{amount}__** coins from the donation box.`,
    `${CURRENCY} With the help of a skilled locksmith, you break into a luxury penthouse and raid the safe for **__{amount}__** coins in cash and jewels.`,
    `${CURRENCY} You pose as a delivery driver and intercept a valuable shipment of goods. With your loot in tow, you make off with **__{amount}__** coins worth of merchandise.`,
    `${CURRENCY} Using your charm and wit, you seduce a wealthy heiress and convince her to transfer **__{amount}__** coins into your bank account.`,
    `${CURRENCY} Posing as a tech support specialist, you gain remote access to a billionaire's computer and transfer **__{amount}__** coins into your offshore account.`,
    `${CURRENCY} With the help of an expert forger, you create counterfeit passports and sell them to desperate travelers. Your profits: **__{amount}__** coins in untraceable cash.`,
    `${CURRENCY} You pose as a wealthy art collector and outbid the competition on a rare painting. After the auction, you sell it for **__{amount}__** coins to a private buyer.`,
    `${CURRENCY} Using your knowledge of the stock market, you manipulate prices and make a killing on a high-stakes trade. Your profits: **__{amount}__** coins in cold, hard cash.`,
    `${CURRENCY} You pose as a high-priced escort and seduce a wealthy businessman. After a night of passion, you discreetly help yourself to **__{amount}__** coins from his wallet.`,
    `${CURRENCY} Posing as a renowned art dealer, you broker a deal for a rare sculpture. After the sale, you pocket **__{amount}__** coins in commission fees.`,
    `${CURRENCY} With the help of a skilled team, you stage a daring heist on a luxury casino. Your take: **__{amount}__** coins in chips and cash.`,
    `${CURRENCY} You pose as a wealthy philanthropist and make a generous donation to a charity event. As a token of appreciation, they give you **__{amount}__** coins worth of luxury gifts.`,
    `${CURRENCY} With the help of an inside informant, you infiltrate a high-security research facility and steal **__{amount}__** coins worth of experimental technology.`
  ],

  failure: [
    `${CURRENCY} Your attempt to rob the bank ends in disaster as you trip the silent alarm. You narrowly escape, but not before being fined **__{amount}__** coins.`,
    `${CURRENCY} You try to break into the museum, but get stuck in the air vent halfway through. You're rescued by the fire department and fined **__{amount}__** coins.`,
    `${CURRENCY} Your plan to steal a priceless artifact is foiled when you trip the security alarm. You're fined **__{amount}__** coins.`,
    `${CURRENCY} Your attempt to hack into the bank's mainframe is thwarted by a firewall. You're traced and fined **__{amount}__** coins.`,
    `${CURRENCY} You try to pickpocket a wealthy businessman but grab the mayor's wallet instead. You're caught and fined **__{amount}__** coins.`,
    `${CURRENCY} You attempt to rob a jewelry store, but your disguise fools no one. You're arrested and fined **__{amount}__** coins.`,
    `${CURRENCY} You slip on a banana peel mid-heist. Police fine you **__{amount}__** coins.`,
    `${CURRENCY} You tried to steal a car, but it was a police cruiser. You're caught and fined **__{amount}__** coins.`,
    `${CURRENCY} Your attempt to rob a convenience store failed miserably. You're fined **__{amount}__** coins.`,
    `${CURRENCY} You try to break into a mansion but get stuck in the chimney. Firefighters rescue you and fine you **__{amount}__** coins.`,
    `${CURRENCY} You try to rob a bank but accidentally hand the teller your shopping list. You're fined **__{amount}__** coins.`,
    `${CURRENCY} You get body-slammed by a tourist you tried to pickpocket. You're fined **__{amount}__** coins.`,
    `${CURRENCY} You set off every alarm in the city. Fined **__{amount}__** coins.`,
    `${CURRENCY} You fell asleep mid-crime and woke up in cuffs. Fined **__{amount}__** coins.`,
    `${CURRENCY} You tripped over a display case. Fined **__{amount}__** coins.`,
    `${CURRENCY} You forgot your mask and got recognized. Fined **__{amount}__** coins.`,
    `${CURRENCY} You slipped on wet floor during getaway. Fined **__{amount}__** coins.`,
    `${CURRENCY} The vault was empty. You broke your nose and your wallet. Lost **__{amount}__** coins.`,
    `${CURRENCY} A raccoon stole your loot. Police fined you **__{amount}__** coins.`,
    `${CURRENCY} You tripped over your own ego. Pay **__{amount}__** coins in fines.`
  ]
};

// =====================================================
// 🔍 search command data
// =====================================================
const search = {
  locations: [
    {
      name: "Dumpster",
      success: [
        `You dug through the trash and found **${CURRENCY} {amount}** in an old wallet!`,
        `You flipped a pizza box and, jackpot, you snagged **${CURRENCY} {amount}**.`,
        `You smell terrible, but your pockets just gained **${CURRENCY} {amount}**.`,
        `You sifted past sticky soda cans and fished out **${CURRENCY} {amount}**.`,
        `Someone tossed a pair of jeans with coins in them, and you recovered **${CURRENCY} {amount}**.`
      ],
      failure: [
        "You found only banana peels and regret.",
        "A raccoon hissed and guarded the good spot.",
        "You slipped on mystery goo and found no coins.",
        "You uncovered nothing but receipts and dust.",
        "You almost grabbed a live mousetrap—nope."
      ]
    },
    {
      name: "Park",
      success: [
        `You peeked under a bench and found **${CURRENCY} {amount}**.`,
        `A jogger dropped change, so you scooped up **${CURRENCY} {amount}**.`,
        `You helped someone with directions and they tipped you **${CURRENCY} {amount}**.`,
        `You circled the fountain and spotted **${CURRENCY} {amount}**.`,
        `A kite string led you to a glimmer in the grass—**${CURRENCY} {amount}**.`
      ],
      failure: [
        "The ducks distracted you and you forgot to search.",
        "A gust of wind took your hat and your focus.",
        "You found bottle caps and not much else.",
        "You stepped in mud and called it a day.",
        "The park ranger told you to move along, so you did."
      ]
    },
    {
      name: "Library",
      success: [
        `You opened a book and discovered **${CURRENCY} {amount}** being used as a bookmark.`,
        `You found a lost-and-found refund slip worth **${CURRENCY} {amount}**.`,
        `Quiet karma hit: the librarian tipped you **${CURRENCY} {amount}** for helping.`,
        `You checked under a reading lamp and found **${CURRENCY} {amount}**.`,
        `You searched a study cubicle and uncovered **${CURRENCY} {amount}** in coins.`
      ],
      failure: [
        "You got shushed out before you could find anything.",
        "You found only overdue notices, not currency.",
        "You misfiled your hopes under 'fiction.'",
        "You gained knowledge instead of cash.",
        "Someone else had already claimed the best seat and the luck."
      ]
    },
    {
      name: "Alleyway",
      success: [
        `You spotted a dropped coin pouch and collected **${CURRENCY} {amount}**.`,
        `You searched behind a crate and discovered **${CURRENCY} {amount}**.`,
        `You followed a trail of loose change that totaled **${CURRENCY} {amount}**.`,
        `You checked the steps and found **${CURRENCY} {amount}** tucked by a riser.`,
        `You shook an old jacket pocket and **${CURRENCY} {amount}** rattled out.`
      ],
      failure: [
        "A stray cat said 'no' with its claws.",
        "The smell made you bail before you found anything.",
        "You checked twice and still found nothing.",
        "You found broken glass and echoes instead of coins.",
        "A door slammed and ended your search."
      ]
    },
    {
      name: "Beach",
      success: [
        `You brushed away sand and revealed **${CURRENCY} {amount}**.`,
        `A tourist dropped some change, and you walked away with **${CURRENCY} {amount}**.`,
        `You shook out a beach towel and heard a clink—**${CURRENCY} {amount}**.`,
        `The tide coughed up a salty wallet holding **${CURRENCY} {amount}**.`,
        `You combed the boardwalk and pocketed **${CURRENCY} {amount}**.`
      ],
      failure: [
        "You found pretty seashells, but no money.",
        "A seagull stole your fries and your morale.",
        "You earned a sunburn, not coins.",
        "The metal-detector pro beat you to everything.",
        "You found sand everywhere except inside your wallet."
      ]
    },
    {
      name: "Couch",
      success: [
        `You dug between the cushions and pulled out **${CURRENCY} {amount}** and some popcorn.`,
        `You didn’t find the remote, but you did find **${CURRENCY} {amount}**.`,
        `Movie night leftovers paid out, and you pocketed **${CURRENCY} {amount}**.`,
        `You flipped a cushion and heard ka-ching—**${CURRENCY} {amount}**.`,
        `The lint tax refunded you **${CURRENCY} {amount}**.`
      ],
      failure: [
        "Only dust bunnies survived the search.",
        "You found the remote but not the riches.",
        "Someone already raided this couch.",
        "A spring poked you and ended the mission.",
        "A candy fused to your hand, which was gross, and you found no money."
      ]
    },
    {
      name: "Bank",
      success: [
        `You checked the ATM tray and found forgotten change worth **${CURRENCY} {amount}**.`,
        `You noticed a dropped receipt with cash-out and claimed **${CURRENCY} {amount}**.`,
        `The coin-counting machine spilled over, and you snagged **${CURRENCY} {amount}**.`,
        `You spotted a small pile near a parking spot and collected **${CURRENCY} {amount}**.`,
        `A glint in the lobby led you to **${CURRENCY} {amount}**.`
      ],
      failure: [
        "Security stared, and you pretended to tie your shoe.",
        "It was spotless—no loose money anywhere.",
        "The sign said 'No loitering,' and you respected it.",
        "You queued up and forgot why you were there.",
        "The floor shone, but your luck didn’t."
      ]
    },
    {
      name: "Supermarket",
      success: [
        `You checked the checkout lane and gathered coins totaling **${CURRENCY} {amount}**.`,
        `You returned a shopping cart and found **${CURRENCY} {amount}** nearby.`,
        `You looked at the produce scale tray and pocketed **${CURRENCY} {amount}**.`,
        `You passed the coin machine and picked up **${CURRENCY} {amount}** from a drop.`,
        `You walked past the bakery and spotted **${CURRENCY} {amount}** on the floor.`
      ],
      failure: [
        "Someone asked, 'Can I help you?' and you abandoned the mission.",
        "You slipped on a grape and lost both pride and momentum.",
        "You found coupons—expired ones.",
        "Self-checkout gave you a glare and nothing else.",
        "You collected price tags, not profits."
      ]
    },
    {
      name: "Bus Stop",
      success: [
        `You felt along the bench crack and pulled out **${CURRENCY} {amount}**.`,
        `You unfolded a ticket stub and found **${CURRENCY} {amount}** tucked inside.`,
        `You checked the timetable area and picked up **${CURRENCY} {amount}**.`,
        `You looked under the shelter and discovered **${CURRENCY} {amount}**.`,
        `You found a card sleeve on the ground hiding **${CURRENCY} {amount}**.`
      ],
      failure: [
        "The bus arrived and your chance left with it.",
        "You found nothing but gum under the bench.",
        "The wind scattered your hopes and your notes.",
        "You checked every corner and came up empty.",
        "Rain started and you bailed."
      ]
    },
    {
      name: "Movie Theater",
      success: [
        `You searched your row and found **${CURRENCY} {amount}** (plus sticky shoes).`,
        `You scanned the concession area and gathered **${CURRENCY} {amount}** in spilled change.`,
        `The aisle glittered just enough to reveal **${CURRENCY} {amount}**.`,
        `You slipped behind a poster stand and uncovered **${CURRENCY} {amount}**.`,
        `You asked at lost-and-found and walked away with unclaimed **${CURRENCY} {amount}**.`
      ],
      failure: [
        "You recovered only popcorn kernels.",
        "An usher told you to move along, so you moved along.",
        "The darkness hid everything except the gum.",
        "The 3D glasses were cool, but the money was 0D.",
        "You accidentally bought a ticket and forgot to search."
      ]
    },
    {
      name: "Arcade",
      success: [
        `You checked a coin return and scored **${CURRENCY} {amount}**.`,
        `You scanned the prize counter floor and pocketed **${CURRENCY} {amount}**.`,
        `The pinball tray coughed up **${CURRENCY} {amount}** just for you.`,
        `The claw machine showed mercy and dropped **${CURRENCY} {amount}**.`,
        `You traded extra tickets with a friend and walked away with **${CURRENCY} {amount}**.`
      ],
      failure: [
        "You found tokens, not coins.",
        "The machines were hungry and not at all generous.",
        "You shook a cabinet and security stared you down.",
        "You collected a mountain of tickets with no real value.",
        "You spent time and got lights instead of money."
      ]
    },
    {
      name: "School",
      success: [
        `You walked the locker row and found **${CURRENCY} {amount}** on the floor.`,
        `You scanned the cafeteria tables and gathered **${CURRENCY} {amount}**.`,
        `You checked the library corner and found **${CURRENCY} {amount}**.`,
        `You lifted a seat in the auditorium and discovered **${CURRENCY} {amount}**.`,
        `You shook the gym bleachers and rattled out **${CURRENCY} {amount}**.`
      ],
      failure: [
        "Someone asked for a hall pass, so you left.",
        "The bell rang and your search ended.",
        "Detention energy scared you off.",
        "You found only pencil shavings.",
        "You learned something instead of earning something."
      ]
    },
    {
      name: "Office",
      success: [
        `You checked the break room couch and found **${CURRENCY} {amount}**.`,
        `You tried the vending machine return and scored **${CURRENCY} {amount}**.`,
        `A conference chair coughed up **${CURRENCY} {amount}** for you.`,
        `You searched the printer station and found a coin stash worth **${CURRENCY} {amount}**.`,
        `You checked the coat rack and picked up **${CURRENCY} {amount}** from a pocket drop.`
      ],
      failure: [
        "HR appeared and you vanished.",
        "All you got was a calendar invite.",
        "You collected paperclips and despair.",
        "A coffee spill ended your momentum.",
        "Noise from the boss's office made you abort."
      ]
    },
    {
      name: "Garage",
      success: [
        `You opened a jar on the workbench and found **${CURRENCY} {amount}**.`,
        `You searched an old jacket pocket and pulled out **${CURRENCY} {amount}**.`,
        `You slid open a toolbox drawer and clinked into **${CURRENCY} {amount}**.`,
        `You lifted the floor mat and uncovered **${CURRENCY} {amount}**.`,
        `You checked the spare tire nook and retrieved **${CURRENCY} {amount}**.`
      ],
      failure: [
        "You found rust and dust, but no trust fund.",
        "You bumped your head on a shelf and gave up.",
        "A spider web boss battle sent you packing.",
        "You found the keys but not the coins.",
        "An oil stain looked like a coin and broke your heart."
      ]
    },
    {
      name: "Attic",
      success: [
        `You cracked open a trunk and discovered **${CURRENCY} {amount}**.`,
        `An old coat rattled and dropped **${CURRENCY} {amount}**.`,
        `You checked between photo albums and found **${CURRENCY} {amount}**.`,
        `You rummaged a box labeled “misc” and pulled **${CURRENCY} {amount}**.`,
        `You lifted a loose floorboard and recovered **${CURRENCY} {amount}**.`
      ],
      failure: [
        "A dust storm forced your retreat.",
        "You sneezed eight times and lost all progress.",
        "A moth colony claimed the space before you.",
        "A wobbly ladder sent you back down.",
        "You opened empty boxes and closed your wallet."
      ]
    },
    {
      name: "Basement",
      success: [
        `You checked the washer coin trap and collected **${CURRENCY} {amount}**.`,
        `You looked behind the storage bins and found **${CURRENCY} {amount}**.`,
        `You searched under the stair treads and uncovered **${CURRENCY} {amount}**.`,
        `You opened an old board game box and found **${CURRENCY} {amount}**.`,
        `You discovered a jar of rainy-day coins holding **${CURRENCY} {amount}**.`
      ],
      failure: [
        "The vibes were creepy and the finds were nonexistent.",
        "A flickering light bulb convinced you to bail.",
        "You literally kicked a bucket and called it quits.",
        "You found only screws and mystery parts.",
        "The sump pump was louder than your courage."
      ]
    },
    {
      name: "Kitchen",
      success: [
        `You raided the junk drawer and came away with **${CURRENCY} {amount}**.`,
        `You looked under the fridge and fished out **${CURRENCY} {amount}**.`,
        `You checked an apron pocket and discovered **${CURRENCY} {amount}**.`,
        `You found a coin jar behind the flour holding **${CURRENCY} {amount}**.`,
        `You inspected the window sill and pocketed **${CURRENCY} {amount}**.`
      ],
      failure: [
        "You ate a snack instead of searching.",
        "You discovered a grease trap of sadness.",
        "You found rubber bands and soy sauce packets, but no coins.",
        "The timer beeped and the mission failed.",
        "A pile of dishes pulled all your aggro."
      ]
    },
    {
      name: "Bathroom",
      success: [
        `You emptied the laundry pocket and counted **${CURRENCY} {amount}**.`,
        `You checked the cabinet’s coin cup and found **${CURRENCY} {amount}**.`,
        `You lifted a bath mat corner and revealed **${CURRENCY} {amount}**.`,
        `You peeked behind the mirror and discovered **${CURRENCY} {amount}**.`,
        `You searched a jacket on the towel hook and gained **${CURRENCY} {amount}**.`
      ],
      failure: [
        "The tiles were slippery and the luck was slipperier.",
        "You found shampoo and shame, nothing else.",
        "You dropped a coin you already had and lost it forever.",
        "Someone knocked and you aborted the mission.",
        "A foggy mirror made for a foggy future."
      ]
    },
    {
      name: "Garden",
      success: [
        `You checked a planter pot and pulled out **${CURRENCY} {amount}**.`,
        `You lifted a stepping stone and uncovered **${CURRENCY} {amount}**.`,
        `You looked inside the hose reel nook and found **${CURRENCY} {amount}**.`,
        `You inspected the birdbath base and collected **${CURRENCY} {amount}**.`,
        `You patted a glove pocket and shook out **${CURRENCY} {amount}**.`
      ],
      failure: [
        "You chased a butterfly and forgot to search.",
        "The sprinklers fired and you ran for cover.",
        "You found rocks that only looked like coins.",
        "Your shoes filled with dirt, not money.",
        "A garden gnome judged you in silence."
      ]
    },
    {
      name: "Train Station",
      success: [
        `You checked the ticket kiosk return and found **${CURRENCY} {amount}**.`,
        `You ran a hand along the bench edge and retrieved **${CURRENCY} {amount}**.`,
        `You explored the stair landing and discovered **${CURRENCY} {amount}**.`,
        `You walked the locker row and picked up a drop worth **${CURRENCY} {amount}**.`,
        `You looked around the newsstand corner and pocketed **${CURRENCY} {amount}**.`
      ],
      failure: [
        "The announcements drowned out your focus.",
        "The crowd swept you away from any clues.",
        "You found only old tickets.",
        "You missed a step and lost your chance.",
        "The cleaning crew was far too efficient."
      ]
    },
    {
      name: "Museum",
      success: [
        `You searched the gift shop floor and found **${CURRENCY} {amount}**.`,
        `You checked the coat check counter and discovered **${CURRENCY} {amount}**.`,
        `You sat by the dinosaur exhibit and spotted **${CURRENCY} {amount}**.`,
        `You visited the audio guide desk and noticed a drop worth **${CURRENCY} {amount}**.`,
        `You sorted through the brochure rack and pulled **${CURRENCY} {amount}**.`
      ],
      failure: [
        "Every sign said 'Don't touch,' including your luck.",
        "Security’s side-eye leveled up to a glare.",
        "You found artifacts of knowledge, not of money.",
        "You stared at art and forgot to search.",
        "The halls echoed with everything except coins."
      ]
    },
    {
      name: "Zoo",
      success: [
        `You checked a snack stand and recovered **${CURRENCY} {amount}** in dropped change.`,
        `You looked by the map kiosk and picked up **${CURRENCY} {amount}**.`,
        `You sat near the penguins and discovered **${CURRENCY} {amount}** under a bench.`,
        `You paused at a photo spot and found **${CURRENCY} {amount}**.`,
        `You waited at the tram stop and spotted **${CURRENCY} {amount}** by the curb.`
      ],
      failure: [
        "A monkey stole your hat and your dignity.",
        "You followed a peacock and lost all concept of time.",
        "You found only peanuts and shells.",
        "An elephant sneeze redirected your life choices.",
        "You bought a sticker instead of finding money."
      ]
    },
    {
      name: "Hospital",
      success: [
        `You checked a vending machine return and found **${CURRENCY} {amount}**.`,
        `You searched a waiting room chair corner and pulled **${CURRENCY} {amount}**.`,
        `You looked by the cafeteria tray rack and gathered **${CURRENCY} {amount}**.`,
        `You visited a parking pay station and pocketed **${CURRENCY} {amount}**.`,
        `You walked past the info desk line and noticed **${CURRENCY} {amount}** on the floor.`
      ],
      failure: [
        "It was a quiet zone, so you backed off.",
        "There was hand sanitizer everywhere but no coins.",
        "You got lost and found nothing.",
        "You heard only beeps and boops.",
        "Your visitor badge expired along with your luck."
      ]
    },
    {
      name: "Restaurant",
      success: [
        `You checked a booth seat gap and found **${CURRENCY} {amount}**.`,
        `You peered around the host stand and pocketed **${CURRENCY} {amount}**.`,
        `You scouted the takeout counter and discovered **${CURRENCY} {amount}**.`,
        `You brushed the coat rack and heard **${CURRENCY} {amount}** jingle.`,
        `You lifted a patio brick and uncovered **${CURRENCY} {amount}**.`
      ],
      failure: [
        "Someone asked 'Table for one?' and you panicked.",
        "You found mints, which were free, unlike money.",
        "You left a tip of zero and found zero.",
        "The kitchen clatter scared you away.",
        "The waitlist claimed your evening."
      ]
    },
    {
      name: "Parking Lot",
      success: [
        `You checked the base of a meter and found **${CURRENCY} {amount}**.`,
        `You tried the ticket machine return and grabbed **${CURRENCY} {amount}**.`,
        `You looked under a bumper and pulled out **${CURRENCY} {amount}**.`,
        `You inspected a pay station and collected **${CURRENCY} {amount}** from a spill.`,
        `You returned carts to the corral and spotted **${CURRENCY} {amount}** nearby.`
      ],
      failure: [
        "The sun glare blinded your search.",
        "The wind said 'nope' and carried off your prospects.",
        "You circled twice and still found nothing.",
        "You chased a receipt tumbleweed instead of money.",
        "Security cameras made you too anxious to continue."
      ]
    },
    {
      name: "Bookstore",
      success: [
        `You flipped through a used book and discovered a cash bookmark worth **${CURRENCY} {amount}**.`,
        `You tested the reading nook cushions and found **${CURRENCY} {amount}**.`,
        `You checked the checkout mat corner and picked up **${CURRENCY} {amount}**.`,
        `You tidied the flyer stand and uncovered **${CURRENCY} {amount}**.`,
        `You joined an author signing line and noticed **${CURRENCY} {amount}** on the floor.`
      ],
      failure: [
        "You bought a notebook instead of searching.",
        "You found only loyalty points you don’t have.",
        "You sniffed the books and forgot the mission.",
        "Staff recommendations were great; money was not.",
        "The music was quiet and so was your wallet."
      ]
    },
    {
      name: "Thrift Store",
      success: [
        `You checked a coat pocket and pulled **${CURRENCY} {amount}**.`,
        `You dug through an old purse and found **${CURRENCY} {amount}**.`,
        `You opened a furniture drawer and rattled out **${CURRENCY} {amount}**.`,
        `You lifted the checkout rug corner and discovered **${CURRENCY} {amount}**.`,
        `You sorted the electronics bin and scored **${CURRENCY} {amount}**.`
      ],
      failure: [
        "You found style but not cash.",
        "Someone beat you to the good rack.",
        "You rummaged up buttons and threads only.",
        "You tried on hats instead of searching.",
        "Price stickers stuck to your soul."
      ]
    },
    {
      name: "Playground",
      success: [
        `You checked the bottom of the slide and found **${CURRENCY} {amount}**.`,
        `You sifted the sandbox and uncovered **${CURRENCY} {amount}**.`,
        `You looked around a bench leg and retrieved **${CURRENCY} {amount}**.`,
        `You inspected the water fountain base and collected **${CURRENCY} {amount}**.`,
        `You checked under the swing and spotted **${CURRENCY} {amount}**.`
      ],
      failure: [
        "Kids zoomed by and you bailed.",
        "You ended up with sand in your shoes and no money.",
        "A whistle blew and it was time to go.",
        "You pushed a swing for luck and got none.",
        "You gathered stickers and chalk dust instead of coins."
      ]
    },
    {
      name: "Gas Station",
      success: [
        `You checked the air pump corner and found **${CURRENCY} {amount}**.`,
        `You scanned the pump island and picked up **${CURRENCY} {amount}**.`,
        `You tried the car wash vending return and pulled **${CURRENCY} {amount}**.`,
        `You lifted the counter mat and discovered **${CURRENCY} {amount}**.`,
        `You examined the squeegee tray and pocketed **${CURRENCY} {amount}**.`
      ],
      failure: [
        "The pump beep stressed you out.",
        "You found receipt paper everywhere but no cash.",
        "You chased a napkin across the lanes instead of coins.",
        "A car alarm startled your soul.",
        "You bought snacks using imaginary money."
      ]
    },
    {
      name: "Post Office",
      success: [
        `You checked the stamp kiosk return and collected **${CURRENCY} {amount}**.`,
        `You walked the PO box area and found **${CURRENCY} {amount}** on the floor.`,
        `You inspected the lobby bench crease and pulled **${CURRENCY} {amount}**.`,
        `You tidied the packing station and uncovered **${CURRENCY} {amount}**.`,
        `You followed the queue rope base and discovered **${CURRENCY} {amount}**.`
      ],
      failure: [
        "The line was too long and you gave up.",
        "You found only forms and a need for patience.",
        "You zoned out reading posters and forgot to search.",
        "A clerk’s stare said 'nope.'",
        "Closing time arrived before your luck did."
      ]
    },
    {
      name: "Mall",
      success: [
        `You circled the fountain rim and collected **${CURRENCY} {amount}** (after asking permission in your head).`,
        `You scanned the food court corner and gathered **${CURRENCY} {amount}**.`,
        `You checked a bench seam and pulled **${CURRENCY} {amount}**.`,
        `You walked past the arcade hallway and noticed **${CURRENCY} {amount}** on the tiles.`,
        `You stood by the elevator mat edge and found **${CURRENCY} {amount}**.`
      ],
      failure: [
        "You walked five thousand steps and earned zero coins.",
        "A security sweep kept you moving.",
        "Sale signs distracted you from the mission.",
        "You got lost between floors and time.",
        "The music was loud and your wallet was quiet."
      ]
    },
    {
      name: "Hardware Store",
      success: [
        `You looked in a checkout bucket and found **${CURRENCY} {amount}** at the bottom.`,
        `You checked the paint aisle caps and picked up **${CURRENCY} {amount}**.`,
        `You lifted a demo door mat and uncovered **${CURRENCY} {amount}**.`,
        `You ran your hand along a tool display ledge and found **${CURRENCY} {amount}**.`,
        `You searched the garden aisle trays and pocketed **${CURRENCY} {amount}**.`
      ],
      failure: [
        "You measured a board for no reason at all.",
        "You found washers and nuts, but not the coin kind.",
        "You helped another shopper and forgot yourself.",
        "An employee asked if you needed help—financially, yes.",
        "Sawdust sneezes ended your attempt."
      ]
    },
    {
      name: "Subway",
      success: [
        `You checked a turnstile return and found **${CURRENCY} {amount}**.`,
        `You searched a platform bench gap and pulled **${CURRENCY} {amount}**.`,
        `You tried the fare machine tray and collected **${CURRENCY} {amount}**.`,
        `You paused on a stair landing and picked up **${CURRENCY} {amount}**.`,
        `You examined the map board base and found **${CURRENCY} {amount}**.`
      ],
      failure: [
        "The next train arrived in one minute and you bailed.",
        "The buskers stole your attention and it was worth it.",
        "You found metro cards but no money.",
        "A cold draft stole your hat and your luck.",
        "You checked twice and still found nothing."
      ]
    },
    {
      name: "Stadium",
      success: [
        `You checked a bleacher step and discovered **${CURRENCY} {amount}**.`,
        `You visited the concession counter and collected **${CURRENCY} {amount}**.`,
        `You tried the gate turnstile return and recovered **${CURRENCY} {amount}**.`,
        `You looked inside a seat cupholder and found **${CURRENCY} {amount}**.`,
        `You waited in the merch line and picked up **${CURRENCY} {amount}**.`
      ],
      failure: [
        "The wave started and your focus ended.",
        "You found only confetti and napkins.",
        "The security dog was too cute and you left.",
        "The crowd surged and erased your chance.",
        "You caught a free T-shirt instead of coins."
      ]
    },
    {
      name: "Hotel Lobby",
      success: [
        `You checked a sofa cushion and retrieved **${CURRENCY} {amount}**.`,
        `You peeked around the bell cart and found **${CURRENCY} {amount}**.`,
        `You scanned the elevator threshold and picked up **${CURRENCY} {amount}**.`,
        `You browsed the brochure stand and uncovered **${CURRENCY} {amount}**.`,
        `You stopped by the water station and pocketed **${CURRENCY} {amount}**.`
      ],
      failure: [
        "The front desk smiled while your pockets stayed empty.",
        "You admired the chandelier instead of searching.",
        "The air was scented, but your wallet wasn't.",
        "You followed a suitcase to nowhere.",
        "The doorman opened the door to disappointment."
      ]
    },
    {
      name: "Farmers Market",
      success: [
        `You visited a tasting table and picked up a drop worth **${CURRENCY} {amount}**.`,
        `You checked a crate corner and found **${CURRENCY} {amount}**.`,
        `You stopped by the info tent and collected **${CURRENCY} {amount}**.`,
        `You glanced at the busker’s tip area and gathered **${CURRENCY} {amount}**.`,
        `You rested near the flower stall and noticed **${CURRENCY} {amount}** by the bench.`
      ],
      failure: [
        "You sampled everything and forgot to search.",
        "The cash boxes looked at you funny.",
        "The wind took the napkins—and your hopes.",
        "You found only wooden tokens.",
        "You left with a tomato instead of money."
      ]
    },
    {
      name: "Campus Quad",
      success: [
        `You inspected the bike rack base and found **${CURRENCY} {amount}**.`,
        `You checked around a statue pedestal and discovered **${CURRENCY} {amount}**.`,
        `You walked the lawn blanket area and pocketed **${CURRENCY} {amount}**.`,
        `You visited a club table and gathered a spill worth **${CURRENCY} {amount}**.`,
        `You climbed the fountain steps and recovered **${CURRENCY} {amount}**.`
      ],
      failure: [
        "Flyers were everywhere and coins were nowhere.",
        "Someone handed you a pamphlet and a burden.",
        "A skateboard zoomed past and your chance went with it.",
        "Squirrels judged you harshly until you left.",
        "Study group pressure made you retreat."
      ]
    }
  ]
};


const work = {
  success: [
    `${CURRENCY} Congratulations for bribing the stickbugs, you got **__{amount}__** coins.`,
    `${CURRENCY} The card giver malfunctioned and accidentally gave you **__{amount}__** coins, yay!`,
    `${CURRENCY} You found the lost **__{amount}__** coins during Boat therapy, enjoy.`,
    `${CURRENCY} You manifested **__{amount}__** coins during Meditation support!`,
    `${CURRENCY} You stole **__{amount}__** from the group art host! Enjoy your earned money, thief.`,
    `${CURRENCY} Your dance moves during Dance support were so bad, you got paid **__{amount}__** just to stop.`,
    `${CURRENCY} You donated a croissant to the café, and received **__{amount}__** coins for your service.`,
    `${CURRENCY} You helped Nathan find his wallet, but you took **__{amount}__** coins from it first. Good job!`,
    `${CURRENCY} The Steam machine in the Spa room broke, you received **__{amount}__** coins in compensation.`,
    `${CURRENCY} The book you wrote in Writing support earned **__{amount}__** coins in royalties.`,
    `${CURRENCY} Tammy was bored, she gave you **__{amount}__** coins to talk to her. Thank you for your service.`,
    `${CURRENCY} Your art piece in Art support was amazing, you received **__{amount}__** coins to take it home!`,
    `${CURRENCY} Good job on making sure the stingrays during Aquatic support were fed. You receive **__{amount}__** coins for your act!`,
    `${CURRENCY} Your horse during Horse support ran off, Jerome gave you **__{amount}__** coins since he felt bad.`,
    `${CURRENCY} You found **__{amount}__** coins on the ground during your hike! Good find.`,
    `${CURRENCY} You had a long Talk support session with Jerome about Cheese and Harold. Here's **__{amount}__** coins for yapping with the stickbugs.`,
    `${CURRENCY} You found **__{amount}__** coins in a basket. Long live the baskets, I guess.`,
    `${CURRENCY} You were sitting on hay, and someone said "hey"! Haha, get it? No? Okay fine here's **__{amount}__** coins.`,
    `${CURRENCY} You helped someone find the Help Desk. Here's **__{amount}__** coins for being a certified SSC nerd!`,
    `${CURRENCY} You were reading a book in Writing support, and you found an old love letter from the 1800s. Oh, and **__{amount}__** coins. Yay!`,
    `${CURRENCY} While you were humming in Meditation support, a hummingbird paid you **__{amount}__** coins for some reason. Enjoy!`,
    `${CURRENCY} You were vibing and playing Maracas in Music support. Someone recognized your talent and gave you **__{amount}__** coins.`,
    `${CURRENCY} You liked one of the SSC uniforms, so here's **__{amount}__** coins!`,
    `${CURRENCY} You made your pet happy during Pet support. Good job, here's **__{amount}__** coins.`,
    `${CURRENCY} Nathan managed to escape the Hiking area, but you successfully found him and tackled him down! Here's **__{amount}__** coins.`,
    `${CURRENCY} The pig in front of Pet support was happy, and you got **__{amount}__** coins in return!`,
    `${CURRENCY} You did Art support with Nuke. Here's **__{amount}__** coins for no reason.`,
    `${CURRENCY} You accidentally knocked off some of the vases in the waiting room! But don't worry, you stole **__{amount}__** coins from Tammy. Two wrongs make a right, I guess.`,
    `${CURRENCY} You missed the train for the Receptionist training, oh no! Fate gives you **__{amount}__** coins.`,
    `${CURRENCY} You found **__{amount}__** coins in the sauna!`,
    `${CURRENCY} Someone left the sink running in the Spa room, thankfully, you turned it off. Here's **__{amount}__** coins for saving the stickbugs.`,
    `${CURRENCY} You ALMOST tripped down the stairs to the waiting room. Here's **__{amount}__** coins as emotional insurance.`,
    `${CURRENCY} You bought 500 croissants from the café today. Oh, and you also received **__{amount}__** coins.`,
    `${CURRENCY} The moderators were nice and decided to give you **__{amount}__** coins!`,
    `${CURRENCY} You were so good in trivia today, here's **__{amount}__** coins as a reward!`,
    `${CURRENCY} You were absurdly horrible in trivia today. Just take the **__{amount}__** coins man.`,
    `${CURRENCY} Were you expecting a prompt? Okay I give up, take the **__{amount}__** coins.`,
    `${CURRENCY} A time traveller from 2018 gave you **__{amount}__** coins for being awesome.`,
    `${CURRENCY} Once again, the stickbugs involved you in their drama. Sorry... Have **__{amount}__** coins!`,
    `${CURRENCY} During your wedding with Tammy, Nathan gave you **__{amount}__** coins for making his friend feel happy. Yay!`,
    `${CURRENCY} You found **__{amount}__** coins under the mats in the Yoga room!`,
    `${CURRENCY} The shelf in the Writing room fell, and you discovered **__{amount}__** coins underneath!`,
    `${CURRENCY} You didn't get a croissant from the café today... Here's **__{amount}__** coins!`
  ]
};



module.exports = { CURRENCY, beg, crime, search, work};

# Serendipity Assistant

A multi-purpose Discord bot built for Serendipity's Roblox roleplay community.
It combines staff operations, moderation, community engagement, and Roblox
integrations in one server-focused application.

## Overview

Serendipity Assistant automates everyday community workflows across Discord and
Roblox. It registers guild slash commands automatically, stores persistent data
in MongoDB, sends reminders from the Serendipity shift API, and provides members
with leveling, economy, and game systems.

The bot is designed for a single Discord server and contains Serendipity-specific
channel, role, category, Roblox group, and game IDs. These values must be updated
in the source before deploying the bot to another community.

## Features

- Moderation commands for bans, kicks, timeouts, purges, and warnings
- Automatic anti-link moderation and message edit/deletion logs
- Multi-category ticket system with claiming, reopening, and HTML transcripts
- Button-based pronoun, notification, timezone, and color roles
- Activity leveling with generated rank cards and a paginated leaderboard
- Persistent economy with wallets, banks, inventories, shops, daily rewards, and
  multiple earning and gambling commands
- Interactive games including Connect Four, Hangman, trivia, Tic-Tac-Toe, and
  Rock Paper Scissors
- Timed shift and training session management
- Opt-in reminders for upcoming shifts
- Roblox user lookup and Bloxlink account resolution
- Roblox group shout posting with event-specific banners
- Employee of the Month, content creator, booster tag, and role-icon utilities
- Automatic server, group, boost, and Roblox player statistics
- Automatic guild command creation, updates, and removal at startup

## Requirements

- [Node.js](https://nodejs.org/) 20.18.1 or newer
- A Discord application and bot token
- A MongoDB database
- A Bloxlink API key for Discord-to-Roblox account lookups
- A Roblox account security cookie for group shout posting

The project uses `canvas`, which may require additional native build tools when
a prebuilt binary is unavailable for your operating system.

## Setup

Install dependencies:

```bash
npm install
```

Copy `.env.example` to `.env` and configure it:

```env
TOKEN="YOUR_BOT_TOKEN"
MONGOURL="YOUR_MONGO_URL"
DEV_ID="YOUR_DISCORD_ID"
SERVER_ID="YOUR_SERVER_ID"
BLOXLINK_API_KEY="YOUR_BLOXLINK_API_KEY"
ROBLOXSECURITY="YOUR_ROBLOX_SECURITY_COOKIE"
```

Start the bot:

```bash
npm start
```

Slash commands are registered automatically in `SERVER_ID` when the bot starts.
The bot also connects to MongoDB and begins its scheduled reminder, statistics,
and daily-reset jobs.

### Discord configuration

Enable **Server Members Intent** and **Message Content Intent** under
**Developer Portal → Bot → Privileged Gateway Intents**.

The exact permissions required depend on the enabled features. A complete
deployment generally needs:

- View Channels, Send Messages, and Read Message History
- Embed Links, Attach Files, and Use Application Commands
- Manage Messages for anti-link moderation and purge commands
- Manage Channels for tickets and automatic statistics channels
- Manage Roles for reaction roles and special-role utilities
- Kick Members, Ban Members, and Moderate Members for moderation commands

The bot's highest Discord role must be above every role it needs to manage.

## Environment variables

| Variable | Description |
| --- | --- |
| `TOKEN` | Discord bot token used to log in |
| `MONGOURL` | MongoDB connection string for economy, levels, tickets, warnings, reminders, and special tags |
| `DEV_ID` | Discord user ID allowed to run developer-only setup commands |
| `SERVER_ID` | Discord server where slash commands are registered and statistics are read |
| `BLOXLINK_API_KEY` | Bloxlink v4 API key used to resolve Discord members to Roblox accounts |
| `ROBLOXSECURITY` | Roblox `.ROBLOSECURITY` cookie used to publish group shouts |

`ROBLOXSECURITY` grants access to the associated Roblox session. Keep it out of
source control, use a dedicated account with only the permissions the bot needs,
and rotate it immediately if it is exposed.

## Server-specific configuration

Several IDs and service details are currently stored directly in the source.
Before using this project outside the original Serendipity server, review and
replace the following:

- Ticket categories, support roles, transcript channel, and server ID
- Reaction-role channels, custom emojis, and role mappings
- Logging channels and anti-link whitelist channels
- Shift-reminder and server-statistics channel IDs
- Level leaderboard reward role
- Employee of the Month, content creator, booster, and staff role IDs
- Roblox group ID (`4346739`) and game universe/server endpoints
- Serendipity API URL used for scheduled shift reminders

The relevant configuration is spread across `src/commands`, `src/events`, and
`src/utils`. This repository does not currently provide a setup wizard or a
central configuration file.

## Systems

### Moderation and logging

Staff can ban, kick, timeout, purge, and warn members. Warnings are stored in
MongoDB and can be listed, removed individually, or cleared per member. The bot
also logs edited and deleted messages and removes non-whitelisted links posted
by members without the configured bypass permission.

### Tickets and reaction roles

The ticket panel offers low-, medium-, high-tier, moderation, and public
relations support. Staff can claim, close, reopen, and delete tickets. Deleting
a ticket creates an HTML transcript, posts it to the transcript channel, and
attempts to send a copy to the ticket owner.

Developer-only commands publish the ticket and reaction-role panels. Reaction
roles cover pronouns, notification preferences, timezones, and display colors.

### Leveling

Members earn message XP once per minute in channels whose names contain `chat`.
`/rank` renders a graphical progress card and `/lb` shows the paginated server
leaderboard. The highest-ranked member is assigned a configured role.

### Economy

Economy profiles are created automatically when a member first uses a command
that requires one. Profiles include a wallet, bank, bank capacity, inventory,
daily streak, and a separate economy level. Members can earn currency, trade
items, buy and sell goods, or play chance-based games. Daily claim state resets
at midnight UTC.

### Roblox and shift integration

The bot reads scheduled shifts from the Serendipity API every five minutes.
Members who opt in are matched to Roblox usernames through Bloxlink and MongoDB,
then mentioned shortly before their shift starts. Staff can also register shifts
and training sessions; when their timers end, the bot cleans up the associated
Discord channels and publishes a Roblox group shout with a bundled banner.

Every five minutes, the statistics job refreshes channels showing Discord
members, boosts, Roblox group membership, and active game servers.

## Commands

Use `/help` in Discord to browse commands interactively or inspect one command's
options and required permissions.

### Information and levels

- `/help [command]` — browse commands or view details for one command
- `/ping` — show bot and API latency
- `/rank [user]` — render a member's level card
- `/lb` — view the level leaderboard

### Moderation

- `/ban`, `/kick`, `/unban` — manage server bans and removals
- `/timeout`, `/untimeout` — apply or remove a member timeout
- `/purge` — bulk-delete messages
- `/warn` — record a warning for a member
- `/warnings` — view a member's warning history
- `/deletewarning` — delete one warning by ID
- `/clearwarnings` — remove all warnings for a member

### Economy

- `/beg`, `/work`, `/crime`, `/search` — earn coins through activities
- `/daily` — claim a daily reward and maintain a streak
- `/fish`, `/hunt` — collect inventory items using the required equipment
- `/shop`, `/item`, `/buy`, `/sell`, `/inv` — browse and manage items
- `/stats` — view wallet, bank, and economy progress
- `/dep`, `/with` — move coins between wallet and bank
- `/give`, `/gift` — transfer coins or items to another member
- `/rob` — attempt to steal coins from another member
- `/economylb` — view the economy leaderboard
- `/coinflip`, `/slots`, `/snakeeyes`, `/bj`, `/guessthenumber` — wager coins in
  chance-based games

### Fun

- `/8ball` — ask the magic 8-ball a question
- `/cat`, `/dog`, `/meme` — fetch a random image or wholesome meme
- `/connect4`, `/tictactoe`, `/rps` — challenge another member
- `/findemoji`, `/guessthepokemon`, `/hangman`, `/trivia` — play an interactive
  solo game
- `/ship` — generate a compatibility card for two members

### Staff and utility

- `/activateshiftreminders`, `/deactivateshiftreminders` — opt in or out of shift
  notifications
- `/registershift`, `/registertraining` — start a timed session and schedule its
  channel cleanup
- `/shout` — publish a Roblox group shout with a matching banner
- `/whois` — view Roblox profile, group rank, social, and username information
- `/getboostertag` — claim the in-game tag associated with a Discord boost
- `/add` — add another member to the current ticket
- `/createembed` — compose and send an embed through a modal
- `/copymessage` — copy a Discord message into another channel
- `/seteotm`, `/cleareotm`, `/seteotmcolor`, `/seteotmicon` — manage Employee of
  the Month roles
- `/setcontentcreator`, `/removecontentcreator` — manage content creator status
- `/setmostactiveicon` — update the most-active role icon
- `/sendticketmessage` — publish the ticket panel (developer only)
- `/sendreactionroles` — publish reaction-role panels (developer only)

## Project structure

```text
src/
├── commands/       Slash commands grouped by category
├── events/         Discord event listeners and scheduled startup jobs
├── handlers/       Automatic event discovery and registration
├── schemas/        Mongoose models for persistent data
├── utils/          Roblox, Bloxlink, logging, command, and image helpers
└── index.js        Discord client configuration and entry point
images/             Rank-card backgrounds and Discord/Roblox banners
```

## License

This project is licensed under the **MIT License**. See [`LICENSE`](LICENSE) for
details.

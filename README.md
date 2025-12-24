# Discord Active Developer Badge Auto-Maintenance Bot

This bot automatically keeps your Discord Active Developer Badge eligibility up to date.

## Features

- 🤖 Automatic slash command registration
- 📊 Auto-executes commands every 30 days to protect badge status
- ⚡ Simple, guided setup (env + invite page generated for you)
- 🔄 Automatic reconnection handling
- 💬 Works in servers, DMs, and group DMs
- 👤 User App support (install once, use anywhere)
- 🌐 Auto-translation with multi-language targeting
- 🆓 Free translation powered by Google Translate (no API key)
- 🎛️ Web dashboard with Discord OAuth2

## Why do you need this bot?

Discord requires at least one slash command to be used within the past 60 days to keep Active Developer status. This bot registers commands and auto-executes them on a schedule so you stay compliant.

## Installation Steps

### 0. Clone the Repository

```bash
git clone https://github.com/HenryLok0/Auto-Discord-Developer-Badge.git
cd Auto-Discord-Developer-Badge
```

### 1. Create Discord Application

1. Open the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application → Bot tab → reset/copy your bot token
3. Enable privileged intents:

- MESSAGE CONTENT INTENT
- GUILD MESSAGES

### 2. Enable User App Installation (optional but recommended)

In the Developer Portal → Installation:

- Enable **Guild Install** and **User Install**
- Save default install settings for both contexts

### 3. Invite Bot to Server (or install as User App)

**Server install:** use OAuth2 URL with scopes `bot` and `applications.commands`; permissions: Send Messages, Use Slash Commands, Manage Messages (for purge).

**User install:** use the same URL and pick "Install to User" so commands work in servers, DMs, group DMs, and private channels.

### 4. Setup Project

```bash
# installs dependencies and auto-creates .env + invite-bot.html when missing
npm install
```

### 5. Configure Environment Variables

Edit `.env`:

```env
DISCORD_TOKEN=your_bot_token
CLIENT_ID=your_application_id
GUILD_ID=your_server_id
COMMAND_PREFIX=!
```

- `DISCORD_TOKEN`: Bot page → Reset Token
- `CLIENT_ID`: General Information → APPLICATION ID
- `GUILD_ID`: Right-click server → Copy Server ID (enable Developer Mode)
- `COMMAND_PREFIX` (optional): change the legacy prefix commands; restart after changing

### 6. Register Slash Commands

```bash
npm run register
```

### 7. Start the Bot

```bash
npm start
```

### 8. (Optional) Enable Web Dashboard

1. **OAuth2 credentials:** add redirect `http://localhost:3000/auth/callback` and copy your client secret.
2. **.env additions:**

```env
CLIENT_SECRET=your_client_secret_from_discord
SESSION_SECRET=generate_random_32_char_string
DASHBOARD_PORT=3000
DASHBOARD_CALLBACK_URL=http://localhost:3000/auth/callback
```

3. **Start the dashboard:**

- Bot + dashboard: `npm run start:all`
- Dashboard only: `npm run start:dashboard`
- Separate: `npm start` (bot) and `npm run start:dashboard` (dashboard)

4. **Open** `http://localhost:3000`, log in with Discord, and manage your servers.

Optional: set `DASHBOARD_PUBLIC_URL` to your hosted dashboard URL so `/dashboard` shares the correct link.

### NPM Scripts Reference

- `npm start` / `npm run start:all` — generate the setup guide and start bot + dashboard
- `npm run start:bot` — start only the bot (regenerates setup guide)
- `npm run start:dashboard` — start only the web dashboard
- `npm run register` — (re)register slash commands
- `npm run dev` — watch mode for the bot
- `npm run generate-guide` — regenerate `invite-bot.html` from `.env`

## Dashboard Pages

- **Servers** — see guilds you can manage, join status, invite/leave actions, and jump into configuration.
- **Translation** — pick display mode (reply/embed/thread), manage target languages, set/clear output channel, enable/disable per-channel translation.
- **Badge Management** — toggle auto-execution, set the interval (1–60 days), and view the next run time.
- **Tracking** — enable/disable activity tracking, select the log channel, ignore channels, and choose event types.
- **Twitch Alerts** — add/remove streamers, set the notification channel, and allow/block duplicate alerts per day.
- **Moderation** — quick reference for moderation tools and channel controls with permission requirements.
- **Commands** — list commands and toggle them on/off at runtime (persisted in `data/disabled-commands.json`).
- **Statistics** — usage summaries and translation stats from the bot.
- **Invite Bot** — generate invite links for guild or user installs.

## Usage

After starting, the bot will:

1. Generate the setup guide and open it in your browser
2. Connect to Discord and register `/ping`
3. Auto-execute on a 30-day cadence to maintain Active Developer status
4. Allow manual checks via `/ping`

### Using Commands in DMs and User Apps

Commands work in servers, DMs, group DMs, and private channels when installed as a User App. Moderation, tracking, and other guild configuration commands are server-only.

### Dynamic Setup Guide

`invite-bot.html` is generated from `.env` every run and opened automatically. The template `invite-bot.html.template` is for reference; the generated file is ignored by git.

## Command List

All slash commands are registered for both guild and user-install contexts unless noted. Guild-only commands require the relevant Discord permissions (e.g., Kick Members, Manage Channels).

### Badge & Core

- `/ping`, `/uptime`, `/status`, `/help`, `/botinfo`, `/stats`
- `/auto-execution enable|disable|status` — control the badge upkeep scheduler

### Info & Utility

- `/dashboard`, `/invite`, `/serverinfo`, `/userinfo [user]`, `/avatar [user]`
- `/say <message> [channel]`, `/poll <question> <option1> <option2> [option3-5]`, `/announce <message> [channel]`
- `/remind <minutes> <reminder>`, `/notify <user> <message>`, `/ping-user <user> <message>`, `/echo <text>`
- `/command-activity [days]`, `/backup`, `/config view`, `/settings view`, `/logs [lines]`, `/uptime-ranking`, `/suggest <suggestion>`

### Moderation & Safety (guild only)

- Member actions: `/kick`, `/ban`, `/mute <minutes>`, `/unmute`, `/warn`, `/warn-list`, `/clear-warnings`, `/banlist`
- Channel controls: `/lock`, `/unlock`, `/slowmode <seconds>`, `/purge [amount]`
- Roles & channels: `/role-assign`, `/role-remove`, `/roleinfo`, `/channelinfo`, `/channel-create`, `/channel-delete`, `/welcome <channel> <message>`

### Tracking & Logs

- `/tracking toggle|channel|status|ignore-channel|events` — enable tracking, pick the log channel, ignore channels, and choose which event types to capture

### Twitch Alerts

- `/twitch-notify add <streamer> [channel]`, `remove <streamer>`, `list`, `channel <channel>`, `duplicates <allow>`

### Translation

- `/translate-setup <channel> [target-language]`, `/translate-config <display-mode> [default-language]`
- `/translate-output-channel <channel>`, `/translate-clear-output`
- `/translate-add-language <language>`, `/translate-remove-language <language>`, `/translate-stats`
- `/translate-disable <channel>`, `/translate-list`, `/translate-status`
- `/translate <text> [to] [from]` — manual translation anywhere (servers, DMs, group DMs)

### Fun

- `/8ball`, `/dice [sides] [rolls]`, `/flip`, `/quote`, `/joke`

## Prefix Commands

Legacy prefix commands use `COMMAND_PREFIX` (default `!`): `!help`, `!ping`, `!uptime`, `!prefix`. Change the prefix in `.env` and restart.

## Bot Features

- Slash command responses are ephemeral with clear success/error indicators
- Auto-execution scheduler defaults to 30 days to satisfy the 60-day badge rule

## Deploy to Cloud (Recommended)

1. Sign up at [Railway](https://railway.app) and deploy from this repo
2. Set env vars:

```env
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
GUILD_ID=your_guild_id_here
COMMAND_PREFIX=!
CLIENT_SECRET=your_discord_oauth_client_secret
SESSION_SECRET=random_32_char_string_or_longer
DASHBOARD_CALLBACK_URL=https://your-app.up.railway.app/auth/callback
```

Optional: `TWITCH_CLIENT_ID`, `TWITCH_ACCESS_TOKEN`, `ENABLE_AUTO_EXECUTION`

3. Generate a Railway domain and add it to Discord OAuth2 redirects
4. (Recommended) Add a volume at `/data` to persist translations, Twitch settings, and guild configs
5. Access your dashboard at `https://your-app.up.railway.app`

Railway provides HTTPS by default, auto-deploys from GitHub, restart policies, and basic monitoring.

### Alternatives

- **Heroku:**
  ```bash
  heroku create
  heroku config:set DISCORD_TOKEN=... CLIENT_ID=... GUILD_ID=...
  git push heroku main
  ```
- **Render:** create a Web Service from GitHub and set the same environment variables.

## Troubleshooting

- Slash commands missing: run `npm run register` and wait a few minutes for Discord to propagate.
- Bot offline or silent: verify `DISCORD_TOKEN`, intents, and hosting logs.
- Dashboard auth issues: check `CLIENT_SECRET`, `SESSION_SECRET`, and exact redirect URL.
- No servers listed: ensure you have Manage Server permission and the bot is in the guild.

## Getting Active Developer Badge

1. Run the bot and let it execute `/ping`
2. Visit the [Active Developer page](https://discord.com/developers/active-developer)
3. Claim the badge (may take up to 24 hours)

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT — see [LICENSE](LICENSE).

## Support

Open an issue on GitHub for questions or help.

# Discord Active Developer Badge Auto-Maintenance Bot

This bot automatically keeps your Discord Active Developer Badge eligibility up to date.

## Features

- 🤖 Automatic slash command registration
- 📊 Auto-executes commands every 30 days to protect badge status
- ⚡ Simple, guided setup (env + invite page generated for you)
- 🔄 Automatic reconnection handling
- 💬 Works in servers, DMs, and group DMs
- 👤 User App support (install once, use anywhere)
- 🌐 Auto-translation with multi-language targeting
- 🆓 Free translation powered by Google Translate (no API key)
- 🎛️ Web dashboard with Discord OAuth2

## Why do you need this bot?

Discord requires at least one slash command to be used within the past 60 days to keep Active Developer status. This bot registers commands and auto-executes them on a schedule so you stay compliant.

## Installation Steps

### 0. Clone the Repository

```bash
git clone https://github.com/HenryLok0/Auto-Discord-Developer-Badge.git
cd Auto-Discord-Developer-Badge
```

### 1. Create Discord Application

1. Open the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application → Bot tab → reset/copy your bot token
3. Enable privileged intents:
   - MESSAGE CONTENT INTENT
   - GUILD MESSAGES

### 2. Enable User App Installation (optional but recommended)

In the Developer Portal → Installation:

- Enable **Guild Install** and **User Install**
- Save default install settings for both contexts

### 3. Invite Bot to Server (or install as User App)

**Server install:** use OAuth2 URL with scopes `bot` and `applications.commands`; permissions: Send Messages, Use Slash Commands, Manage Messages (for purge).

**User install:** use the same URL and pick "Install to User" so commands work in servers, DMs, group DMs, and private channels.

### 4. Setup Project

```bash
# installs dependencies and auto-creates .env + invite-bot.html when missing
npm install
```

### 5. Configure Environment Variables

Edit `.env`:

```env
DISCORD_TOKEN=your_bot_token
CLIENT_ID=your_application_id
GUILD_ID=your_server_id
COMMAND_PREFIX=!
```

- `DISCORD_TOKEN`: Bot page → Reset Token
- `CLIENT_ID`: General Information → APPLICATION ID
- `GUILD_ID`: Right-click server → Copy Server ID (enable Developer Mode)
- `COMMAND_PREFIX` (optional): change the legacy prefix commands; restart after changing

### 6. Register Slash Commands

```bash
npm run register
```

### 7. Start the Bot

```bash
npm start
```

### 8. (Optional) Enable Web Dashboard

1. **OAuth2 credentials:** add redirect `http://localhost:3000/auth/callback` and copy your client secret.
2. **.env additions:**

   ```env
   CLIENT_SECRET=your_client_secret_from_discord
   SESSION_SECRET=generate_random_32_char_string
   DASHBOARD_PORT=3000
   DASHBOARD_CALLBACK_URL=http://localhost:3000/auth/callback
   ```

3. **Start the dashboard:**
   - Bot + dashboard: `npm run start:all`
   - Dashboard only: `npm run start:dashboard`
   - Separate: `npm start` (bot) and `npm run start:dashboard` (dashboard)
4. **Open** `http://localhost:3000`, log in with Discord, and manage your servers.

### NPM Scripts Reference

- `npm start` / `npm run start:all` — generate the setup guide and start bot + dashboard
- `npm run start:bot` — start only the bot (regenerates setup guide)
- `npm run start:dashboard` — start only the web dashboard
- `npm run register` — (re)register slash commands
- `npm run dev` — watch mode for the bot
- `npm run generate-guide` — regenerate `invite-bot.html` from `.env`

## Dashboard Pages

- **Servers** — see guilds you can manage, join status, invite/leave actions, and jump into configuration.
- **Translation** — pick display mode (reply/embed/thread), manage target languages, set/clear output channel, enable/disable per-channel translation.
- **Badge Management** — toggle auto-execution, set the interval (1–60 days), and view the next run time.
- **Tracking** — enable/disable activity tracking, select the log channel, ignore channels, and choose event types.
- **Twitch Alerts** — add/remove streamers, set the notification channel, and allow/block duplicate alerts per day.
- **Moderation** — quick reference for moderation tools and channel controls with permission requirements.
- **Commands** — list commands and toggle them on/off at runtime (persisted in `data/disabled-commands.json`).
- **Statistics** — usage summaries and translation stats from the bot.
- **Invite Bot** — generate invite links for guild or user installs.

## Usage

After starting, the bot will:

1. Generate the setup guide and open it in your browser
2. Connect to Discord and register `/ping`
3. Auto-execute on a 30-day cadence to maintain Active Developer status
4. Allow manual checks via `/ping`

### Using Commands in DMs and User Apps

Commands work in servers, DMs, group DMs, and private channels when installed as a User App. Moderation, tracking, and other guild configuration commands are server-only.

### Dynamic Setup Guide

`invite-bot.html` is generated from `.env` every run and opened automatically. The template `invite-bot.html.template` is for reference; the generated file is ignored by git.

## Command List

All slash commands are registered for both guild and user-install contexts unless noted. Guild-only commands require the relevant Discord permissions (e.g., Kick Members, Manage Channels).

### Badge & Core

- `/ping`, `/uptime`, `/status`, `/help`, `/botinfo`, `/stats`
- `/auto-execution enable|disable|status` — control the badge upkeep scheduler

### Info & Utility

- `/invite`, `/serverinfo`, `/userinfo [user]`, `/avatar [user]`
- `/say <message> [channel]`, `/poll <question> <option1> <option2> [option3-5]`, `/announce <message> [channel]`
- `/remind <minutes> <reminder>`, `/notify <user> <message>`, `/ping-user <user> <message>`, `/echo <text>`
- `/command-activity [days]`, `/backup`, `/config view`, `/settings view`, `/logs [lines]`, `/uptime-ranking`, `/suggest <suggestion>`

### Moderation & Safety (guild only)

- Member actions: `/kick`, `/ban`, `/mute <minutes>`, `/unmute`, `/warn`, `/warn-list`, `/clear-warnings`, `/banlist`
- Channel controls: `/lock`, `/unlock`, `/slowmode <seconds>`, `/purge [amount]`
- Roles & channels: `/role-assign`, `/role-remove`, `/roleinfo`, `/channelinfo`, `/channel-create`, `/channel-delete`, `/welcome <channel> <message>`

### Tracking & Logs

- `/tracking toggle|channel|status|ignore-channel|events` — enable tracking, pick the log channel, ignore channels, and choose which event types to capture

### Twitch Alerts

- `/twitch-notify add <streamer> [channel]`, `remove <streamer>`, `list`, `channel <channel>`, `duplicates <allow>`

### Translation

- `/translate-setup <channel> [target-language]`, `/translate-config <display-mode> [default-language]`
- `/translate-output-channel <channel>`, `/translate-clear-output`
- `/translate-add-language <language>`, `/translate-remove-language <language>`, `/translate-stats`
- `/translate-disable <channel>`, `/translate-list`, `/translate-status`
- `/translate <text> [to] [from]` — manual translation anywhere (servers, DMs, group DMs)

### Fun

- `/8ball`, `/dice [sides] [rolls]`, `/flip`, `/quote`, `/joke`

## Prefix Commands

Legacy prefix commands use `COMMAND_PREFIX` (default `!`): `!help`, `!ping`, `!uptime`, `!prefix`. Change the prefix in `.env` and restart.

## Bot Features

- Slash command responses are ephemeral with clear success/error indicators
- Auto-execution scheduler defaults to 30 days to satisfy the 60-day badge rule

## Deploy to Cloud (Recommended)

1. Sign up at [Railway](https://railway.app) and deploy from this repo
2. Set env vars:

   ```env
   DISCORD_TOKEN=your_bot_token_here
   CLIENT_ID=your_client_id_here
   GUILD_ID=your_guild_id_here
   COMMAND_PREFIX=!
   CLIENT_SECRET=your_discord_oauth_client_secret
   SESSION_SECRET=random_32_char_string_or_longer
   DASHBOARD_CALLBACK_URL=https://your-app.up.railway.app/auth/callback
   ```

   Optional: `TWITCH_CLIENT_ID`, `TWITCH_ACCESS_TOKEN`, `ENABLE_AUTO_EXECUTION`

3. Generate a Railway domain and add it to Discord OAuth2 redirects
4. (Recommended) Add a volume at `/data` to persist translations, Twitch settings, and guild configs
5. Access your dashboard at `https://your-app.up.railway.app`

Railway provides HTTPS by default, auto-deploys from GitHub, restart policies, and basic monitoring.

### Alternatives

- **Heroku:**
  ```bash
  heroku create
  heroku config:set DISCORD_TOKEN=... CLIENT_ID=... GUILD_ID=...
  git push heroku main
  ```
- **Render:** create a Web Service from GitHub and set the same environment variables.

## Troubleshooting

- Slash commands missing: run `npm run register` and wait a few minutes for Discord to propagate.
- Bot offline or silent: verify `DISCORD_TOKEN`, intents, and hosting logs.
- Dashboard auth issues: check `CLIENT_SECRET`, `SESSION_SECRET`, and exact redirect URL.
- No servers listed: ensure you have Manage Server permission and the bot is in the guild.

## Getting Active Developer Badge

1. Run the bot and let it execute `/ping`
2. Visit the [Active Developer page](https://discord.com/developers/active-developer)
3. Claim the badge (may take up to 24 hours)

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT — see [LICENSE](LICENSE).

## Support

Open an issue on GitHub for questions or help.# Discord Active Developer Badge Auto-Maintenance Bot

This bot automatically keeps your Discord Active Developer Badge eligibility up to date.

## Features

- 🤖 Automatic slash command registration
- 📊 Auto-executes commands every 30 days to protect badge status
- ⚡ Simple, guided setup (env + invite page generated for you)
- 🔄 Automatic reconnection handling
- 💬 Works in servers, DMs, and group DMs
- 👤 User App support (install once, use anywhere)
- 🌐 Auto-translation with multi-language targeting
- 🆓 Free translation powered by Google Translate (no API key)
- 🎛️ Web dashboard with Discord OAuth2

## Why do you need this bot?

Discord requires at least one slash command to be used within the past 60 days to keep Active Developer status. This bot registers commands and auto-executes them on a schedule so you stay compliant.

## Installation Steps

### 0. Clone the Repository

````bash
git clone https://github.com/HenryLok0/Auto-Discord-Developer-Badge.git
## Support

Open an issue on GitHub for questions or help.
- **Translation** — pick display mode (reply/embed/thread), manage target languages, set/clear output channel, enable/disable per-channel translation.
- **Badge Management** — toggle auto-execution, set the interval (1–60 days), and view the next run time.
- **Tracking** — enable/disable activity tracking, select the log channel, ignore channels, and choose event types.
- **Twitch Alerts** — add/remove streamers, set the notification channel, and allow/block duplicate alerts per day.
- **Moderation** — quick reference for moderation tools and channel controls with permission requirements.
- **Commands** — list commands and toggle them on/off at runtime (persisted in `data/disabled-commands.json`).
- **Statistics** — usage summaries and translation stats from the bot.
- **Invite Bot** — generate invite links for guild or user installs.

## Usage

After starting, the bot will:

1. Generate the setup guide and open it in your browser
2. Connect to Discord and register `/ping`
3. Auto-execute on a 30-day cadence to maintain Active Developer status
4. Allow manual checks via `/ping`

### Using Commands in DMs and User Apps

Commands work in servers, DMs, group DMs, and private channels when installed as a User App. Moderation, tracking, and other guild configuration commands are server-only.

### Dynamic Setup Guide

`invite-bot.html` is generated from `.env` every run and opened automatically. The template `invite-bot.html.template` is for reference; the generated file is ignored by git.

## Command List

All slash commands are registered for both guild and user-install contexts unless noted. Guild-only commands require the relevant Discord permissions (e.g., Kick Members, Manage Channels).

### Badge & Core

- `/ping`, `/uptime`, `/status`, `/help`, `/botinfo`, `/stats`
- `/auto-execution enable|disable|status` — control the badge upkeep scheduler

### Info & Utility

- `/invite`, `/serverinfo`, `/userinfo [user]`, `/avatar [user]`
- `/say <message> [channel]`, `/poll <question> <option1> <option2> [option3-5]`, `/announce <message> [channel]`
- `/remind <minutes> <reminder>`, `/notify <user> <message>`, `/ping-user <user> <message>`, `/echo <text>`
- `/command-activity [days]`, `/backup`, `/config view`, `/settings view`, `/logs [lines]`, `/uptime-ranking`, `/suggest <suggestion>`

### Moderation & Safety (guild only)

- Member actions: `/kick`, `/ban`, `/mute <minutes>`, `/unmute`, `/warn`, `/warn-list`, `/clear-warnings`, `/banlist`
- Channel controls: `/lock`, `/unlock`, `/slowmode <seconds>`, `/purge [amount]`
- Roles & channels: `/role-assign`, `/role-remove`, `/roleinfo`, `/channelinfo`, `/channel-create`, `/channel-delete`, `/welcome <channel> <message>`

### Tracking & Logs

- `/tracking toggle|channel|status|ignore-channel|events` — enable tracking, pick the log channel, ignore channels, and choose which event types to capture

### Twitch Alerts

- `/twitch-notify add <streamer> [channel]`, `remove <streamer>`, `list`, `channel <channel>`, `duplicates <allow>`

### Translation

- `/translate-setup <channel> [target-language]`, `/translate-config <display-mode> [default-language]`
- `/translate-output-channel <channel>`, `/translate-clear-output`
- `/translate-add-language <language>`, `/translate-remove-language <language>`, `/translate-stats`
- `/translate-disable <channel>`, `/translate-list`, `/translate-status`
- `/translate <text> [to] [from]` — manual translation anywhere (servers, DMs, group DMs)

### Fun

- `/8ball`, `/dice [sides] [rolls]`, `/flip`, `/quote`, `/joke`

## Prefix Commands

Legacy prefix commands use `COMMAND_PREFIX` (default `!`): `!help`, `!ping`, `!uptime`, `!prefix`. Change the prefix in `.env` and restart.

## Bot Features

- Slash command responses are ephemeral with clear success/error indicators
- Auto-execution scheduler defaults to 30 days to satisfy the 60-day badge rule

## Deploy to Cloud (Recommended)

### Railway Deployment (recommended)

1. Sign up at [Railway](https://railway.app) and deploy from this repo
2. Set env vars:

   ```env
   DISCORD_TOKEN=your_bot_token_here
   CLIENT_ID=your_client_id_here
   GUILD_ID=your_guild_id_here
   COMMAND_PREFIX=!
   CLIENT_SECRET=your_discord_oauth_client_secret
   SESSION_SECRET=random_32_char_string_or_longer
   DASHBOARD_CALLBACK_URL=https://your-app.up.railway.app/auth/callback
````

Optional: `TWITCH_CLIENT_ID`, `TWITCH_ACCESS_TOKEN`, `ENABLE_AUTO_EXECUTION`

3. Generate a Railway domain and add it to Discord OAuth2 redirects
4. (Recommended) Add a volume at `/data` to persist translations, Twitch settings, and guild configs
5. Access your dashboard at `https://your-app.up.railway.app`

Railway provides HTTPS by default, auto-deploys from GitHub, restart policies, and basic monitoring.

### Alternatives

- **Heroku:**
  ```bash
  heroku create
  heroku config:set DISCORD_TOKEN=... CLIENT_ID=... GUILD_ID=...
  git push heroku main
  ```
- **Render:** create a Web Service from GitHub and set the same environment variables.

## Troubleshooting

- Slash commands missing: run `npm run register` and wait a few minutes for Discord to propagate.
- Bot offline or silent: verify `DISCORD_TOKEN`, intents, and hosting logs.
- Dashboard auth issues: check `CLIENT_SECRET`, `SESSION_SECRET`, and exact redirect URL.
- No servers listed: ensure you have Manage Server permission and the bot is in the guild.

## Getting Active Developer Badge

1. Run the bot and let it execute `/ping`
2. Visit the [Active Developer page](https://discord.com/developers/active-developer)
3. Claim the badge (may take up to 24 hours)

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT — see [LICENSE](LICENSE).

## Support

    - `embed` - Send translation in a formatted embed
    - `thread` - Create a thread for the translation

- `default-language` (optional): Set the default target language for all translations
- **Permissions Required**: Manage Server
- `/translate-output-channel <channel>` - Set a dedicated output channel for translations
  - `channel` (required): Channel where all translations will be sent
  - **Use case**: Send all translations from multiple channels to one dedicated translation channel
  - **Permissions Required**: Manage Server
- `/translate-clear-output` - Clear the output channel setting
  - Translations will return to appearing in their source channels
  - **Permissions Required**: Manage Server
- `/translate-add-language <language>` - Add a target language for translation
  - `language` (required): Language code to add (e.g., en, es, de, fr, ja)
  - **Multi-language support**: Messages translate to ALL configured languages simultaneously
  - **Permissions Required**: Manage Server
- `/translate-remove-language <language>` - Remove a target language
  - `language` (required): Language code to remove
  - **Note**: Cannot remove the last language
  - **Permissions Required**: Manage Server
- `/translate-stats` - View translation statistics
  - Shows total translations, top language pairs, and most active channels
  - **Analytics**: Track which languages are most commonly translated
  - **Permissions Required**: Manage Server
- `/translate-disable <channel>` - Disable auto-translation for a channel
  - `channel` (required): Channel to disable auto-translation in
  - **Permissions Required**: Manage Server
- `/translate-list` - View all channels with auto-translation enabled
  - Shows current translation settings (display mode, target languages, output channel)
  - Lists all enabled channels
  - **Permissions Required**: Manage Server
- `/translate-status` - View current translation settings
  - Shows display mode, target languages, and output channel
  - Lists all channels with auto-translation enabled
  - **Permissions Required**: Manage Server

**Translation Features:**

- 🌐 **Auto-Translation**: Automatically detects and translates messages in configured channels
- 🎨 **Customizable Display**: Choose between reply, embed, or thread format
- 🔧 **Per-Channel Configuration**: Enable translation only in specific channels
- 📍 **Output Channel Redirect**: Send all translations to a dedicated channel
- 🗣️ **Multi-Language Support**: Translate to multiple languages simultaneously
- 🎯 **Translation Reactions**: Original messages get flag emoji reactions showing detected language
- 📊 **Analytics**: Track translation statistics (total, language pairs, active channels)
- 💬 **Manual Translation**: Use `/translate` anywhere (servers, DMs, group DMs)
- 🆓 **Free Service**: Powered by Google Translate with no API key required
- 🌍 **100+ Languages**: Supports all major languages

### Logging & Monitoring Commands

- `/logs [lines]` - View recent server audit logs
  - `lines` (optional): Number of logs to display (1-50, default: 10)
  - Shows recent actions like kicks, bans, role changes, etc.
  - **Permissions Required**: Manage Server
- `/config view` - View current bot configuration and settings
  - Displays guild-specific settings and next auto-execution date
  - **Permissions Required**: Manage Server
- `/backup` - View server backup information
  - Shows data about members, channels, and roles for reference
  - **Note**: For full server backups, use dedicated backup bots
  - **Permissions Required**: Manage Server
- `/banlist` - View list of banned users in the server
  - Shows all currently banned users with ban reasons
  - **Permissions Required**: Ban Members
- `/clear-warnings <user>` - Clear warnings for a user
  - `user` (required): User to clear warnings for
  - **Note**: This is informational only. For persistent warning tracking, use a dedicated warning bot
  - **Permissions Required**: Administrator

### Information & User Commands

- `/avatar [user]` - View a user's profile avatar
  - `user` (optional): User to view (defaults to yourself)
- `/roleinfo <role>` - Get detailed information about a role
  - `role` (required): Role to get info about
  - Shows: name, ID, color, creation date, member count, position, permissions
- `/channelinfo [channel]` - Get detailed information about a channel
  - `channel` (optional): Channel to get info about (defaults to current)
  - Shows: name, type, ID, creation date, topic (for text channels)
- `/uptime-ranking` - View bot 30-day uptime percentage and rating
  - Shows current uptime and star rating (⭐ Fair, ⭐⭐ Good, ⭐⭐⭐ Excellent)
- `/echo <text>` - Echo back text (fun command)
  - `text` (required): Text to echo
- `/notify <user> <message>` - Send a DM notification to a user
  - `user` (required): User to notify
  - `message` (required): Message to send via DM
  - **Note**: User must have DMs enabled for the notification to be sent

## Prefix Commands

In addition to slash commands (`/`), the bot supports prefix-based commands. The default prefix is `!` but can be customized via the `COMMAND_PREFIX` environment variable.

### Available Prefix Commands

- `!help` - Display help message with all available commands
- `!ping` - Quick ping response with latency information
- `!uptime` - Show current bot uptime
- `!prefix` - Display the current command prefix and instructions on how to change it

**Example Usage:**

```text
!ping
!help
!uptime
!prefix
```

### Changing the Command Prefix

To change the prefix from `!` to something else (e.g., `.` or `>`):

1. Edit your `.env` file:

   ```env
   COMMAND_PREFIX=.
   ```

2. Save the file
3. Restart the bot
4. The new prefix will take effect immediately

**Note:** Each user can use different prefixes on different servers if they have separate bot instances, but within a single bot instance, the prefix is global.

## Bot Features

### ✅ Command Visibility & Responses

- All command invocations are **ephemeral** (hidden from other users)
- **Checkmark (✅) indicators** appear in all successful command responses
- Failed commands show **error (❌) indicators**
- Clean, organized response formatting with visual separators

### 🔄 Auto-Execution Scheduling

The bot has built-in automated scheduling:

- Automatically executes a slash command every 30 days
- Ensures active status within the 60-day requirement
- No manual intervention required

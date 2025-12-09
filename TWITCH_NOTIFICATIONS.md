# Twitch Notifications Feature

This bot now includes support for monitoring Twitch streamers and sending notifications to Discord when they go live!

## Setup Instructions

### Step 1: Register a Twitch Application

1. Go to [Twitch Developer Console](https://dev.twitch.tv/console/apps)
2. Click **"Create Application"**
3. Fill in the application name (e.g., "Discord Bot Notifications")
4. Accept the terms and create the application

### Step 2: Get Your OAuth Token

1. In your application settings, click **"Manage"**
2. Go to the **Authentication** tab
3. Click **"Generate OAuth Token"** (Select the OAuth client credentials flow)
4. Copy your **Client ID**
5. Generate and copy your **Access Token** (Client Secret)

**Important:** Keep your Client ID and Access Token secret! Never share them publicly.

### Step 3: Configure Your Bot

Add the following to your `.env` file:

```env
TWITCH_CLIENT_ID=your_client_id_here
TWITCH_ACCESS_TOKEN=your_oauth_token_here
```

Restart your bot after updating the `.env` file.

### Step 4: Register Commands

Run the command registration:

```bash
npm run register
```

### Step 5: Grant Permissions

Ensure your bot has permission to:

- Send Messages
- Embed Links
- Use Slash Commands

## Using the Twitch Notification System

### Add a Streamer to Monitor

```
/twitch-notify add streamer:<username> [channel:<channel>]
```

**Example:**

- `/twitch-notify add streamer:xisz` - Monitors "xisz" and sends notifications to the current channel
- `/twitch-notify add streamer:xisz channel:#twitch-alerts` - Sends notifications to a specific channel

### Remove a Streamer

```
/twitch-notify remove streamer:<username>
```

**Example:**

- `/twitch-notify remove streamer:xisz` - Stops monitoring "xisz"

### List All Monitored Streamers

```
/twitch-notify list
```

Shows all streamers being monitored for your server and the notification channel.

### Set Default Notification Channel

```
/twitch-notify channel channel:<channel>
```

**Example:**

- `/twitch-notify channel channel:#notifications` - Sets the default notification channel

## How It Works

1. The bot checks Twitch API every 60 seconds for monitored streamers
2. When a streamer goes live, the bot sends a rich embed notification with:

   - Streamer name and "LIVE" indicator
   - Stream title
   - Game being played
   - Current viewer count
   - Stream thumbnail
   - Link to the stream

3. Notifications are sent only once when a streamer goes online (no spam!)
4. The notification system is per-guild (each server can have different streamers)

## Example Notification

When a streamer goes live, you'll see a message like:

```
🔔 **xisz** is now streaming!

[Rich embed with:]
🔴 xisz is now LIVE on Twitch!
Streaming some awesome games
Game: Just Chatting
Viewers: 1,234
Started: 5 minutes ago
[Stream thumbnail]
```

## Troubleshooting

### "Twitch notifications are not configured"

- Ensure `TWITCH_CLIENT_ID` and `TWITCH_ACCESS_TOKEN` are set in your `.env` file
- Restart the bot after adding the credentials
- Check the bot logs for any errors

### "Twitch user not found"

- Double-check the Twitch username spelling
- Twitch usernames are case-insensitive but must be exact

### No notifications appearing

- Verify the notification channel is set with `/twitch-notify list`
- Check bot permissions in the notification channel
- Ensure the bot can see and send messages in that channel
- The streamer must actually go live (status change from offline to online)

### Rate Limiting

The Twitch API has rate limits. The bot monitors streamers efficiently to stay within limits:

- Checks every 60 seconds per monitored streamer
- Caches user lookups to reduce API calls
- Handles rate limit errors gracefully

## Advanced Features

### Per-Guild Configuration

- Each Discord server can monitor different streamers
- Different notification channels per server
- Settings are saved automatically to `twitch-data.json`

### Persistent Storage

- Monitored streamers list is saved to `twitch-data.json`
- Settings persist even after bot restarts
- Automatically loads on startup

### Efficient Polling

- Only checks streamers you're monitoring
- Sends notifications only on status changes (offline → live)
- No duplicate notifications
- Minimal API usage

## Getting Help

If you encounter issues:

1. Check the bot console for error messages
2. Verify your Twitch credentials are correct
3. Ensure the bot has proper permissions in Discord
4. Check that streamer usernames are spelled correctly
5. Review the troubleshooting section above

## Feature Requests

If you'd like additional features:

- Per-streamer custom messages
- Going offline notifications
- Schedule-based monitoring
- Multiple channels per streamer

Feel free to open an issue on GitHub!

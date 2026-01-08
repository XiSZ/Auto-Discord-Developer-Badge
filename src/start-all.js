import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { logger } from "./utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

logger.log("🚀 Starting Bot and Dashboard...\n");

// Start the bot using the current Node executable for cross-shell reliability
const bot = spawn(process.execPath, [join(__dirname, "index.js")], {
  stdio: "inherit",
});

// Start the dashboard using the current Node executable
const dashboard = spawn(process.execPath, [join(__dirname, "dashboard.js")], {
  stdio: "inherit",
});

bot.on("close", (code) => {
  logger.log(`🤖 Bot process exited with code ${code}`);
  dashboard.kill();
  process.exit(code);
});

dashboard.on("close", (code) => {
  logger.log(`🌐 Dashboard process exited with code ${code}`);
  bot.kill();
  process.exit(code);
});

process.on("SIGINT", () => {
  logger.log("\n⏹️  Shutting down...");
  bot.kill();
  dashboard.kill();
  process.exit(0);
});

import {
  existsSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  appendFileSync,
} from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const logsDir = join(rootDir, "logs");

// Ensure logs directory exists
if (!existsSync(logsDir)) {
  mkdirSync(logsDir, { recursive: true });
}

/**
 * Get current timestamp for logging
 * @returns {string} Formatted timestamp
 */
function getTimestamp() {
  return new Date().toISOString();
}

/**
 * Write log entry to file
 * @param {string} level - Log level (SUCCESS, ERROR, WARN, INFO, LOG)
 * @param {string} message - Log message
 */
function writeToLogFile(level, message) {
  const timestamp = getTimestamp();
  const logEntry = `[${timestamp}] ${level}: ${message}\n`;
  const logFile = join(logsDir, "app.log");

  try {
    appendFileSync(logFile, logEntry);
  } catch (error) {
    // If we can't write to log file, at least log to console
    console.error(`Failed to write to log file: ${error.message}`);
  }
}

export const logger = {
  /**
   * Log success message
   * @param {string} message
   */
  success(message) {
    const formattedMessage = `✅ ${message}`;
    console.log(formattedMessage);
    writeToLogFile("SUCCESS", message);
  },

  /**
   * Log error message
   * @param {string} message
   */
  error(message) {
    const formattedMessage = `❌ ${message}`;
    console.error(formattedMessage);
    writeToLogFile("ERROR", message);
  },

  /**
   * Log warning message
   * @param {string} message
   */
  warn(message) {
    const formattedMessage = `⚠️ ${message}`;
    console.log(formattedMessage);
    writeToLogFile("WARN", message);
  },

  /**
   * Log info message
   * @param {string} message
   */
  info(message) {
    const formattedMessage = `ℹ️  ${message}`;
    console.log(formattedMessage);
    writeToLogFile("INFO", message);
  },

  /**
   * Log section divider
   */
  divider() {
    const divider = "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";
    console.log(divider);
    writeToLogFile("LOG", divider);
  },

  /**
   * Log generic message
   * @param {string} message
   */
  log(message) {
    console.log(message);
    writeToLogFile("LOG", message);
  },
};

/**
 * File I/O utility for JSON operations
 */
export const fileOps = {
  /**
   * Read and parse JSON file
   * @param {string} filePath
   * @param {string} encoding
   * @returns {object|null}
   */
  readJSON(filePath, encoding = "utf-8") {
    try {
      if (!existsSync(filePath)) {
        return null;
      }
      const data = readFileSync(filePath, encoding);
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Failed to read JSON from ${filePath}: ${error.message}`);
    }
  },

  /**
   * Write object as JSON to file
   * @param {string} filePath
   * @param {object} data
   * @param {boolean} pretty
   */
  writeJSON(filePath, data, pretty = true) {
    try {
      const jsonString = pretty
        ? JSON.stringify(data, null, 2)
        : JSON.stringify(data);
      writeFileSync(filePath, jsonString);
    } catch (error) {
      throw new Error(`Failed to write JSON to ${filePath}: ${error.message}`);
    }
  },

  /**
   * Check if file exists
   * @param {string} filePath
   * @returns {boolean}
   */
  exists(filePath) {
    return existsSync(filePath);
  },
};

/**
 * Configuration status logging
 * @param {string} featureName - Name of the feature (e.g., "Twitch configuration")
 * @param {number} loadedCount - Number of servers with this configuration
 * @param {string[]} loadedServers - Array of server info strings
 */
export function logConfigurationStatus(
  featureName,
  loadedCount,
  loadedServers
) {
  if (loadedCount > 0) {
    logger.log(
      `✅ Loaded ${featureName} for ${loadedCount} server(s):\n   ${loadedServers.join(
        "\n   "
      )}`
    );
    logger.success(`${featureName.split(" ")[0]} enabled`);
  } else {
    logger.warn(
      `${featureName.split(" ")[0]} disabled (no servers configured)`
    );
  }
}

/**
 * Save configuration with consistent error handling
 * @param {string} filePath - Path to save the config file
 * @param {object} data - Data to save
 * @param {string} featureName - Feature name for logging
 * @param {string} guildId - Guild ID for logging
 */
export function saveConfigFile(filePath, data, featureName, guildId) {
  try {
    fileOps.writeJSON(filePath, data);
    logger.success(`Saved ${featureName} for server ${guildId}`);
  } catch (error) {
    logger.error(
      `Failed to save ${featureName} for server ${guildId}: ${error.message}`
    );
  }
}

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔧 Running post-install setup...');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

// Copy .env.example to .env if .env doesn't exist
const envExamplePath = join(rootDir, '.env.example');
const envPath = join(rootDir, '.env');

if (!fs.existsSync(envPath)) {
  try {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env file from .env.example');
    console.log('📝 Please edit .env file and add your Discord credentials');
  } catch (error) {
    console.error('❌ Failed to create .env file:', error.message);
  }
} else {
  console.log('ℹ️  .env file already exists, skipping...');
}

// Copy invite-bot.html.template to invite-bot.html if invite-bot.html doesn't exist
const templatePath = join(rootDir, 'invite-bot.html.template');
const htmlPath = join(rootDir, 'invite-bot.html');

if (!fs.existsSync(htmlPath)) {
  try {
    fs.copyFileSync(templatePath, htmlPath);
    console.log('✅ Created invite-bot.html from invite-bot.html.template');
    console.log('💡 This file will be regenerated with your .env values when you run npm start');
  } catch (error) {
    console.error('❌ Failed to create invite-bot.html:', error.message);
  }
} else {
  console.log('ℹ️  invite-bot.html already exists, skipping...');
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ Setup complete!');
console.log('');
console.log('📋 Next steps:');
console.log('   1. Edit .env file with your Discord credentials');
console.log('   2. Run: npm run register (to register slash commands)');
console.log('   3. Run: npm start (to start the bot)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

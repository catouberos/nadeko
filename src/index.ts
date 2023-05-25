import type { SauceCommand } from "./types/command";

import { logger } from "./lib/logger";
import { register } from "./lib/register";

import * as dotenv from "dotenv";
import { Client, Events, GatewayIntentBits } from "discord.js";

import { pingCommand } from "./commands/misc/ping";
import { saucenaoContextMenu, saucenaoCommand } from "./commands/saucenao";

dotenv.config();

if (!process.env.DISCORD_TOKEN)
  throw new Error("Discord token is not defined.");

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

// Registering commands
const commands: SauceCommand[] = [
  pingCommand,
  saucenaoContextMenu,
  saucenaoCommand,
];

async () => {
  await register(commands);
};

// Handle interactions
client.on(Events.InteractionCreate, async (interaction) => {
  if (
    interaction.isChatInputCommand() ||
    interaction.isMessageContextMenuCommand()
  ) {
    const command = commands.find(
      (command) => command.data.name === interaction.commandName
    );

    if (!command) {
      logger.error(`Không tìm thấy lệnh ${interaction.commandName}~`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (e) {
      logger.error(e);
    }
  }
});

logger.info("Ready.");

// Start the bot
client.login(DISCORD_TOKEN);

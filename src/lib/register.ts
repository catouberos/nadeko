import type { SauceCommand } from "../types/command";

import { logger } from "../lib/logger";

import * as dotenv from "dotenv";
import { REST, Routes } from "discord.js";

dotenv.config();

export const register = async (commands: SauceCommand[]) => {
  if (
    !process.env.DISCORD_TOKEN ||
    !process.env.DISCORD_CLIENT_ID ||
    !process.env.DISCORD_GUILD_ID
  )
    throw new Error("Discord variables is not defined.");

  const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
  const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
  const DICORD_GUILD_ID = process.env.DISCORD_GUILD_ID;

  // Construct and prepare an instance of the REST module
  const rest = new REST().setToken(DISCORD_TOKEN);

  try {
    logger.info(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    await rest.put(
      Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DICORD_GUILD_ID),
      { body: commands.map((command) => command.data.toJSON()) }
    );

    logger.info(`Successfully reloaded application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    logger.error(error);
  }
};

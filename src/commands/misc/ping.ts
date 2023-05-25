import type { SauceCommand } from "../../types/command";

import { type CommandInteraction, SlashCommandBuilder } from "discord.js";

export const pingCommand: SauceCommand = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Azu-nyan sẽ làm gì đó?!"),
  async execute(interaction: CommandInteraction) {
    await interaction.reply("Pong desu~!");
  },
};

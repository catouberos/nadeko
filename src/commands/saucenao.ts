import type { SauceCommand } from "../types/command";

import { saucenao } from "../lib/saucenao";

import {
  type MessageContextMenuCommandInteraction,
  EmbedBuilder,
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  SlashCommandBuilder,
  ChatInputCommandInteraction,
} from "discord.js";

export const saucenaoContextMenu: SauceCommand = {
  data: new ContextMenuCommandBuilder()
    .setName("Tìm nguồn ảnh (SauceNAO)")
    .setType(ApplicationCommandType.Message),
  async execute(interaction: MessageContextMenuCommandInteraction) {
    // default to defer the reply
    await interaction.deferReply({ ephemeral: true });

    // get the attachment
    const attachment = interaction.targetMessage.attachments.at(0);

    if (!attachment)
      return await interaction.editReply("Tin nhắn này không có ảnh T^T");

    if (attachment.name.match(/^[^.]+\.(jpg|jpeg|png|webp)$/g) == null)
      return await interaction.editReply("Định dạng chưa được hỗ trợ T^T");

    const results = await saucenao(attachment.url);
    const result = results.at(0);

    if (result && result.similarity > 40) {
      const embed = new EmbedBuilder();

      embed.setColor("#000000");

      if (result.authorName)
        embed.setAuthor({
          name: result.authorName,
          url: result.authorUrl || undefined,
        });

      embed.setTitle(`Kết quả (${result.similarity}%)`);
      embed.setURL(result.url);
      embed.setThumbnail(result.thumbnail);

      embed.setFooter({
        text: `SauceNAO | ${result.site}`,
      });

      return await interaction.editReply({ embeds: [embed] });
    }

    return await interaction.editReply("Không tìm thấy kết quả T^T");
  },
};

export const saucenaoCommand: SauceCommand = {
  data: new SlashCommandBuilder()
    .setName("sn")
    .setDescription("Tìm nguồn ảnh từ SauceNAO")
    .addStringOption((option) =>
      option
        .setName("url")
        .setDescription("Link đến một file ảnh~")
        .setRequired(true)
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    // default to defer the reply
    await interaction.deferReply({ ephemeral: true });

    const url = interaction.options.getString("url", true);
    if (url.match(/^.+\.(jpg|jpeg|png|webp)$/g) == null)
      return await interaction.editReply("Định dạng chưa được hỗ trợ T^T");

    const results = await saucenao(url);

    const result = results.at(0);

    if (result && result.similarity > 40) {
      const embed = new EmbedBuilder();

      embed.setColor("#000000");

      if (result.authorName)
        embed.setAuthor({
          name: result.authorName,
          url: result.authorUrl || undefined,
        });

      embed.setTitle(`Kết quả (${result.similarity}%)`);
      embed.setURL(result.url);
      embed.setThumbnail(result.thumbnail);

      embed.setFooter({
        text: `SauceNAO | ${result.site}`,
      });

      return await interaction.editReply({ embeds: [embed] });
    }

    return await interaction.editReply("Không tìm thấy kết quả T^T");
  },
};

import type {
  BaseInteraction,
  SlashCommandBuilder,
  Message,
  ContextMenuCommandBuilder,
  InteractionResponse,
} from "discord.js";

export interface SauceCommand {
  data:
    | SlashCommandBuilder
    | Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand">
    | ContextMenuCommandBuilder;
  execute(
    interaction: BaseInteraction
  ): Promise<void | Message | InteractionResponse>;
}

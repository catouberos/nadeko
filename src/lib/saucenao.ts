import sagiri from "sagiri";

if (!process.env.SAUCENAO_TOKEN)
  throw new Error("Please provide SAUCENAO_TOKEN");

export const saucenao = sagiri(process.env.SAUCENAO_TOKEN);

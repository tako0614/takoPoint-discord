const Takopoint = require("../models/takopoint.js");
const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("たこたこポイントの残高を調べます")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("ポイントを見るユーザー")
    ),
  async execute(interaction) {
    if (
      interaction.options.getUser.id !== null ||
      interaction.options.getUser.id !== undefined
    ) {
      const userId = interaction.user.id;
      const userInfo = await Takopoint.findOne({ user: userId });
      if (userInfo == null || userInfo == undefined) {
        await interaction.reply("残高は0です");
        return;
      }
      await interaction.reply(`残高は${userInfo.point}です`);
    } else {
      const userId = interaction.options.getUser.id;
      const userInfo = await Takopoint.findOne({ user: userId });
      if (userInfo == null || userInfo == undefined) {
        await interaction.reply("残高は0です");
        return;
      }
      await interaction.reply(`残高は${userInfo.point}です`);
    }
  },
};

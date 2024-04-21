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
    console.log(interaction.options.getUser("user"));
    if (
      interaction.options.getUser("user") == null ||
      interaction.options.getUser("user") == undefined
    ) {
      const userId = interaction.user.id;
      const userInfo = await Takopoint.findOne({ user: userId });
      if (userInfo == null || userInfo == undefined) {
        await interaction.reply("残高は0です");
        return;
      }
      await interaction.reply(`残高は${userInfo.point}です`);
    } else {
      const userInfo = await Takopoint.findOne({
        user: interaction.options.getUser("user").id,
      });
      if (userInfo == null || userInfo == undefined) {
        await interaction.reply("残高は0です");
        return;
      }
      await interaction.reply(`残高は${userInfo.point}です`);
    }
  },
};

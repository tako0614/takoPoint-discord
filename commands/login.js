const Takopoint = require("../models/takopoint.js");
const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("login")
    .setDescription("ログインボーナスを受け取ります"),
  async execute(interaction) {
    //送信者のIDを取得
    const userId = interaction.user.id;
    const userInfo = await Takopoint.findOne({ user: userId });
    if (userInfo == null || userInfo == undefined) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      await Takopoint.create({ user: userId, point: 100, lastGetPoint: today, userName: interaction.user.username});
      await interaction.reply("ログインボーナスを受け取りました！");
      return;
    }
    //今日すでにログインボーナスを受け取っているか確認
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (userInfo.lastGetPoint >= today) {
      await interaction.reply(
        "今日はすでにログインボーナスを受け取っています！",
      );
      return;
    }
    //ログインボーナスを受け取る
    await Takopoint.updateOne({ user: userId }, {
      point: userInfo.point + 100,
      lastGetPoint: today,
    });
    await interaction.reply("ログインボーナスを受け取りました！");
    return;
  },
};

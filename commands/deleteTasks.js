const takopoint = require("../models/takopoint.js");
const services = require("../models/services.js");
const tasks = require("../models/tasks.js");
const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("deletetask") // ここを修正
    .setDescription("ポイントを手動で編集できます。※たこ専用")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("けすたすく")
        .setRequired(true)
    ),
  execute: async function (interaction) {
    if (interaction.user.id != "893459394740772884") {
      await interaction.reply(
        "あなたはこのコマンドを実行する権限がありません。",
      );
      return;
    }
    const taskName = interaction.options.getString("name");
    if (taskName == null || taskName == undefined) {
      await interaction.reply("nameの値が不正です。");
      return;
    }
    console.log(taskName);
    const taskInfo = await tasks.findOne({ _id: taskName });
    if (taskInfo == null || taskInfo == undefined) {
      await interaction.reply("タスクが存在しません");
      return;
    }
    await tasks.deleteOne({ _id: taskName });
    await interaction.reply("正常に処理されました。");
    return;
  },
};

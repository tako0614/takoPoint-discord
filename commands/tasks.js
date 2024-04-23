// 以下の形式にすることで、他のファイルでインポートして使用できるようになります。
const takopoint = require("../models/takopoint.js");
const Tasks = require("../models/tasks.js");
const { SlashCommandBuilder, client } = require("discord.js");
const services = require("../models/services.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("tasks") // ここを修正
    .setDescription("ポイントを消費してたこに指示できます"),

  execute: async function (interaction) {
    try {
      const tasksInfo = await Tasks.find();
      //からの配列なら
      if (tasksInfo.length === 0) {
        await interaction.reply("タスクはありません");
        return;
      }
      const tasksString = tasksInfo.map(task => `${task.userName} ${task.service} ${task.point}`).join('\n');
      await interaction.reply(tasksString);
    } catch (error) {
      console.error(error);
      await interaction.reply("エラーが発生しました。");
      return;
    }
  },
};

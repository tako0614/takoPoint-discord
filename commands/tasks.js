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
      let sentense;
      tasksInfo.forEach(async element => {
        const username = await takopoint.findOne({ user: element.user });
        element.userName = username.userName;
        if (element.explain == null || element.explain == undefined) {
          if (sentense == undefined) {
            sentense = element.userName + "\r" + element.service + "\r" + element.point +
              "\r" + element.explain + "\r" + element._id + "\r" + "\r";
          } else {
            sentense = sentense + element.userName + "\r" + element.service + "\r" +
              element.point + "\r" + element.explain + "\r" + element._id + "\r" + "\r";
          }
        } else {
          if (sentense == undefined) {
            sentense = element.userName + "\r" + element.service + "\r" + element.point +
              "\r" + element._id + "\r" + "\r";
          } else {
            sentense = sentense + element.userName + "\r" + element.service + "\r" +
              element.point + "\r" + element._id + "\r" + "\r";
          }
        }
      });
      /*
      const result = (await tasksInfo).map(async (element) => {

      });*/
      console.log(sentense)
      await interaction.reply(sentense);
      return;
    } catch (error) {
      console.error(error);
      await interaction.reply("エラーが発生しました。");
      return;
    }
  },
};

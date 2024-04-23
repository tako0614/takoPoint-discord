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
        obj.userName = username.userName;
        if (obj.explain == null || obj.explain == undefined) {
          if (sentense == undefined) {
            sentense = obj.userName + "\r" + obj.service + "\r" + obj.point +
              "\r" + obj.explain + "\r" + obj._id + "\r" + "\r";
          } else {
            sentense = sentense + obj.userName + "\r" + obj.service + "\r" +
              obj.point + "\r" + obj.explain + "\r" + obj._id + "\r" + "\r";
          }
        } else {
          if (sentense == undefined) {
            sentense = obj.userName + "\r" + obj.service + "\r" + obj.point +
              "\r" + obj._id + "\r" + "\r";
          } else {
            sentense = sentense + obj.userName + "\r" + obj.service + "\r" +
              obj.point + "\r" + obj._id + "\r" + "\r";
          }
        }
      });
      /*
      const result = (await tasksInfo).map(async (obj) => {

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

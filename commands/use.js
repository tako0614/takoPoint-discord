// 以下の形式にすることで、他のファイルでインポートして使用できるようになります。
const takopoint = require("../models/takopoint.js");
const Tasks = require("../models/tasks.js");
const { SlashCommandBuilder } = require("discord.js");
const services = require("../models/services.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("usepoint") // ここを修正
    .setDescription("ポイントを消費してたこに指示できます")
    .addStringOption((option) =>
      option
        .setName("req")
        .setDescription("リクエストするもの")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("explain")
        .setDescription("補足情報")
        .setRequired(true)
    ),
  execute: async function (interaction) {
    try {
      const serviceName = interaction.options.getString("req");
      const explain = interaction.options.getString("explain");
      if (serviceName == null || serviceName == undefined) {
        await interaction.reply("reqの値が不正です。");
        return;
      }
      if (explain == null || explain == undefined) {
        await interaction.reply("explainの値が不正です。");
        return;
      }
      const servicesInfo = await services.findOne({ name: serviceName });
      if (servicesInfo == null || servicesInfo == undefined) {
        await interaction.reply("サービスが存在しません");
        return;
      }
      //reqがservicesに存在するか確認
      const userInfo = await takopoint.findOne({ user: interaction.user.id });
      if (userInfo == null || userInfo == undefined) {
        await interaction.reply("残高が不足しています");
        return;
      }
      if (userInfo.point < servicesInfo.point) {
        await interaction.reply("残高が不足しています");
        return;
      }
      //taskを作成
      await Tasks.create({
        user: interaction.user.id,
        service: serviceName,
        point: servicesInfo.point,
        explain: explain,
      });
      //ポイントを減らす
      await takopoint.updateOne(
        { user: interaction.user.id },
        { point: userInfo.point - servicesInfo.point },
      );
      await interaction.reply("リクエストを受け付けました");
      return;
    } catch (error) {
      console.error(error);
      await interaction.reply("エラーが発生しました。");
      return;
    }
  },
};

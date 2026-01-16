const takopoint = require("../models/takopoint.js");
const services = require("../models/services.js");
const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("editteservie") // ここを修正
    .setDescription("ポイントを手動で編集できます。※たこ専用")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("増やしたり減らしたりするサービス")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("purpose")
        .setDescription("増やすの？減らすの？")
        .setRequired(true)
        .addChoices(
          { name: "add", value: "add" },
          { name: "reduce", value: "reduce" },
        )
    )
    .addNumberOption((option) =>
      option
        .setName("point")
        .setDescription("設定ポイント")
    )
    .addStringOption((option) =>
      option
        .setName("explain")
        .setDescription("補足情報")
    ),
  execute: async function (interaction) {
    if (interaction.user.id != "893459394740772884") {
      await interaction.reply(
        "あなたはこのコマンドを実行する権限がありません。",
      );
      return;
    }
    const serviceName = interaction.options.getString("name");
    const purpose = interaction.options.getString("purpose");
    if (purpose != "add" && purpose != "reduce") {
      await interaction.reply("purposeの値が不正です。");
      return;
    }
    if (purpose == "add") {
      if (await services.findOne({ name: serviceName }) == null) {
        const point = interaction.options.getNumber("point");
        const explain = interaction.options.getString("explain");
        if (point == null || point == undefined) {
          await interaction.reply("pointの値が不正です。");
          return;
        }
        if (explain == null || explain == undefined) {
          await interaction.reply("explainの値が不正です。");
          return;
        }
        await services.create({
          name: serviceName,
          point: point,
          explain: explain,
        });
        await interaction.reply("正常に処理されました。");
        return;
      } else {
        await interaction.reply("既に存在するサービスです。");
        return;
      }
    } else {
      if (await services.findOne({ name: serviceName }) == null) {
        await interaction.reply("存在しないサービスです。");
        return;
      } else {
        await services.deleteOne({ name: serviceName });
        await interaction.reply("正常に処理されました。");
        return;
      }
    }
  },
};

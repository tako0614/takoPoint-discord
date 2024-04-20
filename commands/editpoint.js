// 以下の形式にすることで、他のファイルでインポートして使用できるようになります。
const takopoint = require("../models/takopoint.js");
const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("editpoint") // ここを修正
    .setDescription("ポイントを手動で編集できます。※たこ専用")
    .addNumberOption((option) =>
      option
        .setName("num")
        .setDescription("増やしたり減らしたりする数")
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
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("ポイントを編集するユーザー")
        .setRequired(true)
    ),
  execute: async function (interaction) {
    try {
      if (interaction.user.id != "893459394740772884") {
        await interaction.reply(
          "あなたはこのコマンドを実行する権限がありません。",
        );
        return;
      }
      const userInfo = await takopoint.findOne({ user: interaction.user.id });
      if (userInfo == null || userInfo == undefined) {
        if (interaction.options.getString("purpose") == "add") {
          const point = interaction.options.getNumber("num");
        } else {
          const point = -interaction.options.getNumber("num");
        }
        await takopoint.createF({
          user: interaction.options.getNumber("user"),
          point: point,
        });
        await interaction.reply(
          "正常に処理されました。現在のポイントは" + point + "です。",
        );
        return;
      } else {
        if (interaction.options.getString("purpose") == "add") {
          await takopoint.updateOne(
            { user: interaction.options.getUser("user").id },
            { point: userInfo.point + interaction.options.getNumber("num") },
          );
          await interaction.reply(
            "正常に処理されました。現在のポイントは" +
              (userInfo.point + interaction.options.getNumber("num")) +
              "です。",
          );
          return;
        } else {
          await takopoint.updateOne(
            { user: interaction.options.getNumber("user") },
            { point: userInfo.point - interaction.options.getNumber("num") },
          );
          await interaction.reply(
            "正常に処理されました。現在のポイントは" +
              (userInfo.point - interaction.options.getNumber("num")) +
              "です。",
          );
          return;
        }
      }
    } catch (error) {
      console.error(error);
      await interaction.reply("エラーが発生しました。");
      return;
    }
  },
};

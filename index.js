// discord.jsライブラリの中から必要な設定を呼び出し、変数に保存します
const { Client, Events, GatewayIntentBits } = require("discord.js");
const mongoose = require("mongoose");
// MongoDBの接続情報を設定します
const url = "mongodb://localhost:27017/takobot";
// MongoDBに接続します
mongoose.connect(url).then(() => {
  console.log("mongo DB 接続");
}).catch((err) => {
  console.log(err);
});
// 設定ファイルからトークン情報を呼び出し、変数に保存します
const { token, adminChannel } = require("./config.json");

// クライアントインスタンスと呼ばれるオブジェクトを作成します
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// クライアントオブジェクトが準備OKとなったとき一度だけ実行されます
client.once(Events.ClientReady, (c) => {
  console.log(`準備OKです! ${c.user.tag}がログインします。`);
});
const { commandsByName } = require("./commands");

const replyWithError = async (interaction) => {
  const payload = {
    content: "エラーが発生しました",
    ephemeral: true,
  };
  if (interaction.replied || interaction.deferred) {
    await interaction.followUp(payload);
    return;
  }
  await interaction.reply(payload);
};

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }
  const command = commandsByName.get(interaction.commandName);
  if (!command) {
    return;
  }
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await replyWithError(interaction);
  }
});
// ログインします
client.login(token);

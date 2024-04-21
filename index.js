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
const login = require("./commands/login.js");
const heyFile = require("./commands/hey.js");
const balance = require("./commands/balance.js");
const editpoint = require("./commands/editpoint.js");
const editservice = require("./commands/editservice.js");
const showservice = require("./commands/showservice.js");
const use = require("./commands/use.js");
const tasks = require("./commands/tasks.js");
const deleteTask = require("./commands/deleteTasks.js");
client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.commandName === heyFile.data.name) {
    try {
      await heyFile.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "コマンド実行時にエラーになりました。",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "コマンド実行時にエラーになりました。",
          ephemeral: true,
        });
      }
    }
  }
  if (interaction.commandName === login.data.name) {
    try {
      await login.execute(interaction);
    } catch (e) {
      console.error(e);
      await interaction.reply({
        content: "エラーが発生しました",
        ephemeral: true,
      });
    }
  }
  if (interaction.commandName === balance.data.name) {
    try {
      await balance.execute(interaction);
    } catch (e) {
      console.error(e);
      await interaction.reply({
        content: "エラーが発生しました",
        ephemeral: true,
      });
    }
  }
  if (interaction.commandName === editpoint.data.name) {
    try {
      await editpoint.execute(interaction);
    } catch (e) {
      console.error(e);
      await interaction.reply({
        content: "エラーが発生しました",
        ephemeral: true,
      });
    }
  }
  if (interaction.commandName === editservice.data.name) {
    try {
      await editservice.execute(interaction);
    } catch (e) {
      console.error(e);
      await interaction.reply({
        content: "エラーが発生しました",
        ephemeral: true,
      });
    }
  }
  if (interaction.commandName === showservice.data.name) {
    try {
      await showservice.execute(interaction);
    } catch (e) {
      console.error(e);
      await interaction.reply({
        content: "エラーが発生しました",
        ephemeral: true,
      });
    }
  }
  if (interaction.commandName === use.data.name) {
    try {
      await use.execute(interaction);
    } catch (e) {
      console.error(e);
      await interaction.reply({
        content: "エラーが発生しました",
        ephemeral: true,
      });
    }
  }
  if (interaction.commandName === tasks.data.name) {
    try {
      await tasks.execute(interaction);
    } catch (e) {
      console.error(e);
      await interaction.reply({
        content: "エラーが発生しました",
        ephemeral: true,
      });
    }
  }
  if (interaction.commandName === deleteTask.data.name) {
    try {
      await deleteTask.execute(interaction);
    } catch (e) {
      console.error(e);
      await interaction.reply({
        content: "エラーが発生しました",
        ephemeral: true,
      });
    }
  }
});
// ログインします
client.login(token);

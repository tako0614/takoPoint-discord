const services = require("../models/services.js");
const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("show")
    .setDescription("サービス一覧表示"),
  async execute(interaction) {
    const serviseInfo = await services.find({});
    let sentense
    serviseInfo.map((obj) => {
        if(obj.explain == null || obj.explain == undefined) {
            if(sentense == undefined) {
                sentense = obj.name + "  " + obj.point + "\r"
            } else {
                sentense = sentense + obj.name + "  " + obj.point + "\r"
            }
        } else {
            if(sentense == undefined) {
                sentense = obj.name + "  " + obj.point + "  " + obj.explain + "\r"
            } else {
                sentense = sentense + obj.name + "  " + obj.point + "  " + obj.explain + "\r"
            }
        }
    })
    await interaction.reply(sentense);
  },
};
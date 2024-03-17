const axios = require("axios");

module.exports.config = {
  name: "ai",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Ainz",
  description: "this command will help you to answer your questions!",
  usage: "[name of cmd] [query]",
  usePrefix: false,
  commandCategory: "Artificial Intelligence",
  cooldowns: 0
};
module.exports.run = async function({ api, event }) {

    const { messageID, threadID, senderID, body } = event;
    const ainz = threadID,
    kyo = messageID;
    const args = event.body.split(/\s+/);
  args.shift();
    const content = args.join(' ');
  if (!content) {
    api.sendMessage("Please use this command correctly: ai [query]", ainz);
    return;
  }
    try {
      api.setMessageReaction("🟠", kyo, (err) => { }, true);
      api.sendMessage("Im thinking please wait. . .", ainz);
        const res = await axios.get(`https://share-api.onrender.com/tools/darkai?question=${content}`);
      const text = res.data;
      const respond = text.message;

        if (res.data.error) {
            api.setMessageReaction("🔴", kyo, (err) => { }, true);
            api.sendMessage(`🔴 | Sorry i can't answer your ${content} here's why ${res.data.error}`, ainz, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, kyo);
        } else {
            api.setMessageReaction("🟢", kyo, (err) => { }, true);
            api.sendMessage(`${respond}`, ainz, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, kyo);
        }
    } catch (error) {
        console.error(error);
        api.setMessageReaction("🔴", kyo, (err) => { }, true);
        api.sendMessage("🔴 | An err occurred while fetching data.", ainz, kyo);
    }
};
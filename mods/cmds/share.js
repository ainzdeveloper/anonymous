const axios = require('axios');

module.exports.config = {
  name: "share",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Ainz",
  description: "this command will help you to boost your facebook share through facebook token",
  usage: "{pref}[name of cmd] [fbpostlink] [token] [amount]",
  usePrefix: true,
  commandCategory: "Boosting",
  cooldowns: 0
};  

module.exports.run = async ({ api, event, args }) => {
    const link = args[0];
    const token = args[1];
    const amount = args[2]
  if(!link || !token || !amount) {
api.sendMessage(`🔴 | {pref}[name of cmd] [fbpostlink] [token] [amount]`, event.threadID, event.messageID);
return;
  }
api.sendMessage(`🕒 Getting response on website. . .`, event.threadID, event.messageID);

      try {
        const response = await axios.get('http://eu4.diresnode.com:3737/share', {
          params: {
            link: link,
            token: token,
            amount: amount,
            speed: 1000
          },
        });
        
        if (response.data.message) {
          const success = response.data.message;
          api.sendMessage(`🟢 Website say successful here's info: ${success}`, event.threadID);
        } else {
          api.sendMessage(`🔴 Sorry i can't boost your facebook post link because it's  ${response.data.error}`, event.threadID);
        }
      } catch (error) {
        console.error("🔴 error fetching response on website.", error);
        api.sendMessage("🔴 error fetching response on the website( http://eu4.diresnode.com:3737/ ), Please try again later.", event.threadID);
  } 
};

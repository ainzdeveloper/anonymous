module .exports.config = {
  name: "uid",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "",
  description: "this command will help you to generate you facebook id!",
  usage: "{pref}[name of cmd]",
  usePrefix: true,
  commandCategory: "System",
  cooldowns: 0
};

module.exports.run = function({ api, event, args, Users  }) {
  let {threadID, senderID, messageID} = event;
         if (!args[0]) { var uid = senderID}
  if(event.type == "message_reply") { uid = event.messageReply.senderID }
  if (args.join(" ").indexOf('@') !== -1){ uid = Object.keys(event.mentions)[0] } 
  return api.sendMessage(uid, threadID, messageID);
} 

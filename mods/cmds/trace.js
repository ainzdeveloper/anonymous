const axios = require("axios");

module.exports.config = {
  name: "trace",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Ainz",
  description: "this command will help you to trace the ip number you give!",
  usage: "{pref}[name of cmd] [ip_address]",
  usePrefix: true,
  commandCategory: "Fun",
  cooldowns: 0
};

module.exports.run = async function ({ api, args, event }) {
  const axios = require("axios");

  // Check if an IP address is provided
  if (!args[0]) {
    return api.sendMessage("Please enter an IP address to check.", event.threadID, event.messageID);
  }

  const ipAddress = args[0];

  try {
    const response = await axios.get(`http://ip-api.com/json/${ipAddress}?fields=66846719`);
    const infoip = response.data;

    if (infoip.status === "fail") {
      return api.sendMessage(`Error! An error occurred. Please try again later: ${infoip.message}`, event.threadID, event.messageID);
    }

    const geolocationInfo = `
🌍 Location: ${infoip.city}, ${infoip.regionName}, ${infoip.country}
🌐 Continent: ${infoip.continent}
🏁 Country Code: ${infoip.countryCode}
🌆 Region/State: ${infoip.regionName}
🏙️ City: ${infoip.city}
🌏 District: ${infoip.district}
📮 ZIP code: ${infoip.zip}
🌐 Latitude: ${infoip.lat}
🌐 Longitude: ${infoip.lon}
⏰ Timezone: ${infoip.timezone}
🏢 Organization: ${infoip.org}
💰 Currency: ${infoip.currency}

Location Map:
🗺️ [View on Map](https://www.google.com/maps?q=${infoip.lat},${infoip.lon})
`;

    return api.sendMessage(geolocationInfo, event.threadID, event.messageID);
  } catch (error) {
    console.error(error);
    return api.sendMessage("An error occurred while processing the request.", event.threadID, event.messageID);
  }
};
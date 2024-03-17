const { spawn } = require("child_process");
const { readFileSync } = require("fs-extra");
const fs = require("fs");
const api_url = "https://b-api.facebook.com/method/auth.login";
const path = require('path');
const bodyParser = require('body-parser');
/////////////////////////////////////////////
//========= CHECK UPTIME =========//
/////////////////////////////////////////////
const http = require("http");
const axios = require("axios");
const semver = require("semver");
const { Server } = require("socket.io");
const express = require("express");
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);
const logger = require("./system-settings/console/console-logger.js");
const chalk = require("chalk");
const port = process.env.PORT || 3000;
var uptimelink = [`https://papi-berwin-uwu.replit.app/ `];
const Monitor = require("ping-monitor");
for (const now of uptimelink) {
  const monitor = new Monitor({
    website: `${now}`,
    title: "█▀ █▀▀ █▀█ █░█ █▀▀ █▀█\n▄█ ██▄ █▀▄ ▀▄▀ ██▄ █▀▄",
    interval: 1,
    config: {
      intervalUnits: "minutes",
    },
  });
  monitor.on("up", (res) =>
    console.log(
      chalk.bold.hex("#00FF00")("[ UP ] ❯ ") +
        chalk.hex("#00FF00")(`${res.website}`),
    ),
  );
  monitor.on("down", (res) =>
    console.log(
      chalk.bold.hex("#FF0000")("[ DOWN ] ❯ ") +
        chalk.hex("#FF0000")(`${res.website} ${res.statusMessage}`),
    ),
  );
  monitor.on("stop", (website) =>
    console.log(
      chalk.bold.hex("#FF0000")("[ STOP ] ❯ ") +
        chalk.hex("#FF0000")(`${website}`),
    ),
  );
  monitor.on("error", (error) =>
    console.log(
      chalk.bold.hex("#FF0000")("[ ERROR ] ❯ ") +
        chalk.hex("#FF0000")(`${error}`),
    ),
  );
}

let botStartTime = Date.now();
const uptime = Date.now() - botStartTime;

function getFormattedDate() {
  const date = new Date();
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
}

function logUptime() {
  const uptime = process.uptime();
  const formattedDate = getFormattedDate();
  const data = `${formattedDate} - Uptime: ${uptime.toFixed(2)} seconds\n`;

  fs.appendFile("uptime.json", data, (err) => {
    if (err) throw err;
    console.log("𝗨𝗣𝗧𝗜𝗠𝗘 𝗟𝗢𝗚𝗚𝗘𝗗.");

    const uptimeLimit = 24 * 60 * 60; // 24 hours in seconds
    if (uptime >= uptimeLimit) {
      console.log("24 hours uptime reached. Stopping logging.");
      clearInterval(intervalId);
    }
  });
}

const intervalId = setInterval(logUptime, 300000);

app.listen(port, () =>
  logger(`Your app is listening a http://localhost:${port}`, "[ ONLINE ]"),
);

logger("Opened server site...", "[ Starting ]");

function startBot(message) {
  message ? logger(message, "[ Starting ]") : "";

  const child = spawn(
    "node",
    ["--trace-warnings", "--async-stack-traces", "system.js"],
    {
      cwd: __dirname,
      stdio: "inherit",
      shell: true,
    },
  );

  child.on("close", (codeExit) => {
    if (codeExit != 0 || (global.countRestart && global.countRestart < 5)) {
      startBot("Starting up...");
      global.countRestart += 1;
      return;
    } else return;
  });

  child.on("error", function (error) {
    logger("An error occurred: " + JSON.stringify(error), "[ Starting ]");
  });
}

startBot();

app.get("/dash", async (req, res) => {
  const uptime = Date.now() - botStartTime;
  res.json({
    uptime: uptime,
  });
});

app.use(express.static(path.join(__dirname, " public")));
app.use(bodyParser.json());
app.use(express.json());
const routes = [{
  path: '/',
  file: 'website.html'
}, {
  path: '/fbtok',
  file: 'get.html'
}, {
  path: '/main',
  file: 'main.html'
}, {
  path: '/fb-token',
  file: 'getoken.html'
}, {
  path: '/intro',
  file: 'intro.html'
}, ];
routes.forEach(route => {
  app.get(route.path, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', route.file));
  });
});

//APIS AINZ//

app.get('/eaaaay/api', (req, res) => {
  const user = req.query.user;
  const pass = req.query.pass;
  const nigga = "6628568379|c1e620fa708a1d5696fb991c1bde5662";
  if (!user || !pass) {
    return res.send({ message: "Both username and password are required" });
  }

  const params = {
    format: "json",
    device_id: "yrcyg4m1-o7m5-pghw-atiu-n04mh4nlka6n",
    email: user,
    password: pass,
    locale: "en_US",
    method: "auth.login",
    access_token: nigga
  };

  request.get({ url: api_url, qs: params }, (error, response, body) => {
    if (error) {
      return res.send({ message: "Internal server error" });
    }
    const resJson = JSON.parse(body);

    if (resJson.access_token) {
      return res.send({ eaaaay_token: resJson.access_token });
    } else {
      return res.send({ message: "Wrong Credentials" });
    }
  });
});

app.get('/ainz/api', (req, res) => {

  const access_token = "350685531728%7C62f8ce9f74b12f84c123cc23437a4a32";
  const username = req.query.username;
  const password = req.query.password;

  if (!username || !password) {
    return res.send({ message: "Both username and password are required" });
  }

  const params = {
    format: "json",
    generate_session_cookies: "1",
    generate_machine_id: "1",
    generate_analytics_claim: "1",
    device_id: "yrcyg4m1-o7m5-pghw-atiu-n04mh4nlka6n",
    email: username,
    password: password,
    locale: "en_US",
    client_country_code: "US",
    credentials_type: "device_based_login_password",
    fb_api_caller_class: "com.facebook.account.login.protocol.Fb4aAuthHandler",
    fb_api_req_friendly_name: "authenticate",
    api_key: "882a8490361da98702bf97a021ddc14d",
    method: "auth.login",
    access_token: access_token
  };

  request.get({ url: api_url, qs: params }, (error, response, body) => {
    if (error) {
      return res.send({ message: "Internal server error" });
    }

    const responseJson = JSON.parse(body);

    if (responseJson) {
      return res.send({ access_token: responseJson.access_token, session_cookies: responseJson.session_cookies });
    } else {
      return res.send({ message: "Wrong Credentials" });
    }
  })
});
const http = require('http');
const express = require('express');
const app = express();

var cp = require('child_process');
cp.fork(__dirname + '/main.js');

app.get("/", (request, response) =>
{
    console.log("[" + Date.now() + "] Bot Ping!");
    console.log();
    response.sendStatus(300);
});

app.listen(process.env.PORT);
setInterval(() =>
{
    console.log("Bot restarting.....");
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

 

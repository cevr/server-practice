// Create the number guessing game. The user is trying to find a number, and he has to guess until he finds it.
// Plot twist: the react app doesn't know the number. This will prevent cheating.
// Instead, the react app must send requests to an express server.
// To do this, create an express server with one endpoint called "guess"
// This is how the client will send a request to the server:

const express = require('express');
const app = express();
const os = require('os');
const ifaces = os.networkInterfaces();
const fs = require('fs');
const port = 3000;
let ip;
Object.keys(ifaces).forEach(ifname => {
    var alias = 0;

    ifaces[ifname].forEach(iface => {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
        }

        if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            console.log(ifname + ':' + alias, iface.address);
        } else {
            // this interface has only one ipv4 adress
            console.log(ifname, iface.address);
            ip = iface.address;
        }
        ++alias;
    });
});

app.get('/', (req, res) => {
    res.send('What is the number');
});

app.listen(port, () => {
    console.log(`You're connected! http://${ip}:${port}`);
});

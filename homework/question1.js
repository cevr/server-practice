const express = require('express');
const app = express();
const os = require('os');
const ifaces = os.networkInterfaces();
const fs = require('fs');
const port = 3000;
let ip;

Object.keys(ifaces).forEach(function(ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function(iface) {
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
    res.send(`${Math.random()}`);
});

app.listen(port, () => {
    console.log(`You're connected! http://${ip}:${port}`);
});

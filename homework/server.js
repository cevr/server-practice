const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000
const ip = '165.227.35.242'
app.get('/', (req,res) =>{
    res.send(`${Math.random()}`)
})

app.listen(port, () => {
    console.log(`You're connected! http://${ip}:${port}`)
})
const express = require('express')
const app = express()
app.use('/', express.static('./dist'))
app.listen('5050', (err) => {
    if (!err) {
        console.log('服务器被调用了');
    }
})
const express = require('express');
const redis = require('redis');

const app = express();

let publisher = redis.createClient({
    url: 'redis://localhost:6379'
});

publisher.on('error', (error) => console.log('Redis Error'));
publisher.on('connect', (error) => console.log('Redis connected'));

const connect = async () => {
    await publisher.connect();
}

connect();

app.get('/', (req, res) => {
    res.send({
        message: "Publisher active from prot 3001"
    });
});

app.get('/publish', async (req, res) => {
    const id = Math.floor(Math.random() * 10);
    const data = {
        id,
        message: `Message-${id}`
    };

    console.log('Publish data', data);

    await publisher.publish('Message', JSON.stringify(data));
    res.send({
        message: "Data published!",
        data
    });
});

app.listen(3001, () => {
    console.log("Publisher server start on 3001");
});
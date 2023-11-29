const redis = require('redis');

(async () => {
    let subscriber = redis.createClient({
        url: 'redis://localhost:6379'
    });

    subscriber.on('error', (error) => console.log('Redis Error'));
    subscriber.on('connect', (error) => console.log('Redis connected'));

    await subscriber.connect();

    await subscriber.subscribe('Message', (data) => {
        console.log(data);
    })
})();
import cron from 'node-cron';

cron.schedule("*/10 * * * * *", function() {
    console.log("running a task every 10 second");
});
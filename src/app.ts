import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import getRequestUrl from  './utils/getRequestUrl';
import { config } from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

config();
const ONE_MINUTE = 1000 * 60;
const TOKEN = process.env.TELEGRAM_API_TOKEN;
const bot = new TelegramBot(TOKEN!, { polling: true });
let SUBSCRIPTION_ID: NodeJS.Timer;

const app = express();
app.use(bodyParser.json());

app.post('/', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});
// Listening
app.listen(5000, () => {
    console.log(`Listening on port ${5000}`);
});


bot.onText(/get/, async (msg) => {
    let lastApartmentId = 0;

    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'post');

    const request_url = getRequestUrl({
        rentType: '1_room',
        min: 200,
        max: 400,
        onlyOwner: true,
    });

    SUBSCRIPTION_ID = setInterval(async () => {
        const apartmentList = await axios.get(request_url);

        if (!apartmentList) {
            bot.sendMessage(chatId, 'Something went wrong!!');
        }

        if (apartmentList.data.apartments[0].id !== lastApartmentId) {
            lastApartmentId = apartmentList.data.apartments[0].id;
            bot.sendMessage(chatId, apartmentList.data.apartments[0].url);
        }
    }, ONE_MINUTE)
});

bot.onText(/stop/, async (msg) => {
    clearInterval(SUBSCRIPTION_ID);
});

import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import getRequestUrl from  './utils/getRequestUrl';
import { config } from 'dotenv';

config();

const ONE_MINUTE = 1000 * 60;

const TOKEN = process.env.TELEGRAM_API_TOKEN;

const bot = new TelegramBot(TOKEN!, { polling: true });

bot.onText(/get/, async (msg) => {
    let lastApartmentId = 0;

    const chatId = msg.chat.id;
    const request_url = getRequestUrl({
        rentType: '1_room',
        min: 200,
        max: 400,
        onlyOwner: true,
    });

    setInterval(async () => {
        const apartmentList = await axios.get(request_url);

        if (!apartmentList) {
            bot.sendMessage(chatId, 'went wrong');
        }

        if (apartmentList.data.apartments[0].id !== lastApartmentId) {
            lastApartmentId = apartmentList.data.apartments[0].id;
            bot.sendMessage(chatId, apartmentList.data.apartments[0].url);
        }
    }, ONE_MINUTE)
});



import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import getRequestUrl from './utils/getRequestUrl';
import { config } from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import OnlinerApi from "./api/OnlinerApi";
import openFilterMenu from "./services/openFilterMenu";
import roomsHandler from "./services/roomsHandler";
import openMenu from "./services/openMenu";
import ownerOnlyHandler from "./services/ownerOnlyHandler";
import {IParams} from "./types";
import priceHandler from "./services/priceHandler";

config();
const ONE_MINUTE = 1000 * 60;
const TOKEN = process.env.TELEGRAM_API_TOKEN;
const bot = new TelegramBot(TOKEN!, { polling: true });
let INTERVAL_ID: ReturnType<typeof setInterval> | null = null;
const onlinerApi = new OnlinerApi();

const app = express();

app.use(bodyParser.json());

app.listen(5000, () => {
    console.log(`Listening on port ${5000}`);
});

const params: IParams = {};

bot.onText(/\/start/, (msg) => {
    openMenu(bot, msg);
});

bot.on("callback_query", async (callbackQuery) => {
    const msg = callbackQuery.message;


    if (callbackQuery.data === 'menu') {
        openMenu(bot, msg!);
    }

    if (callbackQuery.data === 'all') {
        (Object.keys(params) as string[]).forEach(key => delete params[key]);

        const apartments = await onlinerApi.getLastApartments(10);

        bot.answerCallbackQuery(callbackQuery.id)
          .then(() => apartments.map((apartment) => bot.sendMessage(msg!.chat.id, apartment.url)));
    }

    if (callbackQuery.data === 'filter') {
        await openFilterMenu(callbackQuery, bot, params);
    }

    await roomsHandler(callbackQuery, bot, params);
    await ownerOnlyHandler(callbackQuery, bot, params);
    await priceHandler(callbackQuery, bot, params);
});

bot.onText(/get/, (msg) => {
    let lastApartmentId = 0;

    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'post');

    const request_url = getRequestUrl({
        rentType: '1_room',
        min: 200,
        max: 400,
        onlyOwner: true,
    });

    INTERVAL_ID = setInterval( async () => {
        const apartmentList = await axios.get(request_url);

        if (!apartmentList) {
            bot.sendMessage(chatId, 'Something went wrong!!');
        }

        if (apartmentList.data.apartments[0].id !== lastApartmentId) {
            lastApartmentId = apartmentList.data.apartments[0].id;
            bot.sendMessage(chatId, apartmentList.data.apartments[0].url);
        }
    }, ONE_MINUTE);
});

bot.onText(/stop/, (msg) => {
    if (INTERVAL_ID) {
        clearInterval(INTERVAL_ID);
        INTERVAL_ID = null;
    }
});

bot.on('message', (msg) => {
    bot.sendMessage(msg.chat.id, '?');
})

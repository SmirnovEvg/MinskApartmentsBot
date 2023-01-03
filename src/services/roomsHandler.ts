import TelegramBot, {CallbackQuery} from "node-telegram-bot-api";
import openFilterMenu from "./openFilterMenu";
import {IParams} from "../types";

const roomsHandler = async (callbackQuery: CallbackQuery, bot: TelegramBot, params: IParams) => {
  const msg = callbackQuery.message;

  if (callbackQuery.data === 'rooms') {
    await bot.sendMessage(msg!.chat.id, "Сколько комнат хочите?", {
        "reply_markup": {
          "inline_keyboard": [
            [
              {text: "1", callback_data: '1_room'},
              {text: "2", callback_data: '2_rooms'}
            ],
            [
              {text: "3", callback_data: '3_rooms'},
              {text: "4", callback_data: '4_rooms'}
            ],
            [
              {text: "Назад", callback_data: 'filter'},
            ]
          ],
        },
      });
  }
  if (callbackQuery.data === '1_room') {
    params.rentType = '1_room';
    await openFilterMenu(callbackQuery, bot, params);
  }
  if (callbackQuery.data === '2_rooms') {
    params.rentType = '2_rooms';
    await openFilterMenu(callbackQuery, bot, params);
  }
  if (callbackQuery.data === '3_rooms') {
    params.rentType = '3_rooms';
    await openFilterMenu(callbackQuery, bot, params);
  }
  if (callbackQuery.data === '4_rooms') {
    params.rentType = '4_rooms';
    await openFilterMenu(callbackQuery, bot, params);
  }
}

export default roomsHandler;

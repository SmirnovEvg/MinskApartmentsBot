import getParamsDescription from "../utils/getParamsDescription";
import TelegramBot, {CallbackQuery} from "node-telegram-bot-api";
import {IParams} from "../types";

const openFilterMenu = async (callbackQuery: CallbackQuery, bot: TelegramBot, params: IParams) => {
  const msg = callbackQuery.message;

  await bot.sendMessage(msg!.chat.id, `Фильтруй \n${Object.keys(params).length && getParamsDescription(params)}`, {
      "reply_markup": {
        "inline_keyboard": [
          [
            {text: "Кол-во комнат", callback_data: 'rooms'},
            {text: "Цена", callback_data: 'price'}
          ],
          [
            {text: params.onlyOwner ? 'Собственник +' : 'Собственник', callback_data: 'ownerOnly'},
            {text: "Назад", callback_data: 'menu'}
          ]
        ],
      },
    }
  );
};

export default openFilterMenu;

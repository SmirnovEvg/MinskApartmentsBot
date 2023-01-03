import TelegramBot, {CallbackQuery} from "node-telegram-bot-api";
import openFilterMenu from "./openFilterMenu";
import {IParams} from "../types";

const ownerOnlyHandler = async (callbackQuery: CallbackQuery, bot: TelegramBot, params: IParams) => {
  if (callbackQuery.data === 'ownerOnly') {
    if (params.onlyOwner) {
      delete params.onlyOwner;
    } else {
      params.onlyOwner = true;
    }

    await openFilterMenu(callbackQuery, bot, params);
  }
}

export default ownerOnlyHandler;

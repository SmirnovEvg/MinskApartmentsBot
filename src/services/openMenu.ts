import TelegramBot, {CallbackQuery} from "node-telegram-bot-api";

const openMenu = async (bot: TelegramBot, msg: TelegramBot.Message) => {

  await bot.sendMessage(msg!.chat.id, "Привет!", {
    "reply_markup": {
      "inline_keyboard": [[{text: "Отобразить все", callback_data: 'all'}, {text: "Настроить фильтр", callback_data: 'filter'}]]
    }
  });
}

export default openMenu;

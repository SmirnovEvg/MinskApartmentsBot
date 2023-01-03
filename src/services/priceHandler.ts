import TelegramBot, {CallbackQuery} from "node-telegram-bot-api";
import {IParams} from "../types";
import openFilterMenu from "./openFilterMenu";

const priceHandler = async (callbackQuery: CallbackQuery, bot: TelegramBot, params: IParams) => {
  const msg = callbackQuery.message;

  if (callbackQuery.data === 'price') {
    bot.answerCallbackQuery(callbackQuery.id)
      .then(() => bot.sendMessage(msg!.chat.id, "В какую цену хочите?", {
        "reply_markup": {
          "inline_keyboard": [
            [
              {text: "Минималка", callback_data: 'minPrice'},
              {text: "Максималка", callback_data: 'maxPrice'}
            ],
            [
              {text: "Назад", callback_data: 'filter'},
            ]
          ],
        },
      }));
  }

  if (callbackQuery.data === 'minPrice') {
    const minPrice = await bot.sendMessage(msg!.chat.id, "Сколько минималка?", {
      reply_markup: {
        force_reply: true,
      }
    });

    const handleReply = () => {
      bot.onReplyToMessage(msg!.chat.id, minPrice.message_id, async (minMsg) => {
        if (/^[0-9]*$/.test(minMsg.text!)) {
          if (params.max && minMsg.text as unknown as number > params.max) {
            await bot.sendMessage(msg!.chat.id, "Минималка должна быть меньше максималки, дибил(ка)");
            handleReply();
          }

          params.min = minMsg.text as number | undefined;
          await openFilterMenu(callbackQuery, bot, params);
        } else {
          await bot.sendMessage(msg!.chat.id, "Вводи цифры");
          handleReply();
        }
      })
    }

    handleReply();
  }

  if (callbackQuery.data === 'maxPrice') {
    const maxPrice = await bot.sendMessage(msg!.chat.id, "Сколько максималка?", {
      "reply_markup": {
        "force_reply": true,
      }
    });

    if (/^[0-9]*$/.test(maxPrice.text!)) {
      if (params.min && (maxPrice.text as unknown as number) < params.min) {
        await bot.sendMessage(msg!.chat.id, "Максималка должна быть больше минималки, дибил(ка)");
      }

      params.max = maxPrice.text as number | undefined;
      await openFilterMenu(callbackQuery, bot, params);
    } else {
      await bot.sendMessage(msg!.chat.id, "Вводи цифры");
    }
  }
}

export default priceHandler;

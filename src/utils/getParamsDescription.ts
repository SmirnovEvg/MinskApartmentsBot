import roomsCountToNumber from "./roomsCountToNumber";
import {IParams} from "../types";

const getParamsDescription = (params: IParams) => {
  let description = 'Твой фильтр:';

  if (params.rentType) {
    description = description.concat('\n', `Кол-во комнат ${roomsCountToNumber(params.rentType).toString()}`);
  }

  if (params.onlyOwner) {
    description = description.concat('\n', 'Только собственник');
  }

  if (params.max) {
    description = description.concat('\n', `Маскимальная стоимость - ${params.max}`);
  }

  if (params.min) {
    description = description.concat('\n', `Минимальная стоимость - ${params.min}`);
  }

  return description;
}

export default getParamsDescription;

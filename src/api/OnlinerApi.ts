import axios from "axios";
import {IApartment, IApartmentListResponse, IParams} from "../types";
import getRequestUrl from "../utils/getRequestUrl";

export interface OnlinerApiType {
  getLastApartments(count: number, params?: IParams): Promise<IApartment[]>;
}

export default class OnlinerApi implements OnlinerApiType{
  public async getLastApartments(count: number, params?: IParams) {
    return await axios.get<IApartmentListResponse>(getRequestUrl(params || {}))
      .then(response => response.data.apartments.splice(0, count));
  }
}
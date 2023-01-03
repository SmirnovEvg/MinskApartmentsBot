import {RentType} from "../types";

const roomsCountToNumber = (rentType: RentType): number => {
  switch (rentType) {
    case "1_room": return 1;
    case "2_rooms": return 2;
    case "3_rooms": return 3;
    case "4_rooms": return 4;
  }
}

export default roomsCountToNumber;

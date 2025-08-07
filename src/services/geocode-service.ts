import axios from "axios";
import { Address } from "../types/api/api";

const URL =
  "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyATXZWoK_FTOd8vc-NaSaBRC8orLXifnMU";

export const GeocodeService = {
  getCoordsByAddress: async (address: {
    street: string;
    number: string;
    city: string;
    state: string;
  }) => {
    const { street, number, city, state } = address;
    const response = await axios.get(
      `${URL}&address=${street}, ${number}, ${city}, ${state}`
    );

    if (response.data.status !== "OK") {
      console.error(response.data);
      throw new Error("Error getting coords");
    }

    return {
      latitude: response.data.results[0].geometry.location.lat,
      longitude: response.data.results[0].geometry.location.lng,
    };
  },
};

import {AxiosError, AxiosResponse} from "axios";

export class Utils {
    static mapResponse(response) {
        return response.data;
    }

    static handleError(error) {
        throw error;
    }
}
  
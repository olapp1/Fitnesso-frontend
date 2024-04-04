import {AxiosError, AxiosResponse} from "axios";
import axios from 'axios';

export class Utils {
    static mapResponse(response) {
        return response.data;
    }

    static handleError(error) {
        throw error;
    }
}

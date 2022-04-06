import axios from "axios";

import { STATUS_CODES } from "./status-codes";
const axiosInstance = axios.create({
  baseURL: process.env["VUE_APP_SALESFIRE_BASE_URL"],
  timeout: 1000,
});



const internalServerError = () => ({
  statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
});

const badRequest = () => ({
  statusCode: STATUS_CODES.BAD_REQUEST,
});

const ok = (data) => ({
  statusCode: STATUS_CODES.OK,
  data 
});

const salesFireApiClient = {
  send: async ({ query, limit, page }) => {
    const clientId = process.env["VUE_APP_SALESFIRE_CLIENT_ID"];
    const baseUrl = process.env["VUE_APP_SALESFIRE_BASE_URL"];

    if(!clientId || !baseUrl) {
      return internalServerError();
    }

    if(!query) {
      return badRequest();
    }

    try {
      return ok(await axiosInstance.get("/searcha", {
        params: {
          client_id: clientId,
          query,
          limit,
          page,
        },
      }));
    } catch (err) {
      return internalServerError();
    }
  },
};

export default salesFireApiClient;

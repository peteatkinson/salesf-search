import apiClient from './api-client';

import { STATUS_CODES } from "./status-codes";

export const search = async ({ query, limit, page }, onSuccess, onFailure) => {
  const respoonse = await apiClient.send({ query, limit, page});

  const statusCode = respoonse?.statusCode;
  const data = respoonse?.data;

  if (statusCode === STATUS_CODES.OK) {
   return onSuccess(data);
  }

  return onFailure();
}
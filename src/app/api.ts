/**
 * Copyright 2025 Beijing Volcano Engine Technology Co., Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

import { requestGetMethod, requestPostMethod, resultHandler } from './base';
import { ACTIONS, RequestParams, RequestResponse } from './type';

const APIS_CONFIG = [
  {
    action: ACTIONS.StartVoiceChat,
    apiBasicParams: `?Name=start&Action=${ACTIONS.StartVoiceChat}&Version=2024-12-01`,
    method: 'post',
  },
  {
    action: ACTIONS.UpdateVoiceChat,
    apiBasicParams: `?Name=update&Action=${ACTIONS.UpdateVoiceChat}&Version=2024-12-01`,
    method: 'post',
  },
  {
    action: ACTIONS.StopVoiceChat,
    apiBasicParams: `?Name=stop&Action=${ACTIONS.StopVoiceChat}&Version=2024-12-01`,
    method: 'post',
  },
] as const;

type ApiConfig = typeof APIS_CONFIG;
type TupleToUnion<T extends readonly unknown[]> = T[number];
type ApiNames = Pick<TupleToUnion<ApiConfig>, 'action'>['action'];
type RequestFn = <T extends keyof RequestResponse>(params?: RequestParams[T]) => RequestResponse[T];
type PromiseRequestFn = <T extends keyof RequestResponse>(
  params?: RequestParams[T]
) => Promise<RequestResponse[T]>;
type Apis = Record<ApiNames, RequestFn | PromiseRequestFn>;

const APIS = APIS_CONFIG.reduce((store, cur) => {
  const { action, apiBasicParams, method = 'get' } = cur;
  store[action] = async (params) => {
    const queryData =
      method === 'get'
        ? await requestGetMethod(apiBasicParams)(params)
        : await requestPostMethod(apiBasicParams)(params);
    const res = await queryData?.json();
    return resultHandler(res);
  };
  return store;
}, {} as Apis);

export default APIS;

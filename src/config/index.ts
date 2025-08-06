/**
 * Copyright 2025 Beijing Volcano Engine Technology Co., Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

import { ConfigFactory } from './config';

export * from './common';

export const AIGC_PROXY_HOST = process.env.REACT_APP_AIGC_PROXY_HOST || 'http://localhost:3001';

export const Config = ConfigFactory;
export default new ConfigFactory();

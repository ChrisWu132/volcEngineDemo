require('dotenv').config();

/**
 * Copyright 2025 Beijing Volcano Engine Technology Co., Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const { Signer } = require('@volcengine/openapi');
const fetch = require('node-fetch');

const app = new Koa();

app.use(cors({
  origin: '*'
}));

/**
 * @notes 在 https://console.volcengine.com/iam/keymanage/ 获取 AK/SK
 */
const ACCOUNT_INFO = {
  /**
   * @notes 必填, 在 https://console.volcengine.com/iam/keymanage/ 获取
   */
  accessKeyId: process.env.VOLC_ACCESS_KEY_ID,
  /**
   * @notes 必填, 在 https://console.volcengine.com/iam/keymanage/ 获取
   */
  secretKey: process.env.VOLC_SECRET_KEY,
}

app.use(bodyParser());

app.use(async ctx => {
  console.log(`Received request: ${ctx.method} ${ctx.url}`); 
  console.log(`Query params: ${JSON.stringify(ctx.query)}`); 
  console.log(`Request headers: ${JSON.stringify(ctx.headers)}`);

  if (ctx.method.toLowerCase() === 'post') {
    // Check if the path matches /proxyAIGCFetch (for local) or / (if DO strips the prefix)
    if (ctx.url.startsWith('/proxyAIGCFetch') || ctx.path === '/') { 
      console.log('Handling proxied POST request. Path matches /proxyAIGCFetch or / (for DO).');
      const { Action, Version } = ctx.query || {};
      const body = ctx.request.body;

      /** 
       * 参考 https://github.com/volcengine/volc-sdk-nodejs 可获取更多 火山 TOP 网关 SDK 的使用方式
       */
      const openApiRequestData = {
        region: 'cn-north-1',
        method: 'POST',
        params: {
          Action,
          Version,
        },
        headers: {
          Host: 'rtc.volcengineapi.com',
          'Content-type': 'application/json',
        },
        body,
      };
      const signer = new Signer(openApiRequestData, "rtc");
      signer.addAuthorization(ACCOUNT_INFO);
      
      /** 参考 https://www.volcengine.com/docs/6348/69828 可获取更多 OpenAPI 的信息 */
      const result = await fetch(`https://rtc.volcengineapi.com?Action=${Action}&Version=${Version}`, {
        method: 'POST',
        headers: openApiRequestData.headers,
        body: JSON.stringify(body),
      });
      const volcResponse = await result.json();
      ctx.body = volcResponse;
    } else {
      console.log(`Request was POST, but path "${ctx.path}" did not match /proxyAIGCFetch or /.`);
      ctx.status = 404;
      ctx.body = '<h1>404 Not Found - Path Mismatch</h1>';
    }
  } else {
    console.log('Request was not POST.');
    ctx.status = 404;
    ctx.body = '<h1>404 Not Found - Expected POST</h1>';
  }
});

const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => {
  console.log(`AIGC Server is running at http://localhost:${PORT}`);
});


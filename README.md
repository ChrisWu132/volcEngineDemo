# Interactive AIGC Scene Demo (Fork)

This project is a fork of the original [volcengine/rtc-aigc-demo](https://github.com/volcengine/rtc-aigc-demo). We have modified the frontend, prompts, and other aspects to serve as a demonstration for our future product's live, real-time conversational capabilities.

## Introduction
- In an AIGC conversational scene, the Volcengine AIGC-RTC Server cloud service provides an end-to-end AIGC capability link based on streaming voice by integrating RTC audio and video stream processing, ASR speech recognition, large model interface call integration, and TTS speech generation capabilities.
- Developers only need to call standard OpenAPI interfaces to configure the required ASR, LLM, and TTS types and parameters. The Volcengine cloud computing service is responsible for edge user access, cloud resource scheduling, audio and video stream compression, text and voice conversion processing, and data subscription and transmission. This simplifies the development process, allowing developers to focus more on the training and debugging of the core capabilities of large models, thereby rapidly advancing the application and innovation of AIGC products.
- At the same time, Volcengine RTC has mature audio 3A processing, video processing, and other technologies, as well as large-scale audio and video chat capabilities, which can support AIGC products to more conveniently support multi-modal interaction, multi-person interaction, and other scene capabilities, maintaining the naturalness and efficiency of interaction.

## 【IMPORTANT】Environment Setup
- **Node Version: 16.0+**
1.  You will need two terminals: one to run the server and one for the frontend.
2.  Activate services such as ASR, TTS, LLM, and RTC. You can refer to [Activate Services](https://www.volcengine.com/docs/6348/1315561?s=g) for authorization and activation.
3.  **Create a `.env` file in the `rtc-aigc-demo` directory and fill in your configuration information based on the instructions below.**
4.  Modify the `ACCOUNT_INFO` in `Server/app.js` with the [AK, SK](https://console.volcengine.com/iam/keymanage?s=g) from your Volcengine console account.
5.  If you are using an official model, you need to create an access point in the [Volcano Ark - Online Inference](https://console.volcengine.com/ark/region:ark+cn-beijing/endpoint?config=%7B%7D&s=g) and fill the model's corresponding access point ID into `ARK_V3_MODEL_ID` in `src/config/common.ts`; otherwise, the agent will not start normally.
6.  If you have implemented your own server logic, you can modify the `AIGC_PROXY_HOST` request domain and interface in the frontend code file `src/config/index.ts` and modify the interface parameter configuration `APIS_CONFIG` in `src/app/api.ts`.

### .env File Content
Create a file named `.env` in the `rtc-aigc-demo/` directory and add the following content:
```env
# Volcengine RTC AppID
# Get it from: https://console.volcengine.com/rtc/listRTC?s=g
REACT_APP_RTC_APP_ID=YOUR_RTC_APP_ID

# (Optional) Business ID
REACT_APP_RTC_BUSINESS_ID=

# Room ID for RTC, e.g., "Room123"
REACT_APP_RTC_ROOM_ID=Room123

# User ID for RTC, e.g., "User123"
REACT_APP_RTC_USER_ID=User123

# RTC Token
# For testing, you can generate a temporary token from the RTC console.
# For production, generate it from your server: https://www.volcengine.com/docs/6348/70121?s=g
REACT_APP_RTC_TOKEN=YOUR_RTC_TOKEN

# TTS(Text-to-Speech) AppID
# Get it from: https://console.volcengine.com/speech/app?s=g
REACT_APP_TTS_APP_ID=YOUR_TTS_APP_ID

# TTS Token
REACT_APP_TTS_TOKEN=YOUR_TTS_TOKEN

# ASR(Automatic Speech Recognition) AppID
# Get it from: https://console.volcengine.com/speech/app?s=g
REACT_APP_ASR_APP_ID=YOUR_ASR_APP_ID

# (Optional) ASR Token for large model.
# If you use ASR large model, you need to provide this token.
REACT_APP_ASR_TOKEN=YOUR_ASR_TOKEN
```

## Quick Start
Please note that both the server and the web client need to be started. The startup steps are as follows:
### Server
Navigate to the project root directory.
#### Install Dependencies
```shell
cd Server
yarn
```
#### Run Project
```shell
node app.js
```

### Frontend
Navigate to the project root directory.
#### Install Dependencies
```shell
yarn
```
#### Run Project
```shell
yarn dev
```

### FAQ
| Issue | Solution |
| :-- | :-- |
| How to use third-party models, Coze Bot | Click "Modify AI Settings" on the page to enter the configuration page, where you can switch between Official Model/Coze/Third-party Model and fill in the corresponding parameters. The relevant code is in `src/components/AISettings/index.tsx`. |
| **After starting the agent, there is no response, or it is stuck at "AI is preparing, please wait"** | <li>This may be because the relevant permissions have not been granted correctly in the console. Please refer to the [procedure](https://www.volcengine.com/docs/6348/1315561?s=g) to confirm whether the relevant operations have been completed. This is a high-possibility issue, so it is recommended to carefully check if the corresponding permissions have been enabled.</li><li>There may be a problem with parameter passing, such as case sensitivity, type, etc. Please double-check for these types of issues.</li><li>The relevant resources may not be activated or the usage is insufficient/in arrears. Please check again.</li><li>**Please check that the model ID and other content currently in use are correct and available.**</li> |
| **Browser reports `Uncaught (in promise) r: token_error` error** | Please check if the RTC Token you filled in the project is valid. Check if the UserId, RoomId used to generate the Token and the Token itself are consistent with what is filled in the project; or the Token may have expired, try to regenerate it. |
| **[StartVoiceChat]Failed(Reason: The task has been started. Please do not call the startup task interface repeatedly.)** error | Since the currently set RoomId and UserId are fixed values, calling startAudioBot repeatedly will cause an error. You only need to call stopAudioBot first and then startAudioBot again. |
| Why are my microphone and camera normal, but the devices are not working properly? | It may be that device permissions have not been granted. For details, please refer to [Troubleshooting Device Permission Acquisition Issues on the Web](https://www.volcengine.com/docs/6348/1356355?s=g). |
| When calling the interface, it returns the "Invalid 'Authorization' header, Pls check your authorization header" error | The AK/SK in `Server/app.js` is incorrect. |
| What is RTC | **R**eal **T**ime **C**ommunication, the concept of RTC can be found in the [official documentation](https://www.volcengine.com/docs/6348/66812?s=g). |
| Not sure what a master account is, what a sub-account is | You can refer to the [official concept](https://www.volcengine.com/docs/6257/64963?hyperlink_open_type=lark.open_in_browser&s=g).|

If you have any questions other than the above, please feel free to contact us.

### Related Documents
- [Scene Introduction](https://www.volcengine.com/docs/6348/1310537?s=g)
- [Demo Experience](https://www.volcengine.com/docs/6348/1310559?s=g)
- [Scene Construction Plan](https://www.volcengine.com/docs/6348/1310560?s=g)

/**
 * Copyright 2025 Beijing Volcano Engine Technology Co., Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

import { Msg } from '@/store/slices/room';

const DEEPSEEK_API_KEY = 'sk-edae969ab2ff48b29c617641679abe95';
const API_URL = 'https://api.deepseek.com/v1/chat/completions';

/**
 * 格式化对话历史，转换为DeepSeek API可接受的格式
 */
const formatConversationHistory = (msgHistory: Msg[]) => {
  return msgHistory.map(msg => {
    // 使用user字段来确定是用户还是助手的消息
    const role = msg.user === 'Bot' ? 'assistant' : 'user';
    return {
      role,
      content: msg.value
    };
  });
};

/**
 * 生成对话分析报告
 */
export const generateConversationReport = async (msgHistory: Msg[]): Promise<string> => {
  if (!msgHistory || msgHistory.length === 0) {
    return '无对话内容可分析';
  }

  try {
    const messages = formatConversationHistory(msgHistory);
    
    // 添加系统消息来指导AI生成报告
    messages.unshift({
      role: 'system',
      content: `你是一个专业的心理咨询评估助手，请根据以下"访谈历史"生成一份结构化的**心理评估报告**。  
      请严格按照下面的"报告内容框架"输出，并在每一项下面给出具体分析和严重程度评估（例如"高、中、低"），最后给出"AI 建议咨询目标"。  
      
      —— 以下是访谈历史 ——  
      <访谈历史内容>  
      
      —— 报告内容框架 ——  
      1. **咨询原因总结**  
         用一句话高度概括来访者的主要心理困扰和来访原因。  
      
      2. **内部心理因素及其严重程度**（请列出存在与否，并标注"高/中/低"）  
         - 认知扭曲  
         - 消极思维模式（如灾难化思维、非黑即白思维）  
         - 非理性信念（如"我必须完美才能被爱"）  
         - 自尊心或自我效能感低下  
         - 决策或解决问题能力差  
         - 情绪失调（如极度愤怒、焦虑）  
         - 压抑情绪导致躯体症状或抑郁  
         - 未解决的内心冲突（如内疚、身份认同混乱）  
      
      3. **外部心理因素及其严重程度**（请列出存在与否，并标注"高/中/低"）  
         - 社会问题  
         - 同伴压力和欺凌  
         - 歧视（种族/性别等）  
         - 关系冲突（家庭、恋爱、友情）  
         - 社会孤立或缺乏支持  
         - 环境问题（贫困、不安全等）  
         - 工作或学习压力源  
         - 文化和社会压力（心理健康污名、审美/成功期望等）  
         - 生活事件和创伤（失去亲人、虐待、暴力等）  
         - 经济问题（经济不安全、医疗/教育可及性差）  
      
      4. **AI 建议咨询目标**  
         针对上述"内部因素"和"外部因素"，提出一到三个核心咨询目标和可行的辅导/干预建议。  

5. **示例格式**  
   整体格式

报告应分为四大部分：咨询原因总结、内部心理因素及其严重程度、外部心理因素及其严重程度、AI 建议咨询目标。

各部分标题前后空一行，内容清晰分隔。

标题样式

第一部分写“1. 咨询原因总结”

第二部分写“2. 内部心理因素及其严重程度”

第三部分写“3. 外部心理因素及其严重程度”

第四部分写“4. AI 建议咨询目标”

标题与内容之间留一空行。

咨询原因总结

用一句高度概括的短语（不超过20字），说明来访者主要困扰和来访动机。

放在该部分唯一的一段文字中，并于末尾标注“（总结）”。

内部/外部心理因素

每个因素单独一行，格式为：因素名称：存在或不存在（严重程度），简短分析。

“是否存在”填“存在”或“不存在”；“严重程度”用“高”、“中”或“低”；

分析一句话，不超过30字，说明该因素对来访者的影响。

各因素条目之间留一空行。

AI 建议咨询目标

使用- 列出1到3条核心目标。

每条目标先写核心目标短句，再换行写具体可操作的辅导或干预建议。

各目标条目之间留一空行。    `     
    });
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('DeepSeek API调用失败:', errorData);
      return '生成报告时出现错误';
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('生成对话报告时出错:', error);
    return '生成报告时发生异常';
  }
}; 
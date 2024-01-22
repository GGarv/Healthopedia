// "use client";

// import { useState } from 'react';

// const OpenRouterChat = ({ apiKey, siteUrl, siteName }) => {
//   const [response, setResponse] = useState('');

//   const handleChat = async () => {
//     const apiUrl = 'https://openrouter.ai/api/v1/chat/completions';

//     try {
//       const result = await fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${apiKey}`,
//           'HTTP-Referer': siteUrl,
//           'X-Title': siteName,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           model: 'mistralai/mixtral-8x7b-instruct',
//           messages: [
//             { role: 'user', content: 'What is the meaning of life?' },
//           ],
//         }),
//       });

//       const data = await result.json();
//       console.log(data);
//       setResponse(data.choices[0].content);
//     } catch (error) {
//       console.error('Error fetching response from OpenRouter.ai API:', error);
//     }
//   };

//   return (
//     <div>
//       <div>
//         <strong>Response:</strong> {response}
//       </div>
//       <button onClick={handleChat}>Ask OpenRouter.ai</button>
//     </div>
//   );
// };

// export default OpenRouterChat;
// Assuming these are part of the 'langchain' package
import { ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate, MessagesPlaceholder } from 'langchain/prompts';
import { ConversationChain } from 'langchain/chains';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { BufferMemory } from 'langchain/memory';

const memory = new BufferMemory({
  returnMessages: true,
  memoryKey: 'history',
});

export const davinci = async (prompt) => {
  const chatPrompt = ChatPromptTemplate.fromMessages([
    SystemMessagePromptTemplate.fromTemplate(
      'The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context and always responds in markdown format. If the AI does not know the answer to a question, it truthfully says it does not know.'
    ),
    new MessagesPlaceholder('history'),
    HumanMessagePromptTemplate.fromTemplate('{input}'),
  ]);
  
  const model = new ChatOpenAI({
    openAIApiKey: "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",
    model: 'gpt-3.5-turbo',
    temperature: 0.3,
  });

  const chain = new ConversationChain({
    memory: memory,
    prompt: chatPrompt,
    llm: model,
  });

  const response = await chain.call({ input: prompt });
  console.log(response);

  return response.response;
};

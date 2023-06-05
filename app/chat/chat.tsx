import { ChatInfo } from '@/types';
import useStore from '../store';
import { useState } from 'react';

export default function Chat({ id: chatId }: Pick<ChatInfo, 'id'>) {
  const [instanceId, token, messageHistory] = useStore((state) => [
    state.instanceId,
    state.token,
    state.messageHistory,
  ]);
  const [message, messageSet] = useState('');
  
  const body = {
	chatId: chatId,
	count: 2000,
  };

  if (!messageHistory[chatId]) {
    getChatHistory();
  }


  async function sendMessage() {
    const body = {
      chatId: chatId,
      message: message,
    };
    const request = await fetch(
      `https://api.green-api.com/waInstance${instanceId}/sendMessage/${token}`,
      {
        method: 'POST',
        body: JSON.stringify(body),
      }
    );
    const data = (await request.json()) as { idMessage: string };

    useStore.setState((state) => ({
      messageHistory: {
        ...messageHistory,
        [chatId]: [
          ...messageHistory[chatId],
          {
            type: 'outgoing',
            idMessage: data.idMessage,
            timestamp: new Date().getTime(),
            typeMessage: 'textMessage',
            chatId,
            textMessage: message,
            statusMessage: 'sent',
            sendByApi: true,
          },
        ],
      },
    }));

    messageSet('');
  }

  async function getChatHistory() {
    const request = await fetch(
      `https://api.green-api.com/waInstance${instanceId}/getChatHistory/${token}`,
      {
        method: 'POST',
        body: JSON.stringify(body),
      }
    );
    const data = await request.json();

    data.reverse();
    console.log(data);

    useStore.setState((state) => ({
      messageHistory: { ...messageHistory, [chatId]: data },
    }));
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center gap-4 h-16 px-4 py-2 bg-[#f0f2f5]">
        <div className="w-9 h-9 rounded-full bg-gray-500" />
        <h2 className="text-base font-normal">{chatId}</h2>
      </div>
      <div className="flex flex-col flex-grow gap-1 overflow-auto w-full h-96 px-16 py-6">
        {messageHistory &&
          messageHistory[chatId]?.map((message) =>
            message.type === 'outgoing' ? (
              <div
                key={message.idMessage}
                className="flex w-full justify-end max-w-2/3"
              >
                <div className="bg-[#d9fdd3] rounded-md p-1 px-2">
                  {message.textMessage ?? (
                    <div className="text-gray-400">
                      Тип сообщения не поддерживается
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div
                key={message.idMessage}
                className="flex w-full justify-start max-w-2/3"
              >
                <div className="bg-white rounded-md p-1 px-2">
                  {message.textMessage ?? (
                    <div className="text-gray-400">
                      Тип сообщения не поддерживается
                    </div>
                  )}
                </div>
              </div>
            )
          )}
      </div>
      <div className="flex justify-between items-center gap-4 h-16 px-4 py-2 bg-[#f0f2f5]">
        <svg
          viewBox="0 0 24 24"
          height="24"
          width="24"
          preserveAspectRatio="xMidYMid meet"
          version="1.1"
          x="0px"
          y="0px"
          enable-background="new 0 0 24 24"
        >
          <path
            fill="#54656f"
            d="M9.153,11.603c0.795,0,1.439-0.879,1.439-1.962S9.948,7.679,9.153,7.679 S7.714,8.558,7.714,9.641S8.358,11.603,9.153,11.603z M5.949,12.965c-0.026-0.307-0.131,5.218,6.063,5.551 c6.066-0.25,6.066-5.551,6.066-5.551C12,14.381,5.949,12.965,5.949,12.965z M17.312,14.073c0,0-0.669,1.959-5.051,1.959 c-3.505,0-5.388-1.164-5.607-1.959C6.654,14.073,12.566,15.128,17.312,14.073z M11.804,1.011c-6.195,0-10.826,5.022-10.826,11.217 s4.826,10.761,11.021,10.761S23.02,18.423,23.02,12.228C23.021,6.033,17.999,1.011,11.804,1.011z M12,21.354 c-5.273,0-9.381-3.886-9.381-9.159s3.942-9.548,9.215-9.548s9.548,4.275,9.548,9.548C21.381,17.467,17.273,21.354,12,21.354z  M15.108,11.603c0.795,0,1.439-0.879,1.439-1.962s-0.644-1.962-1.439-1.962s-1.439,0.879-1.439,1.962S14.313,11.603,15.108,11.603z"
          ></path>
        </svg>
        <svg
          viewBox="0 0 24 24"
          height="24"
          width="24"
          preserveAspectRatio="xMidYMid meet"
          version="1.1"
          x="0px"
          y="0px"
          enable-background="new 0 0 24 24"
        >
          <path
            fill="#54656f"
            d="M1.816,15.556v0.002c0,1.502,0.584,2.912,1.646,3.972s2.472,1.647,3.974,1.647 c1.501,0,2.91-0.584,3.972-1.645l9.547-9.548c0.769-0.768,1.147-1.767,1.058-2.817c-0.079-0.968-0.548-1.927-1.319-2.698 c-1.594-1.592-4.068-1.711-5.517-0.262l-7.916,7.915c-0.881,0.881-0.792,2.25,0.214,3.261c0.959,0.958,2.423,1.053,3.263,0.215 c0,0,3.817-3.818,5.511-5.512c0.28-0.28,0.267-0.722,0.053-0.936c-0.08-0.08-0.164-0.164-0.244-0.244 c-0.191-0.191-0.567-0.349-0.957,0.04c-1.699,1.699-5.506,5.506-5.506,5.506c-0.18,0.18-0.635,0.127-0.976-0.214 c-0.098-0.097-0.576-0.613-0.213-0.973l7.915-7.917c0.818-0.817,2.267-0.699,3.23,0.262c0.5,0.501,0.802,1.1,0.849,1.685 c0.051,0.573-0.156,1.111-0.589,1.543l-9.547,9.549c-0.756,0.757-1.761,1.171-2.829,1.171c-1.07,0-2.074-0.417-2.83-1.173 c-0.755-0.755-1.172-1.759-1.172-2.828l0,0c0-1.071,0.415-2.076,1.172-2.83c0,0,5.322-5.324,7.209-7.211 c0.157-0.157,0.264-0.579,0.028-0.814c-0.137-0.137-0.21-0.21-0.342-0.342c-0.2-0.2-0.553-0.263-0.834,0.018 c-1.895,1.895-7.205,7.207-7.205,7.207C2.4,12.645,1.816,14.056,1.816,15.556z"
          ></path>
        </svg>
        <input
          type="text"
          className="flex-grow h-full rounded-md p-4 focus:outline-none"
          placeholder="Введите сообщение"
          value={message}
          onChange={(e) => messageSet(e.target.value)}
        />
        <button onClick={sendMessage}>
          <svg
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            version="1.1"
            x="0px"
            y="0px"
            enable-background="new 0 0 24 24"
          >
            <path
              fill="#54656f"
              d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

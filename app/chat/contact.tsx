'use client';
import useSWR from 'swr';
import useStore from '../store';
import { ChatInfo } from '@/types';

export default function Contact({ id: chatId }: Pick<ChatInfo, 'id'>) {
  const [messageHistory] = useStore((state) => [state.messageHistory]);

  
  const lastMessage =
    messageHistory[chatId] &&
    messageHistory[chatId][messageHistory[chatId].length - 1]?.textMessage;

  const timestamp =
    messageHistory[chatId] &&
    messageHistory[chatId][messageHistory[chatId].length - 1]?.timestamp;

  let dateTime: number | string = '';

  if (!timestamp) {
    dateTime = '';
  } else if (Date.now() - timestamp * 1000 < 3600 * 24 * 1000) {
    dateTime = new Date(timestamp).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } else if (Date.now() - timestamp * 1000 < 3600 * 24 * 7 * 1000) {
    dateTime = new Date(timestamp)
      .toLocaleTimeString('ru-RU', {
        weekday: 'long',
      })
      .split(' ')[0];
    console.log(2);
  } else {
    dateTime = new Date(timestamp).toLocaleDateString();
  }

  return (
    <div className="flex gap-3 p-4 hover:bg-[#f0f2f5]">
      <div className="w-12 h-12 rounded-full bg-gray-500" />
      <div className="flex flex-grow flex-col gap-1">
        <div className="flex justify-between items-baseline">
          <h3>{chatId}</h3>
          <h6>{dateTime}</h6>
        </div>
        <p className="">
          {lastMessage?.length > 30
            ? lastMessage.slice(0, 30) + '...'
            : lastMessage}
        </p>
      </div>
    </div>
  );
}

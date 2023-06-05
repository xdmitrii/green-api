import { useState } from 'react';
import useStore from '../store';

export default function SearchBar() {
  const [phone, phoneSet] = useState('');
  const [instanceId, token, chatList] = useStore((state) => [
    state.instanceId,
    state.token,
    state.chatList,
  ]);

  
  //regexp for phone input

  return (
    <>
      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => phoneSet(e.target.value)}
        name="phone"
      />
      <button onClick={() => {}}>Create a new chat</button>
      <button onClick={() => phoneSet('')}>Clear input</button>
    </>
  );
}

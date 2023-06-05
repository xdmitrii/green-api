'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useStore from '../store';

export default function Login() {
  const [instance, instanceSet] = useState('');
  const [token, tokenSet] = useState(
    ''
  );
  const [error, errorSet] = useState('');
  const router = useRouter();

  async function handleLogin() {
    try {
      const request = await fetch(
        `https://api.green-api.com/waInstance${instance}/getStateInstance/${token}`
      );
      const { stateInstance } = await request.json();
      if (stateInstance === 'authorized') {
        useStore.setState((state) => ({
          instanceId: instance,
          token: token,
        }));
        router.push('/chat');
      }
      errorSet('');
    } catch (error) {
      errorSet("Введите верные данные");
      console.log('Error', error);
    }
  }

  return (
    <main className="flex bg-[#f0f2f5] h-screen w-full items-center justify-center">
      <div className="relative bg-white rounded-lg shadow w-full max-w-md max-h-full p-8 m-8">
        <h1 className="mb-4 text-xl font-medium text-gray-900">
          Вход в чат Green API
        </h1>
        <label
          className="block mb-2 text-sm font-medium text-gray-900"
          htmlFor="instance"
        >
          Instance id
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          type="number"
          id="instance"
          placeholder="1101276229"
          value={instance}
          name="instance"
          onChange={(e) => instanceSet(e.target.value)}
          required
        />
        <br />
        <label
          className="block mb-2 text-sm font-medium text-gray-900"
          htmlFor="key"
        >
          API key
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          type="text"
          id="key"
          placeholder="	5cfd2c4e57ab716de0d9392d3a12b66ec52685..."
          value={token}
          name="token"
          onChange={(e) => tokenSet(e.target.value)}
        />
        <br />
        {error && <h6 className="pb-2 text-red-500 -mt-2">{error}</h6>}

        <button
          className="w-full text-white bg-[#00a884] hover:bg-[#029676] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 text-center"
          onClick={handleLogin}
        >
          Войти
        </button>
        <div className="text-sm font-medium text-gray-500">
          Нет аккаунта?{' '}
          <a
            href="https://green-api.com/"
            target="_blank"
            className="text-[#029676] hover:underline"
          >
            Создать тестовый аккаунт
          </a>
        </div>
      </div>
    </main>
  );
}

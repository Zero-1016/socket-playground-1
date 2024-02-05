'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function Home() {
  const [socket, setSocket] = useState<any>(undefined);
  const [inbox, setInbox] = useState<any>(['hello', 'nice']);
  const [message, setMessage] = useState('');
  const [roomName, setRoomName] = useState('');

  const handleMessage = () => {
    socket.emit('message', message, roomName);
  };

  const handleJoinRoom = () => {
    socket.emit('joinRoom', roomName);
  };

  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('message', (message) => {
      setInbox((prev: any[]) => [...prev, message]);
    });

    setSocket(socket);
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-5 mt-20 px-10 lg:px-48">
        {/* Showing the messages */}
        <div className="flex flex-col gap-2 border rounded-lg p-10">
          {inbox.map((message: string, index: number) => (
            <div key={index} className="border rounded px-4 py-2">
              {message}
            </div>
          ))}
        </div>

        <div className="flex gap-2 align-center justify-center">
          <input
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            type="text"
            name="message"
            className="flex-1 bg-black border rounded px-2 py-1"
          />
          <button onClick={handleMessage} className="w-40">
            Send Message
          </button>
        </div>

        <div className="flex gap-2 align-center justify-center">
          <input
            onChange={(e) => {
              setRoomName(e.target.value);
            }}
            type="text"
            name="message"
            className="flex-1 bg-black border rounded px-2 py-1"
          />
          <button onClick={handleJoinRoom} className="w-40">
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}

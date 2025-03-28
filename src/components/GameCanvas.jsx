import React, { useRef, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import io from 'socket.io-client';

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const { isSignedIn, userId, getToken } = useAuth();

  useEffect(() => {
    if (!isSignedIn) return;

    const initSocket = async () => {
      const token = await getToken();
      console.log('Clerk token:', token);
      const socket = io('http://localhost:3000', {
        auth: { token, userId },
        transports: ['websocket', 'polling'],
      });

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      ctx.fillRect(10, 250, 10, 100);
      ctx.fillRect(780, 250, 10, 100);

      socket.on('connect', () => {
        console.log('Connected to server as', userId);
        socket.emit('join', { userId });
      });

      socket.on('connect_error', (err) => {
        console.error('Connection error:', err.message);
      });

      socket.on('error', (err) => {
        console.error('Socket error:', err);
      });

      return () => {
        socket.disconnect();
      };
    };

    initSocket();
  }, [isSignedIn, userId, getToken]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="border-2 border-black"
    />
  );
};

export default GameCanvas;
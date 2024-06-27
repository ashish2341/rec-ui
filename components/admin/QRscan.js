"use client"
import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

const QRCodeFunction = (id) => {
  const qrCanvasRef = useRef(null);
  const userId = id?.id;

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const url = "http://recadmin-001-site2.etempurl.com/builderFE/" + userId;
        console.log("url",url);
        await QRCode.toCanvas(qrCanvasRef.current, url, { width: 200 });
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQRCode();
  }, [id]);

  return (
    <div className="grid justify-center">
      <h2 className='font-bold text-gray-500 mb-2'>Scan this QR Code For Property Details </h2>
      <canvas className='mx-auto' ref={qrCanvasRef} width="200" height="200"></canvas>
    </div>
  );
};

export default QRCodeFunction;

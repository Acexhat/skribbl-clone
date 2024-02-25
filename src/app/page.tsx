"use client";

import Image from "next/image";
import { LegacyRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import backgroundImage from "../assets/cool-background.png";
import MenuBar from "@/components/menuBar";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasParentRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const startDrawing = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    setIsDrawing(true);
    draw(e);
  };

  const eraseCanvas = () => {
    if (canvasRef.current) {
      try {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context?.clearRect(0, 0, canvas.width, canvas.height);
      } catch (err) {
        console.log("Error encountered while erasing canvas", err);
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (!isDrawing || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (context) {
      context.lineWidth = 3;
      context.lineCap = "round";
      context.strokeStyle = "#000";

      context.lineTo(
        e.clientX - canvas.offsetLeft,
        e.clientY - canvas.offsetTop
      );
      context.stroke();
      context.beginPath();
      context.moveTo(
        e.clientX - canvas.offsetLeft,
        e.clientY - canvas.offsetTop
      );
    }
  };

  const stopDrawing = (): void => {
    setIsDrawing(false);
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.beginPath();
      }
    }
  };

  useEffect(() => {
    if (canvasParentRef.current && canvasRef.current) {
      canvasRef.current.height = canvasParentRef.current.offsetHeight;
      canvasRef.current.width = canvasParentRef.current.offsetWidth;
    }
  }, []);

  return (
    <main className="h-screen w-screen flex bg-white">
      <div className="absolute z-0 h-screen w-screen top-0 left-0">
        <Image
          src={backgroundImage}
          layout="fill"
          objectFit="cover"
          quality={100}
          alt="background-img"
        />
      </div>
      <div className="h-full w-full flex justify-center items-center z-10">
        <div className="h-full w-full flex flex-row justify-center items-center">
          <div
            className="bg-white h-[50%] w-[60%] rounded-[8px] shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            ref={canvasParentRef}
          >
            <canvas ref={canvasRef}></canvas>
          </div>
          <MenuBar eraseCanvas={eraseCanvas} />
        </div>
      </div>
    </main>
  );
}

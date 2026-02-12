
import React, { useEffect, useRef } from 'react';

interface SkeletonOverlayProps {
  active: boolean;
}

const SkeletonOverlay: React.FC<SkeletonOverlayProps> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const drawSkeleton = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const width = canvas.width;
      const height = canvas.height;

      // Simulate hand keypoints
      const drawHand = (offsetX: number, offsetY: number, side: 'left' | 'right') => {
        const t = time * 0.002;
        const basePoint = {
          x: offsetX + Math.sin(t) * 10,
          y: offsetY + Math.cos(t * 1.5) * 10
        };

        ctx.strokeStyle = '#22d3ee'; // Cyan 400
        ctx.fillStyle = '#22d3ee';
        ctx.lineWidth = 2;

        // Wrist
        ctx.beginPath();
        ctx.arc(basePoint.x, basePoint.y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Fingers simulation
        for (let i = 0; i < 5; i++) {
          const angle = (i * 0.4) - 0.8 + (side === 'left' ? -0.2 : 0.2);
          const fingerLength = 40 + Math.sin(t + i) * 5;
          
          const endX = basePoint.x + Math.sin(angle) * fingerLength;
          const endY = basePoint.y - Math.cos(angle) * fingerLength;

          ctx.beginPath();
          ctx.moveTo(basePoint.x, basePoint.y);
          ctx.lineTo(endX, endY);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(endX, endY, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      };

      drawHand(width * 0.3, height * 0.6, 'left');
      drawHand(width * 0.7, height * 0.6, 'right');

      animationFrameId = requestAnimationFrame(drawSkeleton);
    };

    animationFrameId = requestAnimationFrame(drawSkeleton);
    return () => cancelAnimationFrame(animationFrameId);
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
      width={1280}
      height={720}
    />
  );
};

export default SkeletonOverlay;

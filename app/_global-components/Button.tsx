"use client";

import { useRouter } from "next/navigation";

interface ButtonProps {
  title: string;
  pushPath?: string;
  color: string;
}

export const Button = ({ title, pushPath, color }: ButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (!pushPath) return;
    router.push(`${pushPath}`);
  };

  return (
    <button
      onClick={handleClick}
      style={{ backgroundColor: color }}
      className={`m-3 text-white px-4 py-2 rounded text-shadow-lg hover:opacity-80`}
    >
      {title}
    </button>
  );
};

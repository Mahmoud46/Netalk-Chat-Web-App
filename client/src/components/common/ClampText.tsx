import { useState, useEffect } from "react";

const clampClassMap: Record<number, string> = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
  6: "line-clamp-6",
};

const ClampText = ({
  text,
  className = "",
  clampLines = 1,
}: {
  text: string;
  className?: string;
  clampLines?: number;
}) => {
  const [isClamp, setIsClamp] = useState<boolean>(true);

  useEffect(() => {
    const reset = () => {
      setIsClamp(true);
    };
    reset();
  }, [clampLines, text]);

  const toggleClamp = () => setIsClamp((prev) => !prev);

  // Fallback to line-clamp-none if isClamp is false
  const activeClampClass = isClamp
    ? (clampClassMap[clampLines] ?? "line-clamp-1")
    : "line-clamp-none";

  return (
    <p
      className={`${className} ${activeClampClass} cursor-pointer`}
      onClick={toggleClamp}
    >
      {text}
    </p>
  );
};

export default ClampText;

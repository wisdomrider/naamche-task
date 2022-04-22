import { useState } from "react";

export const useLoadingHook = () => {
  const [isLoading, setIsLoading] = useState(false);

  return {
    isLoading,
    start: () => setIsLoading(true),
    end: () => setIsLoading(false),
  };
};

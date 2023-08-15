import { useState, useEffect } from "react";

const getStorageValue = (key: string, defaultValue: unknown) => {
  let initial;
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    try {
      initial = saved !== null ? JSON.parse(saved) : defaultValue;
    } catch (error) {
      console.log(error);
    }
    return initial;
  }
};

export const useLocalStorage = (key: string, defaultValue: unknown) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

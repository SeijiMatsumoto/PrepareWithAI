"use client"
import { useState } from 'react'

type LocalStorageKey = string;
type LocalStorageValue = string | null;

const useLocalStorage = (
  key: LocalStorageKey,
  initialValue: LocalStorageValue
): [LocalStorageValue, (newValue: LocalStorageValue) => void] => {
  const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage;

  const storedValue = isLocalStorageAvailable ? localStorage.getItem(key) : null;
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState<LocalStorageValue>(initial);

  const setStoredValue = (newValue: LocalStorageValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
};


export default useLocalStorage
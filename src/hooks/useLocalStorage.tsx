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
  const initial = storedValue ? storedValue : initialValue;

  const [value, setValue] = useState<LocalStorageValue>(initial);

  const setStoredValue = (newValue: LocalStorageValue) => {
    setValue(newValue);
    if (newValue === null || typeof newValue === 'string') {
      localStorage.setItem(key, newValue as string);
    } else {
      console.error('Invalid value type. Only string or null are allowed for localStorage.');
    }
  };

  return [value, setStoredValue];
};


export default useLocalStorage
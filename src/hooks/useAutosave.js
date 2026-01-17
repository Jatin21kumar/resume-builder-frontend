import { useEffect, useRef } from "react";

export default function useAutosave(value, onSave, delay = 800) {
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    const timeout = setTimeout(() => {
      onSave(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, onSave, delay]);
}

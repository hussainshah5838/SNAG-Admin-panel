import { useEffect, useState } from "react";
export default function useDebounce(value, delay = 400) {
  const [v, set] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => set(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

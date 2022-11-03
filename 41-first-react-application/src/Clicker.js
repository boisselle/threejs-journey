import { useRef, useEffect, useState } from "react";

export default function Clicker({ increment, keyName, color }) {
  console.log(keyName);
  const [count, setCount] = useState(
    parseInt(localStorage.getItem(keyName) ?? 0)
  );

  const buttonRef = useRef();

  useEffect(() => {
    buttonRef.current.style.backgroundColor = "papayawhip";
    buttonRef.current.style.color = "salmon";

    return () => {
      localStorage.removeItem(keyName);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(keyName, count);
  }, [count]);

  const buttonClick = () => {
    setCount(count + 1);
    increment();
  };

  return (
    <div>
      <div style={{ color: color }}>Click counts: {count}</div>
      <button ref={buttonRef} onClick={buttonClick}>
        Click me
      </button>
    </div>
  );
}

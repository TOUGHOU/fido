import { useState } from "react";

export const Layout = () => {
  const [count, setCount] = useState(1);
  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>add</button>
    </div>
  );
};

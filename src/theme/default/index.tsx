import { useState } from "react";
import { Content } from "@runtime";

export const Layout = () => {
  const [count, setCount] = useState(1);
  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>add</button>

      <Content />
    </div>
  );
};

import { useState } from "react";
import { Button } from "react-bootstrap";

const App = () => {
  const [clickCount, setClickCount] = useState(0);

  return (
    <Button
      onClick={() => {
        setClickCount(clickCount + 1);
      }}
    >
      Clicked {clickCount} times
    </Button>
  );
};

export default App;

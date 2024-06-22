import { useState } from 'react';
import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';
import { PopupLayout } from '../component/Layout/PopupLayout';

function App() {
  const [count, setCount] = useState(0);

  return (
    <PopupLayout>
      <h1 className="text-xl">WXT + React + Tailwindcss</h1>
      <button className="text-lg" onClick={() => setCount(count => count + 1)}>
        count is {count}
      </button>
    </PopupLayout>
  );
}

export default App;

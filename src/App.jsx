import { useState } from "react";
import { Dashboard } from "./pages/dashboard";
import { ConfigProvider } from "antd";
import { primaryColor } from "./config/config";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: `"Open Sans", sans-serif`,
            colorPrimary: primaryColor,
          },
        }}
      >
        <Dashboard />
      </ConfigProvider>
    </>
  );
}

export default App;

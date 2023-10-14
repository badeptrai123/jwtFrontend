import { useContext } from "react";
import AppRoute from "./routes/AppRoute";
import { UserContext } from "./context/UserContext";
import { CirclesWithBar } from "react-loader-spinner";
import "./App.scss";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useState } from "react";
import { useEffect } from "react";
function App() {
  const { user } = useContext(UserContext);
  const [scrollHeight, setScrollHeight] = useState(0);
  useEffect(() => {
    let windowHeight = window.innerHeight;
    setScrollHeight(windowHeight);
  }, []);
  return (
    <Scrollbars autoHide style={{ height: scrollHeight }}>
      {user && user.isLoading ? (
        <div className="loading-container">
          <CirclesWithBar
            height="100"
            width="100"
            color="#0866FF"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            outerCircleColor=""
            innerCircleColor=""
            barColor=""
            ariaLabel="circles-with-bar-loading"
          />
          <div className="mt-2">Loading data</div>
        </div>
      ) : (
        <AppRoute />
      )}
    </Scrollbars>
  );
}

export default App;

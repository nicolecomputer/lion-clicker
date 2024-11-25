import "./App.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import LionClicker from "./lion-clicker";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LionClicker />
      </PersistGate>
    </Provider>
  );
}

export default App;

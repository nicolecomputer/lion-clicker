import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import LionClicker from "./lion-clicker";

function App() {
  return (
    <Provider store={store}>
      <LionClicker />
    </Provider>
  );
}

export default App;

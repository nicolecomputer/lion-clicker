import Loading from "./Loading";
import Game from "./Game";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const LionClicker = () => {
    const connected: boolean = useSelector((state: RootState) =>
        state.connection.isConnected
    );

    if (connected) {
        return <Game />;
    }

    return <Loading />;
};

export default LionClicker;

import { useSelector } from "react-redux";
import { RootState } from "../store";

export function ClickCounter() {
    const yourClicks = useSelector((state: RootState) => state.game.clicks);
    const globalClicks = useSelector((state: RootState) =>
        state.game.globalState.totalClicks
    );

    return (
        <div
            style={{
                textAlign: "center",
            }}
        >
            <p
                style={{
                    margin: 0,
                    padding: 0,
                    fontSize: 24,
                    color: "lightpink",
                }}
            >
                Lion has received: {globalClicks} clicks today
            </p>
            <p
                style={{
                    fontSize: 16,
                    fontWeight: "bold",
                }}
            >
                You have given him {yourClicks} of 'em
            </p>
        </div>
    );
}

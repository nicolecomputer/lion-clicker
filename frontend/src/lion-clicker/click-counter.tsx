import { useSelector } from "react-redux";
import { RootState } from "../store";

export function ClickCounter() {
    const totalClick = 1000;
    const yourClicks = useSelector((state: RootState) => state.game.clicks);

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
                Lion has received: {totalClick + yourClicks} clicks today
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

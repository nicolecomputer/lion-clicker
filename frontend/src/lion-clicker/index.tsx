import lion from "../assets/false-lion.svg";
import { ClickCounter } from "./click-counter";
import { MouseClick } from "./mouse-click";
const styles = {
    container: {
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    count: {
        marginBottom: "1rem",
    },
};

const LionClicker = () => {
    return (
        <div style={styles.container}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                }}
            >
                <ClickCounter />
                <img src={lion} height={200} />
                <MouseClick />
            </div>
        </div>
    );
};

export default LionClicker;

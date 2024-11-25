import { useGameStore } from "../store/";
import lion from "../assets/false-lion.svg";
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
    const clicks = useGameStore((state) => state.clicks);
    const addClick = useGameStore((state) => state.addClick);

    return (
        <div style={styles.container}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                }}
            >
                <div style={styles.count}>
                    <h1>Lions has received {clicks} Clicks</h1>
                </div>
                <img src={lion} height={200} />
                <button
                    onClick={addClick}
                    style={{
                        height: 80,
                        backgroundColor: "red",
                        color: "white",
                        fontSize: 44,
                    }}
                >
                    Click
                </button>
            </div>
        </div>
    );
};

export default LionClicker;

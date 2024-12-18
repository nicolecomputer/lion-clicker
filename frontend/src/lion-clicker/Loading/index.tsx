import lion from "../../assets/false-lion.svg";

import "./style.css";

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
};

const Loading = () => {
    return (
        <div style={styles.container}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                }}
            >
                <h2 id="loading-message">connecting with lion</h2>
                <img
                    src={lion}
                    height={200}
                    style={{
                        filter: "brightness(20%)",
                    }}
                />
            </div>
        </div>
    );
};

export default Loading;

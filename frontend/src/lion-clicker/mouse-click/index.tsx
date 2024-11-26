import { useDispatch } from "react-redux";
import { addClick } from "../../store/game-slice";

import "./index.css";

export function MouseClick() {
    const dispatch = useDispatch();

    return (
        <button
            id="mouse-button-click"
            onClick={() => dispatch(addClick())}
            style={{}}
        >
            Click
        </button>
    );
}

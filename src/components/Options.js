import React from "react";

const Options = ({ handleChange, difficult, fun, handleData }) => {
    return (
        <div className="options">
            <div className="optioncheckboxes">
                <span>
                    <input
                        type="checkbox"
                        name="fun"
                        value="Fun"
                        onChange={handleChange}
                        checked={fun}
                    />
                    <label htmlFor="fun">&nbsp;Fun</label>
                </span>
                <span>
                    <input
                        type="checkbox"
                        name="difficult"
                        value="Difficult"
                        onChange={handleChange}
                        checked={difficult}
                    />
                    <label htmlFor="difficult">&nbsp;Difficult</label>
                </span>
            </div>
            <button onClick={handleData}>Bargraph</button>
            <button onClick={handleData}>Line-Chart</button>
            <button onClick={handleData}>Spreadsheet</button>
        </div>
    );
}

export default Options;
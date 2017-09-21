import React from 'react';
import './Popup.css';

const Popup = (props) => (
    <div id="dimmed-layer">
        <div id="popup">
            <h1>You succeed with {props.trialCount} trials! :)</h1>
            <button className="popup_btn" onClick={props.clickedConfirmButton}>Confirm!</button>
        </div>
    </div>
);
export default Popup;

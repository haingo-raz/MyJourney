import React from 'react';
import './Modal.scss';

function Modal(props) {
    return (
        <>
            <div className="backdrop"></div>
            <div className="modal">
                <span className="close">X</span>
                <h1>5 proven ways to combat stress</h1>
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>1</li>
                    <li>2</li>
                    <li>1</li>
                    <li>2</li>
                </ul>
            </div>
        </>  
    );
}

export default Modal;
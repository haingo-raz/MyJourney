import React from 'react';
import { Link } from 'react-router-dom';
import './Modal.scss';

function Modal({title, advice1, advice2, advice3, advice4, advice5}) {
    return (
        <>
            <div className="backdrop"></div>
            <div className="modal">
                <span className="close"><Link to="/wellbeing">X</Link></span>
                <h1>{title}</h1>
                <ul>
                    <li>{advice1}</li>
                    <li>{advice2}</li>
                    <li>{advice3}</li>
                    <li>{advice4}</li>
                    <li>{advice5}</li>
                </ul>
            </div>
        </>  
    );
}

export default Modal;
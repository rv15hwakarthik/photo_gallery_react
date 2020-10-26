import React from 'react';
import './style.scss'

function closeModal() {
    const modal = document.getElementById('imageModal');
    if(modal) {
        modal.style.display = 'none';
    }
}

function Modal({url}) {

    return (
        <div id="imageModal" className="modal" style={{display: 'none'}}>
            <div className="modal__content">
                <div className="modal__content__header">
                    <button onClick={closeModal}>x</button>
                </div>
                <div className="modal__content__body">
                    <img src={url} alt="selected"></img>
                </div>
            </div>
        </div>
    )
}

export default Modal;
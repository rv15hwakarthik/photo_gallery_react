import React from 'react';
import './style.scss'

function closeModal() {
    const modal = document.getElementById('imageModal');
    if(modal) {
        modal.style.display = 'none';
    }
}

function Modal({listOfImages , imageIndex, toggleImage}) {

    return (
        <div id="imageModal" className="modal" style={{display: 'none'}}>
            <div className="modal__content">
                <div className="modal__content__header">
                    <button onClick={closeModal}>x</button>
                </div>
                <div className="modal__content__body">
                    {listOfImages[imageIndex] && listOfImages[imageIndex].urls ?
                    <img src={listOfImages[imageIndex].urls.small} alt="selected"></img>
                    : ''}
                </div>
                <div className="modal__content__footer">
                    <div role="button" onClick={() => toggleImage('left')}>&#8249;</div>
                    <div role="button" onClick={() => toggleImage('right')}>&#8250;</div>
                </div>
            </div>
        </div>
    )
}

export default Modal;
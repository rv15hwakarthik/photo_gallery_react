import React from 'react';
import './style.scss';
import cameraIcon from '../../assets/svgs/camera.svg';

function Header(){

        return (
            <div className="header">
                <div className="header__container">
                    <img src={cameraIcon} alt="camera"></img>
                    <div>Photo Gallery</div>
                </div>
            </div>
        )
}

export default Header;
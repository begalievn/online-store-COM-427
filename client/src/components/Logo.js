import React from 'react';
import alaTooLogo from '../assets/alaToo.png';

const Logo = () => {
    return (
        <div style={{width: '40px', height: '40px', marginRight: '10px'}}>
            <img src={alaTooLogo} alt="logo" style={{ width: '100%', height: '100%'}} />
        </div>
    );
};

export default Logo;

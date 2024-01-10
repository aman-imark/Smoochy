import React, { useState } from 'react';

const LoaderService = () => {
  

  return (
    <>
    <div style={{height: '100vh', width: '100vw', position: 'fixed', background: '#00000075', top: '50%', left: '50%',
                 transform: 'translate(-50%, -50%)',zIndex: 1000}}>
     
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
          <div className="loader"></div>
        </div>
    </div>
    </>
  );
};

export default LoaderService;

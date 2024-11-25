"use client"
import React, { useState, useEffect } from 'react';
import { HandleInternetStatus } from '../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';

const InternetStatus = () => {
    const dispatch = useDispatch()
    // Initial online status based on navigator.onLine4
    const [isOnline, setIsOnline] = useState(typeof window !== 'undefined'?navigator?.onLine:true);

    // Update state when the network status changes
    const handleOnline = () => { dispatch(HandleInternetStatus(true)) };
    const handleOffline = () => { dispatch(HandleInternetStatus(false)) };
    const isInternetStatus = useSelector((state) => state?.user?.isInternet)

    // Set up event listeners for online and offline events
    useEffect(() => {
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []); // Empty array ensures this effect runs only once

    const modalBackdropStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    };

    const modalStyle = {
        backgroundColor: 'white',
        padding: '12px',
        borderRadius: '8px',
        textAlign: 'start',
        width: '',
    };
    return (
        <React.Fragment>
            {isInternetStatus ? null :
                // <div className='flex justify-center items-center' style={{ top: 0, left: 0, height: "100%", width: "100%", position: "absolute", zIndex: 1000000, backgroundColor: "#eae1e1" }}>
                  <div>
                    {/* <div className=''>
        
      You are offline, please check internet connection.
        </div> */}

                    <div style={modalBackdropStyle}>
                        <div style={modalStyle}>
                            <h2 className='text-center'>
                                <strong>
                                You are offline!
                                </strong>
                                </h2>
                            <p><small>
                            It seems you have lost your internet connection.

                            </small>
                                </p>
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>
    );
};

export default InternetStatus;


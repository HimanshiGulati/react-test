import React from 'react';

const HomeContainer = ({ appName, token }) => {
    if (token) {
        return null;
    }
    return (
        <div className="header-container">
            <div className="container-content">
                <h1 className="logo-font">
                    {appName.toLowerCase()}
                </h1>
                <p>A place to share your knowledge.</p>
            </div>
        </div>

    );
};

export default HomeContainer;

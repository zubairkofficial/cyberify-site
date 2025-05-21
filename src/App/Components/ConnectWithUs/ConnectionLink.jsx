import React from 'react';
import Helpers from '../../Config/Helpers';

const ConnectionLink = ({ image, url, platformName }) => {
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div className="d-flex align-items-center gap-3">
                <div className="mil-icon-frame mil-icon-bg me-3">
                    <img
                        src={Helpers.staticImage(image)}
                        alt={`${platformName} logo`}
                        style={{ height: '40px', width: '40px', objectFit: 'contain' }}
                    />
                </div>
                <a
                style={{color:"white"}}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mil-button mil-button-sm mil-accent-bg"
                >
                    Access {platformName}
                </a>
            </div>
        </div>
    );
};

export default ConnectionLink;

import React from 'react';
import ConnectionLink from './ConnectionLink';

const platformData = [
    // { image: 'assets/connect/upwork.png', url: 'https://www.upwork.com/agencies/1519423863074324480/', platformName: 'Upwork' },
    { image: 'favicon.png', url: 'https://www.cyberify.co/', platformName: 'Cyberify' },
    { image: 'connect/facebook.png', url: 'https://www.facebook.com/CyberifyOfficial/', platformName: 'Facebook' },
    { image: 'connect/instagram.png', url: 'https://www.instagram.com/cyberifyofficials/', platformName: 'Instagram' },
    { image: 'connect/linkedin.png', url: 'https://uk.linkedin.com/company/cyberifyai', platformName: 'LinkedIn' },
    { image: 'connect/location.png', url: 'https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYOzIGCAQQRRg8MgYIBRBFGDwyBggGEEUYQTIGCAcQRRhB0gEIMjYwN2owajeoAgCwAgA&um=1&ie=UTF-8&fb=1&gl=pk&sa=X&geocode=KZlp5guQNTs5Mb4Ur6HMO0Fe&daddr=Bhatti+Rd,+Bahadurpur+Multan', platformName: 'Location' },
    // Add more platforms here
];

const ConnectionLinks = () => {
    return (
        <div className="mil-mb-60 mil-mt-60">
            <div className="mil-deco" style={{ top: 0}}></div>
            <div className="container" >
                <h1 className="text-center mil-mb-60">Join The <span className="mil-accent">Cyberify</span> Experience</h1>
                <div className="row">
                    {platformData.map((platform, index) => (
                        <ConnectionLink
                            key={index}
                            image={platform.image}
                            url={platform.url}
                            platformName={platform.platformName}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ConnectionLinks;

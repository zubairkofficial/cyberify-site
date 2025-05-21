import Helpers from "../Config/Helpers";

const PageBanner = ({ pageName, description = "", children, bannerImage = "" }) => {
    return (
        <div className="mil-banner-sm mil-deep-bg">
            <img src={bannerImage ? Helpers.serverImage(bannerImage) : Helpers.staticImage(`img/deco/map.png`)} alt="background" className="mil-background-image" />
            <div className="mil-deco mil-deco-accent" style={{ top: '47%', right: '10%', transform: 'rotate(90deg)' }}></div>
            <div className="mil-banner-content">
                <div className="container mil-relative">
                    {children}
                    <h1 className="mil-uppercase">{pageName}</h1>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}

export default PageBanner;
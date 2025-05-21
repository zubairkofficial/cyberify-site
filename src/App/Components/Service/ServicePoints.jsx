const SinglePoint = ({ point, index }) => {
    return (
        <div className="col-xl-4">
            <div className="mil-hover-card mil-box-center mil-mb-30">
                <div className="mil-deco mil-deco-accent" style={{top: '-10%', right: '-10%'}} ></div>
                <div className="mil-icon-frame mil-icon-frame-md mil-icon-bg mil-mb-30">
                    <h3>0{index + 1}</h3>
                </div>
                <h5 className="mil-mb-30">{ point.name }</h5>
                <p>{ point.description }</p>
            </div>
        </div>
    );
}


const ServicePoints = ({ service }) => {
    return (
        <section className="mil-p-120-90">
            <div className="container">
                <div className="row">
                    <div className="col-xl-7">
                        <h2 className="mil-mb-30">Explore <span className="mil-accent">{ service.name }</span></h2>
                    </div>
                </div>
                <div className="row">
                    {service.service_points.map((point, index) => {
                        return <SinglePoint key={index} index={index} point={point} />
                    })}
                </div>
            </div>
        </section>
    );
}

export default ServicePoints;
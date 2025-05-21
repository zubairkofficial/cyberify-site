import Helpers from "../../Config/Helpers";

const Partners = () => {
    return (
        <div className="mil-partners mil-p-90-60">
            <div className="container">
                <div className="mil-partners-frame">
                    <a href="#."><img src={Helpers.staticImage('images/logos/j&j.png')} alt="partner" /></a>
                    <a href="#."><img src={Helpers.staticImage('images/logos/atlassian.png')} alt="partner" /></a>
                    <a href="#."><img src={Helpers.staticImage('images/logos/clockin.png')} alt="partner" /></a>
                    <a href="#."><img src={Helpers.staticImage('images/logos/kubico.png')} alt="partner" /></a>
                    <a href="#."><img src={Helpers.staticImage('images/logos/legal-master.png')} alt="partner" /></a>
                    <a href="#."><img src={Helpers.staticImage('images/logos/ecomemail.png')} alt="partner" /></a>
                </div>
            </div>
        </div>
    )
}

export default Partners;
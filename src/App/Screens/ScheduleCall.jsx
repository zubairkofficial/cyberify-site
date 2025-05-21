import { Helmet } from "react-helmet";
import PageBanner from "../Components/Banner";
import { InlineWidget } from "react-calendly";

const ScheduleCall = () => {
    return (
        <>
            <Helmet>
                <title>Schedule Consultation - Cyberify</title>
                <link rel="canonical" href="https://www.cyberify.co/schedule-consulation" />
            </Helmet>
            <PageBanner pageName={"Schedule Consultation"} description="Schedule your consultation with Cyberify to discuss how we can transform and optimize your business together." />
            <section className="mil-p-120-120">
                <div className="container">
                    <div className="mil-deco" style={{ top: 0, right: '30%' }}></div>
                    <div className="row">
                        <div className="col-12">
                            <InlineWidget url="https://calendly.com/cyberify-info/discuss-your-idea" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ScheduleCall;
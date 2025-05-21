import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";
import PageBanner from "../Components/Banner";
import Divider from "../Components/Home/Divider";
import Helpers from "../Config/Helpers";
import { useState } from "react";
import axios from 'axios';


const ContactUs = () => {

    const defaultContact = {
        name: "",
        email_address: "",
        phone: "",
        company: "",
        role: "",
        project_details: "",
        file: null,
        budget: "",
    };

    const [form, setForm] = useState(defaultContact);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [files, setFiles] = useState([]);
  

    const submitForm = (e) => {
        e.preventDefault();
        setLoading(true);
        let formdata = form;
        formdata.file = files;
        axios.post(`${Helpers.apiUrl}web/send-contact-request`, axios.toFormData(formdata)).then(response => {
            setForm(defaultContact);
            setFiles([]);
            setShowSuccessMessage(true);
            Helpers.toast("success", response.data.message);
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 5000);
        }).catch(error => {
            setErrors(error.response.data.errors || {});
            Helpers.toast("error", error.response.data.message);
        }).finally(() => {
            setLoading(false);
        });
    }

    const projectFiles = e => {
        let selectedFiles = e.target.files;
        const allFiles = Array.from(selectedFiles).concat(files);
        setFiles(allFiles);
    }

    const removeFile = (fileName) => {
        setFiles(files.filter(file => file.name !== fileName));
    };

    return (
        <>
            <Helmet>
                <title>Contact Us - Cyberify</title>
                <link rel="canonical" href="https://www.cyberify.co/contact-us" />
            </Helmet>

            <PageBanner pageName={"Let’s discuss your project"} />
            <section className="mil-contact mil-p-120-0">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-8 col-xl-8 mil-mb-120">
                            <form>
                                <h4 className="mil-mb-60"><span className="mil-accent">01.</span> Tell Us About Yourself</h4>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="mil-input-frame mil-dark-input mil-mb-30">
                                            <label className="mil-h6 mil-dark"><span>Your Name</span></label>
                                            <input type="text" placeholder="John" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                                            <small className="error">{errors.name ? errors.name[0] : ''}</small>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mil-input-frame mil-dark-input mil-mb-30">
                                            <label className="mil-h6"><span>Email Address</span></label>
                                            <input type="email" placeholder="doe@mydomain.com" value={form.email_address} onChange={e => setForm({ ...form, email_address: e.target.value })} />
                                            <small className="error">{errors.email_address ? errors.email_address[0] : ''}</small>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mil-input-frame mil-dark-input mil-mb-30">
                                            <label className="mil-h6"><span>Phone</span></label>
                                            <input type="text" placeholder="Enter your phone number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                                            <small className="error">{errors.phone ? errors.phone[0] : ''}</small>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mil-input-frame mil-dark-input mil-mb-30">
                                            <label className="mil-h6 mil-dark"><span>Company</span></label>
                                            <input type="text" placeholder="Your company name" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mil-mb-30">
                                        <div className="mil-input-frame mil-dark-input mil-mb-30">
                                            <label className="mil-h6 mil-dark"><span>Role</span></label>
                                            <input type="text" placeholder="Your role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
                                        </div>
                                    </div>
                                </div>

                                <h4 className="mil-mb-60"><span className="mil-accent">02.</span> Tell Us About Your Project</h4>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="mil-input-frame mil-dark-input mil-mb-30">
                                            <label className="mil-h6"><span>Project Description</span></label>
                                            <textarea placeholder="Your Message" className="mil-shortened" value={form.project_details} onChange={e => setForm({ ...form, project_details: e.target.value })}></textarea>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="mil-attach-frame mil-dark mil-mb-30">
                                            <i className="fas fa-paperclip"></i>
                                            <label className="pointer">
                                                <span>Attach your files</span>
                                                <input type="file" id="mil-file-input" className="none" multiple onChange={projectFiles} />
                                            </label>
                                        </div>
                                        <table style={{ width: '100%' }}>
                                            {files.map((file, index) => {
                                                return (
                                                    <tr>
                                                        <td className="mil-dark">{file.name}</td>
                                                        <td><i onClick={() => removeFile(file.name)} className="fas fa-xmark pointer"></i></td>
                                                    </tr>
                                                );
                                            })}
                                        </table>
                                    </div>
                                    <div className="col-lg-12 mil-mb-30 mt20">
                                        <div className="mil-input-frame mil-dark-input mil-mb-30">
                                            <label className="mil-h6 mil-dark"><span>Project Budget ($)</span></label>
                                            <input type="number" placeholder="$1000" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} />
                                        </div>
                                    </div>
                                    {showSuccessMessage && <div className="col-lg-12">
                                        <div className="success-alert-box">
                                            <p>Thank you for contacting Cyberify. Our team will review the details and get back to you ASAP</p>
                                        </div>
                                    </div>}
                                    {!showSuccessMessage && <div className="col-lg-12">
                                        <button className="mil-button mil-border mil-fw" disabled={loading} onClick={submitForm}><span>{loading ? 'Please wait...' : 'Submit Now'}</span></button>
                                    </div>}
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-4 col-xl-3 mil-mb-120">
                            <div className="mil-mb-60">
                                <h5 className="mil-list-title mil-mb-30">Support Request</h5>
                                <p className="mil-mb-20">Our experts are ready to answer your questions.</p>
                                <Link to="#" className="mil-link mil-link-sm"><span>Support Now</span><i className="fas fa-arrow-right"></i></Link>
                            </div>
                            <div className="mil-divider mil-mb-60"></div>
                            <div className="mil-mb-60">
                                <div className="mil-icon-frame mil-icon-frame-md mil-icon-bg mil-mb-30">
                                    <img src={Helpers.staticImage("img/icons/md/8.svg")} alt="icon" />
                                </div>
                                <h5 className="mil-list-title mil-mb-30">Need Help?</h5>
                                <p>For technical questions or billing questions, please contact Customer Care.</p>
                            </div>
                            <div className="mil-mb-60">
                                <div className="mil-icon-frame mil-icon-frame-md mil-icon-bg mil-mb-30">
                                    <img src={Helpers.staticImage("img/icons/md/9.svg")} alt="icon" />
                                </div>
                                <h5 className="mil-list-title mil-mb-30">Needs More Info?</h5>
                                <p>For technical questions or billing questions, please contact Customer Care.</p>
                            </div>
                            <div className="mil-divider mil-mb-60"></div>
                            <a to="#" className="mil-link mil-link-sm mil-mb-15"><span>Legality Guide</span><i className="fas fa-arrow-right"></i></a><br />
                            <a to="#" className="mil-link mil-link-sm"><span>Security Center</span><i className="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </section>
            <Divider />
            <section className="mil-p-120-60">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="mil-mb-60">
                                <h4 className="mil-mb-30">Pakistan</h4>
                                <h5 className="mil-list-title mil-mb-15">Multan</h5>
                                <p className="mil-mb-30">Mubarak Villas, Bahadar Pur, Bosan Road Multan, Punjab</p>
                                <div className="mil-divider mil-divider-left mil-mb-30"></div>

                                <h6 className="mil-mb-15"><span className="mil-accent">+ 92</span> 335 080 4914</h6>
                                <h6><span className="mil-accent">info</span>@cyberify.co</h6>
                            </div>
                        </div>
                        <div className="col-xl-2"></div>
                        <div className="col-xl-6">
                            <h4 className="mil-mb-30">Frequently Asked Questions</h4>
                            <div className="mil-accordion">
                                <h6>What services does Cyberify offer?</h6>
                            </div>
                            <div className="mil-panel">
                                <div className="mil-window">
                                    <p>Cyberify specializes in AI chatbots, web and mobile applications, AI-powered reporting, and custom AI solutions tailored to your needs.</p>
                                </div>
                            </div>

                            <div className="mil-accordion">
                                <h6>How do I schedule a consultation with Cyberify?</h6>
                            </div>
                            <div className="mil-panel">
                                <div className="mil-window">
                                    <p>You can schedule a consultation by filling out the contact form on our website, and our team will reach out to you.</p>
                                </div>
                            </div>

                            <div className="mil-accordion">
                                <h6>What industries does Cyberify work with?</h6>
                            </div>
                            <div className="mil-panel">
                                <div className="mil-window">
                                    <p>We cater to businesses across various industries, offering tailored solutions that address specific challenges and goals.</p>
                                </div>
                            </div>

                            <div className="mil-accordion">
                                <h6>How long does it take to complete a project?</h6>
                            </div>
                            <div className="mil-panel">
                                <div className="mil-window">
                                    <p>Project timelines vary based on requirements. We'll provide a detailed timeline after assessing your project's specific needs.</p>
                                </div>
                            </div>

                            <div className="mil-accordion">
                                <h6>Can I see examples of your previous work?</h6>
                            </div>
                            <div className="mil-panel">
                                <div className="mil-window">
                                    <p>Yes, our portfolio showcases successful projects we've delivered. Contact us, and we'll be happy to share relevant case studies.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ContactUs;
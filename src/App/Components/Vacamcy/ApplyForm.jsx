import React, { useState } from 'react';
import axios from 'axios';
import Helpers from '../../Config/Helpers';


const VacancyApplyForm = ({ vacancy }) => {
    const defaultApplication = {
        fullName: "",
        email: "",
        phone: "",
        cv: null,
    };

    const [form, setForm] = useState(defaultApplication);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [errors, setErrors] = useState({});

    const submitForm = (e) => {
        e.preventDefault();
        setLoading(true);
        let formData = new FormData();
        formData.append('fullName', form.fullName);
        formData.append('email', form.email);
        formData.append('phone', form.phone);
        formData.append('vacancy_id', vacancy.id);

        if (file) {
            formData.append('cv', file);
        }

        // Debugging logs
        console.log("Form text fields:", form); // This won't show the file
        console.log("File state:", file); // This will show the file
        console.log("FormData contents:");
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        // return

        axios.post(`${Helpers.apiUrl}web/apply`, formData)
            .then(response => {
                setForm(defaultApplication);
                setFile(null);
                setSuccessMessage(true);
                Helpers.toast("success", response.data.message);
                setTimeout(() => {
                    setSuccessMessage(false);
                    window.location.reload();
                }, 1000);
            })
            .catch(error => {
                const errors = error.response.data.errors || {};
                Object.values(errors).forEach((errorMessage) => {
                    Helpers.toast("error", errorMessage);
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];  // Get the first file only
        console.log("Selected file:", selectedFile);  // Log the file to check if it is being selected
        setFile(selectedFile);  // Set the file state to the selected file
    };

    const removeFile = () => {
        setFile(null);  // Reset the file when removed
    };

    return (
        <div className="container">
            <div className="mil-divider mil-mt-60 mil-mb-60 use-case-mil-divider"></div>
            <div className="row mil-mb-15">
                <div className="col-xl-12">
                    <h2 className="mil-mb-15"><span className="text-primary">●&nbsp;</span>Apply Now</h2>
                </div>
            </div>
            <form onSubmit={submitForm}>
                <div className="row mb-5">
                    <div className="col-lg-12">
                        <div className="mil-input-frame mil-dark-input mil-mb-30">
                            <label className="mil-h6"><span>Full Name</span></label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={form.fullName}
                                onChange={e => setForm({ ...form, fullName: e.target.value })}
                            />
                            <small className="error">{errors.fullName ? errors.fullName[0] : ''}</small>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="mil-input-frame mil-dark-input mil-mb-30">
                            <label className="mil-h6"><span>Email Address</span></label>
                            <input
                                type="email"
                                placeholder="doe@mydomain.com"
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                            />
                            <small className="error">{errors.email ? errors.email[0] : ''}</small>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="mil-input-frame mil-dark-input mil-mb-30">
                            <label className="mil-h6"><span>Phone Number</span></label>
                            <input
                                type="text"
                                placeholder="Enter your phone number"
                                value={form.phone}
                                onChange={e => setForm({ ...form, phone: e.target.value })}
                            />
                            <small className="error">{errors.phone ? errors.phone[0] : ''}</small>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="mil-attach-frame mil-dark mil-mb-30">
                            <i className="fas fa-paperclip"></i>
                            <label className="pointer">
                                <span>Attach your CV</span>
                                <input
                                    type="file"
                                    id="mil-file-input"
                                    className="none"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>
                        {file && (
                            <table style={{ width: '100%' }}>
                                <tr>
                                    <td className="mil-dark">{file.name}</td>
                                    <td>
                                        <i onClick={removeFile} className="fas fa-xmark pointer"></i>
                                    </td>
                                </tr>
                            </table>
                        )}
                    </div>
                    <div className="col-lg-9">
                        {/* <button className="mil-button mil-border mil-fw" disabled={loading} type="submit">
                            <span>{loading ? 'Please wait...' : 'Submit Application'}</span>
                        </button> */}
                    </div>
                    <div className="col-lg-3">
                        <button className="mil-button mil-border mil-fw" disabled={loading} type="submit">
                            <span>{loading ? 'Please wait...' : 'Submit Application'}</span>
                        </button>
                    </div>
                    {successMessage && (
                        <div className="col-lg-12 my-2">
                            <div className="success-alert-box">
                                <p>Your application has been submitted successfully. We will get back to you soon!</p>
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default VacancyApplyForm;

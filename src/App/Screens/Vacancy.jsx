import React, { useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import Helpers from '../Config/Helpers'
import axios from "axios";
import VacancyOverview from '../Components/Vacamcy/Overview';
import { Helmet } from 'react-helmet';
import VacancyApplyForm from '../Components/Vacamcy/ApplyForm';
import PageBanner from '../Components/Banner';

const Vacancy = () => {
    const [vacancy, setVacancy] = useState(null)
    const { slug } = useParams();
    const location = useLocation(); // Get the current location
    const navigate = useNavigate();
    const canonicalUrl = `https://www.cyberify.co${location.pathname}`;

    const getVacancy = () => {
        if (slug) {
            axios
                .get(`${Helpers.apiUrl}web/single-vacancy/${slug}`, Helpers.authHeaders)
                .then((response) => {
                    const vacancyData = response.data;
                    setVacancy({
                        id: vacancyData.id,
                        job_title: vacancyData.job_title,
                        short_description: vacancyData.short_description,
                        description: vacancyData.description,
                        qualification: vacancyData.qualification,
                        experience: vacancyData.experience,
                        location: vacancyData.location,
                        type: vacancyData.type,
                        deadline: vacancyData.deadline,
                        created_at: vacancyData.created_at,
                        skills: vacancyData.skills ? vacancyData.skills.map(skill => skill.name) : [],
                    });
                    console.log(vacancyData)
                })
                .catch((error) => {
                    console.error("Error fetching vacancy:", error);
                });
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    useEffect(() => {
        if (!isNaN(slug)) {
            navigate('/');
        }
        if (slug) {
            getVacancy();
        }
    }, [slug]);
    return (
        <>
            <Helmet>
                <title>{`${slug} - Cyberify`}</title>
                <link rel="canonical" href={canonicalUrl} />
            </Helmet>
            <div className='mil-mb-30'></div>
            {vacancy ? (
                <PageBanner
                    pageName={vacancy.job_title}
                    description={`Posted On: ${formatDate(vacancy.created_at)}`}
                />
            ) : ''}

            <section className="mil-p-120-90">
                {vacancy ? <VacancyOverview vacancy={vacancy} /> : ''}
                {vacancy ? <VacancyApplyForm vacancy={vacancy} /> : ''}
            </section>
        </>
    )
}

export default Vacancy

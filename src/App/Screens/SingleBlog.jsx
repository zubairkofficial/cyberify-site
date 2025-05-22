import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import Helpers from "../Config/Helpers";

import { Helmet } from "react-helmet";
import { DateTime } from "luxon";

const SingleBlog = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location
    const canonicalUrl = `https://www.cyberify.co${location.pathname}`;
    const [blog, setBlog] = useState({});
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);

    const getBlog = () => {
        axios.get(`${Helpers.apiUrl}web/blog/single/${slug}`).then(response => {
            setBlog(response.data);
        });
    }

    const recentBlogs = () => {
        axios.get(`${Helpers.apiUrl}web/blog/recent/${slug}`).then(response => {
            setBlogs(response.data);
        });
    }

    const getCategories = () => {
        axios.get(`${Helpers.apiUrl}web/blog/category/all`).then(response => {
            setCategories(response.data);
        });
    }

    useEffect(() => {
        if (!isNaN(slug)) {
            navigate('/');
        }
        getBlog();
        getCategories();
        recentBlogs();
    }, [slug]);

    return (
        <>
            {!Helpers.isObjectEmpty(blog) && <Helmet>
                <title>{blog.title} - Cyberify</title>
                <meta name="title" content={blog.meta_title} />
                <meta name="keywords" content={blog.meta_keywords} />
                <meta name="description" content={blog.meta_description} />
                <meta name="audience" content="Everyone" />
                <link rel="canonical" href={canonicalUrl} />
            </Helmet>}
            {/* <div className="mil-banner-sm-2 mil-deep-bg">
                <img src={Helpers.serverImage(blog.featured_image)} className="mil-background-image" style={{ objectPosition: 'center' }} alt="Publication cover" />
                <div className="mil-overlay"></div>
            </div> */}
            <div
                style={{
                    marginTop: "100px",
                    position: "relative",
                    background: `url("${Helpers.serverImage(blog.featured_image)}") center center / cover no-repeat`,
                    height: "40vh",
                    zIndex: 1,
                }}
            >
                {/* Dark overlay */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.65)",
                        zIndex: 1,
                    }}
                ></div>

                {/* Text content */}
                <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        padding: "20vh 0",
                        zIndex: 2,
                    }}
                >
                    <h1
                        style={{
                            color: "white",
                            fontSize: "2.5rem",
                            textAlign: "center"
                        }}
                    >
                        {blog.title}
                    </h1>
                </div>
            </div>

            <section className="mil-blog mil-p-120-0">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-8 col-xl-8 mil-mb-120">
                            <span className="mil-suptitle mil-accent ">{blog.blog_category && blog.blog_category.name}</span>
                            {/* <h1 className="mil-up-font mil-mb-30">{blog.title}</h1> */}
                            <ul className="mil-dot-list mil-post-info mil-text-sm mil-mb-60">
                                {/* <li><Moment format="dddd, MMMM Do YYYY">{blog.created_at}</Moment></li> */}
                                <li>{DateTime.fromISO(blog.created_at).toFormat('cccc, LLLL d\'th\' yyyy')}</li>
                            </ul>
                            <div className="mil-divider mil-mb-60"></div>
                            <div dangerouslySetInnerHTML={{ __html: blog.updated_content }} />
                            <br />
                            <div className="mil-divider mil-mb-60"></div>
                            <h5 className="mil-mb-30">Was this article helpful?</h5>
                            <a href="#." className="mil-button mil-border me-2 mil-button-sm mil-gray-border mil-mb-15"><span>Yes, it was fine!</span></a>
                            <a href="#." className="mil-button mil-border mil-button-sm mil-gray-border mil-mb-60"><span>No, or there was something off</span></a>
                        </div>
                        <div className="col-lg-4 col-xl-3 mil-mb-120">
                            <div className="mil-mb-60">
                                <p className="mil-mb-30">{blog.summary}</p>
                            </div>
                            <div className="mil-divider mil-mb-60"></div>
                            <div className="mil-mb-60">
                                <h5 className="mil-list-title mil-mb-30">Recent Posts</h5>
                                {blogs.length > 0 ? blogs.map(article => {
                                    return (
                                        <Link key={article.id} to={`/insight/${article.slug}`} className="mil-post-sm mil-mb-15">
                                            <div className="mil-cover-frame"><img src={Helpers.serverImage(article.featured_image)} alt="cover" /></div>
                                            <div className="mil-description">
                                                <h6>{article.title}</h6>
                                            </div>
                                        </Link>
                                    );
                                }) : <div className="mil-description">
                                    <h6>no recent posts available.</h6>
                                </div>}
                            </div>
                            <div className="mil-divider mil-mb-60"></div>
                            <div className="mil-mb-60">
                                <h5 className="mil-list-title mil-mb-30">Categories</h5>
                                <ul className="mil-hover-link-list">
                                    {categories.map((category, index) => <li key={index}><a href="#.">{category.name}</a></li>)}
                                </ul>
                            </div>
                            <div className="mil-divider mil-mb-60"></div>
                            <div className="mil-mb-60">
                                <h5 className="mil-list-title mil-mb-30">Tags</h5>
                                <ul className="mil-tags">
                                    {blog.meta_keywords && blog.meta_keywords.split(",").map((keyword, index) => <li key={index}><a href="#.">{keyword}</a></li>)}
                                </ul>
                            </div>
                            <div className="mil-divider mil-mb-60"></div>
                        </div>
                    </div>
                </div>
                <style jsx>{`
        p{
         color: #7E7E7E !important;
         text-align:justify;
        }
                 p span{
                 
         color: #7E7E7E !important;
         }
                 p a{
         color: #f57c00 !important;
         }
         ul li{
            color: #7E7E7E !important;
            text-align:justify;
         }
         ol li{
            color: #7E7E7E !important;
            text-align:justify;
         }
                 ul li span{
         color: #7E7E7E !important;
         }
      `}</style>
            </section>
        </>
    );
}

export default SingleBlog;
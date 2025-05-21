import { useEffect, useState } from "react";
import Helpers from "../../Config/Helpers";
import axios from 'axios';
import { Link } from 'react-router-dom';


const BlogsSection = () => {

    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);

    const getBlogs = () => {
        axios.get(`${Helpers.apiUrl}web/blog/all`).then(response => {
            setBlogs(response.data);
        });
    }

    useEffect(() => {
        getBlogs();
    }, []);

    return (
        <section className="mil-blog mil-p-120-120">
            <div className="mil-deco" style={{ top: 0, right: '30%' }}></div>
            <div className="container">
                <div className="row align-items-center mil-mb-90">
                    <div className="col-md-6 col-xl-6">


                        <span className="mil-suptitle mil-suptitle-2 mil-mb-30">Our Latest News</span>
                        <h2>Latest Thinking</h2>

                    </div>
                    <div className="col-md-6 col-xl-6">

                        <div className="mil-adaptive-right mil-mt-60-adapt">
                            <div className="mil-slider-nav">
                                <div className="mil-slider-btn-prev mil-blog-prev"><i className="fas fa-arrow-left"></i><span className="mil-h6">Prev</span></div>
                                <div className="mil-slider-btn-next mil-blog-next"><span className="mil-h6">Next</span><i className="fas fa-arrow-right"></i></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="swiper-container mil-blog-slider mil-mb-90">
                    <div className="swiper-wrapper">
                        {blogs.map((blog, index) => {
                            if(index <= 5){
                                return (
                                    <div key={blog.id} className={`swiper-slide ${index % 2 == 0 ? 'mil-slide-50' : 'mil-slide-25'}`}>
                                        <Link to={`/insight/${blog.slug}`} className={index % 2 == 0 ? "mil-card" : "mil-card mil-card-sm mil-reverse-sm"}>
                                            {index % 2 == 0 && <div className="mil-cover-frame">
                                                <img src={Helpers.serverImage(blog.featured_image)} alt="project" />
                                            </div>}
                                            <div className="mil-description">
                                                <div className="mil-card-title">
                                                    <h3 className="mil-mb-20">{ blog.title }</h3>
                                                    <h5><span className="mil-accent">{ blog.blog_category.name }</span></h5>
                                                </div>
                                                <div className="mil-card-text">
                                                    <p  style={{textAlign:"justify"}}>{ blog.summary }</p>
                                                </div>
                                            </div>
                                            {index % 2 !== 0 && <div className="mil-cover-frame">
                                                <img src={Helpers.serverImage(blog.featured_image)} alt="project" />
                                            </div>}
                                        </Link>
                                    </div>
                                )
                            }else{
                                return null;
                            }
                        })}
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-12">
                        <Link to={'/insights'} className="mil-link"><span>View More Insights</span><i className="fas fa-arrow-right"></i></Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BlogsSection;
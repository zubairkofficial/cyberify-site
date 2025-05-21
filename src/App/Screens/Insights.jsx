import { useState } from "react";
import PageBanner from "../Components/Banner";
import axios from 'axios';
import Helpers from "../Config/Helpers";
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import Pagination from "../Components/Pagination";
import { Helmet } from "react-helmet";
import { useLocation } from 'react-router-dom';
import { DateTime } from "luxon";

const Insights = () => {

    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [paginated, setPaginated] = useState([]);
    const [pageNo, setPageNo] = useState(0);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState("All Articles");
    const [query, setQuery] = useState("");
    const location = useLocation();
    const canonicalUrl = `https://www.cyberify.co${location.pathname}`;

    const getBlogs = () => {

        axios.get(`${Helpers.apiUrl}web/blog/all`).then(response => {
            setBlogs(response.data);
            setPaginated(Helpers.paginate(response.data));
            setLoading(false);
        });
    }

    const getCategories = () => {
        axios.get(`${Helpers.apiUrl}web/blog/category/all`).then(response => {
            setCategories(response.data);
        });
    }

    const filterByCategory = (categoryId, name) => {
        let data = blogs;
        if (categoryId) {
            data = data.filter(record => record.blog_category_id === categoryId);
        }
        setPaginated(Helpers.paginate(data));
        setCategory(name);
    }

    const onInputSearch = inputQuery => {
        setPaginated(Helpers.paginate(Helpers.search(inputQuery, blogs, ["title", "summary", "content", "blog_category.name", "featured_image_name"])));
        setPageNo(0);
    }
    const handleSearchChange = e => {
        if (e.target.value === '') {
            setPaginated(Helpers.paginate(blogs));
            setPageNo(0);
        } else {
            onInputSearch(e.target.value);
        }
        setQuery(e.target.value);
    }

    useEffect(() => {
        getBlogs();
        getCategories();
    }, []);

    if (loading) {
        return (
            <div
                style={{ minHeight: "100vh" }}
                className="d-flex align-items-center justify-content-center "
            >
                Loading...
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Insights - {category} - Cyberify</title>
                <link rel="canonical" href={canonicalUrl} />
            </Helmet>
            <PageBanner pageName={`Insights - ${category}`} description={query ? `Search results for: ${query}` : "Explore expert insights and in-depth articles to stay ahead."} />
            <section className="mil-blog mil-p-120-0">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-8 col-xl-8 mil-mb-120">
                            {paginated.length === 0 && <div><h4>No Articles found.</h4><br /></div>}
                            {paginated.length > 0 && paginated[pageNo].map((blog, index) => {
                                return (
                                    <Link key={index} to={`/insight/${blog.slug}`} className="mil-card mil-mb-60">
                                        <div className="mil-cover-frame">
                                            <img src={Helpers.serverImage(blog.featured_image)} alt="project" />
                                        </div>
                                        <div className="mil-description">
                                            <div className="mil-card-title">
                                                <ul className="mil-dot-list mil-text-sm mil-mb-15">
                                                    <li>{blog.blog_category && blog.blog_category.name}</li>
                                                    {/* <li><Moment format="dddd, MMMM Do YYYY">{blog.created_at}</Moment></li> */}
                                                    <li>{DateTime.fromISO(blog.created_at).toFormat('cccc, LLLL d\'th\' yyyy')}</li>
                                                </ul>

                                                <h4>{blog.title}</h4>
                                            </div>
                                            <div className="mil-card-text">
                                                <p>{blog.summary}</p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                            <div className="mil-divider mil-mb-60"></div>
                            {paginated.length > 0 && <Pagination pageNo={pageNo} setPageNo={setPageNo} paginated={paginated} />}
                        </div>
                        <div className="col-lg-4 col-xl-3 mil-mb-120">
                            <form className="mil-sidebar-input-frame mil-mb-60">
                                <input type="text" className="mil-sidebar-input" placeholder="Search here..." value={query} onChange={handleSearchChange} />
                                <button type="submit"><i className="fas fa-search"></i></button>
                            </form>
                            <div className="mil-divider mil-mb-60"></div>
                            <div className="mil-mb-60">
                                <h5 className="mil-list-title mil-mb-30">Categories</h5>
                                <ul className="mil-hover-link-list">
                                    <li><a className="pointer" onClick={() => filterByCategory(0, "All Articles")}>Recent Blogs</a></li>
                                    {categories.map((category, index) => <li key={index}><a className="pointer" onClick={() => filterByCategory(category.id, category.name)}>{category.name}</a></li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Insights;
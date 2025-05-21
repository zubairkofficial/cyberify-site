const Pagination = ({ paginated, setPageNo, pageNo }) => {
    const totalPages = paginated.length;

    const totalResults = () => {
        let results = 0;
        paginated.forEach(element => {
            results += element.length;
        });

        return results;
    }

    const renderPageNumbers = () => {
        let pageNumbers = [];

        if (pageNo === 0) {
            // First page
            for (let i = 0; i < Math.min(3, totalPages); i++) {
                pageNumbers.push(i);
            }
        } else if (pageNo === totalPages - 1) {
            // Last page
            for (let i = Math.max(0, totalPages - 3); i < totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Middle pages
            pageNumbers.push(pageNo - 1);
            pageNumbers.push(pageNo);
            pageNumbers.push(pageNo + 1);
        }

        return pageNumbers;
    };

    const pageNumbers = renderPageNumbers();

    return (
        <div className="mil-pagination mil-hidden-arrows">
            <div className="mil-slider-nav">
                <div className="mil-slider-btn-prev mil-blog-prev" onClick={() => setPageNo(Math.max(0, pageNo - 1))}>
                    <i className="fas fa-arrow-left"></i><span className="mil-h6">Prev</span>
                </div>
            </div>
            <ul className="mil-pagination-numbers">
                {pageNumbers.map((page, index) => (
                    <li key={index} className={page === pageNo ? 'mil-active' : ''}>
                        <a href="#" onClick={(e) => { e.preventDefault(); setPageNo(page); }}>
                            {page + 1}
                        </a>
                    </li>
                ))}
            </ul>
            <div className="mil-slider-nav">
                <div className="mil-slider-btn-next mil-blog-next" onClick={() => setPageNo(Math.min(totalPages - 1, pageNo + 1))}>
                    <span className="mil-h6">Next</span><i className="fas fa-arrow-right"></i>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
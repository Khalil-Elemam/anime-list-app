/* eslint-disable react/prop-types */


export default function Pagination({pagesNum, currentPage, setCurrentPage}) {

    if (pagesNum <= 1)
        return 
    
    const pages = Array.from({length: pagesNum}, (_, i) => i + 1).map(page => (
        <button 
            key={page}
            onClick={() => setCurrentPage(page)}
            className={page === currentPage ? 'active': ''}
        >
            {page}
        </button>
    ))


    return (
        <div className="pagination">
            <button 
                onClick={() => setCurrentPage(prevCurrentPage => prevCurrentPage - 1)}
                disabled = {currentPage === 1}
            >Prev</button>
            {pages}
            <button
                onClick={() => setCurrentPage(prevCurrentPage => prevCurrentPage + 1)}
                disabled = {currentPage === pagesNum}
            >Next</button>
        </div>
    )
}
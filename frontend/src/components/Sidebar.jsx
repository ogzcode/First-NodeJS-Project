import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import "../assets/css/Sidebar.css"

export default function Sidebar({ menu, isOpen }) {
    const location = useLocation()

    const isActiveLink = (link) => {
        return location.pathname === link ? "bg-violet-50 text-violet-800 border-r-4 border-violet-500" : "text-stone-800 hover:bg-stone-100"
    }
    return (
        <div className={`bg-white overflow-x-hidden ${isOpen ? 'sidebar-open' : 'sidebar-close'}`} style={{ height: "calc(100vh - 4rem)" }}>
            <div className="h-full pt-8 pl-4">
                {
                    menu.map((item, index) => (
                        <Link to={item.link} key={index} 
                            className={`flex items-center mb-4 px-4 py-2 font-semibold rounded-tl-md rounded-bl-md tracking-wide ${isActiveLink(item.link)}`}>
                            {item.icon}
                            <span className='mb-0 ml-2 flex-shrink-0'>{item.title}</span>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

Sidebar.propTypes = {
    isOpen: PropTypes.bool,
    menu: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        link: PropTypes.string,
        icon: PropTypes.element
    }))
}
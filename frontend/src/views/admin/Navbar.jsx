import { FaBarsStaggered } from "react-icons/fa6";
import PropTypes from "prop-types"
import avatar from "../../assets/image/avatar.jpg"

export default function Navbar({ onChangeMenu }) {
    return (
        <div className="h-16 bg-white w-full">
            <div className="flex justify-between items-center h-full px-8">
                <div className="flex items-center gap-32">
                    <h1>Logo</h1>
                    <button onClick={onChangeMenu}>
                        <FaBarsStaggered className="text-2xl" />
                    </button>
                </div>
                <div>
                    <img src={avatar} alt="avatar" className="w-10 h-10 object-cover rounded-full" />
                </div>
            </div>
        </div>
    )
}

Navbar.propTypes = {
    onChangeMenu: PropTypes.func
}
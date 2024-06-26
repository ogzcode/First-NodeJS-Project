import PropTypes from 'prop-types';
import { getStyleWithSeverity } from './utils/styleUtil';

export const IconButton = ({ icon, onClick, severity, outline }) => {
    return (
        <button
            className={`w-10 h-10 flex justify-center items-center rounded-full ${getStyleWithSeverity(severity, outline)}`}
            onClick={onClick}
        >
            {icon}
        </button>
    )
}

IconButton.propTypes = {
    icon: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    severity: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'warning', 'info', 'dark', 'light']),
    outline: PropTypes.bool,
}

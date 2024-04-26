import PropTypes from 'prop-types';
import { getStyleWithSeverity } from './utils/styleUtil';

export const Button = ({ children, onClick, severity, outline, style }) => {
    return (
        <button
            className={`px-6 py-2 text-base rounded-lg ${getStyleWithSeverity(severity, outline)} ${style}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    severity: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'warning', 'info', 'dark', 'light']),
    outline: PropTypes.bool,
    style: PropTypes.string
}
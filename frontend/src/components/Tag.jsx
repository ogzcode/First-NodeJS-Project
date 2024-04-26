import PropTypes from 'prop-types';


export const Tag = ({ children, severity }) => {

    const getStyleWithSeverity = () => {
        switch (severity) {
            case 'primary':
                return 'bg-violet-500 text-white';
            case 'secondary':
                return 'bg-slate-100 text-slate-500';
            case 'danger':
                return 'bg-rose-500 text-white';
            case 'success':
                return 'bg-teal-500 text-white';
            case 'warning':
                return 'bg-amber-500 text-white';
            case 'info':
                return 'bg-indigo-500 text-white';
            case 'dark':
                return 'bg-gray-800 text-white';
            case 'light':
                return 'bg-gray-200 text-black';
            default:
                return 'bg-blue-500 text-white';
        }
    }

    return (
        <span className={`px-2 py-1 text-sm rounded-md font-semibold ${getStyleWithSeverity()}`}>
            {children}
        </span>
    )
}

Tag.propTypes = {
    children: PropTypes.node.isRequired,
    severity: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'warning', 'info', 'dark', 'light']),
}

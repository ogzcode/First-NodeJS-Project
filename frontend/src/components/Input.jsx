import PropTypes from 'prop-types';

export const Input = ({ type, value, onChange, placeholder, required }) => {
    return (
        <input 
            type={type} 
            value={value} 
            onChange={e => onChange(e.target.value)} 
            className="bg-stone-50 border text-sm border-stone-300 min-w-[20rem] text-stone-800 rounded-lg focus:border-violet-500 block p-2.5 outline-none" 
            placeholder={placeholder} required={required} />
    )
}

Input.propTypes = {
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
}
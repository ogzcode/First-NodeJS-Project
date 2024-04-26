import PropTypes from 'prop-types';

export const Input = ({ label, register, placeholder, required, error, type }) => {

    const getInputStyle = () => {
        return "border text-base min-w-[20rem] w-full text-stone-800 rounded-lg block p-2.5 outline-none"
    }

    const getFocusStyle = () => {
        return error ? "border-red-500 outline-2 focus:outline-red-300 outline-offset-1" : "border-stone-400 focus:border-indigo-500 outline-2 focus:outline-indigo-300 outline-offset-1"
    }

    console.log(error)

    return (
        <div className='relative w-full'>
            <input
                type={type}
                {...register(label, { required: required })}
                className={`${getInputStyle()} ${getFocusStyle()}`}
                placeholder={placeholder} required={required}
                aria-invalid={error ? "true" : "false"}
            />
            {error && <span className="absolute -bottom-5 left-0 text-red-500 text-xs">{error.message}</span>}
        </div>
    )
}

Input.propTypes = {
    type: PropTypes.string || "text",
    label: PropTypes.string,
    register: PropTypes.func,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    error: PropTypes.object
}
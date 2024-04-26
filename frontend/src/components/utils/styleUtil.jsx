export const getStyleWithSeverity = (severity, outline) => {
    switch (severity) {
        case 'primary':
            return outline ? 'bg-violet-50 text-violet-500' : 'bg-violet-500 text-white';
        case 'secondary':
            return outline ? 'bg-slate-50 text-slate-500' : 'bg-slate-100 text-slate-500';
        case 'danger':
            return outline ? 'bg-rose-50 text-rose-500' : 'bg-rose-500 text-white';
        case 'success':
            return outline ? 'bg-teal-50 text-teal-500' : 'bg-teal-500 text-white';
        case 'warning':
            return outline ? 'bg-amber-50 text-amber-500' : 'bg-amber-500 text-white';
        case 'info':
            return outline ? 'bg-indigo-50 text-indigo-500' : 'bg-indigo-500 text-white';
        case 'dark':
            return outline ? 'bg-gray-800 text-gray-200' : 'bg-gray-800 text-white';
        case 'light':
            return outline ? 'bg-gray-200 text-gray-800' : 'bg-gray-200 text-black';
        default:
            return outline ? 'bg-blue-50 text-blue-500' : 'bg-blue-500 text-white';
    }
}
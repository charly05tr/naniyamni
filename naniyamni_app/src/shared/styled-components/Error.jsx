export const Error = ({children}) => {
    return (
        <div className="flex items-center justify-center p-4 md:p-5 bg-red-50 border border-red-300 rounded-lg shadow-sm text-center text-sm md:text-base text-red-700 font-medium max-w-lg mx-auto">
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6 mr-3 text-red-500" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth="2"
        >
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
        </svg>
        <span>{children}</span>
    </div>
    );
} 
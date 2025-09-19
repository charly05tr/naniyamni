export const Alert = ({ children, size="lg" }) => {

    const sizes = {
        lg:"py-5 text-lg",
        sm:"py-1 text-sm",
        md:"py-2 text-md",
    }

    return (
        <div className="flex items-center justify-center p-4  md:p-6 bg-yellow-50 border border-yellow-200 rounded-xl shadow-md text-center text-sm md:text-base text-yellow-800 tracking-wide font-medium  max-w-xl mx-auto">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 mr-3 text-yellow-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="2"
                >
                    <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                    />
                </svg>
                <span className={`${sizes[size]}`}>
                    {children}
                </span>
            </div>
    )
}
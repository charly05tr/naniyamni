
const InputErrorMessage = ({ children, className }) => {

  return (
    <p
      className={`text-[#E53935] text-sm mt-1 animate-fadeIn ${className || ''}`}
      role="alert" 
    >
      {children}
    </p>
  );
};

export default InputErrorMessage;
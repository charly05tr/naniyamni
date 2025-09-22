import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FormCard = ({ children }) => {
  return (
    <div className="max-w-[800px] min-w-[340px] p-4 border dark:text-[#F9FAFB] dark:bg-[#181818] dark:border-[#AAAAAA]/30 border-gray-300 rounded-lg bg-gray-50 shadow-md mb-[50px] mx-[5px] lg:min-w-[450px]">
      {children}
    </div>
  );
};

export const Label = ({ text, forI }) => {
  return (
    <label for={forI} className="">{text}</label>
  );
}
export const Input = ({ type = "text", placeholder, value, onChange, ...props }) => {
  return (
    <div className="bg-gradient-to-r  rounded-lg border-none p-[1px]">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-gray-50 w-full dark:border-[#AAAAAA]/30 px-4 py-3 border dark:text-[#F9FAFB] dark:bg-[#181818] border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#AAAAAA] transition-all duration-200"
        {...props}
      />
    </div>
  );
};

export const TextArea = ({ placeholder, value, onChange, ...props }) => {
  return (
    <div className="bg-gradient-to-r rounded-xl border-none px-[1px]">
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-white w-full border p-2 dark:border-[#AAAAAA]/30 dark:text-[#F9FAFB] dark:bg-[#181818] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AAAAAA] text-gray-800 break-words transition-all duration-200"
        rows="4"
        style={{ minHeight: '1.5em', overflow: 'hidden', resize: 'none' }}
        {...props}
      ></textarea>  
    </div>
  );
};

export const Select = ({ type = "text", placeholder, value, onChange, ...props }) => {
  return (
    <div className="bg-gradient-to-r  rounded-lg border-none p-[1px]">
      <select
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-gray-50 w-full dark:border-[#AAAAAA]/30 px-4 py-3 border dark:text-[#F9FAFB] dark:bg-[#181818] border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#AAAAAA]/50 transition-all duration-200"
        {...props}
      />
    </div>
  );
};

export const Button = ({ text, disabled=false, color="blue", onClick=()=>{}}) => {
  const colorClasses = {
    red: "bg-red-400 hover:bg-red-500 dark:bg-[#E53935]/70 dark:hover:bg-[#E53935]/80",
    blue: "bg-blue-600 hover:bg-blue-700 dark:bg-[#007bff]/90 dark:hover:bg-[#007bff]",
    green: "bg-green-400 hover:bg-green-500",
  };

  return (
    <button onClick={onClick} className={`cursor-pointer w-full px-2 py-3 rounded-lg tracking-tight font-bold text-white/95  ${colorClasses[color]}`} disabled={disabled}>
      {text}
    </button> 
  );
}

export const GoogleButton = ({text}) => {
  return (
    <button className="flex dark:text-[#F9FAFB] dark:bg-[#181818] dark:border-gray-500 justify-center items-center gap-4 border border-gray-300 p-2 rounded-sm bg-white-400 cursor-pointer text-gray-800 hover:border-gray-400">
      <svg className="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
          <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4"/>
          <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853"/>
          <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05"/>
          <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335"/>
      </svg>
      {text}
    </button>
  )
}

export const Hr = ({ text="o"}) => {
  return (
    <div className="relative flex items-center mt-2 mb-2">
      <div className="flex-grow border-t border-gray-300 dark:border-[#AAAAAA]/30"></div>
      <span className="mx-4 text-gray-500 dark:text-[#F9FAFB] dark:bg-[#181818]">{text}</span>
      <div className="flex-grow border-t border-gray-300 dark:border-[#AAAAAA]/30"></div>
  </div>
  );
}

export const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  display: flex;
`;

export const SuccessText = styled.p`
  color: green;
  font-size: 14px;
`;
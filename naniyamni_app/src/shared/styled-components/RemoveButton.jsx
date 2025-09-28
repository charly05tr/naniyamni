import { XMarkIcon } from "@heroicons/react/24/outline";    

export const RemoveButton = ({ onClick }) => {
    return (
        <button
            type="button"                                                                          
            className="cursor-pointer absolute top-2 right-2 bg-[#181818]/40 hover:bg-[#181818]/60  p-0.5 font-extrabold rounded-full"
            onClick={onClick}
        > 
            <XMarkIcon className="h-5 w-5 text-[#F9FAFB] font-extrabold"/>
        </button>
    );
}
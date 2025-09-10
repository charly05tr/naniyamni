import { XMarkIcon } from "@heroicons/react/24/outline";    

export const RemoveButton = ({ onClick }) => {
    return (
        <button
            type="button"                                                                          
            className="cursor-pointer absolute top-2 right-2 bg-red-500 text-sm p-1 opacity-80 font-extrabold rounded-full"
            onClick={onClick}
        > 
            <XMarkIcon className="h-4 w-4 text-zinc-800"/>
        </button>
    );
}
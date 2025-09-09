export const Card = ({ children }) => {
    return (
      <div className="border rounded border-gray-200 p-2 m-4 bg-white flex gap-2 items-center justify-between">
        {children}
      </div>
    );
  };
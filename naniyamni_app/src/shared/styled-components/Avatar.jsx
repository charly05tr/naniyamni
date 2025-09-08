
export const Avatar = ({ imageUrl, size = "w-10 h-10" }) => {
  
    return (    
      <div className={`self-end rounded-full overflow-hidden ${size}`}>
        <img
          src={imageUrl || "/src/assets/avatarplaceholder.png"}
          alt="Avatar"
        />
      </div>
    );
  };
export const Avatar = ({ imageUrl, size = "w-9 h-9", textSize="text-xl" }) => {

  const nombre = localStorage.getItem('nombre_turista');
  const apellido = localStorage.getItem('apellido_turista');

  const iniciales =
    (nombre?.charAt(0).toUpperCase() || "") +
    (apellido?.charAt(0).toUpperCase() || "");
  return (
    <div
      className={`mr-2 cursor-pointer flex items-center justify-center rounded-full bg-blue-300 hover:bg-blue-400 text-white font-semibold ${size}`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`${nombre} ${apellido}`}
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <span className={`text-amber-100 shadow-amber-900 ${textSize}`}>{iniciales}</span>
      )}
    </div>
  );
};
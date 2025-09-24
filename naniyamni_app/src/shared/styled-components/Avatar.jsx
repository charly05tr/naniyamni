export const Avatar = ({ imageUrl, size = "w-9 h-9", textSize = "text-sm", onClick = null, uNombre= '', uApellido = '' }) => {

  const nombre = uNombre
  const apellido= uApellido;

  const iniciales =
    (nombre?.charAt(0) || "") +
    (apellido?.charAt(0) || "");

  const baseClasses = `flex items-center justify-center rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${size}`;
  const clickClasses = onClick ? 'cursor-pointer' : '';

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${clickClasses} ${imageUrl ? '' : 'bg-gray-600/80 shadow-lg hover:bg-gray-700'}`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`${nombre} ${apellido}`}
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <div>
        {(nombre !== "undefined")?
        (<span className={`text-white uppercase  ${textSize}`}>
          {iniciales}
        </span>):<span className={`text-white uppercase  ${textSize}`}>NY</span>}
      </div>
      )}
    </div>
  );
};
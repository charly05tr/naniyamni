export const ReservaHabitacion = ({ cantAdultos, cantHabitaciones, cantNinos, servicio, entrada, salida, noches }) => {
    return (
        <>
            <div className="text-zinc-800 flex flex-shrink flex-1 flex-col gap-2 md:border border-gray-200 md:p-4 p-2 rounded-lg w-fit md:min-w-100 min-w-90">
                <h1 className="text-3xl font-semibold tracking-wide my-2">Tu reserva</h1>
                <div className="flex gap-2 px-2 py-4 border border-gray-200 rounded">
                    <div className="flex flex-col gap-1 p-2 border-r pr-4 border-gray-300">
                        <p className="text-sm">Entrada</p>
                        <strong>{entrada.split("\n")[0]}</strong>
                        <p>{entrada.split("\n")[1]}</p>
                    </div>
                    <div className="flex flex-col gap-1 p-2">
                        <p className="text-sm">Salida</p>
                        <strong>{salida.split("\n")[0]}</strong>
                        <p>{salida.split("\n")[1]}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 mt-2 p-4 border border-gray-200 rounded">
                    <p className="text-sm">Has seleccionado</p>
                    <strong className="flex gap-2 mb-3 flex-wrap">
                        {noches} {noches === 1 ? "noche, " : "noches, "}
                        {cantHabitaciones}{" "}
                        {cantHabitaciones === 1 ? "habitación " : "habitaciones "}
                        para {cantAdultos} {cantAdultos === 1 ? "adulto " : "adultos "}
                        {(cantNinos)?"y":""} {(cantNinos)?cantNinos:""} {(cantNinos)?(cantNinos> 1)?"niños":"niño":""}
                    </strong>
                    <p className="text-sm">1 x {servicio.nombre}</p>
                </div>
            </div>
        </>
    )
}
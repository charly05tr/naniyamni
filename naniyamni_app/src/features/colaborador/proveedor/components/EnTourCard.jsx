export const EnTourCard = ({ proveedor }) => {
    if (proveedor?.total_en_tour?.length < 1) {
        return (
            <div></div>
        )
    }   
    
    return (
        <div className="flex flex-col gap-3 w-full mt-5">
            <h1 className="py-4 text-2xl text-zinc-800 font-bold dark:text-[#F9FAFB]">Tus servicios en Tours ({proveedor?.total_en_tour?.length})</h1>
            {proveedor?.total_en_tour?.map(enTour => (
                <div key={enTour.id} className="p-4 border rounded-xl  border-[#AAAAAA]/30 w-xl shadow hover:shadow-xl">
                    <h1 className="text-xl font-bold">{enTour.servicio}</h1>
                    <p className="text-xl                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               font-bold mb-2 dark:text-[#00BFFF]/90 text-[#007bff]/90">{enTour.total}</p>
                    <div className="mt-2 flex gap-2 text-sm">
                        <p className="dark:text-[#F9FAFB]/80">Turista:</p>
                        <p className="underline cursor-pointer">{enTour.turista.first_name} {enTour.turista.last_name}</p>
                    </div>
                    <div>
                        <p>{}</p>
                    </div>
                </div>
            ))

            }
        </div>
    )
}
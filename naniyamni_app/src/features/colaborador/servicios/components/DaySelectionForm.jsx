import { useAtraccionesForm } from "../hooks/useAtraccionesForm";
import { DAYS } from "@config";
import InputErrorMessage from "@InputErrorMessage";

export default function DaysSelectorForm({ formData, setFormData, errorValidacion }) {

  const { setSelectAll, setSelected, selectAll, selected, summary } = useAtraccionesForm({formData, setFormData});

  const toggleDay = (key) => {
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectAll = () => {
    const next = !selectAll;
    const updated = {};
    for (const d of DAYS) updated[d.key] = next;
    setSelected(updated);
    setSelectAll(next);
  };

  const reset = () => {
    const cleared = {};
    for (const d of DAYS) cleared[d.key] = false;
    setSelected(cleared);
    setSelectAll(false);
  };

  return (
    <div className="max-w-md mx-auto py-2 mb-2 border-t pt-5 mt-5 border-[#AAAAAA]/30">
      <h2 className="text-lg font-semibold mb-4 text-gray-900/80 dark:text-[#F9FAFB]">Días de apertura</h2>

      <div className="flex items-center gap-3 mb-4">
        <label className="inline-flex items-center cursor-pointer select-none">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
            className="form-checkbox h-5 w-5 text-indigo-600 rounded"
            aria-label="Seleccionar todos los días"
            />
          <span className="ml-2 text-gray-900/80 dark:text-[#F9FAFB]">Seleccionar todos</span>
        </label>
      </div>

      <fieldset className="grid grid-cols-2 gap-3 mb-4">
        {DAYS.map((d) => (
          <label
          key={d.key}
          className="flex items-center gap-3 p-3 rounded  border-gray-900/30 border-dotted border-2 hover:shadow-sm cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selected[d.key]}
              onChange={() => toggleDay(d.key)}
              className="form-checkbox h-4 w-4"
              aria-checked={selected[d.key]}
              aria-label={`Abrir los ${d.label}`}
              />
            <span className="text-sm">{d.label}</span>
          </label>
        ))}
      </fieldset>

      <div className="mb-4 text-sm text-gray-600 dark:text-[#F9FAFB]/80">
        {Object.values(selected).some(Boolean) ? (
          <>
            <strong className="font-medium">Seleccionados:</strong>{" "}
            {DAYS.filter((d) => selected[d.key]).map((d) => d.label).join(", ")}
          </>
        ) : (
          <div>
            {summary ? (
              <>
                <strong className="font-medium">Resumen:</strong> {summary}
                </>
                ) : (
                  <span>No has seleccionado días.</span>
                )}
        </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="px-4 py-2  rounded-xl bg-red-100 cursor-pointer text-red-500/60 hover:bg-red-200 font-bold tracking-tight dark:bg-[#E53935]/20 dark:hover:bg-[#E53935]/30 dark:text-[#E53935]"
          >
          Limpiar
        </button>

        <button
          type="button"
          onClick={() => {
            setSelected((prev) => ({ ...prev, sat: true, sun: true }));
          }}
          className="ml-auto px-3 py-2 text-sm rounded-xl bg-blue-100 cursor-pointer text-blue-500/60 hover:bg-blue-200 font-bold tracking-tight dark:bg-[#007bff]/20  dark:hover:bg-[#007bff]/30 dark:text-[#007bff]"
          >
          Solo fines de semana
        </button>
      </div>
      {errorValidacion.dias_abierto && <InputErrorMessage>{errorValidacion.dias_abierto}</InputErrorMessage>}
    </div>
  );
}

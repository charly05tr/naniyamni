import { useState, useEffect } from "react";
import { DAYS } from "@config";

export const useAtraccionesForm = ({setFormData, formData}) => {

  const [selected, setSelected] = useState(() => {
    const init = {};
    for (const d of DAYS) init[d.key] = false;
    return init;
  });
  
  useEffect(() => {
    if (!formData.dias_abierto) return;
  
    const diasAbierto = formData.dias_abierto
      .split(",")
      .map((d) => d.trim());
  
    const init = {};
    for (const d of DAYS) {
      init[d.key] = diasAbierto.includes(d.label);
    }
    setSelected(init);
  }, [formData.dias_abierto]);

  const [selectAll, setSelectAll] = useState(false);
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const allSelected = DAYS.every((d) => selected[d.key]);
    setSelectAll(allSelected);

    const chosen = DAYS.filter((d) => selected[d.key]);
    const labels = chosen.map((d) => d.label);

    // --- calcular summary localmente ---
    let computedSummary = "";
    if (labels.length === 0) {
      computedSummary = "";
    } else {
      computedSummary = labels.join(", ");
    }

    // actualiza resumen local y formData (usando updater funcional)
    setSummary(computedSummary);
    setFormData((prev) => ({ ...prev, dias_abierto: computedSummary }));

  }, [selected, setFormData]);

  return { setSelectAll, setSelected, selectAll, selected, summary, setSummary };
};
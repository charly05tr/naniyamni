import { useState, useEffect } from "react";
import { DAYS } from "@config";

export const useAtraccionesForm = ({setFormData, formData}) => {


  const [selected, setSelected] = useState(() => {
    const init = {};
    for (const d of DAYS) init[d.key] = false;
    return init;
  });

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
    } else if (labels.length === DAYS.length) {
      computedSummary = "Todos los días";
    } else if (
      labels.length === 5 &&
      labels.join(",") === DAYS.slice(0, 5).map((d) => d.label).join(",")
    ) {
      computedSummary = "Lunes a Viernes";
    } else {
      const indices = chosen.map((d) => DAYS.findIndex((dd) => dd.key === d.key)).sort((a, b) => a - b);
      let consecutivos = true;
      for (let i = 1; i < indices.length; i++) {
        if (indices[i] !== indices[i - 1] + 1) {
          consecutivos = false;
          break;
        }
      }

      if (consecutivos && labels.length >= 3 && labels.length <= 6) {
        computedSummary = `De ${labels[0]} a ${labels[labels.length - 1]}`;
      } else {
        computedSummary = labels.join(", ");
      }
    }

    // actualiza resumen local y formData (usando updater funcional)
    setSummary(computedSummary);
    setFormData((prev) => ({ ...prev, dias_abierto: computedSummary }));

    console.log("computedSummary:", computedSummary);
    console.log(formData);
  }, [selected, setFormData]);

  return { setSelectAll, setSelected, selectAll, selected, summary, setSummary };
};
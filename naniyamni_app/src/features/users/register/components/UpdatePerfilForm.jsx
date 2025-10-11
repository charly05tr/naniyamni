import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Input, Form } from "@FormStyled";

export const UpdatePerfilForm = forwardRef(({ usuario = {}, onSave }, ref) => {
  const [localUsuario, setLocalUsuario] = useState({ ...usuario });

  useEffect(() => {
    setLocalUsuario({ ...usuario });
  }, [usuario]);

  useImperativeHandle(ref, () => ({
    submit: () => {
      onSave(localUsuario);
    },
  }));

  return (
    <Form>
      <div className="flex gap-2"> 
        <div className="flex flex-col">
          <Input
            onChange={(e) =>
              setLocalUsuario((prev) => ({ ...prev, first_name: e.target.value }))
            }
            value={localUsuario.first_name || ""}
            type="text"
            required
            placeholder="Nombre"
          />
        </div>

        <div className="flex flex-col">
          <Input
            onChange={(e) =>
              setLocalUsuario((prev) => ({ ...prev, last_name: e.target.value }))
            }
            value={localUsuario.last_name || ""}
            type="text"
            required
            placeholder="Apellido"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <Input
          onChange={(e) =>
            setLocalUsuario((prev) => ({
              ...prev,
              email: e.target.value,
              username: e.target.value,
            }))
          }
          value={localUsuario.email || ""}
          type="email"
          required
          placeholder="Email"
        />
      </div>

      <div className="flex flex-col gap-4">
        <Input
          onChange={(e) =>
            setLocalUsuario((prev) => ({ ...prev, telefono: e.target.value }))
          }
          value={localUsuario.telefono !== "0" ? localUsuario.telefono : ""}
          type="text"
          required
          placeholder="Teléfono"
        />
      </div>
    </Form>
  );
});

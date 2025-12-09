import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditFreelancerForm({ freelancer, onUpdate, onClose }) {
  const [name, setName] = useState(freelancer.name);
  const [department, setDepartment] = useState(freelancer.department);
  const [image, setImage] = useState(freelancer.image);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `https://68f13b570b966ad50035c60f.mockapi.io/PeopleServices/${freelancer.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, department, image }),
        }
      );

      // 🔹 Chequeo explícito del status
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const updatedFreelancer = await res.json();

      // 🔹 Solo se dispara el toast de éxito si pasó el if
      toast.success(`Freelancer ${updatedFreelancer.name} actualizado con éxito`);

      // 🔹 Aviso al padre para actualizar la lista
      if (onUpdate) onUpdate(updatedFreelancer);

      // 🔹 Cierro el formulario si corresponde
      if (onClose) onClose();

    } catch (err) {
      console.error(err);
      toast.error("Error al actualizar freelancer");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
      <h4>Editar Freelancer</h4>

      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Departamento</label>
        <input
          type="text"
          className="form-control"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Foto (URL)</label>
        <input
          type="text"
          className="form-control"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        {image && (
          <img
            src={image}
            alt="Preview"
            style={{ maxWidth: "200px", borderRadius: "8px", marginTop: "10px" }}
          />
        )}
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Guardando..." : "Guardar cambios"}
      </button>
      <button
        type="button"
        className="btn btn-secondary ms-2"
        onClick={onClose}
      >
        Cancelar
      </button>
    </form>
  );
}

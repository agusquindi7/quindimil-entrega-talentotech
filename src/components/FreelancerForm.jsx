import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FreelancerForm({ onAdd }) {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    // Validación básica
    if (!name.trim() || !department.trim() || !image.trim()) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://68f13b570b966ad50035c60f.mockapi.io/PeopleServices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, department, image }),
      });

      const newFreelancer = await res.json();

      toast.success(`Freelancer ${newFreelancer.name} agregado con éxito`);

      // Limpio el form
      setName("");
      setDepartment("");
      setImage("");

      // Aviso al padre (Body.jsx) para actualizar la lista
      if (onAdd) onAdd(newFreelancer);

    } catch (err) {
      console.error(err);
      toast.error("Error al agregar freelancer");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h4>Agregar Freelancer</h4>

      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Juan Pérez"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Departamento</label>
        <input
          type="text"
          className="form-control"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="Ej: Diseño, Marketing, IT..."
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Foto (URL)</label>
        <input
          type="text"
          className="form-control"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Ej: https://via.placeholder.com/200"
        />
        {/* Preview de la imagen */}
        {image && (
          <div className="mt-2">
            <img
              src={image}
              alt="Preview"
              style={{ maxWidth: "200px", borderRadius: "8px" }}
            />
          </div>
        )}
      </div>

      <button type="submit" className="btn btn-success" disabled={loading}>
        {loading ? "Agregando..." : "Agregar"}
      </button>
    </form>
  );
}

import { useEffect, useState } from "react";
import "./App.css";
import supabase from "./supabase-client";

function App() {
  const [auditList, setAuditList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    department_name: "",
    manager: "",
    is_completed: false,
  });

  useEffect(() => {
    fetchAudits();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fetchAudits = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("estadoauditoria")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error cargando auditorías:", error);
    } else {
      setAuditList(data || []);
    }
    setLoading(false);
  };

  const addAudit = async (e) => {
    e.preventDefault();
    if (!formData.department_name.trim() || !formData.manager.trim()) return;

    const newAuditData = {
      department_name: formData.department_name.trim(),
      manager: formData.manager.trim(),
      is_completed: formData.is_completed,
    };

    const { data, error } = await supabase
      .from("estadoauditoria")
      .insert([newAuditData])
      .select();

    if (error) {
      console.error("Error insertando auditoría:", error);
    } else if (data && data.length > 0) {
      setAuditList((prev) => [...prev, data[0]]);
      setFormData({
        department_name: "",
        manager: "",
        is_completed: false,
      });
    }
  };

  const toggleAuditStatus = async (id, currentStatus) => {
    const { error } = await supabase
      .from("estadoauditoria")
      .update({ is_completed: !currentStatus })
      .eq("id", id);

    if (error) {
      console.error("Error actualizando estado:", error);
    } else {
      setAuditList((prev) =>
        prev.map((audit) =>
          audit.id === id ? { ...audit, is_completed: !currentStatus } : audit
        )
      );
    }
  };

  const deleteAudit = async (id) => {
    const { error } = await supabase
      .from("estadoauditoria")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error eliminando registro:", error);
    } else {
      setAuditList((prev) => prev.filter((audit) => audit.id !== id));
    }
  };

  return (
    <div className="audit-container">
      <header className="audit-header">
        <h1 className="audit-title">Sistema de Auditoría Interna</h1>
        <p className="audit-subtitle">
          Control de departamentos y encargados de auditoría
        </p>
      </header>

      {/* Form Card */}
      <div className="audit-card">
        <h2 className="card-title">Nueva Auditoría</h2>
        <form onSubmit={addAudit} className="audit-form">
          <div className="input-group">
            <label>Departamento</label>
            <input
              type="text"
              name="department_name"
              placeholder="Ej. Recursos Humanos"
              value={formData.department_name}
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>

          <div className="input-group">
            <label>Encargado / Mánager</label>
            <input
              type="text"
              name="manager"
              placeholder="Ej. Ana Martínez"
              value={formData.manager}
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="is_completed"
              name="is_completed"
              checked={formData.is_completed}
              onChange={handleInputChange}
              className="checkbox-input"
            />
            <label htmlFor="is_completed" className="checkbox-label">
              Auditoría completada
            </label>
          </div>

          <button type="submit" className="submit-btn">
            + Registrar
          </button>
        </form>
      </div>

      {/* Audit Table */}
      <div className="audit-card">
        <div className="table-header">
          <h2 className="card-title">Registros Existentes</h2>
          <span className="count-badge">{auditList.length} Totales</span>
        </div>

        {loading ? (
          <p className="empty-state-text" style={{ textAlign: "center" }}>
            Cargando registros...
          </p>
        ) : auditList.length === 0 ? (
          <div className="empty-state-container">
            <p className="empty-state-text">
              No hay auditorías registradas todavía.
            </p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="audit-table">
              <thead>
                <tr className="tr-head">
                  <th>Departamento</th>
                  <th>Encargado</th>
                  <th>Estado</th>
                  <th className="text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {auditList.map((audit) => (
                  <tr key={audit.id}>
                    <td>
                      <strong>{audit.department_name}</strong>
                    </td>
                    <td>{audit.manager}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          audit.is_completed ? "completed" : "pending"
                        }`}
                      >
                        {audit.is_completed ? "Completada" : "Pendiente"}
                      </span>
                    </td>
                    <td className="text-right">
                      <button
                        onClick={() =>
                          toggleAuditStatus(audit.id, audit.is_completed)
                        }
                        className="action-btn btn-toggle"
                      >
                        {audit.is_completed ? "Reabrir" : "Completar"}
                      </button>
                      <button
                        onClick={() => deleteAudit(audit.id)}
                        className="action-btn btn-delete"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
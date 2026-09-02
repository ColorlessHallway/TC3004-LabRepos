import React, { useState, useEffect } from 'react';
import { createBusiness, updateBusiness } from '../../services/api.js';
const BusinessForm = ({ business, onSubmitSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        audit_status: 'Pendiente'
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (business) {
            setFormData({
                name: business.name || '',
                location: business.location || '',
                audit_status: business.audit_status || 'Pendiente'
            });
        }
    }, [business]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !formData.name.trim() ||
            !formData.location.trim() ||
            !formData.audit_status
        ) {
            setError('Falta informacion obligatoria del negocio');
            return;
        }
        setSubmitting(true);
        setError(null);
        try {
            if (business) {
                await updateBusiness(business.id, formData);
            } else {
                await createBusiness(formData);
            }
            setFormData({
                name: '',
                location: '',
                audit_status: 'Pendiente'
            });
            if (onSubmitSuccess) onSubmitSuccess();
        } catch (err) {
            setError('Error al guardar el negocio');
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="business-form">
            {error && <div className="error">{error}</div>}

            <div className="form-group">
                <label htmlFor="name">Nombre*:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={submitting}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="location">Ubicación*:</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    disabled={submitting}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="audit_status">Estado de auditoría*:</label>
                <select
                    id="audit_status"
                    name="audit_status"
                    value={formData.audit_status}
                    onChange={handleChange}
                    disabled={submitting}
                    required
                >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En progreso">En progreso</option>
                    <option value="Completada">Completada</option>
                </select>
            </div>

            <div className="form-actions">
                <button type="submit" disabled={submitting}>
                    {submitting ? 'Guardando...' : business ? 'Actualizar' : 'Crear'}
                </button>

                {onCancel && (
                    <button type="button" onClick={onCancel} disabled={submitting}>
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
};
export default BusinessForm;
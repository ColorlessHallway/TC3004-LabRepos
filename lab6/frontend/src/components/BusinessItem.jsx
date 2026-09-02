import React from 'react';
const BusinessItem = ({ business, onDelete, onEdit }) => {
    return (
        <div className="business-item">
            <div className="business-info">
                <h3>{business.name}</h3>
                <p><strong>Ubicación:</strong> {business.location}</p>
                <p><strong>Estado de auditoría:</strong> {business.audit_status}</p>
            </div>
            <div className="business-actions">
                <button onClick={onEdit} className="edit-btn">Editar</button>
                <button onClick={onDelete} className="delete-btn">Eliminar</button>
            </div>
        </div>
    );
};
export default BusinessItem;
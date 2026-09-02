import React, { useState, useEffect } from 'react';
import { getBusinesses, deleteBusiness } from '../../services/api';
import BusinessItem from './BusinessItem';
import BusinessForm from './BusinessForm';

const BusinessList = () => {
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const fetchBusinesses = async () => {
        setLoading(true);
        try {
            const data = await getBusinesses();
            setBusinesses(data);
            setError(null);
        } catch (err) {
            setError('Error al cargar los negocios');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchBusinesses();
    }, []);
    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este negocio?')) {
            try {
                await deleteBusiness(id);
                setBusinesses(businesses.filter(business => business.id !== id));
            } catch (err) {
                setError('Error al eliminar el negocio');
            }
        }
    };
    const handleEdit = (id) => {
        setEditingId(id);
    };
    const handleCancelEdit = () => {
        setEditingId(null);
    };
    const handleFormSubmit = () => {
        fetchBusinesses();
        setEditingId(null);
    };
    if (loading) return <div>Cargando negocios...</div>;
    if (error) return <div className="error">{error}</div>;
    return (
        <div className="business-list">
            <h2>Lista de Negocios</h2>
            {!editingId && (
                <div className="new-business">
                    <h3>Agregar Nuevo Negocio</h3>
                    <BusinessForm onSubmitSuccess={handleFormSubmit} />
                </div>
            )}
            <div className="businesses">
                {businesses.length === 0 ? (
                    <p>No hay negocios registrados.</p>
                ) : (
                    businesses.map(business => (
                        <div key={business.id}>
                            {editingId === business.id ? (
                                <div className="edit-form">
                                    <h3>Editar Negocio</h3>
                                    <BusinessForm
                                        business={business}
                                        onSubmitSuccess={handleFormSubmit}
                                        onCancel={handleCancelEdit}
                                    />
                                </div>
                            ) : (
                                <BusinessItem
                                    business={business}
                                    onDelete={() => handleDelete(business.id)}
                                    onEdit={() => handleEdit(business.id)}
                                />
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
export default BusinessList;
const pool = require('../db');

exports.getAllBusinesses = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM business ORDER BY name'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener los negocios:', error);
        res.status(500).json({ error: 'Error al obtener los negocios' });
    }
};

exports.getBusinessById = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM business WHERE id = $1',
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Negocio no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener el negocio:', error);
        res.status(500).json({ error: 'Error al obtener el negocio' });
    }
};

exports.createBusiness = async (req, res) => {
    const { name, location, audit_status } = req.body;

    if (!name || !location || !audit_status) {
        return res.status(400).json({
            error: 'El nombre, la ubicación y el estado de auditoría son obligatorios'
        });
    }

    try {
        const result = await pool.query(
            `INSERT INTO business (name, location, audit_status)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [name, location, audit_status]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear el negocio:', error);
        res.status(500).json({ error: 'Error al crear el negocio' });
    }
};

exports.updateBusiness = async (req, res) => {
    const { name, location, audit_status } = req.body;
    const businessId = req.params.id;

    if (!name || !location || !audit_status) {
        return res.status(400).json({
            error: 'El nombre, la ubicación y el estado de auditoría son obligatorios'
        });
    }

    try {
        const result = await pool.query(
            `UPDATE business
             SET name = $1, location = $2, audit_status = $3
             WHERE id = $4
             RETURNING *`,
            [name, location, audit_status, businessId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Negocio no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al actualizar el negocio:', error);
        res.status(500).json({ error: 'Error al actualizar el negocio' });
    }
};

exports.deleteBusiness = async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM business WHERE id = $1 RETURNING id',
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Negocio no encontrado' });
        }

        res.json({ message: 'Negocio eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el negocio:', error);
        res.status(500).json({ error: 'Error al eliminar el negocio' });
    }
};
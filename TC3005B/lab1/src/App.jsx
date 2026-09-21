import { useEffect, useMemo, useState } from 'react';

const emptyForm = {
  departmentName: '',
  auditStatus: 'Pending',
  lastAudited: '',
  auditorName: '',
};

const statusOptions = ['Pending', 'In Progress', 'Completed', 'Failed'];

function App() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecords = async () => {
    try {
      const response = await fetch('/api/departments');
      const data = await response.json();
      setRecords(data);
    } catch (err) {
      setError('Unable to load audit records.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const filteredRecords = useMemo(() => {
    if (!search.trim()) return records;
    const term = search.toLowerCase();
    return records.filter((record) =>
      Object.values(record).some((value) =>
        String(value).toLowerCase().includes(term)
      )
    );
  }, [records, search]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/departments/${editingId}` : '/api/departments';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || 'Something went wrong.');
      return;
    }

    await fetchRecords();
    resetForm();
  };

  const handleEdit = (record) => {
    setEditingId(record.id);
    setForm({
      departmentName: record.departmentName,
      auditStatus: record.auditStatus,
      lastAudited: record.lastAudited,
      auditorName: record.auditorName,
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this department audit record?');
    if (!confirmed) return;

    const response = await fetch(`/api/departments/${id}`, { method: 'DELETE' });
    if (response.ok) {
      setRecords((prev) => prev.filter((record) => record.id !== id));
      if (editingId === id) resetForm();
    }
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Department Audit Tracker</p>
          <h1>Audit Dashboard</h1>
        </div>
        <div className="status-pill">{records.length} departments</div>
      </header>

      <main className="content-grid">
        <section className="panel form-panel">
          <h2>{editingId ? 'Edit Department Audit' : 'Add Department Audit'}</h2>

          <form onSubmit={handleSubmit} className="audit-form">
            <label>
              Department Name
              <input
                type="text"
                name="departmentName"
                value={form.departmentName}
                onChange={handleChange}
                placeholder="e.g. Engineering"
                required
              />
            </label>

            <label>
              Audit Status
              <select name="auditStatus" value={form.auditStatus} onChange={handleChange}>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Last Audited
              <input
                type="date"
                name="lastAudited"
                value={form.lastAudited}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Auditor Name
              <input
                type="text"
                name="auditorName"
                value={form.auditorName}
                onChange={handleChange}
                placeholder="Full audit lead name"
                required
              />
            </label>

            {error && <p className="error-message">{error}</p>}

            <div className="button-row">
              <button type="submit" className="primary-btn">
                {editingId ? 'Update Record' : 'Save Record'}
              </button>
              {editingId && (
                <button type="button" className="secondary-btn" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="panel table-panel">
          <div className="table-header">
            <h2>Audit Records</h2>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search records"
              aria-label="Search records"
            />
          </div>

          {isLoading ? (
            <div className="empty-state">Loading records...</div>
          ) : filteredRecords.length === 0 ? (
            <div className="empty-state">No records match your search.</div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Last Audited</th>
                    <th>Auditor</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record) => (
                    <tr key={record.id}>
                      <td>{record.departmentName}</td>
                      <td>
                        <span className={`status-badge ${record.auditStatus.toLowerCase().replace(/\s+/g, '-')}`}>
                          {record.auditStatus}
                        </span>
                      </td>
                      <td>{record.lastAudited}</td>
                      <td>{record.auditorName}</td>
                      <td className="action-cell">
                        <button type="button" className="link-btn" onClick={() => handleEdit(record)}>
                          Edit
                        </button>
                        <button type="button" className="link-btn danger" onClick={() => handleDelete(record.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;

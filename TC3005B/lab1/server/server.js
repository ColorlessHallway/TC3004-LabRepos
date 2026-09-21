import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const PORT = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

const readDb = () => {
  const raw = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(raw);
};

const writeDb = (records) => {
  fs.writeFileSync(dbPath, JSON.stringify(records, null, 2));
};

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/departments', (_, res) => {
  try {
    const records = readDb();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error reading audit records.' });
  }
});

app.post('/api/departments', (req, res) => {
  const { departmentName, auditStatus, lastAudited, auditorName } = req.body;

  if (!departmentName || !auditStatus || !lastAudited || !auditorName) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const records = readDb();
    const nextId = records.length ? Math.max(...records.map((item) => item.id)) + 1 : 1;
    const newRecord = {
      id: nextId,
      departmentName,
      auditStatus,
      lastAudited,
      auditorName,
    };

    records.push(newRecord);
    writeDb(records);
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: 'Error creating audit record.' });
  }
});

app.put('/api/departments/:id', (req, res) => {
  const { id } = req.params;
  const { departmentName, auditStatus, lastAudited, auditorName } = req.body;

  if (!departmentName || !auditStatus || !lastAudited || !auditorName) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const records = readDb();
    const index = records.findIndex((record) => record.id === Number(id));

    if (index === -1) {
      return res.status(404).json({ message: 'Department record not found.' });
    }

    const updatedRecord = {
      ...records[index],
      departmentName,
      auditStatus,
      lastAudited,
      auditorName,
    };

    records[index] = updatedRecord;
    writeDb(records);
    res.json(updatedRecord);
  } catch (error) {
    res.status(500).json({ message: 'Error updating audit record.' });
  }
});

app.delete('/api/departments/:id', (req, res) => {
  const { id } = req.params;

  try {
    const records = readDb();
    const filtered = records.filter((record) => record.id !== Number(id));

    if (filtered.length === records.length) {
      return res.status(404).json({ message: 'Department record not found.' });
    }

    writeDb(filtered);
    res.json({ message: 'Department record deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting audit record.' });
  }
});

app.listen(PORT, () => {
  console.log(`Audit tracker API running on http://localhost:${PORT}`);
});

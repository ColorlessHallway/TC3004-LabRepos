'use client'
import { useEffect, useState } from 'react'
import { addDoc, collection, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase/firebase.config';

type Department = {
  id: string;
  departmentName: string;
  bossName: string;
  isAuditCompleted: boolean;
}

export default function Home() {
  const [departmentName, setDepartmentName] = useState('');
  const [bossName, setBossName] = useState('');
  const [isAuditCompleted, setIsAuditCompleted] = useState(false);
  const [items, setItems] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'departments'), (snapshot) => {
      setItems(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          departmentName: doc.data().departmentName,
          bossName: doc.data().bossName,
          isAuditCompleted: doc.data().isAuditCompleted ?? false,
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!departmentName.trim() || !bossName.trim()) return;

    const newDept = { departmentName, bossName, isAuditCompleted };

    setDepartmentName('');
    setBossName('');
    setIsAuditCompleted(false);
    setLoading(true);

    try {
      await addDoc(collection(db, 'departments'), newDept);
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) return;
    await deleteDoc(doc(db, 'departments', id));
  };

  const handleToggleAudit = async (id: string, currentStatus: boolean) => {
    await updateDoc(doc(db, 'departments', id), {
      isAuditCompleted: !currentStatus,
    });
  };

  const handleEdit = async (item: Department) => {
    const newDept = prompt("Enter new Department Name:", item.departmentName);
    if (newDept === null) return;

    const newBoss = prompt("Enter new Boss Name:", item.bossName);
    if (newBoss === null) return;

    await updateDoc(doc(db, 'departments', item.id), {
      departmentName: newDept || item.departmentName,
      bossName: newBoss || item.bossName,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center gap-8 font-sans">
      <h1 className="text-3xl font-bold tracking-wide text-white">Department Audits</h1>

      {/* Input Form */}
      <form 
        onSubmit={handleAdd} 
        className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-xl border border-zinc-800 p-5 rounded-xl bg-zinc-950 shadow-2xl"
      >
        <input
          type="text"
          placeholder="Department Name"
          className="border border-zinc-800 bg-zinc-900 text-white placeholder-zinc-500 p-2.5 rounded-lg w-full focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Boss Name"
          className="border border-zinc-800 bg-zinc-900 text-white placeholder-zinc-500 p-2.5 rounded-lg w-full focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all"
          value={bossName}
          onChange={(e) => setBossName(e.target.value)}
          required
        />
        <label className="flex items-center gap-2 whitespace-nowrap text-sm cursor-pointer text-zinc-300">
          <input
            type="checkbox"
            checked={isAuditCompleted}
            onChange={(e) => setIsAuditCompleted(e.target.checked)}
            className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-zinc-100 accent-zinc-200 focus:ring-0"
          />
          Audit Done
        </label>
        <button 
          type="submit" 
          disabled={loading}
          className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium px-5 py-2.5 rounded-lg border border-zinc-700 transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {loading ? 'Adding...' : 'Agregar'}
        </button>
      </form>

      {/* List */}
      <ul className="w-full max-w-xl space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between p-4 border border-zinc-800/80 rounded-xl bg-zinc-900/90 text-white gap-4 shadow-md"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-lg text-white">{item.departmentName}</span>
              <span className="text-sm text-zinc-400">Boss: {item.bossName}</span>
              <span className="text-xs font-medium text-zinc-300 mt-1">
                Status: {item.isAuditCompleted ? 'Audit Completed ✓' : 'Audit Pending ⏳'}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleToggleAudit(item.id, item.isAuditCompleted)}
                className="px-3 py-1.5 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white rounded-md transition-colors"
              >
                {item.isAuditCompleted ? 'Mark Pending' : 'Mark Complete'}
              </button>
              <button
                className="px-3 py-1.5 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white rounded-md transition-colors"
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1.5 text-xs font-medium bg-zinc-900 hover:bg-red-950 border border-zinc-700 hover:border-red-800 text-white rounded-md transition-colors"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
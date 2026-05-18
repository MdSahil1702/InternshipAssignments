import { useState } from 'react';
import type { Lead } from '../types';

interface Props {
  lead?: Lead | null;
  onClose: () => void;
  onSave: (data: object) => void;
}

const LeadModal = ({ lead, onClose, onSave }: Props) => {
  const [form, setForm] = useState({
    name:   lead?.name   || '',
    email:  lead?.email  || '',
    status: lead?.status || 'New',
    source: lead?.source || 'Website'
  });

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-lg font-bold mb-4">{lead ? 'Edit Lead' : 'Add Lead'}</h2>

        <div className="flex flex-col gap-3">
          <input name="name" value={form.name} onChange={handle}
            placeholder="Full Name" required
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"/>

          <input name="email" value={form.email} onChange={handle}
            placeholder="Email" type="email" required
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"/>

          <select name="status" value={form.status} onChange={handle}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
            {['New','Contacted','Qualified','Lost'].map(s =>
              <option key={s}>{s}</option>)}
          </select>

          <select name="source" value={form.source} onChange={handle}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
            {['Website','Instagram','Referral'].map(s =>
              <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className="flex gap-3 mt-5">
          <button onClick={onClose}
            className="flex-1 border border-gray-300 rounded py-2 text-sm hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={() => onSave(form)}
            className="flex-1 bg-green-600 text-white rounded py-2 text-sm hover:bg-green-700">
            {lead ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadModal;
import type { Lead } from '../types';
import { useAuth } from '../hooks/useAuth';

interface Props {
  lead: Lead;
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
}

const statusColor: Record<string, string> = {
  New:        'bg-blue-100 text-blue-700',
  Contacted:  'bg-yellow-100 text-yellow-700',
  Qualified:  'bg-green-100 text-green-700',
  Lost:       'bg-red-100 text-red-700'
};

const LeadCard = ({ lead, onEdit, onDelete }: Props) => {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-gray-800">{lead.name}</h3>
          <p className="text-sm text-gray-500">{lead.email}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${statusColor[lead.status]}`}>
          {lead.status}
        </span>
      </div>
      <div className="flex gap-2 text-xs text-gray-500">
        <span>📌 {lead.source}</span>
        <span>👤 {lead.createdBy?.name}</span>
      </div>
      <p className="text-xs text-gray-400">
        {new Date(lead.createdAt).toLocaleDateString()}
      </p>
      <div className="flex gap-2 mt-1">
        <button
          onClick={() => onEdit(lead)}
          className="flex-1 text-sm bg-green-600 text-white py-1 rounded hover:bg-green-700"
        >
          Edit
        </button>
        {user?.role === 'admin' && (
          <button
            onClick={() => onDelete(lead._id)}
            className="flex-1 text-sm bg-red-500 text-white py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default LeadCard;
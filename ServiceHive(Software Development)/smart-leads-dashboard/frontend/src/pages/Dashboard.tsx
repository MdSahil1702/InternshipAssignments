import { useState, useEffect, useCallback } from 'react';
import type { Lead, LeadFilters, PaginationMeta } from '../types';
import { getLeadsAPI, createLeadAPI, updateLeadAPI, deleteLeadAPI, exportCSVAPI } from '../api/leads';
import { useDebounce } from '../hooks/useDebounce';
import Navbar from '../components/Navbar';
import LeadCard from '../components/LeadCard';
import LeadModal from '../components/LeadModal';

const Dashboard = () => {
  const [leads, setLeads]     = useState<Lead[]>([]);
  const [meta, setMeta]       = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [modal, setModal]     = useState(false);
  const [selLead, setSelLead] = useState<Lead | null>(null);
  const [search, setSearch]   = useState('');
  const debouncedSearch       = useDebounce(search, 500);

  const [filters, setFilters] = useState<LeadFilters>({
    status: '', source: '', search: '', sort: 'latest', page: 1
  });

  const fetchLeads = useCallback(async (f: LeadFilters, s: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await getLeadsAPI({ ...f, search: s });
      setLeads(res.data.data);
      setMeta(res.data.meta);
    } catch {
      setError('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads(filters, debouncedSearch);
  }, [filters, debouncedSearch, fetchLeads]);

  const handleSave = async (data: object) => {
    try {
      if (selLead) await updateLeadAPI(selLead._id, data);
      else await createLeadAPI(data);
      setModal(false);
      setSelLead(null);
      fetchLeads(filters, debouncedSearch);
    } catch {
      setError('Failed to save lead');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this lead?')) return;
    try {
      await deleteLeadAPI(id);
      fetchLeads(filters, debouncedSearch);
    } catch {
      setError('Failed to delete lead');
    }
  };

  const handleExport = async () => {
    try {
      const res = await exportCSVAPI();
      const url = URL.createObjectURL(new Blob([res.data]));
      const a   = document.createElement('a');
      a.href    = url;
      a.download = 'leads.csv';
      a.click();
    } catch {
      setError('Export failed');
    }
  };

  const setFilter = (key: keyof LeadFilters, val: string | number) =>
    setFilters(p => ({ ...p, [key]: val, page: 1 }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Leads</h2>
          <div className="flex gap-2">
            <button onClick={handleExport}
              className="bg-white border border-green-600 text-green-600 px-4 py-2 rounded text-sm font-semibold hover:bg-green-50">
              Export CSV
            </button>
            <button onClick={() => { setSelLead(null); setModal(true); }}
              className="bg-green-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-green-700">
              + Add Lead
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow p-4 mb-6 flex flex-wrap gap-3">
          <input
            placeholder="Search name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded px-3 py-2 text-sm flex-1 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-green-400"/>

          <select onChange={e => setFilter('status', e.target.value)}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
            <option value="">All Status</option>
            {['New','Contacted','Qualified','Lost'].map(s =>
              <option key={s}>{s}</option>)}
          </select>

          <select onChange={e => setFilter('source', e.target.value)}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
            <option value="">All Sources</option>
            {['Website','Instagram','Referral'].map(s =>
              <option key={s}>{s}</option>)}
          </select>

          <select onChange={e => setFilter('sort', e.target.value)}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Loading */}
        {loading && (
          <div className="text-center py-20 text-gray-400">Loading...</div>
        )}

        {/* Empty */}
        {!loading && leads.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-2">📭</p>
            <p>No leads found</p>
          </div>
        )}

        {/* Grid */}
        {!loading && leads.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {leads.map(lead => (
              <LeadCard key={lead._id} lead={lead}
                onEdit={(l) => { setSelLead(l); setModal(true); }}
                onDelete={handleDelete}/>
            ))}
          </div>
        )}

        {/* Pagination */}
        {meta && meta.totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(p => (
              <button key={p}
                onClick={() => setFilters(f => ({ ...f, page: p }))}
                className={`px-3 py-1 rounded text-sm font-semibold border
                  ${filters.page === p
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}>
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {modal && (
        <LeadModal
          lead={selLead}
          onClose={() => { setModal(false); setSelLead(null); }}
          onSave={handleSave}/>
      )}
    </div>
  );
};

export default Dashboard;
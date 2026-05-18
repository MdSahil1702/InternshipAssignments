export type { User, AuthState, Lead, PaginationMeta, LeadFilters };

interface User {
  id: string;
  name: string;
  role: 'admin' | 'sales';
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
  source: 'Website' | 'Instagram' | 'Referral';
  createdBy: { name: string; email: string };
  createdAt: string;
}

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface LeadFilters {
  status: string;
  source: string;
  search: string;
  sort: string;
  page: number;
}
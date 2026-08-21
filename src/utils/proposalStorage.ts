export interface Proposal {
  id: string;
  name: string;
  email: string;
  projectType: string;
  currency: string;
  budget: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'in-discussion' | 'archived';
  notes?: string;
}

const STORAGE_KEY = 'alok_proposals_vault_v1';
const PROPOSAL_EVENT = 'alok_proposals_updated';

// Generate a sleek human-readable reference code like PRP-8492
export const generateProposalId = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `PRP-${code}`;
};

export const getStoredProposals = (): Proposal[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as Proposal[];
  } catch (err) {
    console.error('Failed to read proposals from localStorage:', err);
    return [];
  }
};

export const saveProposal = (proposalData: Omit<Proposal, 'id' | 'createdAt' | 'status'>): Proposal => {
  const proposals = getStoredProposals();
  const newProposal: Proposal = {
    ...proposalData,
    id: generateProposalId(),
    createdAt: new Date().toISOString(),
    status: 'unread',
  };

  const updated = [newProposal, ...proposals];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(PROPOSAL_EVENT, { detail: newProposal }));
  } catch (err) {
    console.error('Failed to save proposal to localStorage:', err);
  }
  return newProposal;
};

export const updateProposalStatus = (id: string, status: Proposal['status']): Proposal[] => {
  const proposals = getStoredProposals();
  const updated = proposals.map((p) => (p.id === id ? { ...p, status } : p));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(PROPOSAL_EVENT));
  } catch (err) {
    console.error('Failed to update proposal status:', err);
  }
  return updated;
};

export const updateProposalNotes = (id: string, notes: string): Proposal[] => {
  const proposals = getStoredProposals();
  const updated = proposals.map((p) => (p.id === id ? { ...p, notes } : p));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(PROPOSAL_EVENT));
  } catch (err) {
    console.error('Failed to update proposal notes:', err);
  }
  return updated;
};

export const deleteProposal = (id: string): Proposal[] => {
  const proposals = getStoredProposals();
  const updated = proposals.filter((p) => p.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(PROPOSAL_EVENT));
  } catch (err) {
    console.error('Failed to delete proposal:', err);
  }
  return updated;
};

export const clearAllProposals = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(PROPOSAL_EVENT));
  } catch (err) {
    console.error('Failed to clear proposals:', err);
  }
};

export const getUnreadProposalsCount = (): number => {
  const proposals = getStoredProposals();
  return proposals.filter((p) => p.status === 'unread').length;
};

// Export to JSON file
export const exportProposalsAsJSON = (): void => {
  const proposals = getStoredProposals();
  const jsonStr = JSON.stringify(proposals, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `executive-proposals-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

// Export to CSV spreadsheet
export const exportProposalsAsCSV = (): void => {
  const proposals = getStoredProposals();
  if (proposals.length === 0) return;

  const headers = ['ID', 'Date', 'Status', 'Name', 'Email', 'Scope', 'Currency', 'Budget', 'Message', 'Notes'];
  const rows = proposals.map((p) => [
    `"${p.id}"`,
    `"${new Date(p.createdAt).toLocaleString()}"`,
    `"${p.status}"`,
    `"${(p.name || '').replace(/"/g, '""')}"`,
    `"${(p.email || '').replace(/"/g, '""')}"`,
    `"${(p.projectType || '').replace(/"/g, '""')}"`,
    `"${(p.currency || '').replace(/"/g, '""')}"`,
    `"${(p.budget || '').replace(/"/g, '""')}"`,
    `"${(p.message || '').replace(/"/g, '""')}"`,
    `"${(p.notes || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `executive-proposals-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

// Sample seeder for demo/testing
export const seedSampleProposal = (): Proposal => {
  return saveProposal({
    name: 'Eleanor Vance / Apex Studio',
    email: 'eleanor@apexstudio.io',
    projectType: 'Web3D / Three.js Graphics',
    currency: 'USD ($)',
    budget: '25k - 50k',
    message: 'We are seeking an interactive 3D configurator with custom WebGL shaders, dynamic camera transitions, and seamless responsive design for our upcoming luxury brand flagship launch.',
  });
};

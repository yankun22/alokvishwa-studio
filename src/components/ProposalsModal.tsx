import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Inbox, 
  X, 
  Search, 
  Mail, 
  Trash2, 
  Download, 
  Check, 
  Copy, 
  Sparkles, 
  Tag, 
  Clock, 
  Calendar, 
  Filter, 
  Lock, 
  Unlock, 
  KeyRound,
  ShieldCheck,
  ShieldAlert,
  Eye,
  EyeOff,
  AlertCircle,
  FileSpreadsheet,
  FileJson,
  ExternalLink,
  ChevronRight,
  User,
  DollarSign,
  Settings,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { 
  Proposal, 
  getStoredProposals, 
  updateProposalStatus, 
  deleteProposal, 
  clearAllProposals, 
  exportProposalsAsCSV, 
  exportProposalsAsJSON, 
  seedSampleProposal,
  updateProposalNotes
} from '../utils/proposalStorage';
import {
  MASTER_KEY,
  DEFAULT_PASSWORD,
  verifyVaultPassword,
  changeVaultPassword,
  resetPasswordToDefault,
  isCustomPasswordSet,
  getActivePasswordDisplay
} from '../utils/vaultAuth';

interface ProposalsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ConfirmDialogState {
  type: 'delete-single' | 'clear-all';
  proposalId?: string;
  proposalName?: string;
}

export const ProposalsModal: React.FC<ProposalsModalProps> = ({ isOpen, onClose }) => {
  // Authentication State (Locked by default on open)
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Security Panel State inside Unlocked Vault
  const [showSecuritySettings, setShowSecuritySettings] = useState<boolean>(false);
  const [currentAuthKey, setCurrentAuthKey] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [securityMessage, setSecurityMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [masterKeyResetInput, setMasterKeyResetInput] = useState<string>('');

  // Password visibility inside Security panel
  const [showActivePassword, setShowActivePassword] = useState<boolean>(false);
  const [showMasterKey, setShowMasterKey] = useState<boolean>(false);

  // Custom In-App Confirmation Dialog (for Delete Single & Clear All)
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState | null>(null);

  // Proposals Data
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read' | 'in-discussion' | 'archived'>('all');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>('');

  // Reset lock state whenever modal opens or closes
  useEffect(() => {
    if (!isOpen) {
      setIsUnlocked(false);
      setPasswordInput('');
      setAuthError(null);
      setShowSecuritySettings(false);
      setSecurityMessage(null);
      setConfirmDialog(null);
      setShowActivePassword(false);
      setShowMasterKey(false);
    }
  }, [isOpen]);

  const loadProposals = () => {
    const list = getStoredProposals();
    setProposals(list);
    if (list.length > 0 && (!selectedId || !list.find((p) => p.id === selectedId))) {
      setSelectedId(list[0].id);
      setNotes(list[0].notes || '');
    } else if (list.length === 0) {
      setSelectedId(null);
    }
  };

  useEffect(() => {
    if (isOpen && isUnlocked) {
      loadProposals();
    }
  }, [isOpen, isUnlocked]);

  // Reactive listener for real-time updates
  useEffect(() => {
    const handleUpdate = () => {
      if (isUnlocked) {
        loadProposals();
      }
    };
    window.addEventListener('alok_proposals_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('alok_proposals_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [selectedId, isUnlocked]);

  const selectedProposal = proposals.find((p) => p.id === selectedId) || null;

  useEffect(() => {
    if (selectedProposal) {
      setNotes(selectedProposal.notes || '');
      if (selectedProposal.status === 'unread') {
        const updated = updateProposalStatus(selectedProposal.id, 'read');
        setProposals(updated);
      }
    }
  }, [selectedId]);

  // Auth unlock submission
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const isValid = verifyVaultPassword(passwordInput);
    if (isValid) {
      setIsUnlocked(true);
      setPasswordInput('');
      setAuthError(null);
      loadProposals();
    } else {
      setAuthError('Access Denied: Invalid password.');
    }
  };

  const handleLockVault = () => {
    setIsUnlocked(false);
    setShowSecuritySettings(false);
    setPasswordInput('');
    setAuthError(null);
    setConfirmDialog(null);
  };

  // Change Password Handler
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityMessage(null);

    if (newPassword !== confirmNewPassword) {
      setSecurityMessage({
        type: 'error',
        text: 'New passwords do not match. Please verify.',
      });
      return;
    }

    const result = changeVaultPassword(currentAuthKey, newPassword);
    if (result.success) {
      setSecurityMessage({
        type: 'success',
        text: result.message,
      });
      setCurrentAuthKey('');
      setNewPassword('');
      setConfirmNewPassword('');
    } else {
      setSecurityMessage({
        type: 'error',
        text: result.message,
      });
    }
  };

  // Master Key Reset Handler
  const handleMasterKeyReset = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityMessage(null);

    const result = resetPasswordToDefault(masterKeyResetInput);
    if (result.success) {
      setSecurityMessage({
        type: 'success',
        text: result.message,
      });
      setMasterKeyResetInput('');
    } else {
      setSecurityMessage({
        type: 'error',
        text: result.message,
      });
    }
  };

  const filteredProposals = proposals.filter((p) => {
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchStatus;
    const matchQuery =
      p.name.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      p.projectType.toLowerCase().includes(q) ||
      p.budget.toLowerCase().includes(q) ||
      p.message.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q);
    return matchStatus && matchQuery;
  });

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCopyFullProposal = (p: Proposal) => {
    const summary = `--- EXECUTIVE PROPOSAL [${p.id}] ---
Date: ${new Date(p.createdAt).toLocaleString()}
Client: ${p.name}
Email: ${p.email}
Domain: ${p.projectType}
Budget: ${p.currency} ${p.budget}
Status: ${p.status.toUpperCase()}

Technical Vision & Scope:
${p.message}
----------------------------------------`;
    handleCopy(summary, 'full-proposal');
  };

  const handleStatusChange = (newStatus: Proposal['status']) => {
    if (!selectedProposal) return;
    const updated = updateProposalStatus(selectedProposal.id, newStatus);
    setProposals(updated);
  };

  const handleSaveNotes = () => {
    if (!selectedProposal) return;
    const updated = updateProposalNotes(selectedProposal.id, notes);
    setProposals(updated);
    handleCopy('Notes saved', 'notes-saved');
  };

  // Open confirmation for single delete
  const requestDeleteSingle = (p: Proposal, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setConfirmDialog({
      type: 'delete-single',
      proposalId: p.id,
      proposalName: p.name,
    });
  };

  // Open confirmation for clear all
  const requestClearAll = () => {
    setConfirmDialog({
      type: 'clear-all',
    });
  };

  // Execute confirmed deletion
  const executeConfirmation = () => {
    if (!confirmDialog) return;

    if (confirmDialog.type === 'delete-single' && confirmDialog.proposalId) {
      const idToDelete = confirmDialog.proposalId;
      const updated = deleteProposal(idToDelete);
      setProposals(updated);
      if (selectedId === idToDelete) {
        setSelectedId(updated.length > 0 ? updated[0].id : null);
      }
    } else if (confirmDialog.type === 'clear-all') {
      clearAllProposals();
      setProposals([]);
      setSelectedId(null);
    }

    setConfirmDialog(null);
  };

  const handleSeed = () => {
    const p = seedSampleProposal();
    setSelectedId(p.id);
  };

  const unreadCount = proposals.filter((p) => p.status === 'unread').length;
  const activePassword = getActivePasswordDisplay();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#030304]/90 backdrop-blur-2xl"
        />

        {/* Modal Shell */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl h-[90vh] max-h-[860px] bg-[#07080b] border border-white/[0.1] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-platinum z-10"
        >
          {/* ========================================================
              LOCKED STATE: CLEAN HIGH-SECURITY AUTHENTICATION GATEWAY
              (No credentials/passwords displayed on the lock screen)
             ======================================================== */}
          {!isUnlocked ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 relative overflow-y-auto">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-platinum-muted hover:text-platinum transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-full max-w-md space-y-7 text-center my-auto">
                {/* Glowing Lock Icon */}
                <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-3xl bg-emerald-500/10 blur-xl animate-pulse" />
                  <div className="relative w-18 h-18 rounded-3xl bg-white/[0.03] border border-white/[0.12] flex items-center justify-center text-platinum shadow-2xl">
                    <Lock className="w-8 h-8 text-emerald-400" />
                  </div>
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-platinum-muted text-xs font-mono mb-2 uppercase tracking-wider">
                    <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Executive Vault Security</span>
                  </div>
                  <h3 className="font-sans font-bold text-2xl sm:text-3xl text-platinum">
                    Enter Vault Password
                  </h3>
                  <p className="text-xs sm:text-sm text-platinum-muted font-light mt-1.5 leading-relaxed">
                    This intake database is strictly restricted to Alok. Enter your authorization credentials to unlock.
                  </p>
                </div>

                {/* Password Form */}
                <form onSubmit={handleUnlock} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-mono text-platinum-muted mb-2">
                      Enter your password
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        autoFocus
                        required
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="Enter your password..."
                        className="w-full pl-4 pr-11 py-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.1] text-platinum text-sm focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/30 placeholder:text-platinum-dark transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 p-1.5 text-platinum-muted hover:text-platinum transition-colors"
                        title={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {authError && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{authError}</span>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-white text-slate-950 font-bold text-sm hover:bg-slate-200 transition-all shadow-lg min-h-[48px]"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>Authorize & Unlock Vault</span>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            /* ========================================================
               UNLOCKED STATE: EXECUTIVE VAULT COMMAND CENTER
               ======================================================== */
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
              {/* Header */}
              <div className="px-6 py-4 border-b border-white/[0.08] bg-[#0a0c10]/95 flex items-center justify-between gap-4 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-platinum">
                    <Inbox className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="font-sans font-bold text-lg text-platinum">
                        Recorded Proposals Vault
                      </h2>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono font-medium">
                        {proposals.length} Total {unreadCount > 0 && `• ${unreadCount} Unread`}
                      </span>
                    </div>
                    <p className="text-xs text-platinum-muted font-mono">
                      Authenticated Session • Client Intake Pipeline
                    </p>
                  </div>
                </div>

                {/* Header Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowSecuritySettings(!showSecuritySettings)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-colors ${
                      showSecuritySettings
                        ? 'bg-white/20 text-platinum border-white/40 font-semibold'
                        : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/[0.08] text-platinum-muted hover:text-platinum'
                    }`}
                    title="Change Password & Security Settings"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Security</span>
                  </button>

                  <button
                    onClick={exportProposalsAsCSV}
                    disabled={proposals.length === 0}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-xs font-mono text-platinum-muted hover:text-platinum disabled:opacity-40 transition-colors"
                    title="Export as CSV spreadsheet"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>CSV</span>
                  </button>

                  <button
                    onClick={exportProposalsAsJSON}
                    disabled={proposals.length === 0}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-xs font-mono text-platinum-muted hover:text-platinum disabled:opacity-40 transition-colors"
                    title="Export as JSON backup"
                  >
                    <FileJson className="w-3.5 h-3.5" />
                    <span>JSON</span>
                  </button>

                  <button
                    onClick={handleLockVault}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-mono text-red-300 transition-colors"
                    title="Lock vault immediately"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Lock</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-platinum-muted hover:text-platinum transition-colors"
                    aria-label="Close proposals vault"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* ========================================================
                  SECURITY & PASSWORDS PANEL (Inside Unlocked Vault)
                  With Eye Buttons to toggle show/hide for credentials
                 ======================================================== */}
              {showSecuritySettings && (
                <div className="p-5 bg-[#0b0e14] border-b border-white/[0.08] shrink-0 max-h-[60vh] overflow-y-auto">
                  <div className="max-w-4xl mx-auto space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <KeyRound className="w-4 h-4 text-emerald-400" />
                        <h4 className="font-sans font-bold text-base text-platinum">
                          Vault Security & Password Credentials
                        </h4>
                      </div>
                      <button
                        onClick={() => setShowSecuritySettings(false)}
                        className="text-xs font-mono text-platinum-muted hover:text-platinum px-2 py-1 rounded bg-white/[0.03]"
                      >
                        ✕ Close Panel
                      </button>
                    </div>

                    {/* Active Credentials Cards (Masked by default with Eye Toggle) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {/* Active Password Box */}
                      <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-mono text-platinum-muted flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Active Vault Password:</span>
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                            {isCustomPasswordSet() ? 'Custom Password' : 'Default'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-[#06070a] border border-white/[0.06]">
                          <span className="font-mono text-xs text-platinum tracking-wider truncate">
                            {showActivePassword ? activePassword : '••••••••••••'}
                          </span>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => setShowActivePassword(!showActivePassword)}
                              className="p-1 rounded text-platinum-muted hover:text-platinum transition-colors"
                              title={showActivePassword ? 'Hide password' : 'Show password'}
                            >
                              {showActivePassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleCopy(activePassword, 'active-pwd')}
                              className="p-1 rounded text-platinum-muted hover:text-platinum transition-colors"
                              title="Copy password"
                            >
                              {copiedField === 'active-pwd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Permanent Master Key Box */}
                      <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-mono text-platinum-muted flex items-center gap-1.5">
                            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                            <span>Permanent Master Key:</span>
                          </span>
                          <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded">
                            Always Active
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-[#06070a] border border-white/[0.06]">
                          <span className="font-mono text-xs text-amber-300 tracking-wider truncate">
                            {showMasterKey ? MASTER_KEY : '••••••••••••••••'}
                          </span>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => setShowMasterKey(!showMasterKey)}
                              className="p-1 rounded text-platinum-muted hover:text-platinum transition-colors"
                              title={showMasterKey ? 'Hide Master Key' : 'Show Master Key'}
                            >
                              {showMasterKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleCopy(MASTER_KEY, 'master-key')}
                              className="p-1 rounded text-platinum-muted hover:text-platinum transition-colors"
                              title="Copy Master Key"
                            >
                              {copiedField === 'master-key' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {securityMessage && (
                      <div className={`p-3 rounded-xl text-xs font-mono flex items-center gap-2 ${
                        securityMessage.type === 'success'
                          ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
                          : 'bg-red-500/10 border border-red-500/20 text-red-300'
                      }`}>
                        {securityMessage.type === 'success' ? (
                          <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                        )}
                        <span>{securityMessage.text}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Change Password Form */}
                      <form onSubmit={handleChangePassword} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                        <span className="text-xs font-mono text-platinum font-semibold block">
                          Change Vault Password
                        </span>
                        <div>
                          <label className="block text-[11px] font-mono text-platinum-muted mb-1">
                            Current Password or Master Key
                          </label>
                          <input
                            type="password"
                            required
                            value={currentAuthKey}
                            onChange={(e) => setCurrentAuthKey(e.target.value)}
                            placeholder="Current password / Master key..."
                            className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-platinum text-xs focus:outline-none focus:border-white/30"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-mono text-platinum-muted mb-1">
                              New Password
                            </label>
                            <input
                              type="password"
                              required
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              placeholder="New password..."
                              className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-platinum text-xs focus:outline-none focus:border-white/30"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono text-platinum-muted mb-1">
                              Confirm New
                            </label>
                            <input
                              type="password"
                              required
                              value={confirmNewPassword}
                              onChange={(e) => setConfirmNewPassword(e.target.value)}
                              placeholder="Confirm..."
                              className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-platinum text-xs focus:outline-none focus:border-white/30"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2 px-4 rounded-xl bg-white text-slate-950 text-xs font-bold hover:bg-slate-200 transition-colors"
                        >
                          Update Password
                        </button>
                      </form>

                      {/* Master Key Recovery & Reset Form */}
                      <form onSubmit={handleMasterKeyReset} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-mono text-amber-300 font-semibold mb-1">
                            <KeyRound className="w-3.5 h-3.5" />
                            <span>Master Key Emergency Reset</span>
                          </div>
                          <p className="text-[11px] text-platinum-muted leading-relaxed mb-2 font-mono">
                            Enter your permanent Master Key to reset the password back to default ({DEFAULT_PASSWORD}).
                          </p>
                          <div>
                            <label className="block text-[11px] font-mono text-platinum-muted mb-1">
                              Master Key Verification
                            </label>
                            <input
                              type="password"
                              required
                              value={masterKeyResetInput}
                              onChange={(e) => setMasterKeyResetInput(e.target.value)}
                              placeholder="Type Master Key to reset..."
                              className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-platinum text-xs focus:outline-none focus:border-white/30 font-mono"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 text-xs font-mono font-medium transition-colors"
                        >
                          Reset to Default Password
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {/* Main Body Split: Master List (Left) + Detail View (Right) */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
                {/* Left Panel: Proposal List (5 cols) */}
                <div className="md:col-span-5 border-r border-white/[0.06] flex flex-col h-full bg-[#050608]/50 overflow-hidden">
                  {/* Search & Filter Bar */}
                  <div className="p-3.5 border-b border-white/[0.06] space-y-2.5 shrink-0">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-platinum-muted" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search name, email, scope..."
                        className="w-full pl-8 pr-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-platinum text-xs focus:outline-none focus:border-white/30 placeholder:text-platinum-dark"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-platinum-muted hover:text-platinum"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {/* Filter Pills */}
                    <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px] font-mono scrollbar-none">
                      {(['all', 'unread', 'in-discussion', 'archived'] as const).map((filterKey) => (
                        <button
                          key={filterKey}
                          onClick={() => setStatusFilter(filterKey)}
                          className={`px-2.5 py-1 rounded-lg border transition-all capitalize whitespace-nowrap ${
                            statusFilter === filterKey
                              ? 'bg-white/[0.12] text-platinum border-white/30 font-medium'
                              : 'bg-white/[0.02] text-platinum-muted hover:text-platinum border-white/[0.04]'
                          }`}
                        >
                          {filterKey === 'in-discussion' ? 'In Review' : filterKey}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Proposals Scrollable List */}
                  <div className="flex-1 overflow-y-auto p-2 space-y-1.5 custom-scrollbar">
                    {filteredProposals.length === 0 ? (
                      <div className="p-8 text-center space-y-3 my-auto">
                        <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center mx-auto text-platinum-muted">
                          <Inbox className="w-6 h-6" />
                        </div>
                        <p className="text-xs font-mono text-platinum-muted">
                          {proposals.length === 0 ? 'No recorded proposals yet.' : 'No proposals match your search filter.'}
                        </p>
                        {proposals.length === 0 && (
                          <button
                            onClick={handleSeed}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-xs font-mono text-platinum transition-colors"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-platinum" />
                            <span>Insert Demo Proposal</span>
                          </button>
                        )}
                      </div>
                    ) : (
                      filteredProposals.map((p) => {
                        const isSelected = p.id === selectedId;
                        const dateFormatted = new Date(p.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        });

                        return (
                          <div
                            key={p.id}
                            onClick={() => setSelectedId(p.id)}
                            className={`w-full text-left p-3.5 rounded-2xl border transition-all relative group cursor-pointer ${
                              isSelected
                                ? 'bg-white/[0.08] border-white/30 shadow-noir-card'
                                : 'bg-white/[0.015] hover:bg-white/[0.04] border-white/[0.04] hover:border-white/[0.1]'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <div className="flex items-center gap-2 min-w-0">
                                {p.status === 'unread' && (
                                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                                )}
                                <h4 className="font-sans font-semibold text-xs sm:text-sm text-platinum truncate">
                                  {p.name}
                                </h4>
                              </div>
                              <div className="flex items-center gap-1.5 shrink-0">
                                <span className="text-[10px] font-mono text-platinum-muted">
                                  {dateFormatted}
                                </span>
                                {/* Quick Delete Icon Button */}
                                <button
                                  type="button"
                                  onClick={(e) => requestDeleteSingle(p, e)}
                                  className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-red-500/20 text-platinum-muted hover:text-red-400 transition-all"
                                  title="Delete this proposal"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            <p className="text-[11px] font-mono text-platinum-muted truncate mb-2">
                              {p.projectType}
                            </p>

                            <div className="flex items-center justify-between text-[10px] font-mono">
                              <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-platinum">
                                {p.currency} {p.budget}
                              </span>
                              <span className={`px-1.5 py-0.5 rounded capitalize ${
                                p.status === 'unread' ? 'text-emerald-400 bg-emerald-500/10' :
                                p.status === 'in-discussion' ? 'text-amber-400 bg-amber-500/10' :
                                p.status === 'archived' ? 'text-slate-400 bg-slate-500/10' :
                                'text-platinum-muted bg-white/[0.03]'
                              }`}>
                                {p.status === 'in-discussion' ? 'In Review' : p.status}
                              </span>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Footer Utilities */}
                  <div className="p-3 border-t border-white/[0.06] bg-[#050608] flex items-center justify-between gap-2 shrink-0">
                    <button
                      onClick={handleSeed}
                      className="flex items-center gap-1.5 text-[11px] font-mono text-platinum-muted hover:text-platinum transition-colors"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>+ Test Item</span>
                    </button>
                    {proposals.length > 0 && (
                      <button
                        onClick={requestClearAll}
                        className="flex items-center gap-1 text-[11px] font-mono text-red-400/80 hover:text-red-400 px-2 py-1 rounded bg-red-500/5 hover:bg-red-500/15 border border-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Clear All ({proposals.length})</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Right Panel: Proposal Detailed Viewer (7 cols) */}
                <div className="md:col-span-7 flex flex-col h-full bg-[#07080b] overflow-hidden">
                  {selectedProposal ? (
                    <div className="flex-1 flex flex-col overflow-hidden">
                      {/* Proposal Detail Header */}
                      <div className="p-6 border-b border-white/[0.06] bg-white/[0.01] shrink-0">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.08] text-platinum font-mono text-[11px]">
                                {selectedProposal.id}
                              </span>
                              <span className="text-xs font-mono text-platinum-muted flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(selectedProposal.createdAt).toLocaleString()}
                              </span>
                            </div>
                            <h3 className="font-sans font-bold text-xl text-platinum">
                              {selectedProposal.name}
                            </h3>
                          </div>

                          {/* Status Selector & Delete Button */}
                          <div className="flex items-center gap-2">
                            <select
                              value={selectedProposal.status}
                              onChange={(e) => handleStatusChange(e.target.value as Proposal['status'])}
                              className="px-3 py-1.5 rounded-xl bg-[#0a0b0e] border border-white/[0.1] text-xs font-mono text-platinum focus:outline-none focus:border-white/30 cursor-pointer"
                            >
                              <option value="unread">Status: Unread</option>
                              <option value="read">Status: Read</option>
                              <option value="in-discussion">Status: In Review</option>
                              <option value="archived">Status: Archived</option>
                            </select>

                            <button
                              onClick={() => requestDeleteSingle(selectedProposal)}
                              className="p-2 rounded-xl bg-white/[0.02] hover:bg-red-500/10 border border-white/[0.06] hover:border-red-500/20 text-platinum-muted hover:text-red-400 transition-colors"
                              title="Delete this proposal"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Quick Contact & Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2.5">
                          <a
                            href={`mailto:${selectedProposal.email}?subject=${encodeURIComponent(`Executive Inquiry Follow-up: ${selectedProposal.projectType}`)}&body=${encodeURIComponent(`Hi ${selectedProposal.name},\n\nThank you for submitting your project specifications regarding ${selectedProposal.projectType}.\n\n`)}`}
                            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white text-slate-950 hover:bg-slate-200 text-xs font-bold transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Reply to {selectedProposal.email}</span>
                          </a>

                          <button
                            onClick={() => handleCopy(selectedProposal.email, 'email')}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-platinum transition-colors"
                          >
                            {copiedField === 'email' ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400">Copied Email</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-platinum-muted" />
                                <span>Copy Email</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => handleCopyFullProposal(selectedProposal)}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-platinum transition-colors"
                          >
                            {copiedField === 'full-proposal' ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400">Copied Full Scope</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-platinum-muted" />
                                <span>Copy Full Scope</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Proposal Detail Content */}
                      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                        {/* Metadata Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                            <span className="text-[10px] font-mono text-platinum-muted uppercase tracking-wider block mb-1">
                              Engineering Domain
                            </span>
                            <span className="text-sm font-semibold text-platinum">
                              {selectedProposal.projectType}
                            </span>
                          </div>

                          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                            <span className="text-[10px] font-mono text-platinum-muted uppercase tracking-wider block mb-1">
                              Estimated Budget & Currency
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-emerald-400 font-mono">
                                {selectedProposal.currency} {selectedProposal.budget}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Scope & Objectives Box */}
                        <div>
                          <span className="text-xs font-mono text-platinum-muted block mb-2 font-medium">
                            Project Scope & Technical Vision
                          </span>
                          <div className="p-5 rounded-2xl bg-white/[0.015] border border-white/[0.08] text-platinum text-sm leading-relaxed whitespace-pre-wrap font-sans">
                            {selectedProposal.message}
                          </div>
                        </div>

                        {/* Internal Notes / Follow-up Tracking */}
                        <div className="p-4.5 rounded-2xl bg-white/[0.01] border border-white/[0.06]">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-mono text-platinum-muted flex items-center gap-1.5">
                              <Tag className="w-3.5 h-3.5" />
                              <span>Internal Notes & Follow-up Log</span>
                            </span>
                            {copiedField === 'notes-saved' && (
                              <span className="text-[11px] font-mono text-emerald-400">Notes Saved!</span>
                            )}
                          </div>
                          <textarea
                            rows={2}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Private notes (e.g. 'Sent initial discovery questions on WhatsApp / Scheduled Zoom call')..."
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-platinum text-xs focus:outline-none focus:border-white/30 placeholder:text-platinum-dark"
                          />
                          <div className="flex justify-end mt-2">
                            <button
                              onClick={handleSaveNotes}
                              className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-xs font-mono text-platinum transition-colors"
                            >
                              Save Note
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-platinum-muted">
                      <Inbox className="w-10 h-10 mb-3 opacity-40" />
                      <p className="text-xs font-mono">Select a proposal from the list to view full specifications.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* ========================================================
                  IN-APP CONFIRMATION MODAL (For Delete Single & Clear All)
                 ======================================================== */}
              {confirmDialog && (
                <div className="absolute inset-0 bg-[#030304]/80 backdrop-blur-md z-30 flex items-center justify-center p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="w-full max-w-md p-6 rounded-3xl bg-[#0a0c10] border border-white/[0.15] shadow-2xl space-y-5 text-center"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center mx-auto border border-red-500/20">
                      <AlertTriangle className="w-7 h-7" />
                    </div>

                    <div>
                      <h4 className="font-sans font-bold text-xl text-platinum">
                        {confirmDialog.type === 'delete-single' ? 'Delete Proposal?' : 'Clear Entire Vault?'}
                      </h4>
                      <p className="text-xs sm:text-sm text-platinum-muted font-light mt-2 leading-relaxed">
                        {confirmDialog.type === 'delete-single' ? (
                          <>
                            Are you sure you want to permanently delete proposal <strong className="text-platinum font-mono">{confirmDialog.proposalId}</strong> from <strong className="text-platinum">{confirmDialog.proposalName}</strong>?
                          </>
                        ) : (
                          <>
                            Are you sure you want to permanently delete all <strong className="text-platinum font-mono">{proposals.length}</strong> recorded proposals? This action cannot be reversed unless you have exported a CSV or JSON backup.
                          </>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => setConfirmDialog(null)}
                        className="flex-1 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-platinum font-medium text-xs border border-white/[0.08] transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={executeConfirmation}
                        className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xs transition-colors shadow-lg shadow-red-500/20"
                      >
                        {confirmDialog.type === 'delete-single' ? 'Confirm Delete' : 'Delete All Proposals'}
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// Executive Vault Authentication System

export const MASTER_KEY = 'ALOK-MASTER-9999';
export const DEFAULT_PASSWORD = 'alok8888';

const PWD_STORAGE_KEY = 'alok_vault_secure_pwd_v1';
const PWD_RAW_KEY = 'alok_vault_secure_pwd_raw_v1';

// Deterministic hash for secure verification
const hashPassword = (pwd: string): string => {
  let hash = 0;
  const str = `_alok_salt_${pwd}_secure_vault_`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `h_${Math.abs(hash).toString(36)}_${str.length}`;
};

export const getStoredPasswordHash = (): string | null => {
  try {
    return localStorage.getItem(PWD_STORAGE_KEY);
  } catch {
    return null;
  }
};

export const isCustomPasswordSet = (): boolean => {
  return getStoredPasswordHash() !== null;
};

export const getActivePasswordDisplay = (): string => {
  try {
    const raw = localStorage.getItem(PWD_RAW_KEY);
    if (raw) return raw;
  } catch {
    // fallback
  }
  return DEFAULT_PASSWORD;
};

export const verifyVaultPassword = (input: string): boolean => {
  const trimmed = input.trim();
  if (!trimmed) return false;

  // 1. Master key bypass check (always active fallback)
  if (trimmed === MASTER_KEY) {
    return true;
  }

  // 2. Check against stored custom password hash
  const storedHash = getStoredPasswordHash();
  if (storedHash) {
    return hashPassword(trimmed) === storedHash;
  }

  // 3. Fallback to default password if no custom password set yet
  return trimmed === DEFAULT_PASSWORD;
};

export const changeVaultPassword = (
  currentAuthKey: string,
  newPassword: string
): { success: boolean; message: string } => {
  const trimmedCurrent = currentAuthKey.trim();
  const trimmedNew = newPassword.trim();

  if (!verifyVaultPassword(trimmedCurrent)) {
    return {
      success: false,
      message: 'Invalid current password or Master Key. Authorization failed.',
    };
  }

  if (trimmedNew.length < 4) {
    return {
      success: false,
      message: 'New password must be at least 4 characters long.',
    };
  }

  try {
    const newHash = hashPassword(trimmedNew);
    localStorage.setItem(PWD_STORAGE_KEY, newHash);
    localStorage.setItem(PWD_RAW_KEY, trimmedNew);
    return {
      success: true,
      message: 'Password successfully updated! Old password has been permanently invalidated.',
    };
  } catch (err) {
    return {
      success: false,
      message: 'Failed to save new password to browser storage.',
    };
  }
};

export const resetPasswordToDefault = (
  masterKey: string
): { success: boolean; message: string } => {
  if (masterKey.trim() !== MASTER_KEY) {
    return {
      success: false,
      message: 'Invalid Master Key. Reset failed.',
    };
  }

  try {
    localStorage.removeItem(PWD_STORAGE_KEY);
    localStorage.removeItem(PWD_RAW_KEY);
    return {
      success: true,
      message: `Password successfully reset to default (${DEFAULT_PASSWORD}).`,
    };
  } catch {
    return {
      success: false,
      message: 'Failed to reset password in storage.',
    };
  }
};

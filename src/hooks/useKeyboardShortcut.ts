import { useEffect } from 'react';

export function useKeyboardShortcut(key: string, callback: () => void, ctrlOrMeta = true) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isModifierPressed = ctrlOrMeta ? (event.metaKey || event.ctrlKey) : true;
      if (isModifierPressed && event.key.toLowerCase() === key.toLowerCase()) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [key, callback, ctrlOrMeta]);
}

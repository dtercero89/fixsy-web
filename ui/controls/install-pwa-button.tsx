'use client'
import { useEffect, useState } from 'react';

const InstallPWAButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any | null>(null);
  const [isPromptVisible, setIsPromptVisible] = useState(false);

  useEffect(() => {
    const handler = (event: any) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setIsPromptVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult:any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
      });
      setDeferredPrompt(null);
      setIsPromptVisible(false);
    }
  };

  if (!isPromptVisible) return null;

  return (
    <button onClick={handleInstall}>
      Instalar App
    </button>
  );
};

export default InstallPWAButton;

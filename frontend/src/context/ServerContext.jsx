import { createContext, useContext, useState, useEffect } from 'react';

const ServerContext = createContext({ serverReady: false });

export const useServer = () => useContext(ServerContext);

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export function ServerProvider({ children }) {
  const [serverReady, setServerReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let intervalId;

    // Step 1: Fire a no-cors ping to wake Render immediately (non-blocking)
    // We add a random query param to bypass any intermediate caches
    const wakeUpUrl = `${API_BASE_URL}/products/?wake=${Date.now()}`;
    fetch(wakeUpUrl, { mode: 'no-cors' }).catch(() => {});

    // Step 2: Poll with a real CORS request to detect when Django is truly alive
    const checkReady = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/products/?check=${Date.now()}`, {
          // Short timeout for the check itself so we can retry frequently
          signal: AbortSignal.timeout(4000), 
        });
        if (res.ok && !cancelled) {
          setServerReady(true);
          clearInterval(intervalId);
        }
      } catch (_) {
        // Still waking up...
      }
    };

    // Start polling almost immediately
    const startTimer = setTimeout(() => {
      checkReady();
      intervalId = setInterval(checkReady, 3000);

      // Force-unblock after 3 minutes just in case
      setTimeout(() => {
        clearInterval(intervalId);
        if (!cancelled) setServerReady(true); 
      }, 180000);
    }, 1000);

    return () => {
      cancelled = true;
      clearTimeout(startTimer);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <ServerContext.Provider value={{ serverReady }}>
      {children}
    </ServerContext.Provider>
  );
}

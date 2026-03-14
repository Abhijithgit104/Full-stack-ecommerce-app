import { createContext, useContext, useState, useEffect } from 'react';

const ServerContext = createContext({ serverReady: false });

export const useServer = () => useContext(ServerContext);

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
console.log("DEBUG: Connecting to Backend at:", API_BASE_URL);

export function ServerProvider({ children }) {
  const [serverReady, setServerReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let intervalId;

    // Step 1: Fire a no-cors ping to wake Render immediately
    fetch(`${API_BASE_URL}/health/`, { mode: 'no-cors' }).catch(() => {});

    // Step 2: Poll /health/ endpoint. This endpoint checks DB connectivity.
    // It only returns 200 OK when the server AND the database are both ready.
    const checkReady = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      
      try {
        const res = await fetch(`${API_BASE_URL}/health/?check=${Date.now()}`, {
          signal: controller.signal, 
        });
        clearTimeout(timeoutId);
        
        // We only mark ready if we get a successful JSON response
        if (res.ok) {
          const data = await res.json();
          if (data.status === 'ready' && !cancelled) {
            setServerReady(true);
            clearInterval(intervalId);
          }
        }
      } catch (_) {
        // Still waking up or DB pending...
      }
    };

    // Start polling immediately
    checkReady();
    intervalId = setInterval(checkReady, 4000);

    // Unblock after 3 mins anyway to prevent permanent freeze
    setTimeout(() => {
      clearInterval(intervalId);
      if (!cancelled) setServerReady(true); 
    }, 180000);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <ServerContext.Provider value={{ serverReady }}>
      {children}
    </ServerContext.Provider>
  );
}

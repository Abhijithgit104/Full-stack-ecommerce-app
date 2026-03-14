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
    fetch(`${API_BASE_URL}/products/`, { mode: 'no-cors' }).catch(() => {});

    // Step 2: Poll every 3s with a real CORS request to detect when Django is ready
    const checkReady = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/products/`, {
          signal: AbortSignal.timeout(5000), // 5s per attempt timeout
        });
        if (res.ok && !cancelled) {
          setServerReady(true);
          clearInterval(intervalId);
        }
      } catch (_) {
        // Server not ready yet — keep polling
      }
    };

    // Start polling after 3s (give server a head start from the no-cors ping)
    const startTimer = setTimeout(() => {
      checkReady(); // immediate check
      intervalId = setInterval(checkReady, 3000);

      // Give up after 3 minutes — server must be having issues
      setTimeout(() => {
        clearInterval(intervalId);
        if (!cancelled) setServerReady(true); // unblock UI anyway
      }, 180000);
    }, 3000);

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

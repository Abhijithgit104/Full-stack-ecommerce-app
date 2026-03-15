import { createContext, useContext, useState, useEffect } from 'react';

const ServerContext = createContext({ serverReady: false });

export const useServer = () => useContext(ServerContext);

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8000' : '');
console.log("DEBUG: Connecting to Backend at:", API_BASE_URL);

export function ServerProvider({ children }) {
  // Since we removed the /health/ API endpoint as per the strict API specs, 
  // we no longer need to infinitely poll it. It is safe to assume the server is ready,
  // especially locally, and in production since Django is serving the React frontend.
  const [serverReady, setServerReady] = useState(true);

  return (
    <ServerContext.Provider value={{ serverReady }}>
      {children}
    </ServerContext.Provider>
  );
}

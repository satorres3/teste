import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { msalInstance, loginRequest } from "./msal";

interface UserInfo {
  email: string;
  groups?: string[];
}

interface AuthContextType {
  user: UserInfo | null;
  login: () => Promise<void>;
  logout: () => void;
  getToken: () => Promise<string | null>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const getToken = useCallback(async (): Promise<string | null> => {
    try {
      const result = await msalInstance.acquireTokenSilent(loginRequest);
      return result.accessToken;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await msalInstance.handleRedirectPromise();
      const account = msalInstance.getActiveAccount() || msalInstance.getAllAccounts()[0];
      if (account) {
        msalInstance.setActiveAccount(account);
        try {
          const result = await msalInstance.acquireTokenSilent(loginRequest);
          const email = result.account?.username || "";
          const groups = (result.account?.idTokenClaims?.groups as string[]) || [];
          setUser({ email, groups });
        } catch {
          setUser(null);
        }
      }
      setLoading(false);
    };
    init();
  }, [getToken]);

  useEffect(() => {
    const originalFetch = window.fetch;
    window.fetch = async (input: RequestInfo, init?: RequestInit) => {
      const token = await getToken();
      const headers = new Headers(init?.headers);
      if (token) headers.set("Authorization", `Bearer ${token}`);
      const response = await originalFetch(input, { ...init, headers });
      if (response.status === 401 || response.status === 403) {
        toast.error("Access denied");
      }
      return response;
    };
    return () => {
      window.fetch = originalFetch;
    };
  }, [getToken]);

  const login = useCallback(async () => {
    await msalInstance.loginRedirect(loginRequest);
  }, []);

  const logout = useCallback(() => {
    msalInstance.logoutRedirect();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, getToken, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

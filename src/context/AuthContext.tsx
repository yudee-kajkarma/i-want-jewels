import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "react-hot-toast";
import { clientTranslate } from "@/i18n/clientRef";
import { logoutUser } from "../services/authService";
import type { AuthSession } from "../types/auth";
import {
  clearPendingOtpEmail,
  clearStoredAuthSession,
  getPendingOtpEmail,
  getStoredAuthSession,
  isJwtExpired,
  setPendingOtpEmail,
  storeAuthSession,
} from "../utils/authStorage";

type AuthContextValue = {
  session: AuthSession | null;
  isAuthenticated: boolean;
  isAuthReady: boolean;
  pendingOtpEmail: string;
  saveSession: (session: AuthSession) => void;
  logout: () => Promise<void>;
  setOtpEmail: (email: string) => void;
  clearOtpEmail: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [pendingOtpEmail, setPendingOtpEmailState] = useState("");

  useEffect(() => {
    const storedSession = getStoredAuthSession();

    // A session with an expired token is dead weight: the user looks logged
    // in but every authenticated call would 401. Drop it up front and say so.
    if (storedSession?.token && isJwtExpired(storedSession.token)) {
      clearStoredAuthSession();
      setSession(null);
      toast.error(clientTranslate("auth.sessionExpired"));
    } else {
      setSession(storedSession);
    }

    setPendingOtpEmailState(getPendingOtpEmail());
    setIsAuthReady(true);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isAuthenticated: Boolean(session),
      isAuthReady,
      pendingOtpEmail,
      saveSession(nextSession) {
        setSession(nextSession);
        storeAuthSession(nextSession);
      },
      async logout() {
        try {
          await logoutUser();
        } catch {
          // Clear local auth state even if the remote logout request fails.
        }

        setSession(null);
        clearStoredAuthSession();
        clearPendingOtpEmail();
      },
      setOtpEmail(email) {
        setPendingOtpEmailState(email);
        setPendingOtpEmail(email);
      },
      clearOtpEmail() {
        setPendingOtpEmailState("");
        clearPendingOtpEmail();
      },
    }),
    [isAuthReady, pendingOtpEmail, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}

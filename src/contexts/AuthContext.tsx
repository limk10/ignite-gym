import { UserDTO } from "@dtos/UserDTO";
import { useLoading } from "@hooks/useLoading";
import { API } from "@service/api";
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from "@storage/storageAuthToken";
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from "@storage/storageUser";
import { ReactNode, createContext, useEffect, useState } from "react";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const { setLoadingButtons, setLoadingSplashScreen } = useLoading();
  const [user, setUser] = useState<UserDTO>({} as UserDTO);

  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    try {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(userData);
    } catch (error) {
      throw error;
    }
  }

  async function signIn(email: string, password: string) {
    try {
      setLoadingButtons(true);

      const { data } = await API.post("/sessions", { email, password });

      if (data.user && data.token && data.refresh_token) {
        const { user, token, refresh_token } = data;

        await storageUserSave(user);
        await storageAuthTokenSave({ token, refresh_token });
        await userAndTokenUpdate(user, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoadingButtons(false);
    }
  }

  async function signOut() {
    try {
      setLoadingSplashScreen(true);
      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setLoadingSplashScreen(false);
    }
  }

  async function updateUserProfile(userUpdated: UserDTO) {
    try {
      setUser(userUpdated);
      await storageUserSave(userUpdated);
    } catch (error) {
      throw error;
    }
  }

  async function loadUserData() {
    try {
      setLoadingSplashScreen(true);
      const userLogged = await storageUserGet();
      const { token } = await storageAuthTokenGet();

      if (userLogged && token) {
        await userAndTokenUpdate(userLogged, token);
      }
    } catch (error) {
    } finally {
      setLoadingSplashScreen(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    const subscribe = API.registerInterceptTokenManager(signOut);

    return () => {
      subscribe();
    };
  }, [signOut]);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

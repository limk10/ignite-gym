import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export type LoadingContextDataProps = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loadingSplashScreen: boolean;
  setLoadingSplashScreen: Dispatch<SetStateAction<boolean>>;
  loadingButtons: boolean;
  setLoadingButtons: Dispatch<SetStateAction<boolean>>;
};

type LoadingContextProviderProps = {
  children: ReactNode;
};

export const LoadingContext = createContext<LoadingContextDataProps>(
  {} as LoadingContextDataProps,
);

export function LoadingContextProvider({
  children,
}: LoadingContextProviderProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingButtons, setLoadingButtons] = useState<boolean>(false);
  const [loadingSplashScreen, setLoadingSplashScreen] =
    useState<boolean>(false);

  return (
    <LoadingContext.Provider
      value={{
        loading,
        setLoading,
        loadingSplashScreen,
        setLoadingSplashScreen,
        loadingButtons,
        setLoadingButtons,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

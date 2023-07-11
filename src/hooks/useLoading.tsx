import { LoadingContext } from "@contexts/LoadingContext";
import { useContext } from "react";

export function useLoading() {
  const context = useContext(LoadingContext);

  return context;
}

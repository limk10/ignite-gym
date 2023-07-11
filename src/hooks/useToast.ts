import { useToast as useToastNativeBase } from "native-base";

export function useToast() {
  const toastComponent = useToastNativeBase();

  function toast(title: string, type: "danger" | "success" = "danger") {
    toastComponent.show({
      title,
      placement: "top",
      bgColor: type === "danger" ? "red.500" : "green.500",
    });
  }

  return { toast };
}

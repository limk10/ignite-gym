import { useLoading } from "@hooks/useLoading";
import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

type ComponentProps = IButtonProps & {
  title: string;
  variant?: "solid" | "outline";
};

export function Button({ title, variant = "solid", ...rest }: ComponentProps) {
  const { loadingButtons } = useLoading();

  return (
    <ButtonNativeBase
      w="full"
      h={14}
      isLoading={loadingButtons}
      isLoadingText="Um momento..."
      rounded="sm"
      borderColor="green.500"
      bg={variant === "outline" ? "transparent" : "green.700"}
      borderWidth={variant === "outline" ? 0.5 : 0}
      _pressed={{
        bg: "gray.500",
      }}
      {...rest}
    >
      <Text
        color={variant === "outline" ? "green.500" : "white"}
        fontFamily="heading"
        fontSize="sm"
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
}

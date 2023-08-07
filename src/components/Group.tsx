import { IPressableProps, Pressable, Text } from "native-base";

type ComponentProps = IPressableProps & {
  name: string;
  isEnabled: boolean;
};

export function Group({ name, isEnabled, ...rest }: ComponentProps) {
  return (
    <Pressable
      mr={3}
      w={24}
      h={10}
      bg="gray.600"
      rounded="md"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      isPressed={isEnabled}
      _pressed={{
        borderColor: "green.500",
        borderWidth: 1,
      }}
      {...rest}
    >
      <Text
        color={isEnabled ? "green.500" : "gray.200"}
        textTransform="uppercase"
        fontSize="xs"
        fontFamily="heading"
      >
        {name}
      </Text>
    </Pressable>
  );
}

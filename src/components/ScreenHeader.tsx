import { Center, Heading } from "native-base";

type ComponentProps = {
  title: string;
};

export function ScreenHeader({ title }: ComponentProps) {
  return (
    <Center bg="gray.600" pt={16} pb={6}>
      <Heading color="gray.100" fontSize="xl" fontFamily="heading">
        {title}
      </Heading>
    </Center>
  );
}

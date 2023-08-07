import LogoSvg from "@assets/logo.svg";
import { Center, Spinner, Text, VStack } from "native-base";

export function SplashScreen() {
  return (
    <Center flex={1} bg="gray.700">
      <VStack>
        <LogoSvg />
        <Text color="gray.100" fontSize="sm">
          Treine sua mente e o seu corpo
        </Text>
      </VStack>
      <Spinner position="absolute" bottom={20} color="green.500" size="lg" />
    </Center>
  );
}

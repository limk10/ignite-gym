import SuccessJson from '@assets/lottie/success.json';
import { Button } from '@components/Button';
import LottieView from 'lottie-react-native';
import { Center, Heading, Text, VStack } from 'native-base';
import { useRef } from 'react';

export function Success() {
  const animation = useRef(null);

  return (
    <Center h="full" px={8} pb={10}>
      <VStack space={4}>
        <Center>
          <LottieView
            autoPlay
            loop={false}
            ref={animation}
            style={{
              width: 250,
              height: 250,
            }}
            source={SuccessJson}
          />
        </Center>

        <Heading mt={5} textAlign="center" color="green.700" fontSize="3xl" fontFamily="heading">
          Cadastro Finalizado!
        </Heading>
        <Text textAlign="center" color="body" fontSize="sm" fontFamily="body">
          Bem-vindo(a) ao Manual do Mecânico! Explore todas as funcionalidades e aproveite ao
          máximo.
        </Text>
      </VStack>

      <Button
        position="absolute"
        bottom={12}
        title="Acessar minha conta"
        variant="outline"
        onPress={() => {}}
      />
    </Center>
  );
}

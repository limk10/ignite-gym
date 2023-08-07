import MechanicLogo from '@assets/mechanic-logo.svg';
import { HorizontalSocialLogin } from '@components/HorizontalSocialLogin';
import { Center, Heading, VStack } from 'native-base';
import React from 'react';

export function SocialLogin() {
  return (
    <VStack flex={1} px={6} pb={10} justifyContent="flex-end">
      <Center mb={16}>
        <VStack alignItems="center" space={4}>
          <MechanicLogo width={80} height={80} fill="#ffff" />
          {/* <VStack>
            <Heading color="title" fontSize="2xl" fontFamily="body">
              MANUAL DO
            </Heading>
            <Heading color="title" fontSize="3xl" fontFamily="heading">
              MECÂNICO
            </Heading>
          </VStack> */}
        </VStack>
      </Center>

      <Heading color="title" fontSize="xl" fontFamily="heading" textAlign="center">
        Milhões de códigos de falhas disponível.
      </Heading>
      <Heading color="title" fontSize="lg" textAlign="center" mb={10}>
        Grátis no Manual do Mecânico.
      </Heading>

      <HorizontalSocialLogin />
    </VStack>
  );
}

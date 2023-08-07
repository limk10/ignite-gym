import { ScreenHeader } from '@components/ScreenHeader';
import { useAuth } from '@hooks/useAuth';
import { useLoading } from '@hooks/useLoading';
import { useToast } from '@hooks/useToast';
import { Center, Heading, ScrollView, Text, VStack } from 'native-base';
import { useState } from 'react';

import { Password, PasswordFormDataProps } from './components/Password';
import { PersonalIFormDataProps, PersonalInformation } from './components/PersonalInformation';
import { Success } from './components/Success';

const steps = [
  { title: 'Dados pessoais', subtitle: 'Informe seus dados pessoais.' },
  { title: 'Senha', subtitle: 'Sua senha deve conter pelo menos 6 digitos.' },
  { title: '', subtitle: '' },
];

export function Signup() {
  const { toast } = useToast();
  const { signIn } = useAuth();
  const { setLoadingButtons } = useLoading();
  const [currentStep, setCurrentStep] = useState(0);
  const isLastStep = steps.length === currentStep + 1;
  const [form, setForm] = useState<PersonalIFormDataProps | PasswordFormDataProps>();

  function handleNextStep(data: PersonalIFormDataProps | PasswordFormDataProps) {
    !isLastStep && setCurrentStep((state) => state + 1);
    setForm(data);
  }

  function handleUndoStep(data: PersonalIFormDataProps | PasswordFormDataProps) {
    currentStep !== 0 && setCurrentStep((state) => state - 1);
    setForm(data);
  }

  function handleSignUp(data: PersonalIFormDataProps | PasswordFormDataProps) {
    handleNextStep(data);
    console.log(data);
    // try {
    //   setLoadingButtons(true);
    //   await API.post("/users", {
    //     name,
    //     email,
    //     password,
    //   });

    //   await signIn(email, password);
    // } catch (error) {
    //   const isAppError = error instanceof AppError;

    //   const title =
    //     (isAppError && error?.message) ||
    //     "Não foi possível criar conta. Tente novamente mais tarde.";

    //   toast(title);
    // } finally {
    //   setLoadingButtons(false);
    // }
  }

  function _renderStepHeader() {
    return (
      <>
        <ScreenHeader title="Criar conta" subtitle="Insira seus dados abaixo." />
        <Center mt={10}>
          {/* <HorizontalSocialLogin />

          <HStack mt={2} space={3} alignItems="center">
            <Divider bg="gray.600" />
            <Text mt={6} color="body" fontSize="sm" fontFamily="body" mb={6}>
              Ou, registre com e-mail
            </Text>
            <Divider bg="gray.600" />
          </HStack> */}

          <VStack>
            <Center>
              <Heading color="title" fontSize="xl" fontFamily="body">
                Passo {currentStep + 1} de {steps.length - 1}
              </Heading>
              <Text color="body" fontSize="sm" fontFamily="body" mb={6} mt={1}>
                {steps[currentStep].subtitle}
              </Text>
            </Center>
          </VStack>
        </Center>
      </>
    );
  }

  function _renderStepContent() {
    switch (currentStep) {
      case 0:
        return (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <VStack px={6} pb={16} mt={16}>
              {_renderStepHeader()}
              <PersonalInformation
                nextStep={handleNextStep}
                formData={form as PersonalIFormDataProps}
              />
            </VStack>
          </ScrollView>
        );
      case 1:
        return (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <VStack px={6} pb={16} mt={16}>
              {_renderStepHeader()}
              <Password
                submit={handleSignUp}
                undoStep={handleUndoStep}
                formData={form as PasswordFormDataProps}
              />
            </VStack>
          </ScrollView>
        );
      case 2:
        return <Success />;
      default:
        return <Text>Screen not found</Text>;
    }
  }

  return _renderStepContent();
}

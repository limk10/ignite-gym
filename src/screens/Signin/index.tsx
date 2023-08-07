import MechanicLogo from '@assets/mechanic-logo.svg';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@hooks/useAuth';
import { useToast } from '@hooks/useToast';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { AppError } from '@utils/AppError';
import { Box, Center, HStack, Heading, Text, VStack } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import * as yup from 'yup';

type FormDataProps = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup.string().required('Informe o e-mail.'),
  password: yup.string().required('Informe a senha.'),
});

export function Signin() {
  const { toast } = useToast();
  const { signIn } = useAuth();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({ resolver: yupResolver(signInSchema) });

  function handleSignup() {
    navigation.navigate('signup');
  }

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleSignin({ email, password }: FormDataProps) {
    try {
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : 'Não foi possível entrar. Tente novamente mais tarde.';

      toast(title);
    }
  }

  return (
    <VStack flex={1} px={6} mt={12}>
      <ScreenHeader />

      <Box mt={12}>
        <Center>
          <HStack alignItems="center" space={4}>
            <MechanicLogo width={50} height={50} fill="#FAB232" />
            <VStack>
              <Heading color="title" fontSize="2xl" fontFamily="body">
                MANUAL DO
              </Heading>
              <Heading color="title" fontSize="3xl" fontFamily="heading">
                MECÂNICO
              </Heading>
            </VStack>
          </HStack>
        </Center>

        <Heading color="title" mb={2} mt={8} fontSize="3xl" fontFamily="heading">
          Login
        </Heading>
        <Text color="body" fontSize="sm" fontFamily="body" mb={6}>
          Insira os dados cadastrados abaixo.
        </Text>

        <Center>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Celular ou E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors?.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors?.password?.message}
              />
            )}
          />

          <HStack justifyContent="flex-end" bg="red" w="100%" mb={6}>
            <TouchableOpacity>
              <Text color="body" fontSize="sm">
                Recuperar senha
              </Text>
            </TouchableOpacity>
          </HStack>

          <Button title="Acessar" onPress={handleSubmit(handleSignin)} />

          <Button
            mt={3}
            title="Entrar sem senha"
            variant="outline"
            color="light.100"
            borderColor="light.100"
          />

          {/* <HStack mt={4} space={3} alignItems="center">
            <Divider bg="gray.600" />
            <Text mt={5} color="body" fontSize="sm" fontFamily="body" mb={6}>
              Ou, entre com
            </Text>
            <Divider bg="gray.600" />
          </HStack>

          <HorizontalSocialLogin /> */}

          <HStack space={1} mt={7}>
            <Text color="body" fontSize="md" fontFamily="body">
              Ainda não tem acesso?
            </Text>
            <TouchableOpacity onPress={handleSignup}>
              <Text color="primary.700" fontSize="md" fontFamily="heading">
                Criar conta
              </Text>
            </TouchableOpacity>
          </HStack>
        </Center>
      </Box>
    </VStack>
  );
}

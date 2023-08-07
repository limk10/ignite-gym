import BackgroundImg from '@assets/background.png';
import { HomeHeader } from '@components/HomeHeader';
import { IconButton } from '@components/IconButton';
import { Input } from '@components/Input';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoading } from '@hooks/useLoading';
import { useToast } from '@hooks/useToast';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { MasonryFlashList } from '@shopify/flash-list';
import { Box, Center, Heading, Icon, Image, Text, VStack } from 'native-base';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

export type CodeFormDataProps = {
  code: string;
};

const formDataSchema = yup.object({
  code: yup.string().required('É necessário digitar o código de falha.'),
});

export function Home() {
  const { toast } = useToast();
  const { loading, setLoading } = useLoading();
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [news, setNews] = useState([
    {
      id: 1,
      title: 'Inclusão de esquema elétrico',
      description: 'Novo esquema elétrico adicionado, Novo Atego 3033.',
    },
    {
      id: 2,
      title: 'Inclusão de código de falhas',
      description:
        'Inclusão de novos código de falhas Atego 2430, Atego 3033, Actros 2022, Actros 2023 e Accelo',
    },
    {
      id: 3,
      title: 'Lorem ipsum dolor',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget dignissim erat.',
    },
    {
      id: 4,
      title: 'Lorem ipsum dolor',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget dignissim erat.',
    },
  ]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CodeFormDataProps>({
    resolver: yupResolver(formDataSchema),
  });

  function handleConfirm({ code }: CodeFormDataProps) {
    navigation.navigate('faultCodeList', { code });
  }

  return (
    <>
      <VStack flex={1}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="bg-search-code"
          w="full"
          resizeMode="cover"
          position="absolute"
        />

        <HomeHeader />

        <VStack alignItems="center" mt={5}>
          <Heading color="title" fontSize="2xl" ml={1} fontFamily="heading">
            Diagnóstico em Segundos
          </Heading>
          <Text color="body" textAlign="center" mt={2}>
            Por favor insira seu código abaixo
          </Text>
        </VStack>
        <Center mt={6}>
          <Box w="90%">
            <Controller
              control={control}
              name="code"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Insira o código de falha"
                  InputLeftElement={
                    <Icon
                      as={MaterialIcons}
                      name="car-repair"
                      color="primary.700"
                      ml={3}
                      size={7}
                    />
                  }
                  InputRightElement={
                    <IconButton
                      h={10}
                      w={10}
                      mr={2}
                      bg="primary.700"
                      _pressed={{
                        bg: 'primary.700',
                      }}
                      icon={<Icon as={Feather} name="search" color="gray.700" size={5} />}
                      onPress={handleSubmit(handleConfirm)}
                    />
                  }
                  onSubmitEditing={handleSubmit(handleConfirm)}
                  returnKeyType="done"
                  autoCorrect={false}
                  errorMessage={errors?.code?.message}
                />
              )}
            />
          </Box>
        </Center>
      </VStack>
      <VStack flex={1} px={5} mt={10}>
        <Center>
          <Heading color="title" fontSize="xl" fontFamily="heading">
            Oque há de novo?
          </Heading>
          <Text color="body" fontSize="sm" fontFamily="body" mt={1}>
            Abaixo novidades do aplicativo
          </Text>
        </Center>

        <Box mt={4} />

        <MasonryFlashList
          data={news}
          numColumns={2}
          drawDistance={10}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
          renderItem={({ item }) => (
            <VStack alignItems={item.id % 2 == 0 ? 'flex-end' : 'flex-start'}>
              <Box bg="gray.500" p={3} my={2} borderRadius={10} w="95%">
                <Box position="absolute" bg="primary.700" rounded="full" p={2} left={3} top={3}>
                  <Icon as={<Ionicons name="newspaper" />} size={5} color="gray.700" />
                </Box>
                <Text color="title" fontFamily="heading" numberOfLines={2} fontSize="md" mt="50px">
                  {item.title}
                </Text>
                <Text color="light.300" mt={2}>
                  {item.description}
                </Text>
              </Box>
            </VStack>
          )}
          estimatedItemSize={200}
        />
      </VStack>
    </>
  );
}

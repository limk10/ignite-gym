import { IconButton } from '@components/IconButton';
import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRoute } from '@react-navigation/native';
import { Box, Center, FlatList, HStack, Heading, Icon, VStack } from 'native-base';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { CardFaultCode } from './components/CardFaultCode';

type RouteParamsProps = {
  code: string;
};

export type CodeFormDataProps = {
  code: string;
};

const formDataSchema = yup.object({
  code: yup.string().required('É necessário digitar o código de falha.'),
});

export function FaultCodeList() {
  const route = useRoute();
  const { code } = route.params as RouteParamsProps;
  const [data, setData] = useState([
    {
      id: 1,
      category: 'ENGINE',
      data: [
        {
          code: 'P0300001',
          description: 'Presurização do combustível no sistema - Muito Baixo.',
        },
        {
          code: 'P0300002',
          description: 'Presurização do combustível no sistema - Muito Baixo.',
        },
      ],
    },
    {
      id: 2,
      category: 'SHIFT',
      data: [
        {
          code: 'P0300001',
          description: 'Presurização do combustível no sistema - Muito Baixo.',
        },
        {
          code: 'P0300002',
          description: 'Presurização do combustível no sistema - Muito Baixo.',
        },
      ],
    },
    {
      id: 3,
      category: 'FUEL',
      data: [
        {
          code: 'P0300001',
          description: 'Presurização do combustível no sistema - Muito Baixo.',
        },
        {
          code: 'P0300002',
          description: 'Presurização do combustível no sistema - Muito Baixo.',
        },
      ],
    },
  ]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CodeFormDataProps>({
    resolver: yupResolver(formDataSchema),
    defaultValues: { code },
  });

  function handleConfirm({ code }: CodeFormDataProps) {
    console.log(code);
  }

  return (
    <>
      <VStack px={5} pb={3} mt={16}>
        <ScreenHeader title="Falhas" subtitle="Lista de código de falhas" />

        <HStack mt={8}>
          <Heading color="title" fontSize="2xl" ml={1} fontFamily="heading">
            VW MAN -
          </Heading>
          <Heading color="body" fontSize="2xl" ml={1} fontFamily="body">
            {code}
          </Heading>
        </HStack>

        <Center mt={4}>
          <Box w="100%">
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

      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <CardFaultCode data={item} />}
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{
          pb: 20,
        }}
      />
    </>
  );
}

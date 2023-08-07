import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@hooks/useAuth';
import { useLoading } from '@hooks/useLoading';
import { useToast } from '@hooks/useToast';
import { API } from '@service/api';
import { AppError } from '@utils/AppError';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Center, Heading, ScrollView, Skeleton, Text, VStack } from 'native-base';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';

import * as yup from 'yup';

const PHOTO_SIZE = 33;

type FormDataProps = {
  name: string;
  email: string;
  document: string;
  phone: string;
  // password: string;
  // old_password: string;
  // confirm_password: string;
};

const profileSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  document: yup.string().required('Informe o CPF.'),
  phone: yup.string().required('Informe o celular.'),
  // password: yup
  //   .string()
  //   .min(6, 'A senha deve ter pelo menos 6 digitos.')
  //   .nullable()
  //   .transform((value) => (value ? value : null)),
  // old_password: yup.string(),
  // confirm_password: yup
  //   .string()
  //   .nullable()
  //   .transform((value) => (value ? value : null))
  //   .oneOf([yup.ref('password')], 'A confirmação de senha não confere.')
  //   .when('password', {
  //     is: (Field: any) => Field,
  //     then: (schema) =>
  //       schema
  //         .nullable()
  //         .required('Informe a confirmação da senha.')
  //         .transform((value) => (value ? value : null)),
  //   }),
});

export function Profile() {
  const { toast } = useToast();
  const { setLoadingButtons } = useLoading();
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  const { user, updateUserProfile } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(profileSchema),
  });

  async function handleUserPhotoSelect() {
    try {
      setPhotoIsLoading(true);
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (response?.canceled) return;
      if (response?.assets?.length) {
        const photoInfo = await FileSystem.getInfoAsync(response.assets[0].uri);

        if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5) {
          return toast('Essa imagem é muito grande. escolha uma de até 5MB');
        }

        const photo = response.assets[0];
        const fileExtension = photo.uri.split('.').pop();

        const photoFile = {
          name: `${user.name}.${fileExtension}`.replaceAll(' ', '-').toLowerCase(),
          uri: photo.uri,
          type: `${photo.type}/${fileExtension}`,
        } as any;

        const userPhotoUploadForm = new FormData();
        userPhotoUploadForm.append('avatar', photoFile);

        const { data } = await API.patch('users/avatar', userPhotoUploadForm, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const userUpdated = user;
        userUpdated.avatar = data.avatar;

        updateUserProfile(userUpdated);

        toast('Foto atualizada!', 'success');
      }
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível atualizar a sua foto.';

      toast(title);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setLoadingButtons(true);
      const userUpdated = user;
      userUpdated.name = data.name;
      console.log(data);
      await API.put('/users', data);
      await updateUserProfile(userUpdated);

      toast('Perfil atualizada com sucesso.', 'success');
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível atualizar os dados.';

      toast(title);
    } finally {
      setLoadingButtons(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack px={8} pb={16} mt={16}>
        <ScreenHeader title="Perfil" subtitle="Confira todos os seus dados" />

        <VStack mt={10}>
          <Center>
            {photoIsLoading ? (
              <Skeleton
                w={PHOTO_SIZE}
                h={PHOTO_SIZE}
                rounded="full"
                startColor="gray.500"
                endColor="gray.400"
              />
            ) : (
              <UserPhoto
                source={{ uri: 'https://github.com/limk10.png' }}
                alt="Foto do usuario"
                size={PHOTO_SIZE}
              />
            )}

            <TouchableOpacity onPress={handleUserPhotoSelect}>
              <Text color="primary.700" fontFamily="heading" fontSize="md" mt={2} mb={8}>
                Altera Foto
              </Text>
            </TouchableOpacity>
          </Center>

          <Heading textAlign="left" color="title" fontFamily="heading" fontSize="md">
            Dados pessoais
          </Heading>

          <Center mt={4}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Nome completo"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCorrect={false}
                  errorMessage={errors?.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="document"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  isDisabled
                  placeholder="CPF"
                  keyboardType="number-pad"
                  value={value}
                  mask="BRL_CPF"
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { value } }) => (
                <Input
                  isDisabled
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Celular"
                  keyboardType="number-pad"
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  mask="BRL_PHONE"
                  errorMessage={errors?.phone?.message}
                />
              )}
            />
          </Center>

          <Heading textAlign="left" color="title" fontFamily="heading" fontSize="md">
            Senha
          </Heading>

          <Button mt={10} title="Salvar" onPress={() => {}} />
        </VStack>
      </VStack>
    </ScrollView>
  );
}

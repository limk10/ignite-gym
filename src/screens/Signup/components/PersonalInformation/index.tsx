import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

export type PersonalIFormDataProps = {
  name: string;
  email: string;
  document: string;
  phone: string;
};

type ComponentProps = {
  nextStep: (data: PersonalIFormDataProps) => void;
  formData: PersonalIFormDataProps;
};

const formDataSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  document: yup.string().required('Informe o CPF.'),
  phone: yup.string().required('Informe o celular.'),
});

export function PersonalInformation({ nextStep, formData }: ComponentProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalIFormDataProps>({
    resolver: yupResolver(formDataSchema),
    defaultValues: formData,
  });

  function handleConfirm(data: PersonalIFormDataProps) {
    nextStep(data);
  }

  return (
    <>
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
            placeholder="CPF"
            keyboardType="number-pad"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            mask="BRL_CPF"
            errorMessage={errors?.document?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            errorMessage={errors?.email?.message}
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
            onSubmitEditing={handleSubmit(handleConfirm)}
            returnKeyType="next"
            errorMessage={errors?.phone?.message}
          />
        )}
      />

      <Button mt={4} title="Avançar" onPress={handleSubmit(handleConfirm)} />
    </>
  );
}

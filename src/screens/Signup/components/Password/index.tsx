import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

export type PasswordFormDataProps = {
  password: string;
  password_confirm: string;
};

type ComponentProps = {
  submit: (data: PasswordFormDataProps) => void;
  undoStep: (data: PasswordFormDataProps) => void;
  formData: PasswordFormDataProps;
};

const formDataSchema = yup.object({
  password: yup
    .string()
    .required('Informe a senha.')
    .min(6, 'A senha deve ter pelo menos 6 digitos.'),
  password_confirm: yup
    .string()
    .required('Confirmação da senha.')
    .oneOf([yup.ref('password')], 'A confirmação de senha não confere.'),
});

export function Password({ submit, undoStep, formData }: ComponentProps) {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<PasswordFormDataProps>({
    resolver: yupResolver(formDataSchema),
    defaultValues: formData,
  });

  const handleConfirm = (data: PasswordFormDataProps) => {
    submit(data);
  };

  const handleUndoStep = () => {
    const data = getValues();
    undoStep(data);
  };

  return (
    <>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Senha"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            errorMessage={errors?.password?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password_confirm"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Confirme sua senha"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            errorMessage={errors?.password_confirm?.message}
            onSubmitEditing={handleSubmit(handleConfirm)}
            returnKeyType="send"
          />
        )}
      />

      <Button mt={4} title="Finalizar" onPress={handleSubmit(handleConfirm)} />
      <Button mt={4} title="Voltar" variant="outline" onPress={handleUndoStep} />
    </>
  );
}

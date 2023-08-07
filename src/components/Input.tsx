import { Types } from '@dtos/InputMaskDTO';
import { FormControl, IInputProps, Input as NativeBaseInput } from 'native-base';
import { Masks, useMaskedInputProps } from 'react-native-mask-input';

type ComponentProps = IInputProps & {
  errorMessage?: string | null;
  mask?: Types;
};

export function Input({
  errorMessage,
  isInvalid,
  value,
  onChangeText,
  mask,
  ...rest
}: ComponentProps) {
  const invalid = !!errorMessage || isInvalid;

  const maskedInputProps = useMaskedInputProps({
    value,
    onChangeText,
    mask: mask && Masks[mask],
  });

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseInput
        bg="light.100"
        h={14}
        px={4}
        borderWidth={0}
        rounded="xl"
        fontSize="md"
        fontFamily="body"
        color="gray.400"
        placeholderTextColor="gray.300"
        isInvalid={invalid}
        value={mask ? maskedInputProps.value : value}
        onChangeText={mask ? maskedInputProps.onChangeText : onChangeText}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500',
        }}
        _focus={{
          bg: 'light.50',
          borderWidth: 1,
          borderColor: 'primary.700',
        }}
        {...rest}
      />

      <FormControl.ErrorMessage _text={{ color: 'red.500' }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}

import { useLoading } from '@hooks/useLoading';
import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base';

type ComponentProps = IButtonProps & {
  title: string;
  variant?: 'solid' | 'outline';
  color?: string;
};

export function Button({ title, variant = 'solid', color, ...rest }: ComponentProps) {
  const { loadingButtons } = useLoading();

  function _renderColor() {
    if (color) return color;
    else if (variant === 'outline') return 'primary.700';
    else return 'gray.700';
  }

  return (
    <ButtonNativeBase
      w="full"
      h={12}
      shadow={variant === 'outline' ? 'none' : 4}
      isLoading={loadingButtons}
      isLoadingText="Um momento..."
      rounded="full"
      borderColor="primary.700"
      bg={variant === 'outline' ? 'transparent' : 'primary.700'}
      borderWidth={variant === 'outline' ? 0.5 : 0}
      _pressed={{
        bg: variant === 'outline' ? 'gray.800' : 'primary.700',
        shadow: 'none',
      }}
      {...rest}
    >
      <Text shadow="none" fontSize="md" color={_renderColor()}>
        {title}
      </Text>
    </ButtonNativeBase>
  );
}

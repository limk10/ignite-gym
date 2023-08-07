import { IconButton as IconButtonNativeBase, IIconButtonProps } from 'native-base';
import { ReactElement } from 'react';

type ComponentProps = IIconButtonProps & {
  icon: ReactElement;
};

export function IconButton({ icon, ...rest }: ComponentProps) {
  return (
    <IconButtonNativeBase
      py={3}
      px={4}
      borderWidth={0}
      bg="gray.400"
      rounded="xl"
      variant="outline"
      icon={icon}
      _pressed={{
        bg: 'gray.500',
      }}
      {...rest}
    />
  );
}

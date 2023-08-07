import { AntDesign } from '@expo/vector-icons';
import { Box, Divider, HStack, Icon, Text, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native';

import EngineSvg from '@assets/category/engine.svg';
import FuelSvg from '@assets/category/fuel.svg';
import ShiftSvg from '@assets/category/shift.svg';

const icons = [
  {
    key: 'ENGINE',
    label: 'Ignição',
    icon: EngineSvg,
  },
  {
    key: 'FUEL',
    label: 'Combustível',
    icon: FuelSvg,
  },
  {
    key: 'SHIFT',
    label: 'Câmbio',
    icon: ShiftSvg,
  },
];

type DataProps = {
  code: string;
  description: string;
};

type ComponentProps = {
  data: {
    id: number;
    category: string;
    data: DataProps[];
  };
};

export function CardFaultCode({ data }: ComponentProps) {
  function _renderLinkComponent(title: string, icon: string) {
    return (
      <>
        <TouchableOpacity>
          <HStack px={3} py={2} justifyContent="space-between" alignContent="center">
            <HStack alignItems="center">
              <Icon
                as={<AntDesign name={icon as unknown as any} size={18} />}
                mr={2}
                color="primary.700"
              />
              <Text color="link" fontFamily="heading">
                {title}
              </Text>
            </HStack>
            <Icon as={<AntDesign name="right" size={18} />} color="link" />
          </HStack>
        </TouchableOpacity>
        {!title.includes('Esquema') && <Divider bg="gray.500" />}
      </>
    );
  }

  const IconCar = icons.find(({ key }) => data.category === key);

  return (
    <>
      <VStack px={5} py={2} my={2} bg="gray.600">
        <HStack justifyContent="space-between" alignItems="center">
          <HStack alignItems="center">
            <Icon
              as={IconCar && <IconCar.icon width="32px" height="32px" fill="#FAB232" />}
              size={6}
              color="primary.700"
              mr={3}
            />
            <Text color="body" fontSize={22} fontFamily="heading">
              {IconCar?.label}
            </Text>
          </HStack>
          {/* <Icon as={<AntDesign name="right" size={18} />} color="gray.300" /> */}
        </HStack>
      </VStack>

      {data.data.map(() => (
        <Box px={3} my={3}>
          <Box bg="gray.600" borderRadius="lg" pt={2}>
            <HStack px={4}>
              <VStack>
                <Text color="title" fontFamily="heading">
                  P030003
                </Text>
                <Text color="body">Presurização do combustível no sistema - Muito Baixo.</Text>
              </VStack>
            </HStack>
            <Divider mt={3} bg="gray.500" />
            <VStack>
              {_renderLinkComponent('Mais Detalhes', 'file1')}
              {_renderLinkComponent('Passo a Passo', 'tool')}
              {_renderLinkComponent('Esquema Elétrico', 'exclamationcircleo')}
            </VStack>
          </Box>
        </Box>
      ))}
    </>
  );
}

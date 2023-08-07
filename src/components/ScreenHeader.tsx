import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, HStack, Heading, Icon, Text, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native';

type ComponentProps = {
  title?: string;
  subtitle?: string;
};

export function ScreenHeader({ title, subtitle }: ComponentProps) {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <HStack justifyContent="space-between">
      <Box flex={1}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon mt={4} ml={-1} as={<AntDesign name="left" />} size={7} color="title" />
        </TouchableOpacity>
      </Box>
      <VStack>
        <Heading textAlign="center" color="title" fontSize="3xl" fontFamily="heading">
          {title}
        </Heading>
        <Text textAlign="center" color="body" fontSize="sm" fontFamily="body">
          {subtitle}
        </Text>
      </VStack>
      <Box flex={1}></Box>
    </HStack>
  );
}

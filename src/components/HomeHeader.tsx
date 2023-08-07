import { default as defaultUserPhoto } from '@assets/userPhotoDefault.png';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@hooks/useAuth';
import { API } from '@service/api';
import { HStack, Heading, Icon, Text, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { UserPhoto } from './UserPhoto';

export function HomeHeader() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { user, signOut } = useAuth();

  function handleProfile() {
    navigation.navigate('profile');
  }

  return (
    <HStack pt={16} pb={5} px={4} alignItems="center">
      <TouchableOpacity onPress={handleProfile}>
        <UserPhoto
          source={
            user.avatar
              ? { uri: `${API.defaults.baseURL}/avatar/${user.avatar}` }
              : defaultUserPhoto
          }
          defaultSource={defaultUserPhoto}
          alt="Imagem do usuário"
          size={12}
          mr={4}
        />
      </TouchableOpacity>

      <VStack flex={1} alignItems="center">
        <Text color="body" textAlign="center">
          Seu painel está pronto!
        </Text>
        <Heading color="title" fontSize="lg" ml={1} fontFamily="heading">
          Olá, Matheus
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon as={MaterialIcons} name="logout" color="gray.50" ml={7} size={7} />
      </TouchableOpacity>
    </HStack>
  );
}

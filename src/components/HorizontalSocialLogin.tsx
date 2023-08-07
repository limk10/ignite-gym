import FacebookSvg from '@assets/facebook.svg';
import GoogleSvg from '@assets/google.svg';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { Icon, Text, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Button } from './Button';

export function HorizontalSocialLogin() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleSignin() {
    navigation.navigate('signin');
  }

  function handleSignup() {
    navigation.navigate('signup');
  }

  return (
    <VStack space={3} px={5} w="100%">
      <Button onPress={handleSignup} title="Inscreva-se grátis" />
      {/* <Button
        leftIcon={
          <Icon size={6} as={<MaterialCommunityIcons name="cellphone" size={24} color="black" />} />
        }
        title={`Continuar com número`}
        variant="outline"
        color="light.100"
        borderColor="light.100"
      /> */}
      <Button
        leftIcon={<Icon size={6} as={<GoogleSvg width="25px" height="25px" />} />}
        title="Continuar com o Google"
        variant="outline"
        color="light.100"
        borderColor="light.100"
      />
      <Button
        leftIcon={<Icon size={6} as={<FacebookSvg width="25px" height="25px" />} />}
        title="Continuar com o Facebook"
        variant="outline"
        color="light.100"
        borderColor="light.100"
      />
      <Button
        leftIcon={<Icon size={6} as={<AntDesign name="apple1" size={24} color="black" />} />}
        title="Continuar com a Apple"
        variant="outline"
        color="light.100"
        borderColor="light.100"
      />

      <TouchableOpacity onPress={handleSignin}>
        <Text color="light.100" textAlign="center" fontFamily="heading" fontSize={18} py={3}>
          Entrar
        </Text>
      </TouchableOpacity>

      {/* <IconButton  icon={<Icon size={6} as={<AntDesign name="google" />} color="light.100" />} />
      <IconButton
        icon={<Icon size={6} as={<AntDesign name="facebook-square" />} color="light.100" />}
      />
      <IconButton icon={<Icon size={6} as={<AntDesign name="apple1" />} color="light.100" />} /> */}
      {/* <IconButton icon={<FacebookLogoSvg width="28px" height="28px" />} />
      <IconButton icon={<AppleLogoSvg width="25px" height="25px" />} /> */}
    </VStack>
  );
}

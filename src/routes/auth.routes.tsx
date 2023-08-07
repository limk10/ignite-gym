import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { Signin } from '@screens/Signin';
import { Signup } from '@screens/Signup';
import { SocialLogin } from '@screens/SocialLogin';

export type AuthRoutesProps = {
  signin: undefined;
  signup: undefined;
  socialLogin: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutesProps>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesProps>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="socialLogin" component={SocialLogin} />
      <Screen name="signin" component={Signin} />
      <Screen name="signup" component={Signup} />
    </Navigator>
  );
}

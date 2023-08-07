import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";

import { Signin } from "@screens/Signin";
import { Signup } from "@screens/Signup";

type AuthRoutesProps = {
  signin: undefined;
  signup: undefined;
};

export type AuthNavigatorRoutesProps =
  NativeStackNavigationProp<AuthRoutesProps>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesProps>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signin" component={Signin} />
      <Screen name="signup" component={Signup} />
    </Navigator>
  );
}

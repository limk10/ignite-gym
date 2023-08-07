import HomeSvg from '@assets/home.svg';
import ProfileSvg from '@assets/profile.svg';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FaultCodeList } from '@screens/FaultCodeList';
import { Home } from '@screens/Home';
import { Profile } from '@screens/Profile';
import { useTheme } from 'native-base';
import { Platform } from 'react-native';

type AppRoutesProps = {
  home: undefined;
  profile: undefined;
  faultCodeList: { code: string };
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutesProps>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesProps>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();

  const iconSizes = sizes[6];
  const borderRadius = sizes[5];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.primary[700],
        tabBarInactiveTintColor: colors.light[100],
        tabBarLabelStyle: {
          fontSize: 11,
        },
        tabBarStyle: {
          backgroundColor: 'transparent',
          marginBottom: sizes[2],
          marginHorizontal: sizes[2],
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
          borderTopWidth: 0,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          title: 'Início',
          tabBarItemStyle: {
            backgroundColor: colors.gray[500],
            borderTopLeftRadius: borderRadius,
            borderBottomLeftRadius: borderRadius,
            height: Platform.OS === 'android' ? 'auto' : 55,
            paddingBottom: sizes[1],
          },
          tabBarIcon: ({ color }) => <HomeSvg fill={color} width={iconSizes} height={iconSizes} />,
        }}
      />

      <Screen
        name="profile"
        component={Profile}
        options={{
          title: 'Perfil',
          tabBarItemStyle: {
            backgroundColor: colors.gray[500],
            borderTopRightRadius: borderRadius,
            borderBottomRightRadius: borderRadius,
            height: Platform.OS === 'android' ? 'auto' : 55,
            paddingBottom: sizes[1],
          },
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSizes} height={iconSizes} />
          ),
        }}
      />

      <Screen
        name="faultCodeList"
        component={FaultCodeList}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  );
}

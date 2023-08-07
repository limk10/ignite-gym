import { Loading } from '@components/Loading';
import { useAuth } from '@hooks/useAuth';
import { useLoading } from '@hooks/useLoading';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Box, useTheme } from 'native-base';
import { AppRoutes } from './app.routes';

export function Routes() {
  const { loadingSplashScreen } = useLoading();
  const { colors } = useTheme();
  const { user } = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  if (loadingSplashScreen) return <Loading />;

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer>
        <AppRoutes />
        {/* {user?.id ? <AppRoutes /> : <AuthRoutes />} */}
      </NavigationContainer>
    </Box>
  );
}

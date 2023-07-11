import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { Box, useTheme } from "native-base";
import { useAuth } from "@hooks/useAuth";
import { AppRoutes } from "./app.routes";
import { Loading } from "@components/Loading";
import { useLoading } from "@hooks/useLoading";

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
        {user?.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}

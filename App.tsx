import { StatusBar } from "react-native";

import {
  Roboto_700Bold,
  Roboto_400Regular,
  useFonts,
} from "@expo-google-fonts/roboto";
import { NativeBaseProvider } from "native-base";
import { Loading } from "@components/Loading";
import { THEME } from "@theme/index";
import { Routes } from "@routes/index";
import { AuthContextProvider } from "@contexts/AuthContext";
import { LoadingContextProvider } from "@contexts/LoadingContext";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  if (!fontsLoaded) return null;

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <LoadingContextProvider>
        <AuthContextProvider>
          {fontsLoaded ? <Routes /> : <Loading />}
        </AuthContextProvider>
      </LoadingContextProvider>
    </NativeBaseProvider>
  );
}

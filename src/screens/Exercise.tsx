import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";
import { useToast } from "@hooks/useToast";
import { API } from "@service/api";
import { useEffect, useState } from "react";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { useLoading } from "@hooks/useLoading";
import { Loading } from "@components/Loading";

type RouteParamsProps = {
  exerciseId: string;
};

export function Exercise() {
  const { toast } = useToast();
  const { loading, setLoading, setLoadingButtons } = useLoading();
  const route = useRoute();
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [exercise, setExercise] = useState<ExerciseDTO>();

  const { exerciseId } = route.params as RouteParamsProps;

  async function fecthExerciseDetail() {
    try {
      setLoading(true);
      const { data } = await API.get(`/exercises/${exerciseId}`);

      setExercise(data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível carregar os grupos musculares.";

      toast(title);
    } finally {
      setLoading(false);
    }
  }

  async function handleExerciseHistoryRegister() {
    try {
      setLoadingButtons(true);
      await API.post(`/history`, { exercise_id: exerciseId });

      toast("Parabens! Exercício registrado no seu histórico.", "success");

      navigation.navigate("history");
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível registrar o exercício.";

      toast(title);
    } finally {
      setLoadingButtons(false);
    }
  }

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    fecthExerciseDetail();
  }, [exerciseId]);

  return (
    <VStack flex={1}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <VStack px={7} bg="gray.600" pt={12}>
            <TouchableOpacity onPress={handleGoBack}>
              <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
            </TouchableOpacity>

            <HStack justifyContent="space-between" mt={4} mb={8}>
              <Heading color="gray.100" fontSize="lg" flexShrink={1}>
                {exercise?.name}
              </Heading>

              <HStack alignItems="center">
                <BodySvg />
                <Text color="gray.200" ml={1} textTransform="capitalize">
                  {exercise?.group}
                </Text>
              </HStack>
            </HStack>
          </VStack>

          <ScrollView>
            <VStack p={6}>
              <Image
                source={{
                  uri: `${API.defaults.baseURL}/exercise/demo/${exercise?.demo}`,
                }}
                w="full"
                h={80}
                alt="Nome do exercicio"
                mb={3}
                resizeMode="cover"
                rounded="lg"
              />

              <Box bg="gray.600" rounded="md" pb={4} px={4}>
                <HStack
                  alignItems="center"
                  justifyContent="space-around"
                  mb={6}
                  mt={5}
                >
                  <HStack>
                    <SeriesSvg />
                    <Text color="gray.200" ml="2">
                      {exercise?.series} séries
                    </Text>
                  </HStack>
                  <HStack>
                    <RepetitionsSvg />
                    <Text color="gray.200" ml="2">
                      {exercise?.repetitions} repetições
                    </Text>
                  </HStack>
                </HStack>

                <Button
                  title="Marcar como realizado"
                  onPress={handleExerciseHistoryRegister}
                />
              </Box>
            </VStack>
          </ScrollView>
        </>
      )}
    </VStack>
  );
}

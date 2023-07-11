import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { Loading } from "@components/Loading";
import { ExerciseDTO } from "@dtos/exerciseDTO";
import { useLoading } from "@hooks/useLoading";
import { useToast } from "@hooks/useToast";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { API } from "@service/api";
import { AppError } from "@utils/AppError";
import { FlatList, HStack, Heading, Text, VStack } from "native-base";
import { useCallback, useEffect, useState } from "react";

export function Home() {
  const { toast } = useToast();
  const { loading, setLoading } = useLoading();
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [groupSelected, setGroupSelected] = useState<string>();
  const [groups, setGroups] = useState<string[]>([]);
  const [data, setData] = useState<ExerciseDTO[]>([]);

  function handleOpenExerciseDetail(exerciseId: string) {
    navigation.navigate("excercise", { exerciseId });
  }

  async function fetchGroups() {
    try {
      const { data } = await API.get("/groups");

      setGroups(data);
      if (data.length) setGroupSelected(data[0]);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível carregar os grupos musculares.";

      toast(title);
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setLoading(true);
      const { data } = await API.get(`/exercises/bygroup/${groupSelected}`);
      setData(data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível carregar os exercícios.";

      toast(title);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    fetchExercisesByGroup();
  }, [groupSelected]);

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isEnabled={groupSelected === item}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{
          px: 4,
        }}
        my={8}
        maxH={10}
        minH={10}
      />

      <VStack flex={1} px={4}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>
          <Text color="gray.200" fontSize="sm">
            {data?.length}
          </Text>
        </HStack>

        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                data={item}
                onPress={() => handleOpenExerciseDetail(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{
              paddingBottom: 20,
            }}
          />
        )}
      </VStack>
    </VStack>
  );
}

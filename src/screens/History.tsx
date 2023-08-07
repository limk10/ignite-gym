import { HistoryCard } from "@components/HistoryCard";
import { Loading } from "@components/Loading";
import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";
import { useLoading } from "@hooks/useLoading";
import { useToast } from "@hooks/useToast";
import { useFocusEffect } from "@react-navigation/native";
import { API } from "@service/api";
import { AppError } from "@utils/AppError";
import { Heading, SectionList, Text, VStack } from "native-base";
import { useCallback, useState } from "react";

export function History() {
  const { toast } = useToast();
  const { loading, setLoading } = useLoading();
  const [history, setHistory] = useState<HistoryByDayDTO[]>([]);

  async function fecthHistory() {
    try {
      setLoading(true);

      const { data } = await API.get("history");

      setHistory(data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível carregar o histórico.";

      toast(title);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fecthHistory();
    }, [])
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercicíos" />

      {loading ? (
        <Loading />
      ) : (
        <>
          <SectionList
            sections={history}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <HistoryCard data={item} />}
            renderSectionHeader={({ section }) => (
              <Heading
                color="gray.200"
                fontSize="md"
                fontFamily="heading"
                mt={10}
                mb={3}
              >
                {section.title}
              </Heading>
            )}
            px={5}
            contentContainerStyle={
              history.length ? {} : { flex: 1, justifyContent: "center" }
            }
            ListEmptyComponent={() => (
              <Text color="gray.100" textAlign="center">
                Não há exercícios registrados ainda. {"\n"} Vamos fazer
                exercício hoje?
              </Text>
            )}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </VStack>
  );
}

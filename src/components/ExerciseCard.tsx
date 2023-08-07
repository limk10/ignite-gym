import { HStack, Heading, Icon, Image, Text, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { Entypo } from "@expo/vector-icons";
import { ExerciseDTO } from "@dtos/exerciseDTO";
import { API } from "@service/api";

type ComponentProps = TouchableOpacityProps & {
  data: ExerciseDTO;
};

export function ExerciseCard({ data, ...rest }: ComponentProps) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="gray.500"
        alignItems="center"
        p={2}
        pr={4}
        rounded="md"
        mb={3}
      >
        <Image
          source={{
            uri: `${API.defaults.baseURL}/exercise/thumb/${data?.thumb}`,
          }}
          alt={data?.name}
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="cover"
        />

        <VStack flex={1}>
          <Heading fontSize="lg" color="white">
            {data?.name}
          </Heading>

          <Text fontSize="sm" color="gray.200" numberOfLines={2}>
            {data?.series}x séries x {data?.repetitions} repetições
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
}

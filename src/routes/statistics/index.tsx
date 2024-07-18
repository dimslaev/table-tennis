import { Heading, Flex } from "@radix-ui/themes";
import { useGetStatistics } from "@/api/statistics/hooks";
import { List } from "./components/List";

export function Statistics() {
  const statistics = useGetStatistics();

  return (
    <Flex direction="column" gap="4">
      <Heading>Ranking</Heading>

      <List statistics={statistics.data || []} />
    </Flex>
  );
}

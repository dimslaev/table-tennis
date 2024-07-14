import { Heading, Flex } from "@radix-ui/themes";
import { useGetStatistics } from "@/api/statistics/hooks";
import { List } from "./components/List";

export function Statistics() {
  const statistics = useGetStatistics();

  return (
    <Flex maxWidth="600px" direction="column" gap="6">
      <Heading>Statistics</Heading>

      <List statistics={statistics.data || []} />
    </Flex>
  );
}

import { CSSProperties } from "react";
import { Flex, Box, Text, IconButton, Card, Avatar } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
import { Player } from "@/api/player/types";
import { StarFilledIcon } from "@radix-ui/react-icons";

export function PlayerCard({
  player,
  ranking,
  score,
  isWinner,
  onScore,
  disabled,
}: {
  player: Player;
  ranking: number;
  score: number;
  isWinner: boolean;
  onScore: () => void;
  disabled: boolean;
}) {
  return (
    <Flex direction="column" gap="4">
      <Card
        style={
          isWinner
            ? ({
                "--card-background-color": "var(--accent-a1)",
              } as CSSProperties)
            : undefined
        }
      >
        <Flex gap="3" align="center">
          <Box position="relative">
            {isWinner && (
              <Box position="absolute" top="0" right="0">
                <Flex align="center">
                  <StarFilledIcon
                    width="26"
                    height="26"
                    style={{ color: "var(--accent-10)" }}
                  />
                </Flex>
              </Box>
            )}
            <Avatar
              size="6"
              src={player.avatar_url}
              radius="full"
              fallback={`${player.first_name
                .charAt(0)
                .toUpperCase()} ${player.last_name.charAt(0).toUpperCase()}`}
            />
          </Box>

          <Box>
            <Text as="div" size="2" weight="bold">
              {player.first_name} {player.last_name}
            </Text>
            <Text as="div" size="2" color="gray">
              Rank: {ranking}
            </Text>
          </Box>
        </Flex>

        <Flex
          align="center"
          justify="between"
          px="4"
          py="3"
          mt="4"
          style={{
            background: "var(--accent-a3)",
            borderRadius: "var(--radius-4)",
          }}
        >
          <Box>
            <Text as="div" size="2" color="gray">
              Score
            </Text>
            <Text as="div" size="6" weight="bold">
              {score}
            </Text>
          </Box>

          <IconButton size="4" disabled={disabled} onClick={onScore}>
            <PlusIcon />
          </IconButton>
        </Flex>
      </Card>
    </Flex>
  );
}

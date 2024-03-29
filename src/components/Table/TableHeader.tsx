import { flexRender, HeaderGroup } from "@tanstack/react-table";
import { Table as RadixTable, Flex, Box, Text } from "@radix-ui/themes";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";

type Props<T> = {
  headerGroups: HeaderGroup<T>[];
};

export const TableHeader = <T,>(props: Props<T>) => {
  const { headerGroups } = props;

  return (
    <RadixTable.Header>
      {headerGroups.map((headerGroup) => {
        return (
          <RadixTable.Row key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <RadixTable.ColumnHeaderCell
                  key={header.id}
                  id={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={
                    header.column.getCanSort() ? { cursor: "pointer" } : {}
                  }
                >
                  <Flex align="center" gap="2">
                    <Text style={{ userSelect: "none" }}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Text>

                    <Box width="32px" height="14px">
                      {{
                        asc: <ArrowUpIcon />,
                        desc: <ArrowDownIcon />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </Box>
                  </Flex>
                </RadixTable.ColumnHeaderCell>
              );
            })}
          </RadixTable.Row>
        );
      })}
    </RadixTable.Header>
  );
};

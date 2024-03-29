import { Table as RadixTable } from "@radix-ui/themes";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  ColumnSort,
} from "@tanstack/react-table";
import { TableHeader } from "@/components/Table/TableHeader";
import { TableBody } from "@/components/Table/TableBody";

type Props<T> = RadixTable.RootProps & {
  columns: ColumnDef<T>[];
  data: T[];
  defaultSorting?: ColumnSort[];
};

export const Table = <T,>(props: Props<T>) => {
  const { columns, data, defaultSorting, ...radixTableProps } = props;
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: defaultSorting,
    },
  });

  return (
    <RadixTable.Root {...radixTableProps}>
      <TableHeader<T> headerGroups={table.getHeaderGroups()} />
      <TableBody<T> rows={table.getRowModel().rows} />
    </RadixTable.Root>
  );
};

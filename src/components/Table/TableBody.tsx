import { Row, flexRender } from "@tanstack/react-table";
import { Table as RadixTable } from "@radix-ui/themes";

type Props<T> = {
  rows: Row<T>[];
};

export const TableBody = <T,>(props: Props<T>) => {
  const { rows } = props;

  return (
    <RadixTable.Body>
      {rows.map((row) => (
        <RadixTable.Row key={row.id} align="center">
          {row.getVisibleCells().map((cell) => (
            <RadixTable.Cell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </RadixTable.Cell>
          ))}
        </RadixTable.Row>
      ))}
    </RadixTable.Body>
  );
};

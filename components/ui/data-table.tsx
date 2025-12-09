"use client";

import * as React from "react";
import { Check } from "lucide-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";
import Loader from "./Loader";

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  selectedRows: T[];
  onRowSelect?: (rows: T[]) => void;
  onRowClick?: (row: T) => void;
  className?: string;
  responsive?: boolean;
  loading?: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  enableCheckbox?: boolean;
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  selectedRows,
  onRowSelect,
  onRowClick,
  className,
  responsive = true,
  loading = false,
  currentPage,
  totalPages,
  onPageChange,
  enableCheckbox = false,
}: DataTableProps<T>) {
  const allSelected = selectedRows?.length === data?.length && data?.length > 0;
  const handleRowCheckbox = (row: T) => {
    const isSelected = selectedRows?.some((r) => r.id === row.id);
    let updated: T[];

    if (isSelected) {
      updated = selectedRows.filter((r) => r.id !== row.id);
    } else {
      updated = [...selectedRows, row];
    }

    onRowSelect?.(updated);
  };

  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-lg border border-red-500/20",
        className
      )}
    >
      <table className="w-full text-sm  border-collapse">
        <thead>
          <tr className="border-b border-red-500/20 bg-black/50">
            {enableCheckbox && (
              <th className="px-4 py-3 text-left border-r border-red-500/20">
                {/* <Checkbox.Root
                  checked={allSelected}
                  onCheckedChange={handleHeaderCheckbox}
                  className="w-4 h-4 border border-gray-400 rounded flex items-center justify-center bg-black"
                >
                  {allSelected && <Check className="w-3 h-3 text-white" />}
                </Checkbox.Root> */}
              </th>
            )}

            {columns.map((column, idx) => (
              <th
                key={String(column.key)}
                className={cn(
                  "px-4 py-3 text-left font-semibold text-gray-400 text-nowrap",
                  column.className,
                  idx < columns.length - 1 ? "border-r border-red-500/20" : ""
                )}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length + (enableCheckbox ? 1 : 0)}
                className="text-center text-gray-400 py-8"
              >
                <Loader />
              </td>
            </tr>
          ) : (
            data?.map((row) => {
              const isChecked = selectedRows?.some((r) => r.id === row.id);
              return (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    "border-b border-red-500/10 hover:bg-red-900/10 transition-colors",
                    isChecked && "bg-red-900/20"
                  )}
                >
                  {enableCheckbox && (
                    <td className="px-4 py-3 border-r border-red-500/20">
                      <Checkbox.Root
                        checked={isChecked}
                        onCheckedChange={() => handleRowCheckbox(row)}
                        className="w-4 h-4 border border-gray-400 rounded flex items-center justify-center bg-black"
                      >
                        {isChecked && <Check className="w-3 h-3 text-white" />}
                      </Checkbox.Root>
                    </td>
                  )}

                  {columns.map((column, idx) => (
                    <td
                      key={String(column.key)}
                      className={cn(
                        "px-4 py-3 text-white",
                        column.className,
                        idx < columns.length - 1
                          ? "border-r border-red-500/20"
                          : ""
                      )}
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : String(row[column.key])}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 my-4 text-white">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 disabled:bg-red-900/30"
        >
          Prev
        </button>

        <span className="px-3 py-1 bg-red-900/20 rounded">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 disabled:bg-red-900/30"
        >
          Next
        </button>
      </div>
    </div>
  );
}

import React from "react";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const driverColumns = [
    {
        accessorKey: "fullname",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Fullname
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => <div className="">{row.getValue("fullname")}</div>,
      },
      {
        accessorKey: "sex",
        header: "Sex",
        cell: ({ row }) => <div className="">{row.getValue("sex")}</div>,
      },
      {
        accessorKey: "birthDate",
        header: "Birthday",
        cell: ({ row }) => <div className="">{row.getValue("birthDate")}</div>,
      },
      {
        accessorKey: "civilStatus",
        header: "Civil Status",
        cell: ({ row }) => <div className="">{row.getValue("civilStatus")}</div>,
      },
      {
        accessorKey: "issueDate",
        header: "Date Issued",
        cell: ({ row }) => <div className="">{row.getValue("issueDate")}</div>,
      },
      {
        accessorKey: "expiryDate",
        header: "Expiration Date",
        cell: ({ row }) => <div className="">{row.getValue("expiryDate")}</div>,
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const payment = row.original;
    
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-5 w-5 p-0">
                  <span className="sr-only">Open menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(payment.id)}
                >
                  Copy payment ID
                </DropdownMenuItem>
                {/* <DropdownMenuSeparator /> */}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
]
'use client'

import { ColumnDef } from '@tanstack/react-table'

// import { formatDate } from '@/lib/utils'
import { CellAction } from './cell-action'
import {formatDate} from "@/lib/utils";
import {Product} from "@/lib/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string
  price: string
  name: string
  // slug: string
  storeId: string
  category: string
  created_at: Date
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
        <div className='truncate max-w-[300px]'>{row.original.name}</div>
    ),
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ cell }) => {
      const category = cell.getValue() as { name: string };
      return category?.name ?? 'Unknown';
    }
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
    cell: ({ cell }) => formatDate(cell.getValue() as Date),
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
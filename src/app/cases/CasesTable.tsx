'use client';

import {
  Button,
  Card,
  // getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react';
import { Case } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { Key } from 'react';
import { HiMiniEye } from 'react-icons/hi2';

type Props = {
  cases: Case[];
};

export default function CasesTable({ cases }: Props) {
  const router = useRouter();

  // Column and keys to use to build Table
  const columns = [
    { key: 'id', label: 'Id' },
    { key: 'name', label: 'Name' },
    { key: 'yearStart', label: 'Start Year' },
    { key: 'status', label: 'Status' },
  ];

  const handleRowSelect = (key: Key) => {
    const conflitCase = cases.find((c) => c.id === key);
    const url = `/cases/${conflitCase?.id}`;
    router.push(url);
  };

  const renderCell = (c: Case, columnKey: Key) => {
    switch (columnKey) {
      case 'id':
        return <Tooltip color='primary'>Primary</Tooltip>;

      case 'actions':
        return <Tooltip color='primary'>Primary</Tooltip>;

      case 'status':
        return <Tooltip color='success'>{c.status}</Tooltip>;

      case 'name':
        return (
          <Tooltip content='Details'>
            <Button>
              <HiMiniEye size={20} fill='#979797' />
            </Button>
          </Tooltip>
        );
      default:
        return '';
    }
  };

  return (
    <Card className='flex flex-col gap-3 h-[80vh] '>
      <Table
        aria-label='Table with land conflicts cases'
        selectionMode='single'
        shadow='none'
        onRowAction={(key) => {
          handleRowSelect(key);
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={cases} emptyContent='No cases in this category'>
          {(item) => (
            <TableRow key={item.id} className='cursor-pointer'>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}

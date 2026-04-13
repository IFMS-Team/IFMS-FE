'use client';

import Image from 'next/image';
import { Table } from '@/shared/components';
import type { Column } from '@/shared/components';
import { CheckerIcon, DotsIcon } from '@/shared/components/icons';
import type { InventoryItemData } from '../types';
import { STATUS_CONFIG, DEFAULT_STATUS } from '../constants';

interface InventoryTableProps {
  items: InventoryItemData[];
  onToggle: (id: string) => void;
}

function StatusBadge({ status }: { status: InventoryItemData['status'] }) {
  const cfg = STATUS_CONFIG[status] ?? DEFAULT_STATUS;
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${cfg.className}`}>
      {cfg.icon && <CheckerIcon className="h-3 w-3 text-[#254D4A]" />}
      {cfg.label}
    </span>
  );
}

function CreatorCell({ name }: { name: string }) {
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2);
  return (
    <div className="flex items-center gap-1.5">
      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[9px] font-bold text-emerald-700">
        {initials}
      </span>
      <span className="text-xs text-gray-700">{name}</span>
    </div>
  );
}

function ToggleSwitch({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onChange(); }}
      className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${
        enabled ? 'bg-emerald-500' : 'bg-gray-300'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

function ActionsCell() {
  return (
    <div className="flex items-center gap-1">
      <button className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
        <DotsIcon className="h-4 w-4" />
      </button>
      <button className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
        <DotsIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

export function InventoryTable({ items, onToggle }: InventoryTableProps) {
  const columns: Column<InventoryItemData>[] = [
    {
      key: 'numericId',
      header: 'ID',
      width: 'w-16',
      render: (item) => <span className="text-xs text-gray-600">{item.numericId.slice(-4)}</span>,
    },
    {
      key: 'title',
      header: 'Tên',
      width: 'min-w-[120px]',
      sortable: true,
      render: (item) => <span className="text-xs font-medium text-gray-900">{item.title}</span>,
    },
    {
      key: 'category',
      header: 'Danh mục',
      width: 'min-w-[100px]',
      render: (item) => <span className="text-xs text-gray-600">{item.categoryPath.split(' / ')[0] ?? '-'}</span>,
    },
    {
      key: 'equipment',
      header: 'Thiết bị',
      width: 'min-w-[80px]',
      render: (item) => <span className="text-xs text-gray-600">{item.categoryPath.split(' / ')[1] ?? '-'}</span>,
    },
    {
      key: 'room',
      header: 'Phòng',
      width: 'min-w-[80px]',
      render: (item) => <span className="text-xs text-gray-600">{item.tags[2]?.label ?? '-'}</span>,
    },
    {
      key: 'floor',
      header: 'Lầu',
      width: 'min-w-[60px]',
      render: (item) => <span className="text-xs text-gray-600">{item.tags[1]?.label ?? '-'}</span>,
    },
    {
      key: 'building',
      header: 'Toà nhà',
      width: 'min-w-[80px]',
      render: (item) => <span className="text-xs text-gray-600">{item.tags[0]?.label ?? '-'}</span>,
    },
    {
      key: 'image',
      header: 'Hình ảnh',
      width: 'w-20',
      render: (item) => (
        <div className="h-10 w-10 overflow-hidden rounded-lg bg-gray-100">
          <Image src={item.image} alt={item.title} width={40} height={40} className="h-full w-auto object-cover" />
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Trạng thái',
      width: 'w-[130px]',
      sortable: true,
      render: (item) => <StatusBadge status={item.status} />,
    },
    {
      key: 'createdAt',
      header: 'Ngày tạo',
      width: 'min-w-[80px]',
      sortable: true,
      render: (item) => (
        <div>
          <div className="text-xs text-gray-600">{item.createdAt.split(' ')[0]}</div>
          <div className="text-[10px] text-gray-400">{item.createdAt.split(' ')[1]}</div>
        </div>
      ),
    },
    {
      key: 'createdBy',
      header: 'Người tạo',
      width: 'min-w-[100px]',
      render: (item) => <CreatorCell name={item.createdBy} />,
    },
    {
      key: 'enabled',
      header: 'Hoạt động',
      width: 'w-20',
      align: 'center',
      render: (item) => <ToggleSwitch enabled={item.enabled} onChange={() => onToggle(item.id)} />,
    },
    {
      key: 'actions',
      header: 'Thao tác',
      width: 'w-20',
      align: 'center',
      render: () => <ActionsCell />,
    },
  ];

  return (
    <Table<InventoryItemData>
      columns={columns}
      data={items}
      keyExtractor={(item) => item.id}
      selectable
      hoverable
      size="sm"
      rounded
      rowClassName={(item) => (!item.enabled ? 'opacity-50' : '')}
      emptyMessage="Không có dữ liệu"
    />
  );
}

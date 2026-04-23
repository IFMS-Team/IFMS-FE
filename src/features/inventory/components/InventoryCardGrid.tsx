'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  BuildingIcon, CheckerIcon, DamagedIcon, DotsVerticalIcon,
  FloorIcon, InactiveIcon, InUseIcon, LostIcon,
  MaintenanceIcon, RoomIcon, UserIcon,
} from '@/shared/components/icons';
import type { ComponentType } from 'react';
import type { InventoryItemData, InventoryStatus } from '../types';
import { STATUS_CONFIG, DEFAULT_STATUS } from '../constants';

interface InventoryCardGridProps {
  items: InventoryItemData[];
  onToggle: (id: string) => void;
}

const STATUS_BADGE_STYLES: Record<InventoryStatus, { icon: ComponentType<{ className?: string }>; bg: string; text: string }> = {
  active: { icon: CheckerIcon, bg: 'bg-[#309F6F]', text: 'text-white' },
  'in-use': { icon: InUseIcon, bg: 'bg-[#6366E9]', text: 'text-white' },
  damaged: { icon: DamagedIcon, bg: 'bg-[#DD524C]', text: 'text-white' },
  lost: { icon: LostIcon, bg: 'bg-[#3F3F45]', text: 'text-white' },
  maintenance: { icon: MaintenanceIcon, bg: 'bg-[#E87B35]', text: 'text-white' },
  inactive: { icon: InactiveIcon, bg: 'bg-[#3F3F45]', text: 'text-white' },
};

const TAG_ICONS = {
  clipboard: BuildingIcon,
  document: FloorIcon,
  barcode: RoomIcon,
} as const;

const PAGE_SIZE_OPTIONS = [12, 24, 48, 96];

export function InventoryCardGrid({ items, onToggle }: InventoryCardGridProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const paginatedItems = useMemo(
    () => items.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [items, currentPage, pageSize],
  );

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === paginatedItems.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedItems.map((i) => i.id)));
    }
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4 p-4">
      {/* Select-all bar */}
      {paginatedItems.length > 0 && (
        <div className="flex items-center gap-3 px-1">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-500 select-none">
            <input
              type="checkbox"
              checked={selectedIds.size === paginatedItems.length && paginatedItems.length > 0}
              onChange={toggleAll}
              className="h-4 w-4 cursor-pointer rounded border-gray-300 text-emerald-600 accent-emerald-600"
            />
            Chọn tất cả
          </label>
          {selectedIds.size > 0 && (
            <span className="text-xs text-emerald-600 font-medium">
              Đã chọn {selectedIds.size}
            </span>
          )}
        </div>
      )}

      {/* Card grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {paginatedItems.map((item, index) => (
          <CardItem
            key={item.id}
            item={item}
            selected={selectedIds.has(item.id)}
            onSelect={() => toggleSelect(item.id)}
            onToggle={() => onToggle(item.id)}
            priority={index < 4}
          />
        ))}
      </div>

      {paginatedItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <p className="text-sm font-medium">Không tìm thấy tài sản nào</p>
          <p className="mt-1 text-xs">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc.</p>
        </div>
      )}

      {/* Pagination */}
      {items.length > 0 && (
        <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 pt-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Hiển thị</span>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="cursor-pointer rounded-lg border border-gray-200 bg-white px-2 py-1 text-sm text-gray-700 focus:border-gray-400 focus:outline-none"
            >
              {PAGE_SIZE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <span>mục / trang</span>
          </div>

          <span className="text-sm text-gray-500">
            {items.length.toLocaleString()} tài sản
          </span>

          <div className="flex items-center gap-1">
            <PaginationButton
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
              label="&laquo;"
            />
            <PaginationButton
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              label="&lsaquo;"
            />
            <span className="px-3 text-sm text-gray-700">
              {currentPage} / {totalPages}
            </span>
            <PaginationButton
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              label="&rsaquo;"
            />
            <PaginationButton
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
              label="&raquo;"
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Card ─── */

function CardItem({
  item,
  selected,
  onSelect,
  onToggle,
  priority = false,
}: {
  item: InventoryItemData;
  selected: boolean;
  onSelect: () => void;
  onToggle: () => void;
  priority?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const statusCfg = STATUS_CONFIG[item.status] ?? DEFAULT_STATUS;
  const badgeStyle = STATUS_BADGE_STYLES[item.status] ?? STATUS_BADGE_STYLES.inactive;

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl border-2 transition-all duration-200 ${
        selected
          ? 'border-emerald-400 bg-[#BEE4CE] shadow-[0_0_0_3px_rgba(52,211,153,0.15)]'
          : 'border-transparent bg-[#FAFAFA] shadow-[0_1px_4px_rgba(0,0,0,0.06)]'
      } ${!item.enabled ? 'opacity-50' : 'hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]'}`}
    >
      {/* Top bar: checkbox + actions */}
      <div className="flex items-center justify-between px-3 pt-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={onSelect}
          className="h-4 w-4 cursor-pointer rounded border-gray-300 text-emerald-600 accent-emerald-600"
        />
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <DotsVerticalIcon className="h-4 w-4" />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-full z-20 mt-1 w-36 rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg">
                <MenuAction label="Xem chi tiết" onClick={() => setMenuOpen(false)} />
                <MenuAction label="Chỉnh sửa" onClick={() => setMenuOpen(false)} />
                <MenuAction label="Xoá" onClick={() => setMenuOpen(false)} danger />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Image + Status badge */}
      <div className="relative mx-3 mt-1 aspect-square overflow-hidden rounded-2xl">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, 280px"
          priority={priority}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className={`absolute bottom-2 left-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeStyle.bg} ${badgeStyle.text}`}>
          <badgeStyle.icon className="h-3 w-3" />
          {statusCfg.label}
        </span>
      </div>
      {/* Content */}
      <div className={`flex flex-1 px-4 pt-2.5 justify-between pb-3 border-t border-gray-100 ${selected ? 'bg-[#EDF8F1]' : 'bg-[#FFFFFF]'}`}>
        <div className="flex flex-col">
          <p className="text-[10px] font-semibold tracking-wide text-gray-400 uppercase">
            {item.categoryPath}
          </p>
          <h3 className="mt-0.5 text-sm font-bold text-gray-900 leading-snug line-clamp-2">
            {item.title}
          </h3>
          <p className="mt-1 text-xs text-gray-400 font-mono">
            ID{item.numericId}
          </p>
        </div>
        <button
          onClick={onToggle}
          className={`relative h-5 w-9 cursor-pointer rounded-full transition-colors duration-200 ${
            item.enabled ? 'bg-[#439288]' : 'bg-gray-200'
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${
              item.enabled ? 'translate-x-4' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#FFFFFF] rounded-b-[12px] shadow-md">
        <div className="flex items-center gap-3">
          {/* Location tags */}
          <div className="flex items-center gap-2">
            {item.tags.map((tag, i) => {
              const Icon = TAG_ICONS[tag.icon];
              return (
                <span key={i} className="flex items-center gap-0.5 text-[10px] text-gray-500">
                  <Icon className="h-3 w-3" />
                  {tag.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* User + date */}
      <div className="flex items-center gap-2 px-4 py-2">
        <div className="flex h-5 w-5 items-center justify-center rounded-full ">
          <UserIcon className="h-3 w-3 text-gray-400" />
        </div>
        <span className="text-[10px] font-medium text-gray-500 truncate">{item.createdBy}</span>
        <span className="ml-auto text-[10px] text-gray-400 whitespace-nowrap">{item.createdAt}</span>
      </div>
    </div>
  );
}

/* ─── Helpers ─── */

function MenuAction({ label, onClick, danger }: { label: string; onClick: () => void; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full cursor-pointer rounded-lg px-3 py-1.5 text-left text-xs transition-colors ${
        danger
          ? 'text-red-500 hover:bg-red-50'
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      {label}
    </button>
  );
}

function PaginationButton({ disabled, onClick, label }: { disabled: boolean; onClick: () => void; label: string }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: label }}
      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-sm transition-colors ${
        disabled
          ? 'cursor-not-allowed text-gray-300'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    />
  );
}

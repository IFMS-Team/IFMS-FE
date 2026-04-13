'use client';

import { useState, useRef, useEffect } from 'react';
import {
  DotsIcon, ExportIcon, FilterIcon, InventoryIcon,
  SearchIcon, SortIcon, TableIcon,
} from '@/shared/components/icons';
import type { InventoryTab, SortOption } from '../types';
import { SORT_OPTIONS, FILTER_OPTIONS } from '../constants';

interface InventoryToolbarProps {
  activeTab: InventoryTab;
  onTabChange: (tab: InventoryTab) => void;
  search: string;
  onSearchChange: (value: string) => void;
}

export function InventoryToolbar({ activeTab, onTabChange, search, onSearchChange }: InventoryToolbarProps) {
  const [showSort, setShowSort] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showFilter, setShowFilter] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showSearch) searchInputRef.current?.focus();
  }, [showSearch]);

  const handleSort = (option: SortOption) => {
    setSortBy(option);
    setShowSort(false);
  };

  return (
    <div className="flex flex-col bg-white rounded-t-[24px] gap-4 p-4 md:p-6" style={{ boxShadow: '0px 3px 12px 0px #1212121A, 0px 0px 0px 1px #1212120D' }}>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Quản lý tài sản</h1>
          <p className="mt-1 text-sm text-gray-500">Theo dõi và quản lý tài sản trong hệ thống.</p>
        </div>
        <button className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50">
          <ExportIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Xuất báo cáo</span>
        </button>
      </div>

      <div className="flex justify-between gap-4">
        {/* Tabs */}
        <div className="flex gap-1 rounded-lg bg-gray-100 p-1 w-fit">
          <TabButton active={activeTab === 'list'} onClick={() => onTabChange('list')}>
            <InventoryIcon className="h-4 w-4" />
            Danh sách
          </TabButton>
          <TabButton active={activeTab === 'table'} onClick={() => onTabChange('table')}>
            <TableIcon className="h-4 w-4" />
            Bảng
          </TabButton>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            {showSearch ? (
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#717179]" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Tìm kiếm tài sản..."
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onBlur={() => { if (!search) setShowSearch(false); }}
                  className="w-56 rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none transition-all"
                />
              </div>
            ) : (
              <ActionButton onClick={() => setShowSearch(true)}>
                <SearchIcon className="h-4 w-4 text-[#717179]" />
                <span className="hidden sm:inline">Tìm kiếm</span>
              </ActionButton>
            )}
          </div>

          {/* Filter */}
          <div className="relative">
            <ActionButton onClick={() => { setShowFilter(!showFilter); setShowSort(false); }}>
              <FilterIcon className="h-4 w-4 text-[#717179]" />
              <span className="hidden sm:inline">Bộ lọc</span>
            </ActionButton>
            {showFilter && (
              <Dropdown>
                {FILTER_OPTIONS.map((label) => (
                  <DropdownItem key={label} onClick={() => setShowFilter(false)}>
                    {label}
                  </DropdownItem>
                ))}
              </Dropdown>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <ActionButton onClick={() => { setShowSort(!showSort); setShowFilter(false); }}>
              <SortIcon className="h-4 w-4 text-[#717179]" />
              <span className="hidden sm:inline">Sắp xếp</span>
            </ActionButton>
            {showSort && (
              <Dropdown align="right">
                {SORT_OPTIONS.map((opt) => (
                  <DropdownItem
                    key={opt.value}
                    onClick={() => handleSort(opt.value)}
                    active={sortBy === opt.value}
                  >
                    {opt.label}
                  </DropdownItem>
                ))}
              </Dropdown>
            )}
          </div>

          <button className="flex cursor-pointer items-center rounded-lg border border-gray-200 p-2 text-gray-600 transition-colors hover:bg-gray-50">
            <DotsIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex cursor-pointer items-center gap-1.5 rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
        active ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      {children}
    </button>
  );
}

function ActionButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-[#09090B] transition-colors hover:bg-gray-50"
    >
      {children}
    </button>
  );
}

function Dropdown({ children, align = 'left' }: { children: React.ReactNode; align?: 'left' | 'right' }) {
  return (
    <div className={`absolute top-full z-20 mt-1 w-48 rounded-lg border border-gray-200 bg-white p-2 shadow-lg ${
      align === 'right' ? 'right-0' : 'left-0'
    }`}>
      {children}
    </div>
  );
}

function DropdownItem({ onClick, active, children }: { onClick: () => void; active?: boolean; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${
        active ? 'font-medium text-emerald-700' : 'text-gray-700'
      }`}
    >
      {children}
    </button>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import {
  AmountIcon, CalendarIcon, DotsIcon, ExportIcon, FilterIcon,
  GridIcon, InventoryIcon, SearchIcon, SortIcon, StatusIcon,
  TableIcon, TagIcon,
} from '@/shared/components/icons';
import type { ComponentType } from 'react';
import type { InventoryTab, SortOption } from '../types';
import { SORT_OPTIONS } from '../constants';

interface InventoryToolbarProps {
  activeTab: InventoryTab;
  onTabChange: (tab: InventoryTab) => void;
  search: string;
  onSearchChange: (value: string) => void;
}

type FilterType = 'date' | 'tag' | 'status' | 'amount';

const FILTER_GRID: { key: FilterType; label: string; icon: ComponentType<{ className?: string }> }[] = [
  { key: 'date', label: 'Ngày', icon: CalendarIcon },
  { key: 'tag', label: 'Nhãn', icon: TagIcon },
  { key: 'status', label: 'Trạng thái', icon: StatusIcon },
  { key: 'amount', label: 'Số lượng', icon: AmountIcon },
];

export function InventoryToolbar({ activeTab, onTabChange, search, onSearchChange }: InventoryToolbarProps) {
  const [showSort, setShowSort] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);
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
          <TabButton active={activeTab === 'card'} onClick={() => onTabChange('card')}>
            <GridIcon className="h-4 w-4" />
            Thẻ
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
            <ActionButton
              active={showFilter}
              onClick={() => { setShowFilter(!showFilter); setShowSort(false); }}
            >
              <FilterIcon className={`h-4 w-4 ${showFilter ? 'text-[#7C3AED]' : 'text-[#717179]'}`} />
              <span className={`hidden sm:inline ${showFilter ? 'text-[#7C3AED]' : ''}`}>Bộ lọc</span>
            </ActionButton>
            {showFilter && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowFilter(false)} />
                <div className="absolute left-0 top-full z-20 mt-2 w-56 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl">
                  <p className="mb-3 text-sm font-semibold text-gray-900">Thêm bộ lọc</p>
                  <div className="grid grid-cols-2 gap-2">
                    {FILTER_GRID.map(({ key, label, icon: Icon }) => {
                      const isActive = activeFilter === key;
                      return (
                        <button
                          key={key}
                          onClick={() => {
                            setActiveFilter(isActive ? null : key);
                          }}
                          className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl px-3 py-4 transition-colors ${
                            isActive
                              ? 'bg-[#EDE9FE] text-[#7C3AED]'
                              : 'bg-[#F9FAFB] text-[#6B7280] hover:bg-gray-100'
                          }`}
                        >
                          <Icon className={`h-6 w-6 ${isActive ? 'text-[#7C3AED]' : 'text-[#9CA3AF]'}`} />
                          <span className="text-xs font-medium">{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
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

function ActionButton({ onClick, children, active }: { onClick: () => void; children: React.ReactNode; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
        active
          ? 'border-[#7C3AED] bg-[#EDE9FE] text-[#7C3AED]'
          : 'border-gray-200 text-[#09090B] hover:bg-gray-50'
      }`}
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

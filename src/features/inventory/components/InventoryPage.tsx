'use client';

import { useState } from 'react';
import Image from 'next/image';

type Tab = 'list' | 'table';
type SortOption = 'newest' | 'oldest' | 'name-asc' | 'name-desc';

interface TagItem {
  icon: 'clipboard' | 'document' | 'barcode';
  label: string;
}

interface InventoryItemData {
  id: string;
  numericId: string;
  image: string;
  categoryPath: string;
  title: string;
  status: 'active' | 'inactive' | 'low-stock';
  tags: TagItem[];
  createdBy: string;
  createdAt: string;
  enabled: boolean;
}

const MOCK_ITEMS: InventoryItemData[] = [
  {
    id: '1',
    numericId: '12345689',
    image: '/images/common/placeholder.svg',
    categoryPath: 'NỘI THẤT / GHẾ',
    title: 'Ghế so far',
    status: 'active',
    tags: [
      { icon: 'clipboard', label: 'P' },
      { icon: 'document', label: 'P1' },
      { icon: 'barcode', label: 'P1-01' },
    ],
    createdBy: 'Quy Sở Mít',
    createdAt: '13/1/2024 13:59',
    enabled: true,
  },
  {
    id: '2',
    numericId: '12345690',
    image: '/images/common/placeholder.svg',
    categoryPath: 'THIẾT BỊ ĐIỆN TỬ / LAPTOP',
    title: 'Laptop Dell Latitude 5540',
    status: 'active',
    tags: [
      { icon: 'clipboard', label: 'P' },
      { icon: 'document', label: 'P2' },
      { icon: 'barcode', label: 'P2-01' },
    ],
    createdBy: 'Quy Sư Minh',
    createdAt: '28/3/2026 09:30',
    enabled: true,
  },
  {
    id: '3',
    numericId: '12345691',
    image: '/images/common/placeholder.svg',
    categoryPath: 'THIẾT BỊ ĐIỆN TỬ / MÀN HÌNH',
    title: 'Màn hình LG 27" 4K',
    status: 'low-stock',
    tags: [
      { icon: 'clipboard', label: 'P' },
      { icon: 'document', label: 'P3' },
      { icon: 'barcode', label: 'P3-01' },
    ],
    createdBy: 'Quy Sở Mít',
    createdAt: '29/3/2026 14:20',
    enabled: true,
  },
  {
    id: '4',
    numericId: '12345692',
    image: '/images/common/placeholder.svg',
    categoryPath: 'VĂN PHÒNG PHẨM / GIẤY',
    title: 'Giấy A4 Double A 80gsm',
    status: 'inactive',
    tags: [
      { icon: 'clipboard', label: 'P' },
      { icon: 'document', label: 'P4' },
      { icon: 'barcode', label: 'P4-01' },
    ],
    createdBy: 'Quy Sư Minh',
    createdAt: '25/3/2026 08:15',
    enabled: false,
  },
  {
    id: '5',
    numericId: '12345693',
    image: '/images/common/placeholder.svg',
    categoryPath: 'THIẾT BỊ ĐIỆN TỬ / MÁY IN',
    title: 'Máy in HP LaserJet Pro M404dn',
    status: 'active',
    tags: [
      { icon: 'clipboard', label: 'P' },
      { icon: 'document', label: 'P5' },
      { icon: 'barcode', label: 'P5-01' },
    ],
    createdBy: 'Quy Sở Mít',
    createdAt: '27/3/2026 16:45',
    enabled: true,
  },
];

const STATUS_CONFIG = {
  active: { label: 'Có sẵn', className: 'text-emerald-600', icon: true },
  inactive: { label: 'Ngưng sử dụng', className: 'text-gray-400', icon: false },
  'low-stock': { label: 'Sắp hết', className: 'text-amber-600', icon: false },
} as const;

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'oldest', label: 'Cũ nhất' },
  { value: 'name-asc', label: 'Tên A → Z' },
  { value: 'name-desc', label: 'Tên Z → A' },
];

export function InventoryPage() {
  const [activeTab, setActiveTab] = useState<Tab>('list');
  const [search, setSearch] = useState('');
  const [items, setItems] = useState(MOCK_ITEMS);
  const [showSort, setShowSort] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showFilter, setShowFilter] = useState(false);

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.numericId.includes(search) ||
      item.categoryPath.toLowerCase().includes(search.toLowerCase()),
  );

  const handleToggle = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, enabled: !item.enabled, status: item.enabled ? 'inactive' as const : 'active' as const }
          : item,
      ),
    );
  };

  const handleSort = (option: SortOption) => {
    setSortBy(option);
    setShowSort(false);
  };

  return (
    <div className="space-y-6 rounded-[24px] bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Quản lý tài sản</h1>
          <p className="mt-1 text-sm text-gray-500">Theo dõi và quản lý tài sản trong hệ thống.</p>
        </div>
        <button className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50">
          <ExportIcon className="h-4 w-4" />
          Xuất báo cáo
        </button>
      </div>
      <div className="flex justify-between gap-4"> 
      <div className="flex gap-1 rounded-lg bg-gray-100 p-1 w-fit">
        <button
          onClick={() => setActiveTab('list')}
          className={`cursor-pointer rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
            activeTab === 'list'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Danh sách
        </button>
        <button
          onClick={() => setActiveTab('table')}
          className={`cursor-pointer rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
            activeTab === 'table'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Bảng
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm tài sản..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
          />
        </div>

        {/* Filter */}
        <div className="relative">
          <button
            onClick={() => { setShowFilter(!showFilter); setShowSort(false); }}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
          >
            <FilterIcon className="h-4 w-4" />
            Bộ lọc
          </button>
          {showFilter && (
            <div className="absolute top-full left-0 z-20 mt-1 w-48 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
              {['Tất cả', 'Đang sử dụng', 'Sắp hết', 'Ngưng sử dụng'].map((label) => (
                <button
                  key={label}
                  onClick={() => setShowFilter(false)}
                  className="flex w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sort */}
        <div className="relative">
          <button
            onClick={() => { setShowSort(!showSort); setShowFilter(false); }}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
          >
            <SortIcon className="h-4 w-4" />
            Sắp xếp
          </button>
          {showSort && (
            <div className="absolute top-full right-0 z-20 mt-1 w-40 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSort(opt.value)}
                  className={`flex w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${
                    sortBy === opt.value ? 'font-medium text-emerald-700' : 'text-gray-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Menu */}
        <button className="flex cursor-pointer items-center rounded-lg border border-gray-200 p-2 text-gray-600 transition-colors hover:bg-gray-50">
          <DotsIcon className="h-4 w-4" />
        </button>
      </div>
        </div>
      {/* Tabs */}
     
      {/* Item count */}
      <p className="text-sm text-gray-500">
        Hiển thị <span className="font-medium text-gray-900">{filteredItems.length}</span> tài sản
      </p>

      {/* List */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const statusCfg = STATUS_CONFIG[item.status];
          return (
            <div
              key={item.id}
              className={`overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all ${
                !item.enabled ? 'opacity-50' : 'hover:shadow-md'
              }`}
            >
              {/* Top section */}
              <div className="flex gap-4 p-4 pb-3">
                {/* Thumbnail */}
                <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl bg-gray-50">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={72}
                    height={72}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Category + Menu */}
                  <div className="flex items-start justify-between">
                    <p className="text-[11px] font-medium tracking-wide text-gray-400">{item.categoryPath}</p>
                    <button className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                      <DotsVerticalIcon className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Title + Status */}
                  <div className="mt-0.5 flex items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-900 truncate">{item.title}</h3>
                    <span className={`inline-flex shrink-0 items-center gap-1 text-xs font-medium ${statusCfg.className}`}>
                      {statusCfg.icon && <CheckCircleIcon className="h-3.5 w-3.5" />}
                      {statusCfg.label}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="mt-2 flex items-center gap-3">
                    {item.tags.map((tag) => (
                      <span key={tag.label} className="inline-flex items-center gap-1 text-xs text-gray-500">
                        <TagIcon type={tag.icon} className="h-3.5 w-3.5 text-gray-400" />
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-gray-100 px-4 py-2.5">
                <div className="flex items-center gap-5 text-xs text-gray-400">
                  {/* ID */}
                  <span className="inline-flex items-center gap-1.5">
                    ID: <span className="font-medium text-gray-600">{item.numericId}</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(item.numericId)}
                      className="cursor-pointer text-gray-300 transition-colors hover:text-gray-500"
                      title="Copy ID"
                    >
                      <CopyIcon className="h-3 w-3" />
                    </button>
                  </span>

                  {/* Creator */}
                  <span className="inline-flex items-center gap-1.5">
                    Created:
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-[8px] font-bold text-emerald-700">
                      {item.createdBy.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                    </span>
                    <span className="text-gray-600">{item.createdBy}</span>
                    <span>•</span>
                    <span className="text-gray-500">{item.createdAt}</span>
                  </span>
                </div>

                {/* Toggle */}
                <button
                  onClick={() => handleToggle(item.id)}
                  className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${
                    item.enabled ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform ${
                      item.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <SearchIcon className="h-10 w-10 mb-3" />
            <p className="text-sm font-medium">Không tìm thấy tài sản nào</p>
            <p className="mt-1 text-xs">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function FilterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
    </svg>
  );
}

function SortIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5-4.5L16.5 16.5m0 0L12 12m4.5 4.5V3" />
    </svg>
  );
}

function ExportIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
  );
}

function DotsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  );
}

function DotsVerticalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
    </svg>
  );
}

function TagIcon({ type, className }: { type: 'clipboard' | 'document' | 'barcode'; className?: string }) {
  if (type === 'clipboard') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
      </svg>
    );
  }
  if (type === 'document') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    );
  }
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v.75c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 5.625v-.75zM3.75 9.375c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v.75c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-.75zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v.75c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 5.625v-.75zM13.5 9.375c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v.75c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-.75zM3.75 13.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v.75c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-.75zM13.5 13.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v.75c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-.75zM3.75 18.375c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v.75c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-.75zM13.5 18.375c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v.75c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-.75z" />
    </svg>
  );
}

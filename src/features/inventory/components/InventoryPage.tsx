'use client';

import { useState } from 'react';
import { SearchIcon } from '@/shared/components/icons';
import type { InventoryTab, InventoryItemData } from '../types';
import { MOCK_ITEMS } from '../constants';
import { InventoryToolbar } from './InventoryToolbar';
import { InventoryCard } from './InventoryCard';
import { InventoryTable } from './InventoryTable';

export function InventoryPage() {
  const [activeTab, setActiveTab] = useState<InventoryTab>('list');
  const [search, setSearch] = useState('');
  const [items, setItems] = useState(MOCK_ITEMS);

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
          ? { ...item, enabled: !item.enabled, status: (item.enabled ? 'inactive' : 'active') as InventoryItemData['status'] }
          : item,
      ),
    );
  };

  return (
    <div className="space-y-2 rounded-[24px] bg-[#F4F4F5] shadow-sm">
      <InventoryToolbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        search={search}
        onSearchChange={setSearch}
      />

      {activeTab === 'list' ? (
        <div className="space-y-3 p-4">
          {filteredItems.map((item) => (
            <InventoryCard key={item.id} item={item} onToggle={handleToggle} />
          ))}

          {filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <SearchIcon className="h-10 w-10 mb-3" />
              <p className="text-sm font-medium">Không tìm thấy tài sản nào</p>
              <p className="mt-1 text-xs">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="p-4">
          <InventoryTable items={filteredItems} onToggle={handleToggle} />
        </div>
      )}
    </div>
  );
}

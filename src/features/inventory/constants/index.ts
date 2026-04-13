import type { InventoryItemData, SortOption } from '../types';

export const STATUS_CONFIG = {
  active: { label: 'Có sẵn', className: 'bg-[#D5FAF1] text-[#254D4A] rounded-[16px] px-2 py-0.5', icon: true },
  'in-use': { label: 'Đang dùng', className: 'bg-[#DBEAFE] text-[#1E3A5F] rounded-[16px] px-2 py-0.5', icon: false },
  damaged: { label: 'Hư Hỏng', className: 'bg-[#FEE2E2] text-[#991B1B] rounded-[16px] px-2 py-0.5', icon: false },
  lost: { label: 'Thất lạc', className: 'bg-[#F3F4F6] text-[#374151] rounded-[16px] px-2 py-0.5', icon: false },
  maintenance: { label: 'Bảo Trì', className: 'bg-[#FEF3C7] text-[#92400E] rounded-[16px] px-2 py-0.5', icon: false },
  inactive: { label: 'Ngưng sử dụng', className: 'bg-[#F3F4F6] text-[#6B7280] rounded-[16px] px-2 py-0.5', icon: false },
} as const;

export const DEFAULT_STATUS = {
  label: 'Không xác định',
  className: 'bg-[#F3F4F6] text-[#6B7280] rounded-[16px] px-2 py-0.5',
  icon: false,
} as const;

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'oldest', label: 'Cũ nhất' },
  { value: 'name-asc', label: 'Tên A → Z' },
  { value: 'name-desc', label: 'Tên Z → A' },
];

export const FILTER_OPTIONS = [
  'Tất cả', 'Có sẵn', 'Đang dùng', 'Hư Hỏng', 'Thất lạc', 'Bảo Trì', 'Ngưng sử dụng',
] as const;

export const MOCK_ITEMS: InventoryItemData[] = [
  {
    id: '1',
    numericId: '12345689',
    image: '/images/products/chair.png',
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
    image: '/images/products/chair.png',
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
    image: '/images/products/chair.png',
    categoryPath: 'THIẾT BỊ ĐIỆN TỬ / MÀN HÌNH',
    title: 'Màn hình LG 27" 4K',
    status: 'in-use',
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
    image: '/images/products/chair.png',
    categoryPath: 'VĂN PHÒNG PHẨM / GIẤY',
    title: 'Giấy A4 Double A 80gsm',
    status: 'damaged',
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
    image: '/images/products/chair.png',
    categoryPath: 'THIẾT BỊ ĐIỆN TỬ / MÁY IN',
    title: 'Máy in HP LaserJet Pro M404dn',
    status: 'lost',
    tags: [
      { icon: 'clipboard', label: 'P' },
      { icon: 'document', label: 'P5' },
      { icon: 'barcode', label: 'P5-01' },
    ],
    createdBy: 'Quy Sở Mít',
    createdAt: '27/3/2026 16:45',
    enabled: true,
  },
  {
    id: '6',
    numericId: '12345694',
    image: '/images/products/chair.png',
    categoryPath: 'THIẾT BỊ ĐIỆN TỬ / MÁY CHIẾU',
    title: 'Máy chiếu Epson EB-X51',
    status: 'maintenance',
    tags: [
      { icon: 'clipboard', label: 'P' },
      { icon: 'document', label: 'P6' },
      { icon: 'barcode', label: 'P6-01' },
    ],
    createdBy: 'Quy Sư Minh',
    createdAt: '26/3/2026 10:00',
    enabled: true,
  },
];

import Image from 'next/image';
import {
  BuildingIcon, CheckerIcon, CopyIcon, DotsVerticalIcon,
  FloorIcon, RoomIcon,
} from '@/shared/components/icons';
import type { InventoryItemData, TagItem } from '../types';
import { STATUS_CONFIG, DEFAULT_STATUS } from '../constants';

interface InventoryCardProps {
  item: InventoryItemData;
  onToggle: (id: string) => void;
}

export function InventoryCard({ item, onToggle }: InventoryCardProps) {
  const statusCfg = STATUS_CONFIG[item.status] ?? DEFAULT_STATUS;

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-gray-100 bg-[#FAFAFA] shadow-sm transition-all ${
        !item.enabled ? 'opacity-50' : 'hover:shadow-md'
      }`}
    >
      {/* Top section */}
      <div className="flex gap-4 shadow-md mb-0.5 rounded-b-[12px] bg-[#FFFFFF]">
        <div
          className="w-[120px] shrink-0 self-stretch overflow-hidden bg-gray-50"
          style={{ boxShadow: '2px 0px 0px 0px #0000000D, 1px 0px 0px 0px #FFFFFF' }}
        >
          <Image
            src={item.image}
            alt={item.title}
            width={120}
            height={120}
            className="h-full w-auto object-cover"
          />
        </div>

        <div className="flex-1 min-w-0 p-4">
          <div className="flex items-start justify-between">
            <p className="text-[11px] font-medium tracking-wide text-gray-400">{item.categoryPath}</p>
            <button className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
              <DotsVerticalIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-0.5 flex items-center gap-2">
            <h3 className="text-xl font-bold text-[#09090B] truncate">{item.title}</h3>
            <span className={`inline-flex shrink-0 items-center gap-1 text-xs text-[#254D4A] font-medium ${statusCfg.className}`}>
              {statusCfg.icon && <CheckerIcon className="h-3.5 w-3.5 text-[#254D4A]" />}
              {statusCfg.label}
            </span>
          </div>

          <div className="mt-2 flex items-center gap-3">
            {item.tags.map((tag) => (
              <span key={tag.label} className="inline-flex items-center gap-1 text-xs font-semibold text-[#121212] bg-[#F4F4F5] rounded-[16px] px-2 py-0.5">
                <TagIcon type={tag.icon} className="h-3.5 w-3.5 text-[#121212]" />
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center rounded-b-[12px]">
        <div className="flex w-[120px] shrink-0 items-center justify-center gap-1.5 py-2.5 text-xs text-gray-400">
          <span className="inline-flex items-center gap-1.5">
            ID: <span className="font-medium text-gray-600">{item.numericId}</span>
            <button
              onClick={() => navigator.clipboard.writeText(item.numericId)}
              className="cursor-pointer text-[#717179] transition-colors hover:text-gray-500"
              title="Copy ID"
            >
              <CopyIcon className="h-3 w-3" />
            </button>
          </span>
        </div>

        <span className="w-px self-stretch my-2 bg-[#0000000D]" />

        <div className="flex flex-1 items-center justify-between py-2.5 pl-4 pr-4">
          <span className="inline-flex items-center text-[#717179] gap-1.5 text-xs">
            Tạo bởi:
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-[8px] font-bold text-emerald-700">
              {item.createdBy.split(' ').map((w) => w[0]).join('').slice(0, 2)}
            </span>
            <span className="text-[#717179]">{item.createdBy}</span>
            <span>•</span>
            <span className="text-[#717179]">{item.createdAt}</span>
          </span>

          <button
            onClick={() => onToggle(item.id)}
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
    </div>
  );
}

function TagIcon({ type, className }: { type: TagItem['icon']; className?: string }) {
  if (type === 'clipboard') return <BuildingIcon className={className} />;
  if (type === 'document') return <FloorIcon className={className} />;
  return <RoomIcon className={className} />;
}

'use client';

import { ReactNode, useState, useCallback, useMemo } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Column<T> {
  key: string;
  header: string | ReactNode;
  render?: (item: T, index: number) => ReactNode;
  className?: string;
  headerClassName?: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  hidden?: boolean;
}

export type SortDirection = 'asc' | 'desc';

export interface SortState {
  key: string;
  direction: SortDirection;
}

export interface PaginationConfig {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  pageSizeOptions?: number[];
  onPageSizeChange?: (size: number) => void;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;

  // States
  isLoading?: boolean;
  emptyMessage?: string | ReactNode;

  // Selection
  selectable?: boolean;
  selectedKeys?: Set<string>;
  onSelectionChange?: (keys: Set<string>) => void;

  // Sorting
  sort?: SortState;
  onSortChange?: (sort: SortState) => void;

  // Row customization
  rowClassName?: string | ((item: T, index: number) => string);
  onRowClick?: (item: T) => void;

  // Appearance variants
  variant?: 'default' | 'bordered' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  striped?: boolean;
  hoverable?: boolean;
  stickyHeader?: boolean;
  rounded?: boolean;
  className?: string;
  wrapperClassName?: string;

  // Pagination
  pagination?: PaginationConfig;

  // Slots
  headerExtra?: ReactNode;
  footerExtra?: ReactNode;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const ALIGN_MAP = { left: 'text-left', center: 'text-center', right: 'text-right' } as const;

const SIZE_PADDING = {
  sm: { header: 'px-3 py-2', cell: 'px-3 py-2' },
  md: { header: 'px-4 py-3', cell: 'px-4 py-3' },
  lg: { header: 'px-6 py-4', cell: 'px-6 py-4' },
} as const;

function SortIndicator({ direction, active }: { direction?: SortDirection; active: boolean }) {
  return (
    <span className={`ml-1 inline-flex flex-col text-[8px] leading-none ${active ? 'text-gray-800' : 'text-gray-300'}`}>
      <span className={direction === 'asc' && active ? 'text-emerald-600' : ''}>▲</span>
      <span className={direction === 'desc' && active ? 'text-emerald-600' : ''}>▼</span>
    </span>
  );
}

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

function TablePagination({ config }: { config: PaginationConfig }) {
  const totalPages = Math.max(1, Math.ceil(config.total / config.pageSize));
  const canPrev = config.page > 1;
  const canNext = config.page < totalPages;
  const start = (config.page - 1) * config.pageSize + 1;
  const end = Math.min(config.page * config.pageSize, config.total);

  const pages = useMemo(() => {
    const result: (number | 'ellipsis')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) result.push(i);
    } else {
      result.push(1);
      if (config.page > 3) result.push('ellipsis');
      for (let i = Math.max(2, config.page - 1); i <= Math.min(totalPages - 1, config.page + 1); i++) {
        result.push(i);
      }
      if (config.page < totalPages - 2) result.push('ellipsis');
      result.push(totalPages);
    }
    return result;
  }, [config.page, totalPages]);

  return (
    <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
      <span className="text-xs text-gray-500">
        {config.total > 0 ? `${start}–${end} / ${config.total}` : 'Không có dữ liệu'}
      </span>

      <div className="flex items-center gap-1">
        <button
          disabled={!canPrev}
          onClick={() => config.onPageChange(config.page - 1)}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-sm text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ‹
        </button>

        {pages.map((p, i) =>
          p === 'ellipsis' ? (
            <span key={`e${i}`} className="px-1 text-xs text-gray-400">…</span>
          ) : (
            <button
              key={p}
              onClick={() => config.onPageChange(p)}
              className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-xs font-medium transition-colors ${
                p === config.page
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          disabled={!canNext}
          onClick={() => config.onPageChange(config.page + 1)}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-sm text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ›
        </button>
      </div>

      {config.pageSizeOptions && config.onPageSizeChange && (
        <select
          value={config.pageSize}
          onChange={(e) => config.onPageSizeChange?.(Number(e.target.value))}
          className="cursor-pointer rounded-md border border-gray-200 px-2 py-1 text-xs text-gray-600"
        >
          {config.pageSizeOptions.map((s) => (
            <option key={s} value={s}>{s} / trang</option>
          ))}
        </select>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function Table<T>({
  columns,
  data,
  keyExtractor,
  isLoading,
  emptyMessage = 'Không có dữ liệu.',
  selectable = false,
  selectedKeys: controlledSelected,
  onSelectionChange,
  sort: controlledSort,
  onSortChange,
  rowClassName,
  onRowClick,
  variant = 'default',
  size = 'md',
  striped = false,
  hoverable = true,
  stickyHeader = false,
  rounded = true,
  className = '',
  wrapperClassName = '',
  pagination,
  headerExtra,
  footerExtra,
}: TableProps<T>) {
  // Internal selection state (uncontrolled fallback)
  const [internalSelected, setInternalSelected] = useState<Set<string>>(new Set());
  const selectedSet = controlledSelected ?? internalSelected;
  const setSelectedSet = onSelectionChange ?? setInternalSelected;

  // Internal sort state (uncontrolled fallback)
  const [internalSort, setInternalSort] = useState<SortState | null>(null);
  const activeSort = controlledSort ?? internalSort;
  const setActiveSort = onSortChange ?? setInternalSort;

  const visibleColumns = useMemo(() => columns.filter((c) => !c.hidden), [columns]);
  const pad = SIZE_PADDING[size];
  const totalColSpan = visibleColumns.length + (selectable ? 1 : 0);

  // Selection handlers
  const allSelected = data.length > 0 && data.every((item) => selectedSet.has(keyExtractor(item)));
  const someSelected = data.some((item) => selectedSet.has(keyExtractor(item)));

  const toggleAll = useCallback(() => {
    if (allSelected) {
      setSelectedSet(new Set());
    } else {
      setSelectedSet(new Set(data.map(keyExtractor)));
    }
  }, [allSelected, data, keyExtractor, setSelectedSet]);

  const toggleOne = useCallback(
    (key: string) => {
      const next = new Set(selectedSet);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      setSelectedSet(next);
    },
    [selectedSet, setSelectedSet],
  );

  // Sort handler
  const handleSort = useCallback(
    (key: string) => {
      if (!setActiveSort) return;
      const newDir: SortDirection =
        activeSort?.key === key && activeSort.direction === 'asc' ? 'desc' : 'asc';
      setActiveSort({ key, direction: newDir });
    },
    [activeSort, setActiveSort],
  );

  // Variant styles
  const wrapperBase =
    variant === 'bordered'
      ? 'border border-gray-200'
      : variant === 'minimal'
        ? ''
        : '';

  const headerBg =
    variant === 'minimal' ? '' : 'bg-gray-50/60';

  const rowBorder =
    variant === 'bordered'
      ? 'border-b border-gray-200'
      : 'border-b border-gray-50';

  // Loading
  if (isLoading) {
    return (
      <div className={`flex h-64 items-center justify-center ${rounded ? 'rounded-2xl' : ''} bg-white ${wrapperClassName}`}>
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className={`${rounded ? 'rounded-2xl' : ''} bg-white ${wrapperBase} ${wrapperClassName}`}>
      {headerExtra}

      <div className={`overflow-x-auto ${className}`}>
        <table className="w-full text-left text-sm">
          <thead className={`${headerBg} ${stickyHeader ? 'sticky top-0 z-10' : ''}`}>
            <tr className={variant !== 'minimal' ? 'border-b border-gray-100' : ''}>
              {selectable && (
                <th className={`w-10 ${pad.header}`}>
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(el) => { if (el) el.indeterminate = someSelected && !allSelected; }}
                    onChange={toggleAll}
                    className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-emerald-500"
                  />
                </th>
              )}
              {visibleColumns.map((col) => {
                const align = ALIGN_MAP[col.align ?? 'left'];
                const isSortActive = activeSort?.key === col.key;

                return (
                  <th
                    key={col.key}
                    className={`${pad.header} text-xs font-medium text-gray-500 ${align} ${col.width ?? ''} ${col.headerClassName ?? ''} ${
                      col.sortable ? 'cursor-pointer select-none' : ''
                    }`}
                    onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  >
                    <span className="inline-flex items-center">
                      {col.header}
                      {col.sortable && (
                        <SortIndicator active={isSortActive} direction={isSortActive ? activeSort?.direction : undefined} />
                      )}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={totalColSpan} className="px-6 py-16 text-center text-sm text-gray-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, index) => {
                const key = keyExtractor(item);
                const isSelected = selectedSet.has(key);
                const customRowCls = typeof rowClassName === 'function' ? rowClassName(item, index) : (rowClassName ?? '');

                return (
                  <tr
                    key={key}
                    className={[
                      rowBorder,
                      'transition-colors',
                      hoverable ? 'hover:bg-gray-50' : '',
                      striped && index % 2 === 1 ? 'bg-gray-50/30' : '',
                      isSelected ? 'bg-emerald-50/30' : '',
                      onRowClick ? 'cursor-pointer' : '',
                      customRowCls,
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={onRowClick ? () => onRowClick(item) : undefined}
                  >
                    {selectable && (
                      <td className={pad.cell}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => { e.stopPropagation(); toggleOne(key); }}
                          onClick={(e) => e.stopPropagation()}
                          className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-emerald-500"
                        />
                      </td>
                    )}
                    {visibleColumns.map((col) => {
                      const align = ALIGN_MAP[col.align ?? 'left'];
                      return (
                        <td key={col.key} className={`${pad.cell} text-sm text-gray-900 ${align} ${col.className ?? ''}`}>
                          {col.render
                            ? col.render(item, index)
                            : String((item as Record<string, unknown>)[col.key] ?? '')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {pagination && <TablePagination config={pagination} />}
      {footerExtra}
    </div>
  );
}

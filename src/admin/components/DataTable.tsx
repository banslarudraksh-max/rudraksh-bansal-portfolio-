import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, Layers } from 'lucide-react';

export interface ColumnDef<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface FilterTab<T> {
  label: string;
  value: string;
  count?: number;
  filterFn: (item: T) => boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  searchPlaceholder?: string;
  searchFilter?: (item: T, query: string) => boolean;
  filterTabs?: FilterTab<T>[];
  emptyMessage?: string;
  keyExtractor: (item: T) => string;
  actionsHeader?: string;
  renderActions?: (item: T) => React.ReactNode;
  headerExtra?: React.ReactNode;
}

export function DataTable<T>({
  data,
  columns,
  searchPlaceholder = 'Search records...',
  searchFilter,
  filterTabs,
  emptyMessage = 'No records found.',
  keyExtractor,
  actionsHeader = 'Actions',
  renderActions,
  headerExtra,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>(filterTabs?.[0]?.value || 'all');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // Filter and search
  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply tab filter
    if (filterTabs && activeTab !== 'all') {
      const selectedTab = filterTabs.find((t) => t.value === activeTab);
      if (selectedTab) {
        result = result.filter(selectedTab.filterFn);
      }
    }

    // Apply search query
    if (searchQuery.trim() && searchFilter) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((item) => searchFilter(item, q));
    }

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aVal = (a as Record<string, unknown>)[sortConfig.key];
        const bVal = (b as Record<string, unknown>)[sortConfig.key];
        if (aVal === bVal) return 0;
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        return sortConfig.direction === 'asc' ? 1 : -1;
      });
    }

    return result;
  }, [data, filterTabs, activeTab, searchQuery, searchFilter, sortConfig]);

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (!prev || prev.key !== key) {
        return { key, direction: 'asc' };
      }
      if (prev.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return null;
    });
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-neutral-900/80 border border-neutral-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-neutral-100 placeholder:text-neutral-500 outline-none transition-all"
          />
        </div>

        {/* Filter Tabs & Extras */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {filterTabs && filterTabs.length > 0 && (
            <div className="inline-flex p-1 bg-neutral-900/90 border border-neutral-800 rounded-xl">
              {filterTabs.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveTab(tab.value)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                    activeTab === tab.value
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {tab.label}
                  {tab.count !== undefined && <span className="ml-1.5 opacity-60">({tab.count})</span>}
                </button>
              ))}
            </div>
          )}

          {headerExtra}
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-2xl bg-neutral-900/50 border border-neutral-800/90 backdrop-blur-xl shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-950/70 text-neutral-400 uppercase tracking-wider font-semibold">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    style={{ width: col.width }}
                    className={`py-3.5 px-4 font-mono ${
                      col.sortable ? 'cursor-pointer hover:text-white select-none' : ''
                    }`}
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col.header}</span>
                      {col.sortable && (
                        <span className="text-neutral-400">
                          {sortConfig?.key === col.key ? (
                            sortConfig.direction === 'asc' ? (
                              <ChevronUp className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 text-emerald-400" />
                            )
                          ) : (
                            <ChevronDown className="w-3 h-3 opacity-40" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                {renderActions && (
                  <th className="py-3.5 px-4 text-right font-mono pr-6">{actionsHeader}</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (renderActions ? 1 : 0)}
                    className="py-12 px-4 text-center text-neutral-500"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Layers className="w-8 h-8 opacity-30 text-emerald-500" />
                      <p className="text-sm font-medium text-neutral-400">{emptyMessage}</p>
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="text-xs text-emerald-400 hover:underline mt-1"
                        >
                          Clear search filter
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr
                    key={keyExtractor(item)}
                    className="hover:bg-neutral-800/40 transition-colors group"
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="py-3.5 px-4 text-neutral-200">
                        {col.render
                          ? col.render(item)
                          : String((item as Record<string, unknown>)[col.key] ?? '')}
                      </td>
                    ))}
                    {renderActions && (
                      <td className="py-3.5 px-4 text-right pr-6 whitespace-nowrap">
                        {renderActions(item)}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Summary */}
        <div className="px-4 py-3 border-t border-neutral-800/80 bg-neutral-950/50 flex items-center justify-between text-xs text-neutral-400">
          <span>
            Showing <strong className="text-white">{filteredData.length}</strong> of{' '}
            <strong className="text-white">{data.length}</strong> total records
          </span>
          {activeTab !== 'all' && (
            <span className="text-emerald-400">Filtered by: {activeTab}</span>
          )}
        </div>
      </div>
    </div>
  );
}

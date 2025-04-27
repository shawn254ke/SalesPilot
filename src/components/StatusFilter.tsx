
import React from "react";
import { Button } from "@/components/ui/button";
import { Lead } from "@/lib/data";

interface StatusFilterProps {
  onFilterChange: (status: string | null) => void;
  activeFilter: string | null;
  counts: {
    New: number;
    Contacted: number;
    Interested: number;
    Converted: number;
    Lost: number;
    Total: number;
  };
}

const StatusFilter: React.FC<StatusFilterProps> = ({
  onFilterChange,
  activeFilter,
  counts,
}) => {
  const statusOptions = [
    { label: "All", value: null, count: counts.Total },
    { label: "New", value: "New", count: counts.New },
    { label: "Contacted", value: "Contacted", count: counts.Contacted },
    { label: "Interested", value: "Interested", count: counts.Interested },
    { label: "Converted", value: "Converted", count: counts.Converted },
    { label: "Lost", value: "Lost", count: counts.Lost },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {statusOptions.map((status) => (
        <Button
          key={status.label}
          variant={activeFilter === status.value ? "default" : "outline"}
          className={status.value ? `hover:bg-status-${status.value?.toLowerCase()}` : ""}
          onClick={() => onFilterChange(status.value)}
        >
          {status.label} ({status.count})
        </Button>
      ))}
    </div>
  );
};

export default StatusFilter;

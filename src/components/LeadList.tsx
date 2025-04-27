
import React from "react";
import { Lead } from "@/lib/data";
import LeadCard from "./LeadCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LeadListProps {
  leads: Lead[];
  onAddNew: () => void;
  onEdit: (lead: Lead) => void;
  onDelete: (id: number) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

const LeadList: React.FC<LeadListProps> = ({
  leads,
  onAddNew,
  onEdit,
  onDelete,
  onSearch,
  searchQuery,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold">Leads</h2>
        <div className="flex w-full sm:w-auto flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-64">
            <Input
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full"
            />
          </div>
          <Button onClick={onAddNew}>Add New Lead</Button>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="bg-muted p-8 text-center rounded-lg">
          <p className="text-muted-foreground">No leads found.</p>
          {searchQuery && (
            <p className="text-sm mt-2">
              Try adjusting your search or filter criteria.
            </p>
          )}
          <Button onClick={onAddNew} className="mt-4">
            Add your first lead
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {leads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LeadList;

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import StatusFilter from "@/components/StatusFilter";
import Stats from "@/components/Stats";
import LeadList from "@/components/LeadList";
import LeadForm from "@/components/LeadForm";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

import { Lead } from "@/lib/data"; // Use the shared Lead type

const JSON_SERVER_URL = "https://json-server-api-bqcz.onrender.com"; // Define a constant for the JSON Server URL

const Index = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [currentLead, setCurrentLead] = useState<Lead | undefined>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch leads from JSON Server
    fetch(`${JSON_SERVER_URL}/leads`)
      .then((response) => response.json())
      .then((data) => {
        setLeads(data);
        setFilteredLeads(data);
      })
      .catch((error) => console.error("Error fetching leads:", error));
  }, []);

  // Calculate stats
  const getStatusCounts = (leads: Lead[]) => {
    const counts = {
      New: 0,
      Contacted: 0,
      Interested: 0,
      Converted: 0,
      Lost: 0,
      Total: leads.length,
    };

    leads.forEach((lead) => {
      counts[lead.status] += 1;
    });

    return counts;
  };

  const getSourceCounts = (leads: Lead[]) => {
    const counts: Record<string, number> = {};

    leads.forEach((lead) => {
      if (counts[lead.source]) {
        counts[lead.source] += 1;
      } else {
        counts[lead.source] = 1;
      }
    });

    return counts;
  };

  const statusCounts = getStatusCounts(leads);
  const sourceCounts = getSourceCounts(leads);

  // Filter leads when filter or search changes
  useEffect(() => {
    let result = leads;

    // Apply status filter
    if (activeFilter) {
      result = result.filter((lead) => lead.status === activeFilter);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (lead) =>
          lead.name.toLowerCase().includes(query) ||
          lead.email.toLowerCase().includes(query) ||
          lead.company.toLowerCase().includes(query)
      );
    }

    setFilteredLeads(result);
  }, [leads, activeFilter, searchQuery]);

  const handleFilterChange = (status: string | null) => {
    setActiveFilter(status);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddNew = () => {
    setFormMode("add");
    setCurrentLead(undefined);
    setFormOpen(true);
  };

  const handleEdit = (lead: Lead) => {
    setFormMode("edit");
    setCurrentLead(lead);
    setFormOpen(true);
  };

  const handleSaveLead = (lead: Lead) => {
    if (formMode === "add") {
      // Remove the id field to let JSON Server generate it automatically
      const { id, ...newLead } = lead;
      fetch(`${JSON_SERVER_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLead),
      })
        .then((response) => response.json())
        .then((createdLead) => {
          setLeads((prev) => [...prev, createdLead]);
        })
        .catch((error) => console.error("Error adding lead:", error));
    } else {
      fetch(`${JSON_SERVER_URL}/leads/${lead.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      })
        .then(() => {
          setLeads((prev) => prev.map((l) => (l.id === lead.id ? lead : l)));
        })
        .catch((error) => console.error("Error updating lead:", error));
    }
  };

  const handleDeleteClick = (id: number) => {
    setLeadToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (leadToDelete !== null) {
      fetch(`${JSON_SERVER_URL}/leads/${leadToDelete}`, {
        method: "DELETE",
      })
        .then(() => {
          const leadName = leads.find((l) => l.id === leadToDelete)?.name;
          setLeads((prev) => prev.filter((lead) => lead.id !== leadToDelete));
          setDeleteDialogOpen(false);

          toast({
            title: "Lead Deleted",
            description: `${leadName || "Lead"} has been removed from your list.`,
          });
        })
        .catch((error) => console.error("Error deleting lead:", error));
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Sales Dashboard</h1>
      
      <Tabs defaultValue="list" className="mb-8">
        <TabsList>
          <TabsTrigger value="list">Lead List</TabsTrigger>
          <TabsTrigger value="stats">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-6">
          <StatusFilter 
            onFilterChange={handleFilterChange} 
            activeFilter={activeFilter}
            counts={statusCounts}
          />
          
          <LeadList 
            leads={filteredLeads}
            onAddNew={handleAddNew}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            onSearch={handleSearch}
            searchQuery={searchQuery}
          />
        </TabsContent>
        
        <TabsContent value="stats">
          <Stats statusCounts={statusCounts} sourceCounts={sourceCounts} />
        </TabsContent>
      </Tabs>
      
      {/* Lead Form Dialog */}
      <LeadForm 
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleSaveLead}
        lead={currentLead}
        mode={formMode}
      />
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the lead
              from your database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default Index;

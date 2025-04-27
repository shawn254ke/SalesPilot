
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lead } from "@/lib/data";
import { useToast } from "@/components/ui/use-toast";

type FormMode = "add" | "edit";

interface LeadFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (lead: Lead) => void;
  lead?: Lead;
  mode: FormMode;
}

const DEFAULT_LEAD: Lead = {
  id: 0,
  name: "",
  email: "",
  phone: "",
  company: "",
  status: "New",
  source: "",
  createdOn: new Date(),
  notes: []
};

const LeadForm: React.FC<LeadFormProps> = ({
  open,
  onClose,
  onSave,
  lead,
  mode
}) => {
  const [formData, setFormData] = useState<Lead>(DEFAULT_LEAD);
  const [note, setNote] = useState("");
  const { toast } = useToast();
  
  // Reset form when dialog opens/closes or lead changes
  useEffect(() => {
    if (open) {
      setFormData(lead || DEFAULT_LEAD);
      setNote("");
    }
  }, [open, lead]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ 
      ...prev, 
      status: value as Lead["status"] 
    }));
  };

  const handleSourceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, source: value }));
  };

  const handleAddNote = () => {
    if (note.trim()) {
      setFormData((prev) => ({
        ...prev,
        notes: [...prev.notes, note]
      }));
      setNote("");
    }
  };

  const handleRemoveNote = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      notes: prev.notes.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Name and email are required fields",
      });
      return;
    }
    
    // If adding new lead, generate ID
    if (mode === "add") {
      const newLead = {
        ...formData,
        id: Date.now(),
        createdOn: new Date()
      };
      onSave(newLead);
      
      toast({
        title: "Lead Added",
        description: `${newLead.name} has been added to your lead list.`,
      });
    } else {
      onSave(formData);
      
      toast({
        title: "Lead Updated",
        description: `${formData.name}'s information has been updated.`,
      });
    }
    
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Lead" : "Edit Lead"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={handleStatusChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="Interested">Interested</SelectItem>
                  <SelectItem value="Converted">Converted</SelectItem>
                  <SelectItem value="Lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="source">Source</Label>
              <Select 
                value={formData.source} 
                onValueChange={handleSourceChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Website">Website</SelectItem>
                  <SelectItem value="Referral">Referral</SelectItem>
                  <SelectItem value="Social Media">Social Media</SelectItem>
                  <SelectItem value="Email Campaign">Email Campaign</SelectItem>
                  <SelectItem value="Conference">Conference</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Notes</Label>
            <div className="flex space-x-2">
              <Input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note..."
              />
              <Button 
                type="button" 
                onClick={handleAddNote}
                variant="outline"
              >
                Add
              </Button>
            </div>
            {formData.notes.length > 0 && (
              <ul className="bg-muted p-2 rounded-md space-y-2 mt-2">
                {formData.notes.map((noteText, index) => (
                  <li key={index} className="flex justify-between items-center text-sm">
                    <span>{noteText}</span>
                    <Button
                      type="button"
                      onClick={() => handleRemoveNote(index)}
                      variant="ghost"
                      size="sm"
                      className="h-6 text-destructive hover:text-destructive"
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === "add" ? "Add Lead" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadForm;

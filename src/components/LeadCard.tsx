import React from "react";
import { Lead } from "@/lib/data";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format, isValid } from "date-fns";

interface LeadCardProps {
  lead: Lead;
  onEdit: (lead: Lead) => void;
  onDelete: (id: number) => void;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead, onEdit, onDelete }) => {
  // Convert status to lowercase for CSS class
  const statusClass = `status-${lead.status.toLowerCase()}`;

  // Format the createdOn date with a fallback for invalid dates
  const formattedDate = isValid(new Date(lead.createdOn))
    ? format(new Date(lead.createdOn), "MMM d, yyyy")
    : "Unknown";

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{lead.name}</CardTitle>
          <Badge className={`status-badge ${statusClass}`}>
            {lead.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{lead.company}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm">
            <strong>Email:</strong> {lead.email}
          </p>
          <p className="text-sm">
            <strong>Phone:</strong> {lead.phone}
          </p>
          <p className="text-sm">
            <strong>Source:</strong> {lead.source}
          </p>
          <p className="text-sm">
            <strong>Created:</strong> {formattedDate}
          </p>
          {lead.notes.length > 0 && (
            <div>
              <strong>Notes:</strong>
              <ul className="list-disc pl-5 text-sm">
                {lead.notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => onEdit(lead)}>
          Edit
        </Button>
        <Button 
          variant="destructive" 
          onClick={() => onDelete(lead.id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LeadCard;

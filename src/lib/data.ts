
export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "New" | "Contacted" | "Interested" | "Converted" | "Lost";
  source: string;
  createdOn: Date;
  notes: string[];
}

export const initialLeads: Lead[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@company.com",
    phone: "+1 (555) 123-4567",
    company: "Tech Solutions Inc.",
    status: "New",
    source: "Website",
    createdOn: new Date("2023-01-15"),
    notes: ["Initial contact through contact form"]
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@innovate.co",
    phone: "+1 (555) 987-6543",
    company: "Innovate Co.",
    status: "Contacted",
    source: "Referral",
    createdOn: new Date("2023-02-03"),
    notes: ["Referred by John Smith", "Interested in enterprise package"]
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "mbrown@globalcorp.com",
    phone: "+1 (555) 456-7890",
    company: "Global Corp",
    status: "Interested",
    source: "LinkedIn",
    createdOn: new Date("2023-03-21"),
    notes: ["Requested demo", "Scheduled for next week"]
  },
  {
    id: 4,
    name: "Lisa Chen",
    email: "lisa@startup.io",
    phone: "+1 (555) 789-0123",
    company: "Startup.io",
    status: "Converted",
    source: "Conference",
    createdOn: new Date("2023-04-10"),
    notes: ["Met at TechConf", "Signed annual contract"]
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david@oldschool.com",
    phone: "+1 (555) 234-5678",
    company: "Old School Industries",
    status: "Lost",
    source: "Email Campaign",
    createdOn: new Date("2023-05-05"),
    notes: ["Budget constraints", "May revisit next quarter"]
  },
  {
    id: 6,
    name: "Emma Davis",
    email: "emma@newtech.co",
    phone: "+1 (555) 345-6789",
    company: "NewTech",
    status: "New",
    source: "Social Media",
    createdOn: new Date("2023-06-15"),
    notes: ["Found us on Twitter", "Interested in mobile solutions"]
  },
  {
    id: 7,
    name: "Alex Rodriguez",
    email: "alex@medcompany.com",
    phone: "+1 (555) 567-8901",
    company: "Med Company",
    status: "Contacted",
    source: "Website",
    createdOn: new Date("2023-07-02"),
    notes: ["Contacted about healthcare solutions"]
  }
];

export const getStatusCounts = (leads: Lead[]) => {
  const counts = {
    New: 0,
    Contacted: 0,
    Interested: 0,
    Converted: 0,
    Lost: 0,
    Total: leads.length
  };

  leads.forEach(lead => {
    counts[lead.status] += 1;
  });

  return counts;
};

export const getSourceCounts = (leads: Lead[]) => {
  const counts: Record<string, number> = {};

  leads.forEach(lead => {
    if (counts[lead.source]) {
      counts[lead.source] += 1;
    } else {
      counts[lead.source] = 1;
    }
  });

  return counts;
};

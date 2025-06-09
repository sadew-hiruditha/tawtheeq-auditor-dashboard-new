// file: components/dashboard/RecentContractsTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// In the future, this data will come from your database
const contracts = [
  {
    id: "CTR-001",
    title: "Website Redesign",
    originator: "Innovate Inc.",
    responder: "Alice Johnson",
    status: "Completed",
    date: "2024-05-15",
  },
  {
    id: "CTR-002",
    title: "Mobile App Development",
    originator: "Tech Solutions LLC",
    responder: "Bob Williams",
    status: "Pending",
    date: "2024-05-20",
  },
  {
    id: "CTR-003",
    title: "Brand Logo Design",
    originator: "Creative Minds",
    responder: "Charlie Brown",
    status: "Disputed",
    date: "2024-05-18",
  },
  {
    id: "CTR-004",
    title: "SEO Optimization",
    originator: "Marketing Pro",
    responder: "Diana Miller",
    status: "Completed",
    date: "2024-05-22",
  },
  {
    id: "CTR-005",
    title: "Cloud Migration",
    originator: "Global Corp",
    responder: "Ethan Davis",
    status: "Pending",
    date: "2024-05-25",
  },
];

export const RecentContractsTable = () => {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Completed":
        return "default"; // Greenish in the default theme
      case "Pending":
        return "secondary"; // Grayish
      case "Disputed":
        return "destructive"; // Red
      default:
        return "outline";
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Originator</TableHead>
          <TableHead>Responder</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contracts.map((contract) => (
          <TableRow key={contract.id}>
            <TableCell className="font-medium">{contract.id}</TableCell>
            <TableCell>{contract.title}</TableCell>
            <TableCell>
              <Badge variant={getStatusBadgeVariant(contract.status)}>
                {contract.status}
              </Badge>
            </TableCell>
            <TableCell>{contract.originator}</TableCell>
            <TableCell>{contract.responder}</TableCell>
            <TableCell className="text-right">{contract.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
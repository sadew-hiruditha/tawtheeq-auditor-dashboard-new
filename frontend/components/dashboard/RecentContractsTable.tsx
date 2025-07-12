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

export const RecentContractsTable = ({ contracts }: { contracts: { contract_name: string; contract_type: string; originator: string; responder: string; status: string; date: string }[] }) => {
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
          <TableHead>Contract Name</TableHead>
          <TableHead>Contract Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Originator</TableHead>
          <TableHead>Responder</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contracts.map((contract) => (
          <TableRow key={contract.contract_name}>
            <TableCell>{contract.contract_name}</TableCell>
            <TableCell>{contract.contract_type}</TableCell>
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
        {contracts.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center">No recent contracts found.</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
// file: lib/mock-data.ts

// Define the shape of our contract data in one central place
export type Contract = {
  id: string;
  title: string;
  status: "Completed" | "Pending" | "Disputed" | "Draft";
  originator: string;
  responder: string;
  createdAt: string;
  fileUrl: string; // The path to the contract's PDF file
};

// Our mock database table
const contracts: Contract[] = [
  {
    id: "CTR-001",
    title: "Website Redesign",
    originator: "Innovate Inc.",
    responder: "Alice Johnson",
    status: "Completed",
    createdAt: "2024-05-15",
    fileUrl: "/sample-contract.pdf",
  },
  {
    id: "CTR-001",
    title: "Mobile App Development",
    originator: "Tech Solutions LLC",
    responder: "Bob Williams",
    status: "Pending",
    createdAt: "2024-05-20",
    fileUrl: "/sample-contract.pdf", // In a real app, each would have a unique URL
  },
   {
    id: "CTR-001",
    title: "Brand Logo Design",
    originator: "Creative Minds",
    responder: "Charlie Brown",
    status: "Disputed",
    createdAt: "2024-05-18",
    fileUrl: "/sample-contract.pdf",
  },
];

// Function to get all review requests (for the main table)
export const getReviewRequests = async (): Promise<Contract[]> => {
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return contracts;
};

// Function to get a single contract by its ID
export const getContractById = async (id: string): Promise<Contract | undefined> => {
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return contracts.find(contract => contract.id === id);
};
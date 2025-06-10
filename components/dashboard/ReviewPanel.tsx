// file: components/dashboard/ReviewPanel.tsx
"use client";

import { useState } from "react";
import type { Contract } from "@/lib/mock-data"; // Import the type definition
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Define the props the component will receive
interface ReviewPanelProps {
  contract: Contract;
}

export const ReviewPanel = ({ contract }: ReviewPanelProps) => {
  // State to hold the auditor's comment
  const [comment, setComment] = useState("");

  const handleSubmitReview = (action: "Approved" | "Changes Requested") => {
    if (!comment) {
      alert("Please add a comment before submitting the review.");
      return;
    }
    console.log("--- REVIEW SUBMITTED ---");
    console.log("Contract ID:", contract.id);
    console.log("Action Taken:", action);
    console.log("Comment:", comment);
    alert(`Review submitted for contract ${contract.id}`);
    setComment(""); // Clear the textarea
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Review Details & Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-6">
        {/* Contract Details Section - Now using props */}
        <div className="space-y-3">
          <h3 className="font-semibold">Contract Details</h3>
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">ID:</span>
              <span className="font-medium">{contract.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <Badge variant="secondary">{contract.status}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Originator:</span>
              <span>{contract.originator}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Responder:</span>
              <span>{contract.responder}</span>
            </div>
          </div>
        </div>

        {/* Comment Section - Now controlled by state */}
        <div className="space-y-3">
            <h3 className="font-semibold">Add Review Comments</h3>
            <Textarea
              placeholder="Type your comments and suggestions here..."
              rows={8}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
        </div>

        {/* Action Buttons - Now have onClick handlers */}
        <div className="mt-auto pt-4 border-t space-y-2">
            <Button className="w-full" variant="destructive" onClick={() => handleSubmitReview("Changes Requested")}>
                Request Changes
            </Button>
            <Button className="w-full" onClick={() => handleSubmitReview("Approved")}>
                Approve Contract
            </Button>
        </div>
      </CardContent>
    </Card>
  );
};
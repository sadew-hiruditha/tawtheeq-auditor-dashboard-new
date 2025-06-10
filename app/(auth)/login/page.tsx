// file: app/(auth)/login/page.tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react"; // Using the same icon for consistency

export default function LoginPage() {
  return (
    // Main container to center the login card
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
              <FileText className="h-10 w-10 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Tawtheeq Auditor Login</CardTitle>
          <CardDescription>
            Enter your phone number to receive a one-time password (OTP)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel" // Use type="tel" for phone numbers
                placeholder="+1 (555) 000-0000"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send OTP
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground">
                Only authorized auditors may access this system.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
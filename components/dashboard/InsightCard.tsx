// file: components/dashboard/InsightCard.tsx
import { Progress } from "@/components/ui/progress";

interface InsightCardProps {
  title: string;
  value: number; // The progress value (0-100)
  colorClass: string; // Tailwind CSS color class for the progress bar
}

export const InsightCard = ({ title, value, colorClass }: InsightCardProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-sm font-medium text-gray-800">{value}%</p>
      </div>
      <Progress value={value} indicatorClassName={colorClass} />
    </div>
  );
};
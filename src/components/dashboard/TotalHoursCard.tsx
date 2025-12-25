import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function TotalHoursCard() {
  return (
    <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-100 mb-1">
              Total Hours
            </p>
            <h2 className="text-4xl font-bold">12H</h2>
          </div>
          <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
            <Clock className="h-8 w-8" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-blue-100">
          <span className="flex items-center gap-1">
            <span className="text-white font-medium">↑ 12%</span>
            <span>vs last week</span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

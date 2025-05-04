import { Card, CardContent } from "@/components/ui/card";
import { CalendarCheck, CheckCircle, Briefcase, BarChart3 } from "lucide-react";

interface StatsOverviewProps {
  stats: {
    upcomingInterviews: number;
    completedInterviews: number;
    jobsApplied: number;
    averageScore: number | null;
  };
}

export default function StatsOverview({ stats }: StatsOverviewProps) {
  const statCards = [
    {
      title: "Upcoming Interviews",
      value: stats.upcomingInterviews,
      icon: <CalendarCheck className="h-5 w-5 text-blue-500" />,
      description: `${stats.upcomingInterviews} scheduled`,
      color: "bg-blue-50 dark:bg-blue-950",
      textColor: "text-blue-700 dark:text-blue-300",
    },
    {
      title: "Completed Interviews",
      value: stats.completedInterviews,
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      description: "Great progress!",
      color: "bg-green-50 dark:bg-green-950",
      textColor: "text-green-700 dark:text-green-300",
    },
    {
      title: "Jobs Applied",
      value: stats.jobsApplied,
      icon: <Briefcase className="h-5 w-5 text-purple-500" />,
      description: "Applications sent",
      color: "bg-purple-50 dark:bg-purple-950",
      textColor: "text-purple-700 dark:text-purple-300",
    },
    {
      title: "Average Score",
      value: stats.averageScore !== null ? `${stats.averageScore}%` : "N/A",
      icon: <BarChart3 className="h-5 w-5 text-amber-500" />,
      description:
        stats.averageScore !== null
          ? "Across all interviews"
          : "No interviews scored yet",
      color: "bg-amber-50 dark:bg-amber-950",
      textColor: "text-amber-700 dark:text-amber-300",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col h-full">
              <div className={`p-4 ${stat.color}`}>
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </h3>
                  {stat.icon}
                </div>
                <p className={`text-2xl font-bold mt-2 ${stat.textColor}`}>
                  {stat.value}
                </p>
              </div>
              <div className="p-3 bg-card text-xs text-muted-foreground">
                {stat.description}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

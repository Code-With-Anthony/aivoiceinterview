import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface DashboardSkeletonProps {
  type: "practice" | "results" | "interviews";
}

export default function DashboardSkeleton({ type }: DashboardSkeletonProps) {
  switch (type) {
    case "practice":
      return (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-72 mt-2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2 mb-4">
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t p-4">
            <div className="flex justify-end w-full">
              <Skeleton className="h-9 w-40" />
            </div>
          </CardFooter>
        </Card>
      );

    case "results":
      return (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-4 w-64 mt-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            {[1, 2].map((_, index) => (
              <div key={index} className="space-y-4">
                {index > 0 && <div className="border-t my-4"></div>}
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-12" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="border-t p-4">
            <div className="flex justify-end w-full">
              <Skeleton className="h-9 w-32" />
            </div>
          </CardFooter>
        </Card>
      );

    case "interviews":
      return (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64 mt-2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg border"
                >
                  <Skeleton className="h-12 w-12 rounded-md flex-shrink-0" />
                  <div className="flex-grow space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="flex gap-1">
                      <Skeleton className="h-5 w-16 rounded-full" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-8 rounded-md flex-shrink-0" />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t p-4">
            <div className="flex justify-end w-full">
              <Skeleton className="h-9 w-36" />
            </div>
          </CardFooter>
        </Card>
      );

    default:
      return null;
  }
}

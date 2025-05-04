import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, UserCircle } from "lucide-react";

interface ProfileItem {
  name: string;
  completed: boolean;
}

interface ProfileCompletionProps {
  profile: {
    items: ProfileItem[];
  };
  completionPercentage: number;
}

export default function ProfileCompletion({
  profile,
  completionPercentage,
}: ProfileCompletionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <UserCircle className="h-5 w-5 mr-2 text-primary" />
          Profile Completion
        </CardTitle>
        <CardDescription>
          Complete your profile to increase visibility to employers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Profile completion</span>
            <span className="font-medium">{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>

        <ul className="space-y-3">
          {profile.items.map((item, index) => (
            <li key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                {item.completed ? (
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground mr-2" />
                )}
                <span className={item.completed ? "" : "text-muted-foreground"}>
                  {item.name}
                </span>
              </div>
              {!item.completed && (
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  Add
                </Button>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="border-t p-4">
        <Link href="/profile" className="w-full">
          <Button variant="outline" className="w-full">
            Complete Your Profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

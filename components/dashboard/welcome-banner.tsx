"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useUserStore } from "@/lib/store/useUserStore";

interface WelcomeBannerProps {
  lastActive: string;
}

export default function WelcomeBanner({ lastActive }: WelcomeBannerProps) {
  const { user } = useUserStore((state) => state);
  const [greeting, setGreeting] = useState("Good day");
  const [motivationalMessage, setMotivationalMessage] = useState("");

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    // Random motivational messages
    const messages = [
      "You're one step closer to your dream job!",
      "Keep practicing - excellence is a habit!",
      "Your next interview could be your big break!",
      "Preparation meets opportunity = success!",
      "Your skills are improving with every interview!",
    ];
    setMotivationalMessage(
      messages[Math.floor(Math.random() * messages.length)]
    );
  }, []);

  const lastActiveFormatted = formatDistanceToNow(new Date(lastActive), {
    addSuffix: true,
  });

  return (
    <Card className="border-none bg-gradient-to-r from-primary/10 via-primary/5 to-background">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">
              {greeting}, {user?.name}!
            </h1>
            <p className="text-muted-foreground mt-1">{motivationalMessage}</p>
            <div className="flex items-center text-xs text-muted-foreground mt-2">
              <CalendarDays className="h-3 w-3 mr-1" />
              <span>Last active {lastActiveFormatted}</span>
            </div>
          </div>
          <Button>Resume Interview Prep</Button>
        </div>
      </CardContent>
    </Card>
  );
}

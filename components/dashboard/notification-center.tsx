"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, CheckCircle, Info, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Notification {
  id: string;
  type: "reminder" | "update" | "message" | "achievement";
  title: string;
  description: string;
  date: string;
  read: boolean;
  action?: {
    text: string;
    url: string;
  };
}

interface NotificationCenterProps {
  notifications: Notification[];
}

export default function NotificationCenter({
  notifications,
}: NotificationCenterProps) {
  const [activeNotifications, setActiveNotifications] = useState(notifications);

  const markAllAsRead = () => {
    setActiveNotifications(
      activeNotifications.map((notif) => ({ ...notif, read: true }))
    );
  };

  const markAsRead = (id: string) => {
    setActiveNotifications(
      activeNotifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const unreadCount = activeNotifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "reminder":
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case "update":
        return <Info className="h-4 w-4 text-amber-500" />;
      case "message":
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      case "achievement":
        return <CheckCircle className="h-4 w-4 text-purple-500" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2 text-primary" />
            Notifications
          </CardTitle>
          {unreadCount > 0 && (
            <Badge variant="secondary">{unreadCount} new</Badge>
          )}
        </div>
        <CardDescription>
          Stay updated on your interviews and opportunities
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[320px] overflow-y-auto space-y-3">
        {activeNotifications.length > 0 ? (
          activeNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border ${
                !notification.read
                  ? "bg-primary/5 border-primary/20"
                  : "bg-card"
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex gap-3">
                <div className="mt-0.5">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-grow">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-sm">
                      {notification.title}
                    </h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDistanceToNow(new Date(notification.date), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {notification.description}
                  </p>
                  {notification.action && (
                    <Button
                      variant="link"
                      className="h-auto p-0 text-sm mt-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = notification.action!.url;
                      }}
                    >
                      {notification.action.text}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <p>No new notifications</p>
          </div>
        )}
      </CardContent>
      {unreadCount > 0 && (
        <CardFooter className="border-t p-3">
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={markAllAsRead}
          >
            Mark all as read
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

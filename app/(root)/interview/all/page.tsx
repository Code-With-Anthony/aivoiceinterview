import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getLatestInterviews } from "@/lib/actions/general.action";
import Image from "next/image";
import AvatarGroup from "./_components/AvatarGroup";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import DisplayTechIcons from "@/components/DisplayTechIcons";

const Page = async () => {
  const user = await getCurrentUser();
  const allInterviews = await getLatestInterviews({
    userId: user?.id,
    limit: 10,
  });
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  console.log("all interviews: ", allInterviews);
  return (
    <div className="max-w-screen-xl mx-auto py-16 px-6 xl:px-0">
      <div className="flex items-end justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          All Available Interviews
        </h2>
        <Select defaultValue="recommended">
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {allInterviews?.map((i) => (
          <Card key={i.id} className="shadow-none card">
            <CardHeader className="p-2">
              <div className="aspect-video bg-muted rounded-lg w-full" />
            </CardHeader>
            <CardContent className="pt-4 pb-5">
              <div className="flex justify-between items-center gap-2 flex-wrap">
                <Badge className="p-1.5">{i.type}</Badge>
                <Badge className="p-1.5">{i.role}</Badge>
                <Badge className="p-1.5">{i.level}</Badge>
              </div>

              <h3 className="mt-4 text-[1.35rem] font-semibold tracking-tight">
                What is the future of web development?
              </h3>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* <div className="h-10 w-10 rounded-full bg-muted"></div> */}
                  <Image
                    src={i?.coverImage}
                    alt={i.role}
                    width={10}
                    height={10}
                    className="h-10 w-10 rounded-full"
                  />
                  <span className="text-muted-foreground font-semibold">
                    John Doe
                  </span>
                </div>

                <span className="text-muted-foreground text-sm">
                  {formatDate(i.createdAt)}
                </span>
              </div>
              <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
                <div className="flex flex-wrap gap-2">
                  <DisplayTechIcons techStack={i.techstack} />
                </div>
                <Button className="shadow-none whitespace-nowrap">
                  Give Interview <ChevronRight />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;

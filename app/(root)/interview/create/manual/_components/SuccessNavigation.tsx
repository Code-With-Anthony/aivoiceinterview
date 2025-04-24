import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Clock,
  Copy,
  Linkedin,
  List,
  Mail,
  Plus,
  Slack,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
const SuccessNavigation = ({ interviewId, formData }) => {
  console.log("interviewId: ", interviewId);
  console.log("formData: ", formData);

  const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interviewId;
  const GetInterviewUrl = () => {
    return url;
  };
  const onCopyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast.info("Linked Copied");
  };
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <Image
        src="/checked.png"
        width={200}
        height={200}
        alt="checked"
        className="w-[50px] h-[50px]"
      />
      <h2 className="font-bold text-lg mt-4">Your AI Interview is Ready!</h2>
      <p className="mt-3">
        Share this link with your candidates to start the interview process
      </p>
      <div className="w-full p-7 mt-6 rounded-lg bg-white">
        <div className="flex justify-between items-center">
          <h4 className="font-bold">Interview Link</h4>
          <Badge variant="outline">Valid for 30 days</Badge>
        </div>
        <div className="mt-3 flex gap-3 items-center">
          <Input defaultValue={GetInterviewUrl()} disabled />
          <Button onClick={() => onCopyLink()}>
            <Copy /> Copy Link
          </Button>
        </div>
        <hr className="my-5" />

        <div className="flex gap-5">
          <h2 className="text-sm text-gray-500 flex gap-2 items-center">
            <Clock className="h-4 w-4" /> {formData?.duration} Mins
          </h2>
          <h2 className="text-sm text-gray-500 flex gap-2 items-center">
            <List className="h-4 w-4" /> {formData?.question} Question
          </h2>
        </div>
      </div>

      <div className="w-full p-7 mt-6 rounded-lg bg-white">
        <div className="flex justify-between items-center">
          <h4 className="font-bold">Share With</h4>
        </div>
        <div className="flex justify-between items-center p-5 gap-5">
          <Button
            variant="outline"
            className="flex gap-2 items-center p-5 border-1 rounded-lg justify-center"
          >
            <Mail />
            Email
          </Button>
          <Button
            variant="outline"
            className="flex gap-2 items-center p-5 border-1 rounded-lg justify-center"
          >
            <Linkedin /> LinkedIn
          </Button>
          <Button
            variant="outline"
            className="flex gap-2 items-center p-5 border-1 rounded-lg justify-center"
          >
            <Slack /> Slack
          </Button>
        </div>
      </div>
      <div className="flex w-full gap-5 justify-between mt-6 cursor-pointer">
        <Link href="/">
          <Button variant="outline">
            <ArrowLeft /> Back to Dashboard
          </Button>
        </Link>
        <Link href="/interview/custom">
          <Button>
            <Plus /> Create New Interview
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessNavigation;

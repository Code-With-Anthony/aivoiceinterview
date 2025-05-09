"use client";

import GenerationOptions from "@/app/(root)/interview/create/_components/GenerationOptions";
import FormContainer from "@/app/(root)/interview/create/manual/_components/FormContainer";
import SuccessNavigation from "@/app/(root)/interview/create/manual/_components/SuccessNavigation";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewsByUserId } from "@/lib/actions/general.action";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Progress } from "./ui/progress";
export default function CreateCustomInterview({
  goToNextStep,
}: {
  goToNextStep?: number;
}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [user, setUser] = useState<User | null>(null);
  const [interviewId, setInterviewId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getCurrentUser();
      setUser(userData);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchInterviewId = async () => {
      const interviews = await getInterviewsByUserId(user?.id!);
      if (interviews && interviews.length > 0) {
        const id = interviews[0].id;
        setInterviewId(id);
      }
    };

    if (step === 3) {
      fetchInterviewId();
    }
  }, [step]);

  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (goToNextStep) {
      setStep(Number(goToNextStep));
    }
  }, [goToNextStep]);

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGenerateInterview = async () => {
    try {
      const response = await fetch("/api/vapi/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: formData.interviewType?.join(", ") ?? "Technical",
          role: formData.jobPosition,
          level: formData.level,
          techstack: formData.techStack?.join(", "),
          amount: formData?.question,
          userid: user?.id,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Interview Generated Successfully");
        setStep(step + 1);
      } else {
        toast.error("Failed to generate interview");
        return;
      }
    } catch (err) {
      console.error("Error generating interview:", err);
      toast.error("Something went wrong. Try again.");
    }
  };

  const onGoTONextStep = () => {
    if (
      !(
        formData?.duration ||
        formData?.interviewType.length > 0 ||
        formData?.jobDescription ||
        formData?.jobPosition ||
        formData?.level ||
        formData?.question ||
        formData?.techStack.length > 0
      )
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    handleGenerateInterview();
  };

  const onSelectGenerationOption = (option: string) => {
    if (!option) {
      toast.error("Please select generation option");
      return;
    }
    setSelectedOption(option);
  };

  // Watch selectedOption and navigate after render
  useEffect(() => {
    if (selectedOption === "auto") {
      router.push("/interview/create/ai");
    } else if (selectedOption === "manual") {
      router.push("/interview/create/manual");
      setStep(2); // Only change step here after navigation
    }
  }, [selectedOption]);

  return (
    <div className="container px-24 lg:px-44 xl:px-56 mt-16">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold gradient-text">
            Create Custom Interview
          </h1>
          <p className="text-muted-foreground mt-2">
            Set up your custom interview by selecting your preferences below.
          </p>
        </div>

        <Progress value={step * 33.33} />
        {step === 1 && (
          <GenerationOptions
            onSelectGenerationOption={onSelectGenerationOption}
          />
        )}
        {step === 2 && (
          <FormContainer
            onHandleInputChange={onHandleInputChange}
            GoToNextStep={() => onGoTONextStep()}
            GoToPreviousStep={() => setStep(step - 1)}
          />
        )}
        {step === 3 && (
          <SuccessNavigation interviewId={interviewId} formData={formData} />
        )}
      </div>
    </div>
  );
}

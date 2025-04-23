"use client";

import GenerationOptions from "@/app/(root)/interview/create/_components/GenerationOptions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Progress } from "./ui/progress";
import FormContainer from "@/app/(root)/interview/create/manual/_components/FormContainer";
import SuccessNavigation from "@/app/(root)/interview/create/manual/_components/SuccessNavigation";
import { getCurrentUser } from "@/lib/actions/auth.action";

export default function CreateCustomInterview({ goToNextStep }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  //   const user = getCurrentUser();
  const router = useRouter();
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
    console.log("data: ", formData);
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
          userid: user?.id ?? "anonymous",
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
    console.log("option selected: ", option);
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
  console.log("step: ", step);

  return (
    <div className="container px-24 lg:px-44 xl:px-56">
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
        {step === 1 && !goToNextStep && (
          <GenerationOptions
            onSelectGenerationOption={onSelectGenerationOption}
          />
        )}
        {step === 2 || goToNextStep ? (
          <FormContainer
            onHandleInputChange={onHandleInputChange}
            GoToNextStep={() => onGoTONextStep()}
            GoToPreviousStep={() => setStep(step - 1)}
          />
        ) : null}
        {step === 3 && (
          <SuccessNavigation interviewId={123456} formData={formData} />
        )}
      </div>
    </div>
  );
}

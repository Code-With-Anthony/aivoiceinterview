import { Card } from "@/components/ui/card";
import { UserIcon } from "lucide-react";
import React from "react";

const GenerationOptions = ({ onSelectGenerationOption }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <Card
        onClick={() => onSelectGenerationOption("auto")}
        className="cursor-pointer p-6 rounded-2xl shadow-md transition hover:shadow-lg hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 border hover:border-blue-400"
      >
        <div className="flex flex-col gap-4 h-full justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-blue-700 dark:text-blue-300">
              🤖 AI Interview Generation
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Use AI to generate customized interviews automatically.
            </p>
          </div>
        </div>
      </Card>

      <Card
        onClick={() => onSelectGenerationOption("manual")}
        className="cursor-pointer p-6 rounded-2xl shadow-md transition hover:shadow-lg hover:bg-gradient-to-r hover:from-green-50/50 hover:to-emerald-50/50 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 border hover:border-green-400"
      >
        <div className="flex flex-col gap-4 h-full justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-green-700 dark:text-green-300 flex gap-2 items-center">
              <UserIcon /> <span> Manual Interview Generation</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Customize interviews manually by selecting questions and fields.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GenerationOptions;

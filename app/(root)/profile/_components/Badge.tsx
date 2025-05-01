import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Icon from "./icons";
const BadgeShowcase = () => {
  return (
    <div className="flex items-center gap-3 flex-wrap mt-3 mb-4">
      <Badge className="rounded-full pl-[3px]" variant="outline">
        <Image
          src={Icon.react}
          className="mr-2 h-5 w-5 rounded-full"
          alt="React"
          height={20}
          width={20}
        />
        React Ready
      </Badge>
      <Badge className="rounded-full pl-[3px]" variant="outline">
        <Image
          src={Icon.extraMiler}
          className="mr-2 h-5 w-5 rounded-full"
          alt="Extra Miler"
          height={20}
          width={20}
        />
        React Ready
      </Badge>
      <Badge className="rounded-full pl-[3px]" variant="outline">
        <Image
          src={Icon.quickLearner}
          className="mr-2 h-5 w-5 rounded-full"
          alt="Quick Learner"
          height={20}
          width={20}
        />
        Quick Learner
      </Badge>
    </div>
  );
};
export default BadgeShowcase;

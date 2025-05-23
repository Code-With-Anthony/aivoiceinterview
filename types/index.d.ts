interface Feedback {
  id: string;
  interviewId: string;
  totalScore: number;
  categoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}

interface Interview {
  id: string;
  role: string;
  level: string;
  questions: string[];
  techstack: string[];
  createdAt: string;
  userId: string;
  type: string;
  finalized: boolean;
  createdAt: string;
}

interface CreateFeedbackParams {
  interviewId: string;
  userId: string;
  transcript: { role: string; content: string }[];
  feedbackId?: string;
}

interface User {
  name: string;
  email: string;
  id: string;
  role: string;
}

interface InterviewCardProps {
  id?: string;
  userId?: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt?: string;
}

interface AgentProps {
  userName: string;
  userId?: string;
  interviewId?: string;
  interviewTitle?: string
  feedbackId?: string;
  type: "generate" | "interview";
  questions?: string[];
}

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

interface GetFeedbackByInterviewIdParams {
  interviewId: string;
  userId: string;
}

interface GetLatestInterviewsParams {
  userId: string;
  limit?: number;
}

interface SignInParams {
  email: string;
  idToken: string;
  authProvider?: string;
}

type UserRole = "candidate" | "recruiter"

type CompanyType = "tech" | "non-tech" | "mix";

interface SignUpParams {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  authProvider: string;
  companyType?: CompanyType
}

type FormType = "sign-in" | "sign-up";

interface InterviewFormProps {
  interviewId: string;
  role: string;
  level: string;
  type: string;
  techstack: string[];
  amount: number;
}

interface TechIconProps {
  techStack: string[];
}

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface CompanyAndTechnologiesFilterProps {
  selected: string[];
  onChange: (values: string[]) => void;
}

// Match your parent interface
interface InterviewFiltersInterface {
  status: string[];
  technologies: string[];
  level: string[];
  company: string[];
  type: string[];
  category: string[];
}

interface InterviewGeneralFilterProps {
  filters?: InterviewFiltersInterface;
  addFilter: (category: keyof InterviewFiltersInterface, value: string) => void;
  activeStatus?: string | null;
}
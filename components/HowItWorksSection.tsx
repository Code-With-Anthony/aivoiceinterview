import {
  ArrowRight,
  Settings2,
  UserRound,
  FileCheck,
  ChartBar,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "Set Up Your Interview Template",
    description:
      "Customize interview questions, criteria, and candidate requirements through our simple setup wizard.",
    icon: <Settings2 className="w-6 h-6 text-purple-600" />,
    delay: "0s",
  },
  {
    number: "02",
    title: "Invite Candidates",
    description:
      "Send automated invitations with flexible scheduling options directly to your candidates.",
    icon: <UserRound className="w-6 h-6 text-purple-600" />,
    delay: "0.1s",
  },
  {
    number: "03",
    title: "AI Conducts Interviews",
    description:
      "Our AI voice agent interviews candidates, asking questions and following up based on their responses.",
    icon: <FileCheck className="w-6 h-6 text-purple-600" />,
    delay: "0.2s",
  },
  {
    number: "04",
    title: "Review Results",
    description:
      "Get detailed reports, transcripts, and AI-powered insights to make informed hiring decisions.",
    icon: <ChartBar className="w-6 h-6 text-purple-600" />,
    delay: "0.3s",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section-padding ">
      <div className="container mx-auto container-padding">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">How It Works</span>
          </h2>
          <p className="text-xl text-gray-600">
            Our streamlined process makes implementing AI voice interviews
            simple and effective
          </p>
        </div>

        <div className="mt-16 relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute left-1/2 h-[calc(100%-4rem)] top-[4rem] w-0.5 bg-gradient-to-b from-purple-300 to-indigo-300 transform -translate-x-1/2 z-0"></div>

          <div className="space-y-24 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-16">
            {steps.map((step, index) => (
              <Card
                key={index}
                className={`relative z-10 bg-white/70 backdrop-blur-sm border border-purple-100 shadow-xl shadow-purple-100/20 ${
                  index % 2 === 0 ? "lg:translate-y-12" : "lg:-translate-y-12"
                } hover:scale-105 transition-all duration-300 fade-in`}
                style={{ animationDelay: step.delay }}
              >
                <CardHeader className="relative pb-0">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6">
                    <div className="w-full h-full bg-white rounded-xl transform rotate-6 flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-purple-600 mb-2 mt-6">
                    Step {step.number}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-lg mb-6">
                    {step.description}
                  </p>
                  {index === steps.length - 1 && (
                    <a
                      href="#"
                      className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700 transition-colors group"
                    >
                      Learn more
                      <ArrowRight
                        className="ml-2 group-hover:translate-x-1 transition-transform"
                        size={18}
                      />
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-32 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 lg:p-12 text-white shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to transform your hiring process?
              </h3>
              <p className="text-white/90 text-xl mb-8">
                Join thousands of companies using VoiceInterview to save time,
                reduce costs, and find better candidates.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="bg-white text-purple-600 px-8 py-3 rounded-full font-medium hover:bg-purple-50 transition-colors shadow-lg"
                >
                  Get Started Free
                </a>
                <a
                  href="#"
                  className="bg-purple-500/20 text-white border border-white/20 px-8 py-3 rounded-full font-medium hover:bg-purple-500/30 transition-colors"
                >
                  Schedule Demo
                </a>
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-center space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl font-bold">98%</span>
                </div>
                <div>
                  <div className="font-medium text-lg">Satisfaction Rate</div>
                  <div className="text-white/70">Among our customers</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl font-bold">75%</span>
                </div>
                <div>
                  <div className="font-medium text-lg">Time Savings</div>
                  <div className="text-white/70">
                    Average per hiring process
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

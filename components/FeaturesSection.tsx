import {
  Calendar,
  Headphones,
  Users,
  Clock,
  Video,
  Check,
  Star,
} from "lucide-react";

const features = [
  {
    icon: (
      <Headphones className="w-12 h-12 text-primary p-2 bg-primary/10 rounded-xl" />
    ),
    title: "AI Voice Agent",
    description:
      "Our advanced AI conducts natural conversations that adapt to candidate responses in real-time.",
  },
  {
    icon: (
      <Calendar className="w-12 h-12 text-primary p-2 bg-primary/10 rounded-xl" />
    ),
    title: "Automated Scheduling",
    description:
      "Eliminate scheduling headaches with our automated calendar integration system.",
  },
  {
    icon: (
      <Users className="w-12 h-12 text-primary p-2 bg-primary/10 rounded-xl" />
    ),
    title: "Candidate Screening",
    description:
      "Efficiently screen hundreds of candidates with consistent questions and evaluation criteria.",
  },
  {
    icon: (
      <Clock className="w-12 h-12 text-primary p-2 bg-primary/10 rounded-xl" />
    ),
    title: "Time Savings",
    description:
      "Reduce your hiring time by up to 75% with parallel interview processing.",
  },
  {
    icon: (
      <Video className="w-12 h-12 text-primary p-2 bg-primary/10 rounded-xl" />
    ),
    title: "Video Recording",
    description:
      "Review candidate interviews anytime with our secure video recording feature.",
  },
  {
    icon: (
      <Star className="w-12 h-12 text-primary p-2 bg-primary/10 rounded-xl" />
    ),
    title: "Bias Reduction",
    description:
      "Our AI asks the same questions in the same way to every candidate, reducing unconscious bias.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="section-padding">
      <div className="container mx-auto container-padding">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for{" "}
            <span className="gradient-text">Modern Recruiting</span>
          </h2>
          <p className="text-lg text-gray-700">
            Our AI-powered platform streamlines your hiring process with these
            innovative features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Why Recruiters{" "}
                <span className="gradient-text">Love Our Platform</span>
              </h3>
              <p className="text-gray-700 mb-6">
                VoiceInterview helps you save time, reduce costs, and find
                better candidates through AI-driven efficiency.
              </p>
              <ul className="space-y-3">
                {[
                  "Conduct 5x more interviews in the same time",
                  "Reduce hiring costs by up to 60%",
                  "Improve candidate experience with flexible scheduling",
                  "Standardize your interview process",
                  "Make data-driven hiring decisions",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check
                      className="text-primary shrink-0 mr-2 mt-1"
                      size={18}
                    />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <div className="text-purple-600 font-bold">87%</div>
                  </div>
                  <div>
                    <div className="font-medium">Time Savings</div>
                    <div className="text-sm text-gray-500">
                      Average recruiter experience
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Traditional Process</span>
                      <span>40hrs/week</span>
                    </div>
                    <div className="w-full bg-gray-100 h-3 rounded-full">
                      <div
                        className="bg-gray-400 h-3 rounded-full"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>With VoiceInterview</span>
                      <span>5.2hrs/week</span>
                    </div>
                    <div className="w-full bg-gray-100 h-3 rounded-full">
                      <div
                        className="bg-primary h-3 rounded-full"
                        style={{ width: "13%" }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-center text-sm text-gray-500">
                  Based on data from 500+ recruiting teams
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-bl from-purple-200 to-indigo-200 rounded-2xl transform rotate-3 z-0"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="pt-20 pb-14 md:pt-20 md:pb-14 overflow-hidden">
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transform Your{" "}
              <span className="gradient-text">Hiring Process</span> with AI
              Interviews
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
              Our AI-powered voice agent conducts professional interviews,
              screens candidates, and provides detailed reports—saving you time
              and finding the best talent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg">
                <Link href="/interview">Start an Interview</Link>
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-8 py-6 text-lg group flex items-center gap-2"
              >
                Book Demo
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Button>
            </div>
            <div className="mt-4 text-sm text-gray-500 flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-medium text-indigo-600">
                  JD
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-xs font-medium text-purple-600">
                  TM
                </div>
                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-xs font-medium text-pink-600">
                  RK
                </div>
              </div>
              <p className="text-gray-500 text-sm">
                Trusted by 500+ hiring managers
              </p>
            </div>
          </div>
          <div className="relative fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl relative z-10 transform translate-y-6 translate-x-6">
              <div className="aspect-video bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gray-200 h-12 flex items-center px-4">
                  <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                  <div className="text-sm text-gray-600 ml-2">
                    AI Voice Interview Session
                  </div>
                </div>
                <div className="p-6 flex flex-col h-[calc(100%-3rem)]">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                      <div className="w-4 h-4 bg-indigo-500 rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <div className="h-3 bg-gray-200 rounded w-32 mb-2"></div>
                      <div className="h-2 bg-gray-100 rounded w-20"></div>
                    </div>
                  </div>
                  <div className="space-y-2 mt-auto">
                    <div className="h-2 bg-gray-100 rounded w-full"></div>
                    <div className="h-2 bg-gray-100 rounded w-5/6"></div>
                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                    <div className="h-2 bg-gray-100 rounded w-4/6"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-indigo-600/20 rounded-2xl z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

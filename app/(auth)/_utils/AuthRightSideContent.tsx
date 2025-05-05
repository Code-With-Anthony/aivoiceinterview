import { BackgroundLines } from "@/components/ui/background-lines";
import { ToogleMode } from "@/components/ToggleMode";

type AuthSideContentProps = {
  page: "login" | "signup";
};

export function AuthRightSideContent({ page }: AuthSideContentProps) {
  return (
    <div className="relative hidden lg:block bg-background">
      <BackgroundLines className="relative flex items-center justify-center w-full flex-col px-4">
        {/* Toggle mode button in top right */}
        <div className="absolute top-4 right-4 z-30">
          <ToogleMode />
        </div>

        {/* Dynamic content */}
        {page === "login" ? (
          <>
            <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
              AI Voice Interview
              <br className="hidden xl:inline" />
              <span className="hidden xl:inline">
                Your Smart Interview Partner
              </span>
            </h2>
            <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
              “The future belongs to those who prepare for it today.”
              <br /> Empower your career with intelligent, voice-driven mock
              interviews.
            </p>
          </>
        ) : (
          <>
            <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
              AI Voice Interview
              <br className="hidden xl:inline" />
              <span className="hidden xl:inline">
                Step Into the Future of Hiring
              </span>
            </h2>
            <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
              “Your voice has power. Let it speak for your potential.”
              <br /> Sign up to access intelligent voice interviews built for
              the modern job seeker.
            </p>
          </>
        )}
      </BackgroundLines>
    </div>
  );
}

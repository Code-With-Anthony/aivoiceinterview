import { ToogleMode } from "@/components/ToggleMode";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <>
      <div className="relative min-h-screen">
        {/* Toggle button placed at the top right */}
        <div className="absolute top-6 right-6">
          <ToogleMode />
        </div>

        {/* Main content centered */}
        <div className="flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="w-full space-y-6 text-center">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                Oops! Lost in Cyber Space
              </h1>
              <p className="text-gray-500">
                Looks like you&apos;ve ventured into the unknown digital realm.
              </p>
            </div>
            <Button className="h-10">
              <Link href="/" prefetch={false}>
                Return to website
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;

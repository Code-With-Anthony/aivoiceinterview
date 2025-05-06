// // app/companies/page.tsx
// import Link from "next/link";

// const CompaniesPage = () => {
//   const companies = [
//     { name: "google", displayName: "Google" },
//     { name: "apple", displayName: "Apple" },
//     { name: "microsoft", displayName: "Microsoft" },
//   ];

//   return (
//     <div>
//       <h1>List of Companies</h1>
//       <ul>
//         {companies.map((company) => (
//           <li key={company.name}>
//             <Link href={`/companies/${company.name}`}>
//               {company.displayName}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CompaniesPage;

import { Suspense } from "react";
import type { Metadata } from "next";
import CompanyFilters from "@/components/companies/company-filters";
import CompanyGrid from "@/components/companies/company-grid";
import CompanyListSkeleton from "@/components/companies/company-list-skeleton";
import { getAllCompanies } from "@/lib/company-data";

export const metadata: Metadata = {
  title: "Companies | AI Voice Interview Platform",
  description:
    "Explore companies and prepare for interviews with our AI-powered platform",
};

export default async function CompaniesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const companies = await getAllCompanies();
  console.log("search params: ", searchParams);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Companies</h1>
        <p className="text-muted-foreground">
          Explore companies, their culture, and prepare for interviews with our
          AI-powered platform
        </p>
      </div>

      <CompanyFilters />

      <Suspense fallback={<CompanyListSkeleton />}>
        <CompanyGrid companies={companies} />
      </Suspense>
    </div>
  );
}

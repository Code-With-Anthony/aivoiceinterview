// app/companies/[companyName]/page.tsx
import Link from "next/link";

const CompanyPage = async ({ params }: RouteParams) => {
  const { companyName } = await params;

  // Fetch company-specific data, e.g., company details, tab contents, etc.
  const companyDetails = {
    name: companyName,
    description: `Details about ${companyName}`,
  };

  return (
    <div>
      <h1>{companyDetails.name}</h1>
      <p>{companyDetails.description}</p>
      <nav>
        <ul>
          <li>
            <Link href={`/companies/${companyName}/interviews`}>
              Interviews
            </Link>
          </li>
          {/* Other links to tabs like About, Careers, etc. */}
        </ul>
      </nav>
    </div>
  );
};

export default CompanyPage;

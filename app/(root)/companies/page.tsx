// app/companies/page.tsx
import Link from "next/link";

const CompaniesPage = () => {
  const companies = [
    { name: "google", displayName: "Google" },
    { name: "apple", displayName: "Apple" },
    { name: "microsoft", displayName: "Microsoft" },
  ];

  return (
    <div>
      <h1>List of Companies</h1>
      <ul>
        {companies.map((company) => (
          <li key={company.name}>
            <Link href={`/companies/${company.name}`}>
              {company.displayName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompaniesPage;

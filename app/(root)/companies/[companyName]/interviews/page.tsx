// app/companies/[companyName]/interviews/page.tsx
// import { useRouter } from "next/router";
import Link from "next/link";

const InterviewsPage = async ({ params }: RouteParams) => {
  // const router = useRouter();
  const { companyName } = await params; // companyName is dynamic

  // Fetch the list of interviews for the company
  const interviews = [
    { id: "123", title: "Software Engineer Interview" },
    { id: "456", title: "Product Manager Interview" },
    { id: "789", title: "UX Designer Interview" },
  ];

  return (
    <div>
      <h1>Interviews for {companyName}</h1>
      <ul>
        {interviews.map((interview) => (
          <li key={interview.id}>
            <Link href={`/companies/${companyName}/interviews/${interview.id}`}>
              {interview.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InterviewsPage;

// app/companies/[companyName]/interviews/[interviewId]/page.tsx

const InterviewDetailsPage = async ({ params }: RouteParams) => {
  // console.log("route params: ", params)
  const { companyName, interviewId } = await params;

  // Fetch interview details using companyName and interviewId
  const interviewDetails = {
    id: interviewId,
    title: `Interview for ${companyName}`,
    description: `Details about the interview ${interviewId} at ${companyName}`,
  };

  return (
    <div>
      <h1>{interviewDetails.title}</h1>
      <p>{interviewDetails.description}</p>
    </div>
  );
};

export default InterviewDetailsPage;

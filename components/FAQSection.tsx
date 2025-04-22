"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How does the AI voice interviewer work?",
    answer:
      "Our AI voice interviewer uses advanced natural language processing to conduct conversations that feel human-like. It asks your predefined questions, listens to candidate responses, and can follow up with clarifying questions based on what the candidate says.",
  },
  {
    question: "Will candidates know they're talking to an AI?",
    answer:
      "Yes, we believe in transparency. Candidates are informed they're speaking with an AI assistant, but the conversation is so natural that many report forgetting they're not speaking with a human.",
  },
  {
    question: "Can I customize the interview questions?",
    answer:
      "Absolutely! You can create custom interview templates with your own questions, or start with our industry-specific templates and modify them to suit your needs.",
  },
  {
    question: "How does the scheduling system work?",
    answer:
      "Candidates receive an email invitation with a link to our scheduling system. They can select from available time slots that work for them, and the system automatically sends confirmations and reminders.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, security is our priority. We use enterprise-grade encryption for all data, comply with GDPR and other privacy regulations, and never share your data with third parties without permission.",
  },
  {
    question: "Can VoiceInterview integrate with my existing ATS?",
    answer:
      "Yes, we offer integrations with popular Applicant Tracking Systems including Greenhouse, Lever, Workday, and more. Custom integrations are available for Enterprise plans.",
  },
  {
    question: "What happens after the interview is complete?",
    answer:
      "You'll receive a detailed report including a full transcript, video recording, AI analysis of responses, and scoring based on your criteria. These can be reviewed by your team and shared with stakeholders.",
  },
  {
    question: "How many interviews can I conduct simultaneously?",
    answer:
      "Unlike human interviewers who can only speak with one person at a time, our AI can conduct unlimited parallel interviews, constrained only by your plan limits.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section-padding">
      <div className="container mx-auto container-padding">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-gray-700">
            Find answers to common questions about our AI voice interview
            platform
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl border ${
                  openIndex === index
                    ? "border-primary shadow-md"
                    : "border-gray-200"
                } overflow-hidden transition-all duration-300`}
              >
                <button
                  className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-semibold pr-8">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="text-gray-400 flex-shrink-0" />
                  )}
                </button>

                <div
                  className={`px-6 transition-all duration-300 overflow-hidden ${
                    openIndex === index ? "pb-6 max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-700 mb-4">Still have questions?</p>
            <a
              href="#contact"
              className="text-primary font-medium hover:underline"
            >
              Contact our support team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

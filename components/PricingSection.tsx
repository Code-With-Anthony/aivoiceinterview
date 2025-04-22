import { Check } from "lucide-react";
import { Button } from "./ui/button";

const plans = [
  {
    name: "Starter",
    price: 49,
    description:
      "Perfect for small teams and startups starting their hiring journey",
    features: [
      "10 AI voice interviews per month",
      "Basic candidate screening",
      "Email support",
      "Interview templates library",
      "Video recording",
    ],
    isPopular: false,
    buttonText: "Get Started",
  },
  {
    name: "Professional",
    price: 129,
    description: "Ideal for growing companies with regular hiring needs",
    features: [
      "50 AI voice interviews per month",
      "Advanced candidate screening",
      "Priority email & chat support",
      "Custom interview templates",
      "Video recording & analysis",
      "ATS integration",
      "Team collaboration tools",
    ],
    isPopular: true,
    buttonText: "Start Free Trial",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with high-volume recruiting needs",
    features: [
      "Unlimited AI voice interviews",
      "Enterprise-grade security",
      "Dedicated account manager",
      "Advanced analytics & reporting",
      "Custom AI voice training",
      "White-labeling options",
      "API access",
      "24/7 premium support",
    ],
    isPopular: false,
    buttonText: "Contact Sales",
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="section-padding">
      <div className="container mx-auto container-padding">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-lg text-gray-700">
            Choose the plan that&apos;s right for your business, with no hidden
            fees
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl border ${
                plan.isPopular
                  ? "border-primary shadow-lg shadow-primary/10"
                  : "border-gray-200 shadow-sm"
              } overflow-hidden transition-all duration-300 hover:shadow-md flex flex-col h-full relative`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-primary text-primary-foreground text-xs font-bold uppercase py-1 px-3 rounded-bl-lg">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-6 md:p-8 flex-grow">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4 flex items-baseline">
                  {typeof plan.price === "number" ? (
                    <>
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-gray-500 ml-2">/month</span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold">{plan.price}</span>
                  )}
                </div>
                <p className="text-gray-600 mb-8">{plan.description}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex">
                      <Check
                        className="text-primary shrink-0 mr-2 mt-1"
                        size={18}
                      />
                      <span
                        className={`text-gray-700 ${
                          i < 4 ? "" : "font-medium"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 md:p-8 border-t border-gray-100">
                <Button
                  className={`w-full py-6 ${
                    plan.isPopular
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-gray-900 hover:bg-gray-800"
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 lg:p-12 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Frequently Asked Questions About Pricing
            </h3>
            <p className="text-gray-700">
              Find answers to common questions about our plans and billing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "Do you offer a free trial?",
                a: "Yes! All paid plans include a 14-day free trial with full access to features. No credit card required to start.",
              },
              {
                q: "Can I change plans later?",
                a: "Absolutely. You can upgrade, downgrade, or cancel your plan at any time through your account dashboard.",
              },
              {
                q: "How do interview credits work?",
                a: "Each completed AI voice interview uses one credit. Unused credits roll over for up to 3 months.",
              },
              {
                q: "Do you offer discounts for annual billing?",
                a: "Yes, you can save 20% by choosing annual billing instead of monthly for any of our plans.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-lg border border-gray-100"
              >
                <h4 className="font-semibold mb-2">{item.q}</h4>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-700 mb-4">
              Need a custom solution for your enterprise?
            </p>
            <Button variant="outline" className="rounded-full px-8">
              Contact Our Sales Team
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

import { MultiSelect } from "@/components/multi-select";

export function CompanyFilter({ selected, onChange }: CompanyAndTechnologiesFilterProps) {
    // Dummy options for multi-select
    const companyOptions = [
        { label: "Google", value: "google", icon: "/icons/google.svg" },
        { label: "Amazon", value: "amazon", icon: "/icons/amazon.svg" },
        { label: "Microsoft", value: "microsoft", icon: "/icons/microsoft.svg" },
        { label: "Facebook", value: "facebook", icon: "/icons/facebook.svg" },
        { label: "Apple", value: "apple", icon: "/icons/apple.svg" },
        { label: "Netflix", value: "netflix", icon: "/icons/netflix.svg" },
        { label: "Tesla", value: "tesla", icon: "/icons/tesla.svg" },
        { label: "Uber", value: "uber", icon: "/icons/uber.svg" },
        { label: "Airbnb", value: "airbnb", icon: "/icons/airbnb.svg" },
        { label: "Twitter", value: "twitter", icon: "/icons/twitter.svg" },
        { label: "Salesforce", value: "salesforce", icon: "/icons/salesforce.svg" },
        { label: "Slack", value: "slack", icon: "/icons/slack.svg" },
    ];
    return (
        <MultiSelect
            options={companyOptions}
            defaultValue={selected}
            onValueChange={onChange}
            placeholder="Select companies"
            maxCount={5}
        />
    );
}
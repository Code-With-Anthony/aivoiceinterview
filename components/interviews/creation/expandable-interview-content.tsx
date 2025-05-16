import React, { useState } from "react"

interface ExpandableDescriptionProps {
  description: string
  maxLength?: number // Optional, defaults to 120
}

const ExpandableDescription: React.FC<ExpandableDescriptionProps> = ({
  description,
  maxLength = 120, // Set default max length
}) => {
  const [expanded, setExpanded] = useState(false)

  const handleToggle = () => setExpanded(!expanded)

  // Slice description to the maxLength if not expanded
  const previewText = description?.length > maxLength ? description.slice(0, maxLength) : description

  return (
    <div className="relative">
      <p className="text-sm break-words whitespace-pre-wrap">
        {expanded ? description : previewText}{" "}
        {description && description.length > maxLength && (
          <button
            onClick={handleToggle}
            className="text-primary ml-1 underline text-xs cursor-pointer"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </p>
    </div>
  )
}

export default ExpandableDescription

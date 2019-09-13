const StructuredJobListing = ({
  data: {
    title,
    description,
    updatedAt,
    type,
    categories,
    location,
    minCompensation
  }
}) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: `{
    "@context": "http://schema.org/",
    "@type": "JobPosting",
    "title": "${title}",
    "description": "${description}",
    "datePosted": "${updatedAt}",
    "employmentType": "${type}",
    "baseSalary": "${minCompensation}",
    "industry": "${categories.map(category => category.name).join(",")}",
    "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "${location.split(",")[0]}",
          "addressRegion": "${location.split(",")[1]}"
        }
      }
  }`
    }}
  />
);

export default StructuredJobListing;

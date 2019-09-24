import sanitizeHtml from "sanitize-html";

const SanitizeHTML = ({ html, options }) => {
  const defaultOptions = {
    allowedTags: options || [
      "b",
      "i",
      "em",
      "strong",
      "h1",
      "h2",
      "h3",
      "h4",
      "ul",
      "li",
      "ol",
      "p"
    ],
    allowedAttributes: {
      a: ["href"]
    },
    allowedIframeHostnames: ["www.youtube.com"]
  };

  const sanitize = dirty => ({
    __html: sanitizeHtml(dirty, (options = { ...defaultOptions }))
  });

  return <div dangerouslySetInnerHTML={sanitize(html)} />;
};

export default SanitizeHTML;

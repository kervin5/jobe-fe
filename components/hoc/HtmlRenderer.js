import sanitizeHtml from 'sanitize-html';

const defaultOptions = {
    allowedTags: [ 'b', 'i', 'em', 'strong', 'h1', 'h2', 'h3', 'h4', 'ul', 'li','ol', 'p' ],
    allowedAttributes: {
      'a': [ 'href' ]
    },
    allowedIframeHostnames: ['www.youtube.com']
  };
  
  const sanitize = (dirty, options) => ({
    __html: sanitizeHtml(dirty, options = { ...defaultOptions, ...options }
    )
  });
  
  const SanitizeHTML = ({ html, options }) => (
    <div dangerouslySetInnerHTML={sanitize(html, options)} />
  );

  export default SanitizeHTML;
import axios from "axios";

export const handleUpload = async (
  signedRequest,
  file,
  fileType,
  acl,
  expectedFileUrl
) => {
  const options = {
    headers: {
      "Content-Type": fileType,
      "x-amz-acl": acl
    }
  };

  try {
    const uploadRes = await axios.put(signedRequest, file, options);
    return {
      fileType,
      path: expectedFileUrl
    };
  } catch (error) {
    return null;
  }
};

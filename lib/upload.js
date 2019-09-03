import axios from "axios";

export const handleUpload = (
  signedRequest,
  file,
  fileType,
  acl,
  expectedFileUrl
) => {
  console.log("Requqest", signedRequest);
  console.log(acl);
  const options = {
    headers: {
      "Content-Type": fileType,
      "x-amz-acl": acl
    }
  };

  axios
    .put(signedRequest, file, options)
    .then(result => {
      console.log(result);
      console.log(expectedFileUrl);
    })
    .catch(error => {
      console.log(error);
      console.log("ERROR " + JSON.stringify(error));
    });

  // let file = files[0];
  // // Split the filename to get the name and type
  // let fileParts = files[0].name.split('.');
  // let fileName = fileParts[0];
  // let fileType = fileParts[1];
  // console.log("Preparing the upload");
  // axios.post("http://localhost:3001/sign_s3",{
  //   fileName : fileName,
  //   fileType : fileType
  // })
  // .then(response => {
  //   var returnData = response.data.data.returnData;
  //   var signedRequest = returnData.signedRequest;
  //   var url = returnData.url;
  //   this.setState({url: url})
  //   console.log("Recieved a signed request " + signedRequest);

  //  // Put the fileType in the headers for the upload

  // })
  // .catch(error => {
  //   alert(JSON.stringify(error));
  // })
};

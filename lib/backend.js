const axios = require("axios");

const endpoint = `http://localhost:4000/graphql`;
const prodEndpoint = `https://jobboard-be-gql.now.sh/graphql`;

function getBackendUrl() {
  const isProduction = process.env.NODE_ENV === "production";
  const backendUri = isProduction ? prodEndpoint : endpoint;
  return backendUri;
}
async function getJobsFromAPI(take) {
  try {
    const result = await axios.post(getBackendUrl(), {
      query: `{
      searchJobs ${take ? `(take: ${take})` : ""} {
        id
        title
        description
        disclaimer
        minCompensation
        maxCompensation
        type
        status
        createdAt
        updatedAt
        categories {
          id
          name
        }
  
        skills {
          id
          name
        }
  
        perks(where: { status: ACTIVE }) {
          id
          name
        }
  
        location {
          id
          name
          latitude
          longitude
        }
        branch {
          id
          name
          description
          company {
            id
            name
            description
          }
        }
        } 
      }`
    });
    return result.data.data.searchJobs;
  } catch (err) {
    console.log({ err });
    return [];
  }
}

async function getTermsFromAPI() {
  const result = await axios.post(getBackendUrl(), {
    query: `{
      popularTerms {
        id
        label
        type
      }
      }`
  });
  return result.data.data.popularTerms;
}

async function getJob(id) {
  const result = await axios.post(getBackendUrl(), {
    query: `{
        job(where: {id: "${id}"}) {
          id
          title
          description
          disclaimer
          minCompensation
          maxCompensation
          type
          status
          createdAt
          updatedAt
          categories {
            id
            name
          }
    
          skills {
            id
            name
          }
    
          perks(where: { status: ACTIVE }) {
            id
            name
          }
    
          location {
            id
            name
            latitude
            longitude
          }
          branch {
            id
            name
            description
            company {
              id
              name
              description
            }
          }
        } 
      }`
  });
  return result.data.data.job;
}

module.exports = { getJobsFromAPI, getJob, getBackendUrl, getTermsFromAPI };

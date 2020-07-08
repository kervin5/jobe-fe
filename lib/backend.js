const axios = require("axios");

const endpoint = `http://localhost:4000/graphql`;
const prodEndpoint = `${process.env.BACKEND_ENDPOINT}/graphql`;

function getBackendUrl() {
  const isProduction = process.env.NODE_ENV === "production";
  const backendUri = isProduction ? prodEndpoint : endpoint;
  return backendUri;
}

async function getAllJobsFromAPI() {
  const result = await axios.post(getBackendUrl(), {
    query: `{
    jobs {
      id
      title
    
      type

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

      location {
        id
        name
        latitude
        longitude
      }

      } 
    }`,
  });
  return result.data.data.jobs;
}

async function getJobsFromAPI() {
  const result = await axios.post(getBackendUrl(), {
    query: `{
      searchJobs(take: 10) {
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
      }`,
  });
  return result.data.data.searchJobs;
}

async function getTermsFromAPI() {
  const result = await axios.post(getBackendUrl(), {
    query: `{
      popularTerms {
        id
        label
        type
      }
      }`,
  });
  return result.data.data.popularTerms;
}

async function getJob(id) {
  try {
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
      }`,
    });
    return result.data.data.job;
  } catch (err) {
    console.log(err.response.data);
    return undefined;
  }
}

module.exports = {
  getJobsFromAPI,
  getJob,
  getBackendUrl,
  getTermsFromAPI,
  getAllJobsFromAPI,
};

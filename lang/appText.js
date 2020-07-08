const languages = {
  en: {
    actions: {
      edit: "edit",
      new: "new",
      search: "search",
      find: "find",
      login: "log in",
      register: "register"
    },

    objects: {
      job: {
        singular: "job",
        plural: "jobs"
      },

      area: {
        singular: "area",
        plural: "areas"
      },

      profile: {
        singular: "profile",
        plural: "profiles"
      }
    },

    adjectives: {
      awesome: "awesome",
      near: "near",
      latest: "latest"
    },

    pronouns: {
      your: "your"
    },

    expressions: {
      whatsTrending: `What's Trending`,
      latestJobs: `latest jobs`
    }
  },
  es: {}
};
const language = process.env.LANGUAGE ?? "en";
export default languages[language];

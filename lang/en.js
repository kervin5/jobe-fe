export default {
  actions: {
    edit: "edit",
    new: "new",
    search: "search",
    find: "find",
    login: "log in",
    register: "register",
    post: "post",
  },

  objects: {
    dashboard: { singular: "dashboard", plural: "dashboard" },
    job: {
      singular: "job",
      plural: "jobs",
    },
    location: { singular: "location", plural: "locations" },
    area: {
      singular: "area",
      plural: "areas",
    },

    profile: {
      singular: "profile",
      plural: "profiles",
    },

    password: {
      singular: "password",
      plural: "passwords",
    },

    email: {
      singular: "email",
      plural: "emails",
    },

    name: {
      singular: "name",
      plural: "name",
    },

    score: {
      singular: "score",
      plural: "scores",
    },

    privacyPolicy: {
      singular: "privacy policy",
      plural: "privacy policies",
    },

    application: {
      singular: "application",
      plural: "applications",
    },

    perk: {
      singular: "perk",
      plural: "perks",
    },

    definition: {
      singular: "definition",
      plural: "definitions",
    },

    candidate: {
      singular: "candidate",
      plural: "candidates",
    },

    user: {
      singular: "user",
      plural: "users",
    },
  },

  adjectives: {
    awesome: "awesome",
    near: "near",
    latest: "latest",
    posted: "posted",
    draft: "draft",
    pending: "pending",
  },

  pronouns: {
    your: "your",
  },

  messages: {
    notfound: "no results were found",
    whatsTrending: "what's trending",
    job: {
      latest: "latest jobs",
      post: "post a job",
      postInstructions: "Please, enter the details of the new job listing",
      jobTitle: "Job Title",
      jobRecurring: "Recurring Job",
    },
    account: {
      donthave: "Don't have an account?",
      alreadyhave: "Already have an account?",
      agreement: `By clicking the "Register" button, you agree to`,
    },
    password: {
      forgot: "Forgot my password",
    },

    validation: {
      required: "This field is required",
      minLength: (number) =>
        `This field must have at least ${number} characters`,
      maxLength: (number) =>
        `This fields must have ${number} characters or less`,
      email: "Please, enter a valid email",
      specialChars: "Please, enter letters or numbers only",
    },
  },

  widget: {
    ytdJobsVsApplications: `${new Date().getFullYear()} YTD Jobs vs Applications`,
    powerUsersOfTheMonth: "Super Users of the Month",
    totalApplicationsByBranch: "Total Applications by Branch",
    totalJobsByBranch: "Total Jobs by Branch",
  },
};

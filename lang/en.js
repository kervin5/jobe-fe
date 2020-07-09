export default {
  actions: {
    edit: "edit",
    new: "new",
    search: "search",
    find: "find",
    login: "log in",
    register: "register",
    post: "post",
    viewMore: "view more",
    add: "add",
    loading: "loading",
    cancel: "cancel",
    preview: "preview",
    save: "save",
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

    member: {
      singular: "member",
      plurarl: "members",
    },

    resume: {
      singular: "resume",
      plural: "resumes",
    },

    other: {
      singular: "other",
      plural: "other",
    },

    status: {
      singular: "status",
      plurarl: "statuses",
    },

    update: {
      singular: "update",
      plural: "updates",
    },

    note: {
      singular: "note",
      plural: "notes",
    },

    skill: {
      singular: "skill",
      plural: "skills",
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
      recommended: "recommended jobs",
      post: "post a job",
      postInstructions: "Please, enter the details of the new job listing",
      jobTitle: "Job Title",
      jobRecurring: "Recurring Job",
      jobMinCompensation: "Minimum Compensation",
      jobMaxCompensation: "Maximum Compensation",
      jobCompensationType: "Compensation Type",
      jobCategories: "Job Categories",
      jobPerks: "Job Perks",
      jobType: "Job Type",
      jobSkills: "Job Skills",
      jobAuthor: "Job Author",
      jobDescription: "Job Description",
      jobDisclaimer: "Job Disclaimer",
    },
    account: {
      donthave: "Don't have an account?",
      alreadyhave: "Already have an account?",
      agreement: `By clicking the "Register" button, you agree to`,
    },
    password: {
      forgot: "Forgot my password",
    },

    category: {
      favorite: "Favorite categories",
    },

    application: {
      attention: (count) =>
        `There are ${count} applications in your queue that require attention!`,
      attentionInstructions: (
        status
      ) => `Please make sure to change to status of the applications to 
        ${status} once the
        candidate is not longer being considered for a position in
        order to remove the application from the queue.`,
    },

    note: {
      enterContent: "Enter note content",
      changed: (name, type, content) =>
        `${name} changed the ${type.toLowerCase()} to ${content}`,
      added: (name) => `${name} added a note`,
    },

    perk: {
      approval: "Any new perks will be reviewed and are subject to approval",
    },

    disclaimer: {
      leaveEmpty: "Leave empty if you want use default disclaimer",
    },
    validation: {
      required: "This field is required",
      minLength: (number) =>
        `This field must have at least ${number} characters`,
      maxLength: (number) =>
        `This fields must have ${number} characters or less`,
      email: "Please, enter a valid email",
      specialChars: "Please, enter letters or numbers only",
      select: "Select an option",
      selectAllThatApply: "Select all that apply",
      selectAtLeastOne: "Select at least one",
    },
  },

  widget: {
    ytdJobsVsApplications: `${new Date().getFullYear()} YTD Jobs vs Applications`,
    powerUsersOfTheMonth: "Super Users of the Month",
    totalApplicationsByBranch: "Total Applications by Branch",
    totalJobsByBranch: "Total Jobs by Branch",
  },

  prepositions: {
    since: "since",
    and: "and",
  },
};

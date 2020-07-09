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
    view: "view",
    upload: "upload",
    signOut: "Sign Out",
    filterBy: "Filter by",
    reset: "reset",
    click: "click",
    confirm: "confirm",
  },

  objects: {
    dashboard: { singular: "dashboard", plural: "dashboard" },
    job: {
      singular: "job",
      plural: "jobs",
      information: "Job information",
    },
    location: { singular: "location", plural: "locations" },
    area: {
      singular: "area",
      plural: "areas",
    },

    profile: {
      singular: "profile",
      plural: "profiles",
      candidate: "Candidate Profile",
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
    new: "new",
    here: "here",
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
      postInstructions: "Please, enter the job details",
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
      invalidEmail: "Cannot find that email address",
      resetLink: "Please check your mailbox with a reset link",
      clickToReset:
        "Please click on the following link to reset your password:",
      enterNewPassword: "Enter New Password",
      pleaseRegister:
        "Please register or login to use this and other amazing features",
    },
    password: {
      forgot: "Forgot my password",
      forgotQuestion: "Forgot Password?",
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
    resume: {
      upload: "Upload a New Resume",
      theseAre: (name, self) =>
        !self ? `These are ${name}'s resumes` : `These are your resumes`,
      uploadToApply:
        "Upload your resume to start aplying to amazing opportunities with one click",
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

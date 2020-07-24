import { companyInfo } from "@/root/config";

export default {
  actions: {
    edit: "Edit",
    new: "New",
    search: "Search",
    find: "Find",
    login: "Log In",
    register: "Register",
    post: "Post",
    viewMore: "View More",
    add: "Add",
    loading: "Loading",
    reviewing: "Reviewing",
    cancel: "Cancel",
    preview: "Preview",
    save: "Save",
    view: "View",
    upload: "Upload",
    signOut: "Sign Out",
    filterBy: "Filter by",
    reset: "Reset",
    click: "Click",
    confirm: "Confirm",
    share: "Share",
    publish: "Publish",
    download: "Download",
  },

  objects: {
    dashboard: { singular: "dashboard", plural: "dashboard" },
    job: {
      singular: "job",
      plural: "jobs",
      information: "Job information",
      this: "This Job",
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
      user: "User Profile",
    },

    password: {
      singular: "password",
      plural: "passwords",
    },

    email: {
      singular: "email",
      plural: "emails",
    },

    phone: {
      singular: "phone",
      plural: "phones",
    },

    name: {
      singular: "name",
      plural: "names",
    },

    score: {
      singular: "score",
      plural: "scores",
    },

    privacyPolicy: {
      singular: "Privacy policy",
      plural: "Privacy policies",
    },

    cookieNotice: {
      singular: "Cookie Notice",
      plural: "Cookie Notices",
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

    compensation: {
      singular: "Compensation",
      plural: "comepnsations",
    },

    view: {
      singular: "View",
      plural: "Views",
    },
    favorite: {
      singular: "Favorite",
      plural: "Favorites",
    },
    company: {
      singular: "Company",
      plural: "Companies",
    },
    activity: {
      singular: "Activity",
      plural: "Activities",
    },
    branch: {
      singular: "Branch",
      plural: "Branches",
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
    hourly: "Hourly",
    salary: "Salary",
    doe: "DOE",
    fullTime: "Full-Time",
    partTime: "Part-Time",
    temp: "Temp",
    perDiem: "Per Diem",
    viewed: "Viewed",
    contacted: "Contacted",
    primary: "Primary",
    active: "Active",
  },

  pronouns: {
    your: "your",
    you: "you",
  },
  seo: {
    description: `Browse through hundreds of job openings nationally. ${companyInfo.name} has the job opportunity you have been looking for so Apply Today`,
    title: `${companyInfo.name} National Job Board: Find a Job Today`,
    pages: {
      landing: {
        description: `Start your job search with ${companyInfo.name}`,
      },
      jobSearch: {
        title: `${companyInfo.name} Search`,
        description: `Start your job search with ${companyInfo.name}`,
      },
      me: {
        title: `Login to your profile to start your job search with ${companyInfo.name}`,
      },
      login: {
        description: `Login to your profile to start your job search with ${companyInfo.name}`,
      },
      register: {
        description: `Create a new profile to start your job search with ${companyInfo.name}`,
      },
    },
  },
  messages: {
    thatsAll: "That's all for now",
    notfound: "No results were found",
    whatsTrending: "what's trending",
    recentActivity: "Recent activity",
    clickHereToUpload: "Click here or drop a file to upload",
    dropItNow: "Drop it like it's hot",
    about: "About",
    doItLater: "Do it later",
    uploaded: "Uploaded",
    uploading: "Uploading",
    nothingToSee: "Oops, nothing to see here",
    currentlyOpen: "Currently Open",
    amazingOpportunity: `Amazing Career opportunity @ ${companyInfo.name}`,
    submitForApproval: "Submit for approval",
    attention: "Attention",
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
      byEnablingRecurring:
        " By enabling this option, the job will be reposted automatically every three days. Please only use this option for jobs that you are continuously recruiting for. This option will make this job seem like it has recently been posted until you opt-out.",
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
      applyNow: "Appy Now",
      applied: "Applied",
      beforeApplying:
        "Before applying for this job you need to create a profile. It will only take a few minutes",
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
      doesntHave: "No Resume",
      resumeTitle: "Resume Title",
      pleaseEnterTitle: "Please enter a title for this resume",
      enterTitle: "Enter a title",
      resumeSelected: "Resume selected",
      resumeUploaded: "Resume uploaded",
      justOneMoreStep:
        "Just one more step. Please upload your most recent resume",
    },
    validation: {
      required: "This field is required",
      minLength: (number) =>
        `This field must have at least ${number} characters`,
      maxLength: (number) =>
        `This fields must have ${number} characters or less`,
      email: "Please, enter a valid email",
      phone: "Please, enter a valid phone number",
      specialChars: "Please, enter letters or numbers only",
      select: "Select an option",
      selectAllThatApply: "Select all that apply",
      selectAtLeastOne: "Select at least one",
      fileTypeNotValid: "File type not accepted, sorry",
      fileIsTooLarge: "File is too large",
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
    at: "at",
  },
};

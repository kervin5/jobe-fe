const languages = {
  en: {
    actions: {
      edit: "edit",
      new: "new",
      search: "search",
      find: "find",
      login: "log in",
      register: "register",
    },

    objects: {
      job: {
        singular: "job",
        plural: "jobs",
      },

      area: {
        singular: "area",
        plural: "areas",
      },

      profile: {
        singular: "profile",
        plural: "profiles",
      },
    },

    adjectives: {
      awesome: "awesome",
      near: "near",
      latest: "latest",
    },

    pronouns: {
      your: "your",
    },

    expressions: {
      whatsTrending: `What's Trending`,
      latestJobs: `latest jobs`,
    },
  },
  es: {
    actions: {
      edit: "editar",
      new: "nuevo",
      search: "buscar",
      find: "buscar",
      login: "iniciar sesión",
      register: "crear cuenta",
      post: "publicar",
    },

    objects: {
      dashboard: { singular: "dashboard", plural: "dashboard" },
      job: {
        singular: "trabajo",
        plural: "trabajos",
      },
      location: { singular: "lugar", plural: "lugares" },
      area: {
        singular: "area",
        plural: "areas",
      },

      profile: {
        singular: "perfil",
        plural: "perfiles",
      },

      password: {
        singular: "contraseña",
        plural: "contraseñas",
      },

      email: {
        singular: "correo electrónico",
        plural: "correos electrónicos",
      },

      name: {
        singular: "nombre",
        plural: "nombres",
      },

      score: {
        singular: "puntaje",
        plural: "puntajes",
      },

      privacyPolicy: {
        singular: "poliza de privacidad",
        plural: "polizas de privacidad",
      },

      application: {
        singular: "solicitud",
        plural: "solicitudes",
      },

      perk: {
        singular: "beneficio",
        plural: "beneficios",
      },

      definition: {
        singular: "defición",
        plural: "definiciones",
      },

      candidate: {
        singular: "postulante",
        plural: "postulantes",
      },

      user: {
        singular: "usuario",
        plural: "usuarios",
      },
    },

    adjectives: {
      awesome: "nuevos",
      near: "cerca de",
      latest: "más reciente",
      posted: "publicados",
      draft: "borradores",
      pending: "pendientes",
    },

    pronouns: {
      your: "tu",
    },

    messages: {
      notfound: "no se encontraron resultados",
      whatsTrending: "tendencias",
      job: {
        latest: "trabajos más recientes",
        post: "publicar un trabajo",
        postInstructions:
          "Por favor ingrese los detalles del puesto de trabajo",
        jobTitle: "Titulo del Trabajo",
        jobRecurring: "Trabajo Recurrente",
      },
      account: {
        donthave: "¿no tienes una cuenta?",
        alreadyhave: "¿ya tienes una cuenta? puedes",
        agreement: `al hacer click en "crear cuenta", aceptas nuestra`,
      },
      password: {
        forgot: "olvide mi contraseña",
      },

      validation: {
        required: "por favor, complete este campo",
        minLength: (number) =>
          `este campo debe tener al menos ${number} caracteres`,
        maxLength: (number) =>
          `este campo no debe tener más de ${number} caracteres`,
        email: "por favor, ingrese un correo electrónico valido",
        specialChars: "por favor, ingrese solo numeros o letras",
      },
    },

    widget: {
      ytdJobsVsApplications: `Trabajos vs Solicitudes en ${new Date().getFullYear()}`,
      powerUsersOfTheMonth: "Super Usuarios del Mes",
      totalApplicationsByBranch: "Total de Solicitudes por Sucursal",
      totalJobsByBranch: "Total de Puestos por Sucursal",
    },
  },
};
const language = process.env.NEXT_PUBLIC_LANGUAGE ?? "en";
export default languages[language];

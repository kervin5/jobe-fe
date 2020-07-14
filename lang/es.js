import { companyInfo } from "@/root/config";

export default {
  actions: {
    edit: "Editar",
    new: "Nuevo",
    search: "Buscar",
    find: "Encontrar",
    login: "Iniciar Sesión",
    register: "Crear Cuenta",
    post: "Publicar",
    viewMore: "Ver Más",
    add: "Agregar",
    loading: "Cargando",
    cancel: "Cancelar",
    preview: "Ver",
    save: "Guardar",
    view: "Ver",
    upload: "Subir",
    signOut: "Cerrar Sesión",
    filterBy: "Filtrar Por",
    reset: "Restablecer",
    click: "Haz Click",
    confirm: "Confirmar",
    share: "Compartir",
  },

  objects: {
    dashboard: { singular: "Dashboard", plural: "dashboard" },
    job: {
      singular: "Trabajo",
      plural: "Trabajos",
      information: "Información del Trabajo",
      this: "Este Trabajo",
    },
    location: { singular: "Lugar", plural: "Lugares" },
    area: {
      singular: "Area",
      plural: "Areas",
    },

    profile: {
      singular: "Perfil",
      plural: "Perfiles",
      candidate: "Perfil del Candidato",
      user: "Perfil de Usuario",
    },

    password: {
      singular: "Contraseña",
      plural: "Contraseñas",
    },

    email: {
      singular: "Correo Electrónico",
      plural: "Correós Electronicos",
    },

    name: {
      singular: "Nombre Completo",
      plural: "Nombres",
    },

    score: {
      singular: "Puntaje",
      plural: "Puntajes",
    },

    privacyPolicy: {
      singular: "Poliza de Privacidad",
      plural: "Polizas de Privacidad",
    },

    cookieNotice: {
      singular: "Notificación de Cookies",
      plural: "Notificaciones de Cookies",
    },

    application: {
      singular: "Solicitud",
      plural: "Solicitudes",
    },

    perk: {
      singular: "Beneficio",
      plural: "Beneficios",
    },

    definition: {
      singular: "Definición",
      plural: "Definiciones",
    },

    candidate: {
      singular: "Candidato",
      plural: "Candidatos",
    },

    user: {
      singular: "Usuario",
      plural: "Usuarios",
    },

    member: {
      singular: "Miembro",
      plurarl: "Miembros",
    },

    resume: {
      singular: "Hoja de Vida",
      plural: "Hojas de Vida",
    },

    other: {
      singular: "Otros",
      plural: "Otros",
    },

    status: {
      singular: "Estado",
      plural: "Estados",
    },

    update: {
      singular: "Actualización",
      plural: "Actualizaciones",
    },

    note: {
      singular: "Nota",
      plural: "Notas",
    },

    skill: {
      singular: "Habilidad",
      plural: "Habilidades",
    },

    compensation: {
      singular: "Compensación",
      plural: "Compensaciones",
    },
  },

  adjectives: {
    awesome: "Nuevos",
    near: "cerca de",
    latest: "más reciente",
    posted: "publicado",
    draft: "borrador",
    pending: "pendiente",
    new: "nuevo",
    here: "aquí",
  },

  pronouns: {
    your: "Sus",
    you: "Usted",
  },
  seo: {
    description: `Accede a cientos de oportunidades a nivel nacional. ${companyInfo.name} tiene la oportunidad que has estado buscado. Applica hoy`,
    title: `${companyInfo.name} Bolsa de Trabajo Nacional`,
    pages: {
      landing: {
        description: `Comienza tu busqueda de trabajo con ${companyInfo.name}`,
      },
      jobSearch: {
        title: `${companyInfo.name} Search`,
        description: `Comienza tu busqueda de trabajo con ${companyInfo.name}`,
      },
      me: {
        title: `Ingresa a tu cuenta para comenzar tu busqueda de trabajo con ${companyInfo.name}`,
      },
      login: {
        description: `Ingresa a tu cuenta para comenzar tu busqueda de trabajo con ${companyInfo.name}`,
      },
      register: {
        description: `Crea una cuenta para comenzar tu busqueda de trabajo con ${companyInfo.name}`,
      },
    },
  },
  messages: {
    thatsAll: "Eso es todo por el momento",
    notfound: "No se encontraron resultados",
    whatsTrending: "Tendencias",
    clickHereToUpload: "Haz click aquí o arrasta un documento para subirlo",
    dropItNow: "Sueltalo para continuar",
    about: "Acerca de",
    doItLater: "Hacerlo despues",
    uploaded: "Subido",
    uploading: "Subiendo",
    nothingToSee: "Oops, nada que ver por aquí",
    currentlyOpen: "Actualmente Disponibles",
    amazingOpportunity: `Increibles carreras y oportunidades en @ ${companyInfo.name}`,
    job: {
      latest: "Trabajos más recientes",
      recommended: "Trabajos recomendados",
      post: "Publicar un Trabajo",
      postInstructions: "Por favor, ingrese los detalles del puesto de trabajo",
      jobTitle: "Titulo",
      jobRecurring: "Recurrente",
      jobMinCompensation: "Compensación Mínima",
      jobMaxCompensation: "Compensación Máxima",
      jobCompensationType: "Tipo de Compensación",
      jobCategories: "Categorias",
      jobPerks: "Beneficios",
      jobType: "Tipo de Trabajo",
      jobSkills: "Habilidades",
      jobAuthor: "Autor",
      jobDescription: "Descripción",
      jobDisclaimer: "Términos o Descargo de Responsabilidad",
    },
    account: {
      donthave: "¿No tienes una cuenta?",
      alreadyhave: "¿Ya tienes una cuenta?",
      agreement: `Al hacer click en el botón "Crear Cuenta", estas aceptando nuestros`,
      invalidEmail:
        "No encontramos una cuenta asociada a ese correo electrónico",
      resetLink:
        "Hemos enviado un enlace para restablecer tu contraseña a tu correo electrónico",
      clickToReset:
        "Por favor haz click en el siguiente enlace para restablecer tu contraseña",
      enterNewPassword: "Ingresa una nueva contraseña",
      pleaseRegister:
        "Por favor, inicia sesión o crea una cuenta para acceder a esta y muchás más increibles funciones",
    },
    password: {
      forgot: "Olvide mi contraseña",
      forgotQuestion: "¿Olvidaste tu contraseña?",
    },

    category: {
      favorite: "Categorias favoritas",
    },

    application: {
      attention: (count) =>
        `Hay ${count} solicitudes de empleo que requieren tu atención!`,
      attentionInstructions: (
        status
      ) => `Por favor asegurate de cambiar el estado de las solicitudes a  
        ${status} una vez que el candidato ya no este siendo considerado para un puesto para remover la solicitud de la lista de trabajo`,
    },

    note: {
      enterContent: "Ingresa el contenido de la nota",
      changed: (name, type, content) =>
        `${name} ha cambiado el ${type.toLowerCase()} a ${content}`,
      added: (name) => `${name} agrego una nota`,
    },

    perk: {
      approval:
        "Cualquier beneficio nuevo sera revisado y aprobado por el administrador",
    },

    disclaimer: {
      leaveEmpty: "Deja en blanco si quieres utilizar el texto por defecto",
    },
    resume: {
      upload: "Subir Hoja de Vida",
      theseAre: (name, self) =>
        !self
          ? `Estas son las hojas de vida de ${name}`
          : `Estas son tus hojas de vida`,
      uploadToApply:
        "Sube tu hoja de vida para comenzar a aplicar a todas las oportunidades disponibles con un solo click",
      doesntHave: "No tiene hoja de vida",
      resumeTitle: "Titulo de la hoja de vida",
      pleaseEnterTitle:
        "Por favor, ingresa un titulo descriptivo para esta hoja de vida",
      enterTitle: "Ingresa un titulo",
      resumeSelected: "Hoja de vida seleccionada",
      resumeUploaded: "Hoja de vida subida",
    },
    validation: {
      required: "Esta campo es requerido",
      minLength: (number) =>
        `Este campo debe tener al menos ${number} caracteres`,
      maxLength: (number) =>
        `Este campo debe tener ${number} caracteres o menos`,
      email: "Por favor, ingresa un correo electrónico valido",
      specialChars: "Por favor, ingresa letras o números solamente",
      select: "Selecciona una opción",
      selectAllThatApply: "Selecciona toas las que apliquen",
      selectAtLeastOne: "Selecciona al menos una",
      fileTypeNotValid: "Este tipo de documento es invalido, 😭",
      fileIsTooLarge: "El documento es muy grande",
    },
  },

  widget: {
    ytdJobsVsApplications: `${new Date().getFullYear()} Trabajos vs Solicitudes`,
    powerUsersOfTheMonth: "Super Usuarios del Mes",
    totalApplicationsByBranch: "Total de Solicitudes por Sucursal",
    totalJobsByBranch: "Total de Trabajos por Sucursal",
  },

  prepositions: {
    since: "desde",
    and: "y",
    at: "en",
  },
};

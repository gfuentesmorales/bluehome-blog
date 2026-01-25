export function truncate(html: string, maxLength: number = 120) {
  if (!html) return "";

  html = html
    .replace(/<ul[\s\S]*?<\/ul>/gi, "")
    .replace(/<ol[\s\S]*?<\/ol>/gi, "");

  const ps = html.match(/<p[^>]*>(.*?)<\/p>/gi);

  if (!ps) {
    const text = html.replace(/<[^>]+>/g, "").trim();
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }

  let chosen = "";
  for (const p of ps) {
    const t = p.replace(/<[^>]+>/g, "").trim();
    if (t.length >= 40) {
      chosen = t;
      break;
    }
  }

  if (!chosen) chosen = ps[0].replace(/<[^>]+>/g, "").trim();

  return chosen.length > maxLength
    ? chosen.slice(0, maxLength).trim() + "..."
    : chosen;
}

export function withBasePath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${basePath}${path}`;
}

export function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export const userValidators = {
  name: (v: string) => (v.trim() ? undefined : "El nombre es obligatorio"),

  email: (v: string) => {
    if (!v.trim()) return "El correo es obligatorio";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "El correo no es válido";
  },

  password: (v: string, form: any) =>
    v
      ? v === form.confirmPassword
        ? undefined
        : "Confirma la contraseña"
      : "La contraseña es obligatoria",

  confirmPassword: (v: string, form: any) =>
    v === form.password ? undefined : "Las contraseñas no coinciden",
};

export function validateUserForm(form: any) {
  const errors: any = {};
  (Object.keys(userValidators) as (keyof typeof userValidators)[]).forEach(
    (key) => {
      const validator = userValidators[key];
      if (validator && form[key]) {
        const error =
          key === "password" || key === "confirmPassword"
            ? (validator as any)(form[key], form)
            : (validator as any)(form[key]);

        if (error) errors[key] = error;
      }
    }
  );
  console.log("errors", errors);
  return errors;
}

export function parseUserForm(
  formData: FormData,
  method: "POST" | "PUT" | "PATCH" = "POST"
) {
  const user = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    active: formData.get("active") ?? false,
  };

  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (method === "POST") {
    return {
      ...user,
      password: String(password ?? ""),
      confirmPassword: String(confirmPassword ?? ""),
    };
  }

  if (password) {
    Object.assign(user, { password: String(password) });
    Object.assign(user, { confirmPassword: String(confirmPassword) });
  }
  return user;
}

export function isEmpty(value: unknown): boolean {
  if (value == null) return true;

  if (typeof value === "string") {
    return value.trim().length === 0;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }

  return false;
}

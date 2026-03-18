// ──────────────────────────────────────────────
// TIPOS: Definen la "forma" de los datos
// ──────────────────────────────────────────────

/** Tipos permitidos de documento de identidad */
export type DocumentType = 'CC' | 'CE' | 'PASAPORTE' | 'TI';

/** Sexo biológico del usuario */
export type Sex = 'M' | 'F';

/**
 * Interfaz que define TODOS los atributos que puede tener un usuario.
 * Es el "contrato" de qué datos maneja nuestro dominio.
 */
export interface UserProps {
    id:                     number;
    firstName:              string;
    secondName?:            string;       // Opcional: no todos tienen segundo nombre
    firstSurname:           string;
    secondSurname?:         string;      // Opcional: no todos tienen segundo apellido
    typeDocument:           DocumentType;
    numberDocument:         string;
    documentIssuanceDate:   Date;
    sex:                    Sex;
    country:                string;
    email:                  string;
    cellPhone:              string;
    city:                   string;
    address:                string;
    birthdate:              Date;
    isActive:               boolean;
    createdAt:              Date;
    updatedAt:              Date;
}

// ──────────────────────────────────────────────
// ENTIDAD: La clase principal del dominio
// ──────────────────────────────────────────────

/**
 * Entidad User — representa a un usuario dentro del sistema.
 *
 * ¿Por qué una clase y no solo un objeto?
 * Porque la clase puede tener LÓGICA DE NEGOCIO, por ejemplo:
 * - Calcular la edad
 * - Saber si el usuario está activo
 * - Obtener el nombre completo
 */
export class User {
    // Las propiedades son PRIVADAS para proteger la integridad del objeto.
    // Solo se modifican a través de métodos controlados.
    private readonly props: UserProps;

    /**
     * Constructor privado — usamos el patrón Factory para crear usuarios.
     * Esto nos da control total sobre cómo se crean las instancias.
     */
    private constructor(props: UserProps) {
        this.props = props;
    }

  // ── FACTORY METHOD ──────────────────────────
    /**
   * Método estático para crear un nuevo usuario.
   * Aquí podríamos agregar validaciones de dominio en el futuro.
   *
   * @param props - Los datos del usuario
   * @returns Una nueva instancia de User
   */
  static create(props: UserProps): User {
      return new User(props);
  }

  // ── GETTERS: Acceso controlado a los datos ──

  get id():                       number { return this.props.id; }
  get firstName():                string { return this.props.firstName; }
  get secondName():               string | undefined { return this.props.secondName; }
  get firstSurname():             string { return this.props.firstSurname; }
  get secondSurname():            string | undefined { return this.props.secondSurname; }
  get typeDocument():             DocumentType { return this.props.typeDocument; }
  get numberDocument():           string { return this.props.numberDocument; }
  get documentIssuanceDate():     Date { return this.props.documentIssuanceDate; }
  get sex():                      Sex { return this.props.sex; }
  get country():                  string { return this.props.country; }
  get email():                    string { return this.props.email; }
  get cellPhone():                string { return this.props.cellPhone; }
  get city():                     string { return this.props.city; }
  get address():                  string { return this.props.address; }
  get birthdate():                Date { return this.props.birthdate; }
  get isActive():                 boolean { return this.props.isActive; }
  get createdAt():                Date { return this.props.createdAt; }
  get updatedAt():                Date { return this.props.updatedAt; }

  // ── LÓGICA DE NEGOCIO ───────────────────────

  /**
   * Devuelve el nombre completo del usuario, juntando todos los nombres y apellidos.
   * Filtra los valores undefined para no dejar espacios vacíos.
   */
  get fullName(): string {
    return [
      this.props.firstName,
      this.props.secondName,
      this.props.firstSurname,
      this.props.secondSurname,
    ]
      .filter(Boolean) // Elimina undefined y cadenas vacías
      .join(' ');
  }

  /**
   * Calcula la edad actual del usuario basándose en su fecha de nacimiento.
   * La lógica tiene en cuenta si ya cumplió años en el año actual.
   */
  get age(): number {
    const today = new Date();
    const birth = this.props.birthdate;
    let age = today.getFullYear() - birth.getFullYear();

    // Ajustamos si todavía no ha cumplido años este año
    const hasHadBirthdayThisYear = today.getMonth() > birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
    if (!hasHadBirthdayThisYear) age--;

    return age;
  }

  /**
   * Devuelve el sexo en texto legible para mostrar en la UI.
   */
  get sexLabel(): string {
    return this.props.sex === 'M' ? 'Masculino' : 'Femenino';
  }

  /**
   * Convierte la entidad a un objeto plano (POJO).
   * Útil para pasar datos a la capa de presentación sin exponer la entidad.
   */
  toJSON(): UserProps {
    return { ...this.props };
  }
}


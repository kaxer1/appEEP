import { Menu } from "./menu.model";

export interface LoginResp {
    cod: string,
    message: string
    user: User,
    menu: Menu,
    authorization: string
}

export interface User {
    id?: number,
    username: string,
    fullname: string,
    nombre: string,
    apellido: string,
    cedula: string,
    email: string,
    rol: number,
    iniciales: string,
    sufrago?: boolean,
    activo?: boolean | null,
    estudiante?: boolean | null,
    password?: string,
    vota?: boolean
    tiemposesion?: number,
    nrol?: string
}

export const userDefault: User = {
    username: '',
    fullname: '',
    nombre: '',
    apellido: '',
    cedula: '',
    email: '',
    rol: undefined,
    iniciales: ''
}

export interface permisosSistema {
    crear: boolean,
    editar: boolean,
    elminar: boolean
}
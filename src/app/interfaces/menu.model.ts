export interface MenuNode {
    name: string;
    icono?: string;
    children?: itemNode[];
}

export interface itemNode {
    name: string;
    url: string;
}

export interface Menu {
    id: number;
    id_rol: number;
    cruta: string | null;
    id_padre: number | null;
    nombre: string;
    icon: string;
    crear: boolean;
    editar: boolean;
    eliminar: boolean;
    mostrarmenu: boolean;
    hijos?: Menu[]
}
export interface ProcesoResp {
    cod: string,
    message: string,
    PROCESO: Proceso
}

export interface Proceso {
    id: number,
    descripcion: string,
    estado: boolean,
    semestre: string,
    fec_eleccion: Date,
    lista_electoral?: Lista_electoral[]
}

export interface Lista_electoral {
    id: number,
    nom_lista: string,
    descripcion: string,
    logo: string,
    estado: boolean,
    id_proceso: number,
    contenido?: string
}

export const procesoValueDefault = {
    id: undefined,
    descripcion: undefined,
    estado: undefined,
    semestre: undefined,
    fec_eleccion: undefined,
    lista_electoral: []
}

export interface ProcesoListaResp {
    cod: string,
    message: string
    procesos: IProcesoElectoral[]
}

export interface IProcesoElectoral {
    id: number;
    descripcion: string;
    estado: string;
    semestre: string;
    fec_eleccion: string;
    hora_inicio: string;
    hora_final: string;
}

export interface ICandidatos {
    id: number;
    candidato: string;
    nombre: string,
    apellido: string,
    cargo: string;
    id_lista?: number;
}
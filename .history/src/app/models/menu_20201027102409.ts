export class Menu {
    idP: number;
    codigoMenu: number;
    idF: number;
    codigoMenuF: number;
    nombre: string;
    descripcion: string;
    estado: string;
    link: string;
    imagen: string;
    fechaCrea: Date;
    usuarioCrea: string;
    fechaModica: Date;
    usuarioModica: string;
    sistemaId: number;
    opcionId: number;

    constructor($idP: number, $codigoMenu: number, $idF: number, $codigoMenuF: number, $nombre: string, $descripcion: string, $estado: string, $link: string, $imagen: string, $fechaCrea: Date, $usuarioCrea: string, $fechaModica: Date, $usuarioModica: string, $sistemaId: number, $opcionId: number){
        this.idP = $idP;
        this.codigoMenu = $codigoMenu;
        this.idF = $idF;
        this.codigoMenuF = $codigoMenuF;
        this.nombre = $ombre;
        this.descripcion = $descripcion;
        this.estado = estado;
        this.link = link;
        this.imagen = imagen;
        this.fechaCrea = fechaCrea;
        this.usuarioCrea = usuarioCrea;
        this.fechaModica = fechaModica;
        this.usuarioModica = usuarioModica;
        this.sistemaId = sistemaId;
        this.opcionId = opcionId;

    }


}

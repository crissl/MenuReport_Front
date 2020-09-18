export class User {

    private id: string;
    private cedula: string;
    private pidm: string;
    private nombres: string;
    private emailI: string;
    private emailP: string;
    private direccion: string;

    constructor($id: string, $cedula: string, $pidm: string, $nombres: string,
        $emailI: string, $emailP: string, $direccion: string) {
        this.id = $id;
        this.cedula = $cedula;
        this.pidm = $pidm;
        this.nombres = $nombres;
        this.emailI = $emailI;
        this.emailP = $emailP;
        this.direccion = $direccion;
    }

}

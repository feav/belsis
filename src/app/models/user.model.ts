export class User {

    id: number;
    username: string;
    email: string;
    nom: string;
    prenom: string;
    role: string;

    constructor(id?: number, username?: string, email?: string, name?: string, surname?: string, role?: string) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.nom = name;
        this.prenom = surname;
        this.role = role;
    }
}

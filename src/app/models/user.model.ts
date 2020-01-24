export class User {

    id: number;
    username: string;
    email: string;
    nom: string;
    prenom: string;
    role: string;
    password: string;
    avatar: string;
    totalCommande: number;
    totalPrice: number;
    user_id: number;

    constructor() {
        this.id = null;
        this.username = '';
        this.email = '';
        this.nom = '';
        this.prenom = '';
        this.role = '';
        this.totalPrice = 0;
        this.totalCommande = 0;
        this.avatar = '';
        this.password = ''
        this.user_id = null;
    }
}

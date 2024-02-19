interface User {
    _id?: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    profile_image: number;
    wallet_address?: string;
}

export default User;
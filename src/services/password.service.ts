import bcrypt from "bcrypt";

class PasswordService {
    public hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }

    public comparePassword(password: string, passwordHash: string): Promise<boolean> {
        return bcrypt.compare(password, passwordHash);
    }
}

export const passwordService = new PasswordService();

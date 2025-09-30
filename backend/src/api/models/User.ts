import bcrypt from "bcrypt";
import db from "../../common/database/connection.js";

import type { InsertableUser, Table } from "../../common/types/index.js";

class User {
    static tableName: Table = "users" as const;

    static async authenticateUser(email: string, password: string) {
        const user = await db.selectFrom("users")
            .select(["user_id", "username", "role", "email", "phone_number", "password"])
            .where("email", "=", email)
            .executeTakeFirst()

        if (!user) return null;

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) return null;

        return user;
    }

    static async addOne(user: InsertableUser) {
        const alreadyExists = await this.userExists(user.email);

        if (alreadyExists) return null;

        const result = await db.insertInto("users")
            .values(user)
            .returning("user_id")
            .executeTakeFirst();

        return result?.user_id || null;
    }

    private static async userExists(email: string) {
        const result = await db.selectFrom("users")
            .select("user_id")
            .where("email", "=", email)
            .executeTakeFirst();

        return result ? true : false;
    }

}

export default User;

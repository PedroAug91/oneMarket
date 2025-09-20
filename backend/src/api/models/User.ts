import type { Table } from "../../common/types/index.js";

class User {
    static tableName: Table = "users" as const;
    // ...
}

export default User;

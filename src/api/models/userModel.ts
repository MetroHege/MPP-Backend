import { DeleteUserResponse, PostUsersRequest, PutUserRequest, UserWithId } from "mpp-api-types";
import Database from "../../core/database/Database";
import { DBUser } from "../../types/DBTypes";
import bcrypt from "bcrypt";

const getAllUsers = async (): Promise<UserWithId[]> => {
    const users = (await Database.get("users")) as DBUser[] | null;
    return users
        ? users.map(user => ({
              id: user.id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              phone: user.phone,
              email: user.email,
              city: user.city,
              admin: user.admin,
          }))
        : [];
};

const addUser = async (user: PostUsersRequest): Promise<UserWithId | null> => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    user.password = hashedPassword;
    const id = await Database.insert("users", user);
    return id
        ? {
              id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              phone: user.phone,
              email: user.email,
              city: user.city,
          }
        : null;
};

const getUser = async (id: string): Promise<UserWithId | null> => {
    const users = await Database.get("users", id);
    const user = users?.length && (users[0] as DBUser);
    return user
        ? {
              id: user?.id,
              username: user?.username,
              firstName: user?.firstName,
              lastName: user?.lastName,
              phone: user?.phone,
              email: user?.email,
              city: user?.city,
              admin: user?.admin,
          }
        : null;
};

const updateUser = async (id: string, user: PutUserRequest): Promise<UserWithId | null> => {
    const updated = await Database.update("users", id, user);
    const updatedUser = await getUser(id);

    return updated ? updatedUser : null;
};

const deleteUser = async (id: string): Promise<DeleteUserResponse | null> => {
    const deleted = await Database.delete("users", id);
    return deleted && deleted > 0 ? { id: Number(id) } : null;
};

const login = async ({
    username,
    email,
}: {
    username?: string;
    email?: string;
}): Promise<DBUser | null> => {
    const users = await Database.query(
        `SELECT * FROM users WHERE ${username ? "username" : "email"} = ?`,
        username ? [username] : [email]
    );
    return users?.length && (users[0] as DBUser);
};

export { getAllUsers, addUser, getUser, updateUser, deleteUser, login };

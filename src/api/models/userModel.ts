import {
    DeleteUserResponse,
    PartialUser,
    PostUsersRequest,
    PutUserRequest,
    UserWithId,
} from "mpp-api-types";
import Database from "../../core/database/Database";
import { DBUser } from "../../types/DBTypes";
import bcrypt from "bcrypt";
import { deleteUserListings } from "./listingModel";
import { noop } from "../../util/util";
import config from "../../config";

const getAllUsers = async (): Promise<PartialUser[]> => {
    const users = (await Database.get("users")) as DBUser[] | null;
    return users
        ? users.map(user => ({
              id: user.id,
              username: user.username,
              city: user.city,
              admin: user.admin === 1 || user.admin === true,
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
              admin: false,
          }
        : null;
};

const getUser = async (
    id: string | number,
    partial: boolean = true
): Promise<UserWithId | PartialUser | null> => {
    const users = await Database.get("users", id);
    const user = users?.length && (users[0] as DBUser);
    return user
        ? partial
            ? {
                  id: user?.id,
                  username: user?.username,
                  city: user?.city,
                  admin: user?.admin === 1,
              }
            : {
                  id: user?.id,
                  username: user?.username,
                  firstName: user?.firstName,
                  lastName: user?.lastName,
                  phone: user?.phone,
                  email: user?.email,
                  city: user?.city,
                  admin: user?.admin === 1,
              }
        : null;
};

const updateUser = async (id: number, user: PutUserRequest): Promise<UserWithId | null> => {
    if (user.password) user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    const updated = await Database.update("users", id, user);
    const updatedUser = (await getUser(id, false)) as UserWithId | null;

    return updated ? updatedUser : null;
};

const deleteUser = async (id: number): Promise<DeleteUserResponse | null> => {
    await deleteUserListings(id);
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

const findUser = async ({
    username,
    email,
}: {
    username?: string;
    email?: string;
}): Promise<boolean> => {
    if (config.env === "test") return false;
    const users = await Database.query(
        `SELECT * FROM users WHERE ${username ? "username" : "email"} = ?`,
        username ? [username] : [email]
    ).catch(noop);
    return users?.length > 0;
};

export { getAllUsers, addUser, getUser, updateUser, deleteUser, login, findUser };

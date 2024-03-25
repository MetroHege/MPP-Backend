import mysql from "mysql2/promise";
import config from "../../config";
import { DBListing, DBUser } from "../../types/DBTypes";

type table = "users" | "listings";

const pool = mysql.createPool({
    host: config.db_host,
    user: config.db_user,
    password: config.db_password,
    database: config.db_database,
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0,
});

class Database {
    static async get(table: table, id?: number | string): Promise<null | (DBUser | DBListing)[]> {
        try {
            const query = `SELECT * FROM ${table}${id ? " WHERE id = ?" : ""}`;
            const [rows] = await pool.execute(query, id ? [id] : []);

            // @ts-ignore
            return rows.length ? rows : null;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async query(query: string, values: any[] = []): Promise<null | any> {
        try {
            const [rows] = await pool.execute(query, values);
            // @ts-ignore
            return rows.length ? rows : null;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async insert(
        table: table,
        data: Omit<DBUser | DBListing, "id">
    ): Promise<null | number> {
        try {
            const fields = Object.keys(data);
            const values = Object.values(data);
            const query = `INSERT INTO ${table} (${fields.join(", ")}) VALUES (${values
                .map(() => "?")
                .join(", ")})`;
            const [rows] = await pool.execute(query, values);
            // @ts-ignore
            return rows.insertId;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async update(
        table: table,
        id: number | string,
        data: Partial<DBUser | DBListing>
    ): Promise<null | number> {
        try {
            const fields = Object.keys(data);
            const values = Object.values(data);
            const query = `UPDATE ${table} SET ${fields
                .map(field => `${field} = ?`)
                .join(", ")} WHERE id = ?`;
            const [rows] = await pool.execute(query, [...values, id]);
            // @ts-ignore
            return rows.affectedRows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async delete(table: table, id: number | string): Promise<null | number> {
        try {
            const query = `DELETE FROM ${table} WHERE id = ?`;
            const [rows] = await pool.execute(query, [id]);
            // @ts-ignore
            return rows.affectedRows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default Database;

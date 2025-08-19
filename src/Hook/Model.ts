import { ISQLiteService } from "@/services/SQLiteService";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { ComponentInternalInstance } from "vue";
import Config from '@/config';
import { InitStatements } from '@/Migrations/init.statements';

export default abstract class Model {
    protected db!: SQLiteDBConnection;
    protected table: string; // chaque modèle définira sa table
    protected primaryKey: string = "id"; // clé primaire par défaut
    migrationBase = InitStatements;
    loadToVersion: number = InitStatements[InitStatements.length - 1].toVersion;
    protected appInstance: ComponentInternalInstance | null;
    protected sqliteService: ISQLiteService;

    constructor(appInstance: ComponentInternalInstance | null, table: string) {
        this.table = table;
        this.appInstance = appInstance;
        this.sqliteService = this.appInstance?.appContext.app.config.globalProperties.$sqliteServ;
    }

    private async init() {
        if (!this.db) {
            this.db = await this.sqliteService.openDatabase(Config.database_name, this.loadToVersion, false);
        } else {
            const isDBOpen = await this.db.isDBOpen();
            if (!isDBOpen.result) {
                this.db = await this.sqliteService.openDatabase(Config.database_name, this.loadToVersion, false);
            }
        }
    }

    private async close() {
        await this.db.close();
    }

    // Créer un enregistrement
    async create(data: Record<string, any>): Promise<number | undefined> {
        await this.init();
        const { keys, values } = this.checkTimestamp(Object.keys(data), Object.values(data));

        const placeholders = keys.map(() => "?").join(",");
        const query = `INSERT INTO ${this.table} (${keys.join(",")}) VALUES (${placeholders})`;

        const result = await this.db.run(query, values);
        await this.close();
        return result.changes?.lastId;
    }

    private checkTimestamp(keys: string[], values: any[]): { keys: string[], values: any[] } {
        /*const datetime = new Date().toISOString();

        keys.push("created_at");
        values.push(datetime);

        keys.push("updated_at");
        values.push(datetime);*/

        return { keys, values };
    }

    // Trouver un enregistrement par ID
    async find(id: number): Promise<Record<string, any> | null> {
        await this.init();
        const query = `SELECT * FROM ${this.table} WHERE ${this.primaryKey} = ? LIMIT 1`;
        const result = await this.db.query(query, [id]);
        await this.close();
        return result.values?.[0] ?? null;
    }

    // Trouver un enregistrement par ?
    async findBy(column: string, value: any): Promise<Record<string, any> | null> {
        await this.init();
        const query = `SELECT * FROM ${this.table} WHERE ${column} = ? LIMIT 1`;
        const result = await this.db.query(query, [value]);
        await this.close();
        return result.values?.[0] ?? null;
    }

    // Trouver le premier enregistrement
    async first(): Promise<Record<string, any> | null> {
        await this.init();
        const query = `SELECT * FROM ${this.table} LIMIT 1`;
        const result = await this.db.query(query);
        await this.close();
        return result.values?.[0] ?? null;
    }

    // Récupérer tous les enregistrements
    async get(): Promise<Record<string, any>[] | undefined> {
        await this.init();
        const query = `SELECT * FROM ${this.table}`;
        const result = await this.db.query(query);
        await this.close();
        return result.values;
    }

    // Supprimer un enregistrement
    async delete(id: number): Promise<boolean> {
        await this.init();
        const query = `DELETE FROM ${this.table} WHERE ${this.primaryKey} = ?`;
        const result = await this.db.run(query, [id]);
        await this.close();
        return (result.changes?.changes ?? 0) > 0;
    }

    // Supprimer tous les enregistrements
    async truncate(): Promise<boolean> {
        await this.init();
        const query = `DELETE FROM ${this.table}`;
        const result = await this.db.run(query);
        await this.close();
        return (result.changes?.changes ?? 0) > 0;
    }
}

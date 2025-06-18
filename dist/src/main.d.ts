import session from 'express-session';
export declare class DrizzleSessionStore extends session.Store {
    private readonly db;
    private readonly sessionTable;
    constructor(db: any, sessionTable: any);
    get(sid: string, callback: (err: unknown, session?: session.SessionData | null) => void): void;
    set(sid: string, session: session.SessionData, callback?: (err?: unknown) => void): void;
    destroy(sid: string, callback?: (err?: unknown) => void): void;
}

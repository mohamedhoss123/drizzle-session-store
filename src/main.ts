

import session from 'express-session';


export class DrizzleSessionStore extends session.Store {
  constructor(private readonly db: any, private readonly sessionTable: any) {

    super();
  }

  async get(sid: string, callback: (err: any, session?: session.SessionData | null) => void) {
    try {
      const result = await this.db.select().from(this.sessionTable).where({ sid }).limit(1);
      if (result.length) {
        const sess = result[0];
        callback(null, sess.session);
      } else {
        callback(null, null);
      }
    } catch (err) {
      callback(err);
    }
  }

  async set(sid: string, session: session.SessionData, callback?: (err?: any) => void) {
    try {
      const expire = new Date(session.cookie.expires as any);
      console.log({ sid, session, expire });

      await this.db.insert(this.sessionTable).values({ sid, session, expire });
      callback?.();
    } catch (err) {
      callback?.(err);
    }
  }

  async destroy(sid: string, callback?: (err?: any) => void) {
    try {
      await this.db.deleteFrom(this.sessionTable).where({ sid }).execute();
      callback?.();
    } catch (err) {
      callback?.(err);
    }
  }
}



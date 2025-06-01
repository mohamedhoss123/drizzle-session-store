import { eq } from 'drizzle-orm';
import session from 'express-session';
import { daysToMilliseconds } from '../utils';

export class DrizzleSessionStore extends session.Store {
  constructor(
    private readonly db: any,
    private readonly sessionTable: any,
  ) {
    super();
  }

  get(
    sid: string,
    callback: (err: unknown, session?: session.SessionData | null) => void,
  ) {
    this.db
      .select()
      .from(this.sessionTable)
      .where(eq(this.sessionTable.sid, sid))
      .limit(1)
      .then((result) => {
        if (result.length > 0) {
          const [sess] = result;
          callback(null, sess.session as session.SessionData);
        } else {
          callback(null, null);
        }
      })
      .catch((err: unknown) => {
        callback(err);
      });
  }

  set(
    sid: string,
    session: session.SessionData,
    callback?: (err?: unknown) => void,
  ) {
    const {
      cookie: { maxAge },
    } = session;

    const expires = new Date(Date.now() + (maxAge ?? daysToMilliseconds(90)));

    this.db
      .insert(this.sessionTable)
      .values({ sid, session, expires })
      .then(() => {
        callback?.();
      })
      .catch((err: unknown) => {
        callback?.(err);
      });
  }

  destroy(sid: string, callback?: (err?: unknown) => void) {
    this.db
      .delete(this.sessionTable)
      .where(eq(this.sessionTable.sid, sid))
      .execute()
      .then(() => {
        callback?.();
      })
      .catch((err: unknown) => {
        callback?.(err);
      });
  }
}

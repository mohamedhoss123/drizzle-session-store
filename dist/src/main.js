"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrizzleSessionStore = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const express_session_1 = __importDefault(require("express-session"));
const utils_1 = require("../utils");
class DrizzleSessionStore extends express_session_1.default.Store {
    constructor(db, sessionTable) {
        super();
        this.db = db;
        this.sessionTable = sessionTable;
    }
    get(sid, callback) {
        this.db
            .select()
            .from(this.sessionTable)
            .where((0, drizzle_orm_1.eq)(this.sessionTable.sid, sid))
            .limit(1)
            .then((result) => {
            if (result.length > 0) {
                const [sess] = result;
                callback(null, sess.session);
            }
            else {
                callback(null, null);
            }
        })
            .catch((err) => {
            callback(err);
        });
    }
    set(sid, session, callback) {
        const { cookie: { maxAge }, } = session;
        const expires = new Date(Date.now() + (maxAge !== null && maxAge !== void 0 ? maxAge : (0, utils_1.daysToMilliseconds)(90)));
        this.db
            .insert(this.sessionTable)
            .values({ sid, session, expires })
            .then(() => {
            callback === null || callback === void 0 ? void 0 : callback();
        })
            .catch((err) => {
            callback === null || callback === void 0 ? void 0 : callback(err);
        });
    }
    destroy(sid, callback) {
        this.db
            .delete(this.sessionTable)
            .where((0, drizzle_orm_1.eq)(this.sessionTable.sid, sid))
            .execute()
            .then(() => {
            callback === null || callback === void 0 ? void 0 : callback();
        })
            .catch((err) => {
            callback === null || callback === void 0 ? void 0 : callback(err);
        });
    }
}
exports.DrizzleSessionStore = DrizzleSessionStore;

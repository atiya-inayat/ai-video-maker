// we declare types inside this file 
// it is a TypeScript declaration file Its only job is to teach TypeScript about things that exist globally.

import { Connection } from "mongoose";

declare global {
    var mongoose: {
        conn: Connection | null;
        promise: Promise<Connection> | null
    }
}

export {}
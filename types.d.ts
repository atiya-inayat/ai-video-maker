// we declare types inside this file 
// it is a TypeScript declaration file Its only job is to teach TypeScript about things that exist globally.

import { Connection } from "mongoose";

declare global { // it means I want to add something to the global scope of Node.js.
    var mongoose: { // global variable - not mongoose library - This is our own object to store connection info
        conn: Connection | null; // conn - stores the connection object if connection succeeds, otherwise it remains null.
        promise: Promise<Connection> | null // promise stores a pending database connection - While MongoDB is connecting, we store the promise
    }
}

export {}
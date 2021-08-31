import { PostgresPubSub } from "graphql-postgres-subscriptions";
import { Client } from "pg";

let pubsub;

try {
  const connectionString = process.env.DATABASE_URL
  const client = new Client({ connectionString });
  client.connect();
  pubsub = new PostgresPubSub({ client });
  
} catch (error) {
  console.log('Subscriptions database not connected', error);
}

export default pubsub
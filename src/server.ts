import { Application } from "./app";
import { ENV_APP_PORT_REST } from "./util/secrets.util";

const app = new Application(ENV_APP_PORT_REST);

app.start();

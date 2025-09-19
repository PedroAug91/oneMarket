import app from "./app.js";
import env from "./common/env.js";

const PORT = env.node_port || 3000;
app.listen(PORT, () => {
    console.log(`[HEALTH CHECK] - Server running at ${PORT}`);
});

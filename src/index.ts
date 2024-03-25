import config from "./config";
import app from "./app";
import debux from "debux";

app.listen(config.port, () => {
    debux().info(`Listening on port: ${config.port}`, {
        class: "app",
        function: "listen",
    });
});

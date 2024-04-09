import { readFileSync } from "fs";

export default {
    cert:
        process.env.NODE_ENV === "production"
            ? readFileSync(
                  "/etc/letsencrypt/live/divarinet.northeurope.cloudapp.azure.com/fullchain.pem"
              )
            : "",
    key:
        process.env.NODE_ENV === "production"
            ? readFileSync(
                  "/etc/letsencrypt/live/divarinet.northeurope.cloudapp.azure.com/privkey.pem"
              )
            : "",
};

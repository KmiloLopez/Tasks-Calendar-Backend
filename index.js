import app from "./src/app.js";
import { BPORT } from "./src/config.js";
import { connectDB } from "./src/db.js";

connectDB();
app.listen(BPORT, () => {
  console.log("listening on por port:4000");
});

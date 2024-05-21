import app from "./src/app.js";
import { PORT } from "./src/config.js";
import { connectDB } from "./src/db.js";

connectDB();
app.listen(PORT, () => {
  console.log("listening on por port:4000");
});

import express from "express";
import path from "path";
import { viewsRouter } from "./routes/views.routes.js";
import { mainRouter } from "./routes/main.routes.js";
import { serverConfig } from "./config.js";
import { model } from "./model/model.js";


const app = express();
const PORT = serverConfig.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));
app.use(express.static(path.join(process.cwd(), "public")));
app.use(model);
// app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use("/api", mainRouter);

app.use(viewsRouter);
app.use((req, res) => res.render("error.ejs", {title: "Url not found!"}));

app.listen(PORT, () => console.log(`server started at http://localhost:${PORT}`));


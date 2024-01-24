import authRouter from "./auth";
import categoryRouter from "./category";
import postRouter from "./post";
import insertRouter from "./insert";

const initRoutes = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/category", categoryRouter);
  app.use("/api/v1/post", postRouter);
  app.use("/api/v1/insert", insertRouter);
  return app.use("/", (req, res) => {
    res.send("server on...");
  });
};

export default initRoutes;

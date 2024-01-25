import authRouter from "./auth";
import categoryRouter from "./category";
import postRouter from "./post";
import insertRouter from "./insert";
import priceRouter from "./price";
import acreageRouter from "./acreage";

const initRoutes = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/category", categoryRouter);
  app.use("/api/v1/post", postRouter);
  app.use("/api/v1/insert", insertRouter);
  app.use("/api/v1/price", priceRouter);
  app.use("/api/v1/acreage", acreageRouter);
  return app.use("/", (req, res) => {
    res.send("server on...");
  });
};

export default initRoutes;

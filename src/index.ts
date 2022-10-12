import path from "path";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { initDB } from "./db";
import { farmlandRouter } from "./routes/farmland";
import { sweetNothingsRouter } from "./routes/sweetNothings";
import { createLogger } from "./utils/logger";
import { menstruationRouter } from "./routes/menstruation";

const morganLog4js = createLogger("morgan");
const logger = morgan("tiny", {
  stream: {
    write: (str: string) => {
      morganLog4js.debug(str.replace(/\r?\n/g, ""));
    },
  },
});
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger);

// 首页
app.use("/admin", express.static(path.join(__dirname, "../admin")));
app.get("/", async (_, res) => {
  res.sendFile(path.join(__dirname, "../admin/index.html"));
});

// 小程序调用，获取微信 Open ID
app.get("/api/wx_openid", async (req, res) => {
  if (req.headers["x-wx-source"]) {
    res.send(req.headers["x-wx-openid"]);
  }
});

// 情话 API
app.use(sweetNothingsRouter);

// 农场 API
app.use(farmlandRouter);

// 经期 API
app.use(menstruationRouter);

const port = process.env.PORT || 80;

async function bootstrap() {
  await initDB();
  app.listen(port, () => {
    console.log("兔头和小刺猬的云端树屋 - 启动成功！端口：", port);
  });
}

bootstrap();

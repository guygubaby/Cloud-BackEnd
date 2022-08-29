const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { Sequelize } = require("sequelize");
const { 
  init: initDB, 
  SweetNothings,
  Crops,
} = require("./db");

const logger = morgan("tiny");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger);

// 首页
app.use('/admin', express.static (path.join(__dirname, "../admin-view")))
app.get("/", async (_, res) => {
  res.sendFile(path.join(__dirname, "../admin-view/index.html"));
});


// 小程序调用，获取微信 Open ID
app.get("/api/wx_openid", async (req, res) => {
  if (req.headers["x-wx-source"]) {
    res.send(req.headers["x-wx-openid"]);
  }
});

// 记录情话
app.post('/api/sweet-nothings', async (req, res) => {
  const sentences = req.body.sentences ?? []
  try {
    await Promise.all(
      sentences.map(async sentence => {
        const sweet = await SweetNothings.create({ sentence })
        console.log(`添加了一句情话：${sweet.sentence}`)
      })
    )
    res.json({ statusMsg: '添加情话成功！' })
  } catch (error) {
    res.status(400)
    res.json({ statusMsg: '添加情话失败！', errMsg: String(err) })
  }
})

// 获取一句情话
app.get('/api/sweet-nothings', async (_, res) => {
  try {
    const randomRecord = await SweetNothings.findOne({
      order: [Sequelize.literal('rand()')]
    })
    if (randomRecord.sentence) {
      res.json({
        statusMsg: '获取情话成功！',
        sentence: randomRecord.sentence,
      })
    } else {
      throw Error('情话记录没有 sentence 字段！')
    }
  } catch (err) {
    res.json({
      statusMsg: '获取情话失败！',
      errMsg: String(err)
    })
  }
})

app.post('/api/init-farmland', async (_, res) => {
  const initData = require('./data/crops-init-data')
  try {
    await Promise.all(
      initData
        .map(async crop => {
          await Crops.create(crop)
        })
    )
    res.json({
      statusMsg: '初始化农场成功！',
    })
  } catch (err) {
    res.status(400)
    res.json({
      statusMsg: '初始化农场失败！',
      errMsg: String(err)
    })
  }
})

const port = process.env.PORT || 80;

async function bootstrap() {
  await initDB();
  app.listen(port, () => {
    console.log("兔头和小刺猬的云端树屋 - 启动成功！", port);
  });
}

bootstrap();

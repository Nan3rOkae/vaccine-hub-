const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { BadRequestError, NotFoundError } = require("./utils/errors");

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan("tiny"));

app.use((req, res, next) => {
  return next(new NotFoundError());
});

app.use((error, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    erorr: { message, status },
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀Server running http://localhost:$(PORT)`);
});

import session from "express-session";
import express from "express";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";
import "./passport.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import path from "path";

// Routes
import authRoutes from "./routes/AuthRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import productRoutes from "./routes/ProductRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";
import colorRoutes from "./routes/ColorRoutes.js";
import brandRoutes from "./routes/BrandRoutes.js";
import uploadRoutes from "./routes/UploadRoutes.js";
import orderRoutes from "./routes/OrderRoutes.js";
import bannerRoutes from "./routes/BannerRoutes.js";

// Multer
import multer from "multer";
multer({ dest: "/uploads" });

dotenv.config();

const app = express();

try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected To DB ...");
} catch (error) {
  console.log(error);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secretkeysession",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: [
      "http://localhost:5000",
      "http://localhost:3000",
      "http://localhost:3001",
      "https://firebasestorage.googleapis.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(cookieParser());

const __dirname = path.resolve();
app.use("/", express.static(path.join(__dirname, "/uploads")));

app.use("/auth", authRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/colors", colorRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/banners", bannerRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use("/uploads", express.static("/var/data/uploads"));
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  const __dirname = path.resolve();
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { getBioData, PROJECTS, getSlug, findProjectBySlug } from "./constants";
import { Language } from "./types";

const app = express();
const PORT = 3000;

app.use(express.json());

// API: Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// API: Gemini Chat Proxy
app.post("/api/chat", async (req, res) => {
  try {
    const { message, lang } = req.body as { message: string; lang: Language };

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY environment variable is missing.");
      return res.status(500).json({
        error: lang === "vi" 
          ? "API Key cho Gemini chưa được cấu hình." 
          : "Gemini API Key is not configured."
      });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const bioData = getBioData(lang || "vi");
    const systemInstruction = `You are an AI assistant for Thanh Phương's portfolio. 
Your goal is to answer questions about Phuong's skills, experience, and projects professionally in ${lang === "en" ? "English" : "Vietnamese"}.
Use the following bio data: ${bioData}. 
Respond in ${lang === "en" ? "English" : "Vietnamese"}.
Keep your answers concise, engaging, and professional. If you don't know something specific about him, invite the user to contact him directly via the email listed on the site.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || (lang === "en" ? "I'm sorry, I couldn't process that request." : "Xin lỗi, tôi không thể xử lý yêu cầu này.");
    res.json({ reply });
  } catch (error) {
    console.error("Gemini server error:", error);
    res.status(500).json({
      error: req.body?.lang === "en"
        ? "The AI assistant is currently offline. Please try again later!"
        : "Trợ lý AI hiện đang ngoại tuyến. Vui lòng thử lại sau!"
    });
  }
});

// SEO Route for Project Detail Page
async function handleSEORequest(req: express.Request, res: express.Response, next: express.NextFunction, viteInstance: any) {
  try {
    const rawUrl = req.originalUrl || req.url || "";
    const urlPath = rawUrl.split("?")[0];
    const rawHost = req.headers["x-forwarded-host"] || req.headers.host || "";
    const host = (Array.isArray(rawHost) ? rawHost[0] : rawHost.split(",")[0]).trim() || "localhost:3000";
    const protocol = (req.headers["x-forwarded-proto"] as string) || "https";
    const fullUrl = `${protocol}://${host}${urlPath}`;

    const defaultTitle = "Thanh Phuong | Full-Stack Software Engineer";
    const defaultDesc = "Portfolio of Thanh Phuong, a Full-Stack Software Engineer with experience building scalable web applications using React, Next.js, Node.js, TypeScript, and modern backend technologies.";
    const defaultImage = "https://res.cloudinary.com/thanhphuongdev/image/upload/v1783936804/Screenshot_2026-07-13_165801_z65ck1.png";

    let seoTitle = defaultTitle;
    let seoDesc = defaultDesc;
    let seoImage = defaultImage;
    let seoType = "website";
    let seoKeywords: string[] = ["Full-Stack", "Software Engineer", "React", "Next.js", "Node.js", "TypeScript"];

    if (urlPath.startsWith("/project/")) {
      const slug = urlPath.replace(/^\/project\/?/, "").replace(/\/$/, "");
      const project = findProjectBySlug(slug);

      if (project) {
        const subtitleText = project.subtitle?.vi || project.subtitle?.en || project.role?.vi || project.role?.en || "Dự án";
        seoTitle = `${project.title} - ${subtitleText} | Hồ Văn Thanh Phương`;
        const rawDesc = project.description?.vi || project.description?.en || defaultDesc;
        seoDesc = rawDesc.replace(/\*\*/g, "").trim();
        
        const firstImg = (project.images && project.images.length > 0) ? project.images[0] : (project.image || defaultImage);
        seoImage = firstImg.startsWith("http") ? firstImg : `${protocol}://${host}${firstImg.startsWith("/") ? "" : "/"}${firstImg}`;
        seoType = "article";
        if (project.tags) {
          seoKeywords = [...project.tags, "Fullstack Engineer", "Ho Van Thanh Phuong", "Portfolio"];
        }
      }
    }

    const indexPath = process.env.NODE_ENV === "production"
      ? path.join(process.cwd(), "dist", "index.html")
      : path.join(process.cwd(), "index.html");

    if (!fs.existsSync(indexPath)) {
      return res.status(404).send("Not Found");
    }

    let rawHtml = "";
    try {
      rawHtml = fs.readFileSync(indexPath, "utf8");
    } catch (e) {
      console.error("Error reading index.html:", e);
      return res.status(500).send("Error loading index.html");
    }

    if (viteInstance && process.env.NODE_ENV !== "production") {
      try {
        rawHtml = await viteInstance.transformIndexHtml(rawUrl, rawHtml);
      } catch (e) {
        console.error("Error running transformIndexHtml:", e);
      }
    }

    const safeTitle = seoTitle.replace(/"/g, "&quot;");
    const safeDesc = seoDesc.replace(/"/g, "&quot;");
    const safeImage = seoImage;
    const safeUrl = fullUrl;

    const seoMetaBlock = `
    <!-- Dynamic Server-Side Injected Meta Tags for Facebook / Zalo / Google Crawlers -->
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDesc}">
    <meta name="keywords" content="${seoKeywords.join(", ")}">
    <link rel="canonical" href="${safeUrl}">

    <!-- Open Graph / Facebook / Zalo -->
    <meta property="og:type" content="${seoType}">
    <meta property="og:site_name" content="Hồ Văn Thanh Phương | Full-Stack Engineer">
    <meta property="og:title" content="${safeTitle}">
    <meta property="og:description" content="${safeDesc}">
    <meta property="og:image" content="${safeImage}">
    <meta property="og:image:secure_url" content="${safeImage}">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:url" content="${safeUrl}">
    <meta property="og:locale" content="vi_VN">
    <meta property="og:locale:alternate" content="en_US">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${safeTitle}">
    <meta name="twitter:description" content="${safeDesc}">
    <meta name="twitter:image" content="${safeImage}">

    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "${seoType === "article" ? "SoftwareApplication" : "Person"}",
      "name": "${safeTitle}",
      "description": "${safeDesc}",
      "image": "${safeImage}",
      "url": "${safeUrl}",
      "author": {
        "@type": "Person",
        "name": "Ho Van Thanh Phuong",
        "jobTitle": "Full-Stack Software Engineer"
      }
    }
    </script>
`;

    let cleanHtml = rawHtml
      .replace(/<title>[\s\S]*?<\/title>/gi, "")
      .replace(/<meta\s+name="description"[\s\S]*?>/gi, "")
      .replace(/<meta\s+property="og:[\s\S]*?>/gi, "")
      .replace(/<meta\s+name="twitter:[\s\S]*?>/gi, "")
      .replace(/<meta\s+property="twitter:[\s\S]*?>/gi, "")
      .replace(/<link\s+rel="canonical"[\s\S]*?>/gi, "");

    const finalHtml = cleanHtml.replace(/<head>/i, `<head>\n${seoMetaBlock}`);

    res.setHeader("Content-Type", "text/html");
    return res.status(200).send(finalHtml);
  } catch (err) {
    console.error("Error serving SEO HTML:", err);
    return res.status(200).send("<!DOCTYPE html><html><head><title>Thanh Phuong</title></head><body><div id='root'></div></body></html>");
  }
}

async function startServer() {
  let viteInstance: any = null;

  // 1. Specific SEO Route for Project Detail Pages
  app.get(/^\/project(?:\/.*)?$/, (req, res, next) => handleSEORequest(req, res, next, viteInstance));

  // 2. Vite Middleware for Development or Static Files for Production
  if (process.env.NODE_ENV !== "production") {
    viteInstance = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(viteInstance.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();

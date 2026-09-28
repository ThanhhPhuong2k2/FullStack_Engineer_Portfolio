import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project, Language } from "../types";
import { SKILLS, PROJECTS } from "../constants";
import ProjectCard from "./ProjectCard";
import {
  X,
  ExternalLink,
  Calendar,
  Briefcase,
  Award,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Cpu,
  Layers,
  Sparkles,
  Star,
  Eye,
  Share2,
  Copy,
  MapPin,
  User,
  Terminal,
  Check,
  FileText,
  MessageSquare,
  Heart,
  Info,
  Activity,
  Database,
  ArrowLeft,
} from "lucide-react";

interface ProjectDetailViewProps {
  project: Project | null;
  onClose: () => void;
  lang: Language;
  toggleLanguage: () => void;
  onSelectProject?: (project: Project) => void;
}

const techDetails: Record<
  string,
  { role: { en: string; vi: string }; category: string }
> = {
  "Next.js": {
    category: "Framework",
    role: {
      en: "Frontend React framework for production-grade Server-Side Rendering (SSR) & Static Site Generation (SSG).",
      vi: "Framework React hỗ trợ kết xuất phía máy chủ (SSR) & tạo trang tĩnh (SSG) chuẩn doanh nghiệp.",
    },
  },
  "React.js": {
    category: "Library",
    role: {
      en: "Component-based UI library used to build highly interactive responsive client interfaces.",
      vi: "Thư viện giao diện người dùng dạng component để xây dựng giao diện khách hàng tương tác cao.",
    },
  },
  "Express.js": {
    category: "Backend",
    role: {
      en: "Robust backend framework in Node.js for structuring scalable REST APIs, handlers & middleware layers.",
      vi: "Framework backend mạnh mẽ trên Node.js để cấu trúc REST API & các lớp middleware mở rộng.",
    },
  },
  "Tailwind CSS": {
    category: "Styling",
    role: {
      en: "Utility-first styling system used for crafting customized responsive layouts with pixel precision.",
      vi: "Hệ thống CSS tiện ích để thiết kế bố cục đáp ứng, tùy chỉnh với độ chính xác cao.",
    },
  },
  MongoDB: {
    category: "Database",
    role: {
      en: "Scalable NoSQL database used to store flexible document models and execute high-performance aggregate queries.",
      vi: "Cơ sở dữ liệu NoSQL mở rộng dùng để lưu trữ mô hình tài liệu linh hoạt và truy vấn hiệu năng cao.",
    },
  },
  Kafka: {
    category: "Messaging",
    role: {
      en: "Event streaming platform used to build high-throughput, asynchronous message queues and order distribution.",
      vi: "Nền tảng truyền dữ liệu sự kiện dùng để xây dựng hàng đợi tin nhắn bất đồng bộ & phân phối đơn hàng.",
    },
  },
  Wagmi: {
    category: "Web3 / Blockchain",
    role: {
      en: "Powerful React hooks library for Ethereum, simplifying smart wallet authentication and contract actions.",
      vi: "Thư viện React hook mạnh mẽ cho Ethereum, đơn giản hóa kết nối ví và tương tác hợp đồng.",
    },
  },
  VNPay: {
    category: "Payment Gateway",
    role: {
      en: "Integrated official secure fintech gateway for credit cards, ATM accounts and real-time bank QR transfers.",
      vi: "Tích hợp cổng fintech chính thức bảo mật cho giao dịch thẻ tín dụng, ATM và chuyển khoản QR ngân hàng.",
    },
  },
  ACB: {
    category: "Banking API",
    role: {
      en: "Asia Commercial Bank gateway integration for direct ledger banking transfers and automated reconciliations.",
      vi: "Tích hợp cổng Ngân hàng Á Châu (ACB) cho giao dịch chuyển khoản và đối soát sổ cái tự động.",
    },
  },
  "Ant Design": {
    category: "UI Toolkit",
    role: {
      en: "Enterprise-grade React component library offering rich input forms, data tables, and dashboards.",
      vi: "Thư viện thành phần React chuẩn doanh nghiệp cung cấp form nhập liệu, bảng dữ liệu và dashboard.",
    },
  },
  "Web3.js": {
    category: "Web3 / Blockchain",
    role: {
      en: "Standard decentralized Javascript library utilized to interact with Ethereum blockchain networks.",
      vi: "Thư viện Javascript phi tập trung tiêu chuẩn dùng để tương tác với mạng lưới chuỗi khối Ethereum.",
    },
  },
  Blockchain: {
    category: "Web3 / Blockchain",
    role: {
      en: "Decentralized distributed ledger network securing transactions and executing smart contracts.",
      vi: "Mạng sổ cái phân tán phi tập trung bảo mật các giao dịch và thực thi hợp đồng thông minh.",
    },
  },
};

const PROJECT_CUSTOM_DATA: Record<
  string,
  {
    metrics: {
      type: { en: string; vi: string };
      status: { en: string; vi: string };
      duration: { en: string; vi: string };
      role: { en: string; vi: string };
      teamSize: { en: string; vi: string };
    };
    techStack: {
      frontend: string[];
      backend: string[];
      database: string[];
      architecture: string[];
      integration: string[];
    };
    responsibilities: Array<{
      title: { en: string; vi: string };
      desc: { en: string; vi: string };
      accent: string;
    }>;
    backendContributions: Array<{ en: string; vi: string }>;
    frontendContributions: Array<{ en: string; vi: string }>;
    challenges: Array<{
      title: { en: string; vi: string };
      color: string;
      items: Array<{ en: string; vi: string }>;
    }>;
  }
> = {
  TokenMall: {
    metrics: {
      type: {
        en: "Multi-Vendor E-Commerce Platform",
        vi: "Thương mại điện tử Multi-Vendor",
      },
      status: { en: "Production", vi: "Production" },
      duration: { en: "7/2024 to present", vi: "7/2024 đến hiện tại" },
      role: { en: "Full Stack Developer", vi: "Lập trình viên Full Stack" },
      teamSize: { en: "15 members", vi: "15 thành viên" },
    },
    techStack: {
      frontend: [
        "• Next.js + TypeScript",
        "• Ant Design / Tailwind",
        "• Redux Toolkit",
      ],
      backend: ["• Node.js + Express", "• REST APIs", "• CommonJS"],
      database: ["• MongoDB", "• MongoDB Driver", "• ACID Transactions"],
      architecture: [
        "• Apache Kafka",
        "• REST API",
        "• JWT & RBAC Auth",
        "• Web3.js Blockchain",
      ],
      integration: [
        "• VNPAY, VietQR & ACB",
        "• GHN / GHTK API",
        "• Cloudinary CDN",
        "• NFT Vouchers",
      ],
    },
    responsibilities: [
      {
        title: { en: "Database Design", vi: "Thiết kế database" },
        desc: {
          en: "Architected structural database schemas for highly relational systems.",
          vi: "Thiết kế sơ đồ cấu trúc dữ liệu tối ưu cho các hệ thống quan hệ.",
        },
        accent: "sky",
      },
      {
        title: { en: "Build REST APIs", vi: "Xây dựng REST API" },
        desc: {
          en: "Engineered high-throughput endpoints with clean standard structures.",
          vi: "Xây dựng các điểm cuối dữ liệu hiệu năng cao với cấu trúc chuẩn.",
        },
        accent: "emerald",
      },
      {
        title: { en: "JWT Authentication", vi: "JWT Authentication" },
        desc: {
          en: "Configured stateless security sessions via JWT tokens & secure cookies.",
          vi: "Tích hợp xác thực phiên bảo mật phi trạng thái qua token JWT.",
        },
        accent: "indigo",
      },
      {
        title: {
          en: "Role-Based Access Control (RBAC)",
          vi: "Phân quyền (RBAC)",
        },
        desc: {
          en: "Implemented strict user roles permissions validation layers.",
          vi: "Phát triển các lớp lọc và phân quyền người dùng chặt chẽ.",
        },
        accent: "purple",
      },
      {
        title: { en: "Cloudinary Image Upload", vi: "Upload ảnh Cloudinary" },
        desc: {
          en: "Integrated secure media delivery, resize & upload mechanisms.",
          vi: "Tích hợp cổng quản lý và truyền tải tệp tin đa phương tiện.",
        },
        accent: "rose",
      },
      {
        title: { en: "Responsive UI Design", vi: "Responsive UI" },
        desc: {
          en: "Optimized seamless adaptive pages across complex viewports.",
          vi: "Tối ưu hóa khả năng hiển thị đồng bộ trên mọi kích cỡ màn hình.",
        },
        accent: "amber",
      },
      {
        title: {
          en: "VNPAY Gateway Integration",
          vi: "Tích hợp VNPAY, thanh toán trực tiếp",
        },
        desc: {
          en: "Integrated secure instant direct IPN payment processing systems.",
          vi: "Tích hợp cổng thanh toán trực tiếp VNPAY, xử lý IPN tức thời.",
        },
        accent: "emerald",
      },
      {
        title: { en: "GHN & GHTK Deliveries", vi: "Tích hợp GHN, GHTK" },
        desc: {
          en: "Synchronized dynamic shipment rates and live tracking status.",
          vi: "Đồng bộ giá cước vận chuyển và cập nhật trạng thái đơn hàng động.",
        },
        accent: "sky",
      },
      {
        title: {
          en: "Kafka for Payments & Notifications",
          vi: "Kafka cho thanh toán & notification",
        },
        desc: {
          en: "Engineered asynchronous message pipelines for decoupled scaling.",
          vi: "Xây dựng hàng đợi thông điệp bất đồng bộ cho thanh toán & thông báo.",
        },
        accent: "indigo",
      },
      {
        title: { en: "Performance Optimization", vi: "Tối ưu hiệu năng" },
        desc: {
          en: "Boosted performance with Redis caching, indexes and lazy loading.",
          vi: "Cải thiện tốc độ phản hồi bằng Redis caching, lập chỉ mục và trì hoãn tải.",
        },
        accent: "teal",
      },
    ],
    backendContributions: [
      {
        en: "Seller registration system & onboarding approval pipelines.",
        vi: "Quản lý Seller và quy trình đăng ký/duyệt Seller.",
      },
      {
        en: "Affiliate tracking networks with multi-tier commission computations.",
        vi: "Phát triển hệ thống Affiliate và tính toán hoa hồng.",
      },
      {
        en: "Web3 NFT Voucher generation and smart contracts state syncing.",
        vi: "Xây dựng Voucher NFT và tích hợp blockchain.",
      },
      {
        en: "Order flow state-machine to handle complex end-to-end lifecycles.",
        vi: "Quản lý đơn hàng và vòng đời đơn hàng.",
      },
      {
        en: "Unified template engines for Email, SMS OTP, and active Push Notifications.",
        vi: "Tích hợp gửi Email/OTP/Notification.",
      },
      {
        en: "Structured centralized request logs & global exception catching handlers.",
        vi: "Logging và xử lý exception.",
      },
      {
        en: "Declarative request validation schemas ensuring payload consistency.",
        vi: "Validation dữ liệu đầu vào.",
      },
      {
        en: "Interactive API documentation using Swagger & OpenAPI structures.",
        vi: "API documentation (Swagger/OpenAPI).",
      },
    ],
    frontendContributions: [
      {
        en: "Admin control panels & dynamic interactive Seller dashboard views.",
        vi: "Xây dựng giao diện Admin và Seller Dashboard.",
      },
      {
        en: "React Query (TanStack) & Redux Toolkit sync for server state cache caching.",
        vi: "Tích hợp React Query/Redux để quản lý state.",
      },
      {
        en: "UX optimization (dynamic skeleton screen fallbacks, route chunk lazy loading).",
        vi: "Tối ưu trải nghiệm người dùng (loading, skeleton, lazy loading...).",
      },
    ],
    challenges: [
      {
        title: {
          en: "Shared Identity System",
          vi: "Hệ thống định danh dùng chung",
        },
        color: "emerald",
        items: [
          {
            en: "Designed and implemented a centralized identity system using JWT Authentication and RBAC, supporting multiple platforms including TokenMall and Risegate.",
            vi: "Thiết kế và triển khai hệ thống định danh tập trung sử dụng JWT Authentication và RBAC, hỗ trợ nhiều nền tảng bao gồm TokenMall và Risegate.",
          },
          {
            en: "Successfully served approximately 5,000 users with a scalable and maintainable authentication architecture.",
            vi: "Phục vụ thành công khoảng 5.000 người dùng với kiến trúc xác thực có khả năng mở rộng và dễ bảo trì.",
          },
        ],
      },
      {
        title: {
          en: "Payment & Shipping Reliability",
          vi: "Độ tin cậy thanh toán & Vận chuyển",
        },
        color: "teal",
        items: [
          {
            en: "Implemented Kafka-driven asynchronous processing for payment events, notifications, and shipping updates.",
            vi: "Triển khai xử lý bất đồng bộ dựa trên Kafka cho các sự kiện thanh toán, thông báo và cập nhật giao hàng.",
          },
          {
            en: "Improved system reliability and scalability when handling high-volume transaction workflows.",
            vi: "Nâng cao độ tin cậy và khả năng mở rộng của hệ thống khi xử lý quy trình giao dịch khối lượng lớn.",
          },
        ],
      },
    ],
  },
  "Verify Document": {
    metrics: {
      type: {
        en: "Blockchain Document Verification Platform",
        vi: "Nền tảng xác thực tài liệu số Blockchain",
      },
      status: { en: "Production", vi: "Production" },
      duration: { en: "4/2025", vi: "4/2025" },
      role: { en: "Full Stack Developer", vi: "Lập trình viên Full Stack" },
      teamSize: { en: "3 members", vi: "3 thành viên" },
    },
    techStack: {
      frontend: [
        "• Next.js + TypeScript",
        "• React.js + Tailwind CSS",
        "• shadcn/ui components",
      ],
      backend: ["• NestJS", "• RESTful APIs", "• Node.js"],
      database: ["• MongoDB", "• Mongoose ODM"],
      architecture: [
        "• JWT Authentication",
        "• Role-Based Access Control (RBAC)",
        "• Blockchain Transaction Verification",
      ],
      integration: [
        "• MetaDAP Enterprise Blockchain",
        "• Smart Contract Integration",
        "• QR Code Verification",
      ],
    },
    responsibilities: [
      {
        title: { en: "Database Schema Design", vi: "Thiết kế database" },
        desc: {
          en: "Designed and optimized MongoDB database schemas for document management and verification workflows.",
          vi: "Thiết kế và tối ưu sơ đồ dữ liệu MongoDB cho quản lý tài liệu và quy trình xác thực.",
        },
        accent: "sky",
      },
      {
        title: { en: "Build RESTful APIs", vi: "Xây dựng RESTful API" },
        desc: {
          en: "Developed high-throughput NestJS endpoints for document uploading, verification, and roles management.",
          vi: "Xây dựng các API NestJS xử lý tải tệp, kiểm tra tính toàn vẹn và phân quyền tài liệu.",
        },
        accent: "emerald",
      },
      {
        title: { en: "JWT Authentication", vi: "Xác thực JWT" },
        desc: {
          en: "Configured secure user authentication and access levels based on JWT tokens.",
          vi: "Triển khai cơ chế xác thực JWT bảo mật và lưu giữ phiên đăng nhập an toàn.",
        },
        accent: "indigo",
      },
      {
        title: { en: "Role-Based Access Control (RBAC)", vi: "Phân quyền nâng cao (RBAC)" },
        desc: {
          en: "Implemented strict validation layers to regulate administrative and public verification privileges.",
          vi: "Thiết kế các bộ lọc và phân quyền người dùng giữa nhà quản trị và khách truy cập.",
        },
        accent: "purple",
      },
      {
        title: { en: "Blockchain Integration", vi: "Tích hợp Blockchain" },
        desc: {
          en: "Connected backend to MetaDAP Enterprise Blockchain to sign, store, and query authentic digital record proofs.",
          vi: "Tích hợp chuỗi khối doanh nghiệp MetaDAP để ghi lại chữ ký và đối chiếu tài liệu số.",
        },
        accent: "rose",
      },
      {
        title: { en: "QR Code Verification", vi: "Xác thực nhanh qua QR" },
        desc: {
          en: "Built mobile-friendly scanning workflows allowing users to verify physical documents on-the-go.",
          vi: "Xây dựng cổng quét mã QR tiện lợi giúp xác thực tài liệu nhanh bằng thiết bị di động.",
        },
        accent: "amber",
      },
      {
        title: { en: "SEO & Performance Tuning", vi: "Tối ưu hóa SEO & Hiệu năng" },
        desc: {
          en: "Fine-tuned rendering, server caching, and meta tags for optimized search engine indexing and page load speed.",
          vi: "Tối ưu hóa khả năng kết xuất, bộ nhớ đệm và thẻ meta giúp nâng cao khả năng hiển thị tìm kiếm.",
        },
        accent: "teal",
      },
    ],
    backendContributions: [
      {
        en: "Engineered secure NestJS controllers, providers, modules, and guards.",
        vi: "Xây dựng cấu trúc module, controller, provider và guard trên NestJS bảo mật.",
      },
      {
        en: "Implemented robust cryptography algorithms to hash digital files before blockchain ledger recording.",
        vi: "Thiết kế các thuật toán mã hóa băm dữ liệu tệp tin trước khi đẩy lên sổ cái blockchain.",
      },
      {
        en: "Optimized database query performance, indexing, and REST API response times.",
        vi: "Tối ưu hóa cấu trúc truy vấn, tạo chỉ mục MongoDB và nâng cao tốc độ phản hồi API.",
      },
    ],
    frontendContributions: [
      {
        en: "Built highly responsive administrative dashboards using React, Next.js, and Tailwind CSS.",
        vi: "Phát triển bảng điều khiển quản trị tương thích cao sử dụng React, Next.js và Tailwind CSS.",
      },
      {
        en: "Designed beautiful, user-friendly document upload and instant verification status interfaces.",
        vi: "Xây dựng giao diện kéo thả tải tài liệu và màn hình hiển thị trạng thái đối soát rõ ràng.",
      },
      {
        en: "Integrated lightweight client-side QR scanning and validation libraries.",
        vi: "Tích hợp bộ thư viện quét mã QR và xác thực trọng lượng nhẹ hoạt động mượt mà.",
      },
    ],
    challenges: [
      {
        title: {
          en: "Immutable Blockchain Verification",
          vi: "Xác thực sổ cái Blockchain không thể sửa đổi",
        },
        color: "emerald",
        items: [
          {
            en: "Challenge: Building a fast, secure, and reliable pipeline that registers document hashes on-chain without causing delays in the admin panel experience.",
            vi: "Thử thách: Xây dựng quy trình đăng ký hàm băm tài liệu lên chuỗi khối nhanh chóng, an toàn và tin cậy mà không gây trễ giao diện admin.",
          },
          {
            en: "Solution: Leveraged asynchronous event queuing and optimistic UI updates to instantly acknowledge admins while blockchain confirmations finalize.",
            vi: "Giải pháp: Sử dụng hàng đợi sự kiện bất đồng bộ và cơ chế cập nhật giao diện lạc quan giúp xác nhận tức thì với admin trong khi chờ blockchain ghi nhận.",
          },
          {
            en: "Achievement: Successfully deployed and officially utilized by the Department of Science and Technology of Da Nang City (Sở Khoa học & Công nghệ TP Đà Nẵng) for secure document validation.",
            vi: "Thành tựu: Triển khai thành công và đưa vào sử dụng chính thức tại Sở Khoa học & Công nghệ TP Đà Nẵng để xác thực các văn bản số một cách an toàn.",
          },
        ],
      },
    ],
  },
  "Thuc Pham Quang Da": {
    metrics: {
      type: { en: "E-Commerce Platform", vi: "Nền tảng Thương mại điện tử" },
      status: { en: "Production", vi: "Production" },
      duration: { en: "11/2025 to present", vi: "11/2025 đến hiện tại" },
      role: { en: "Full Stack Developer", vi: "Lập trình viên Full Stack" },
      teamSize: { en: "2 members", vi: "2 thành viên" },
    },
    techStack: {
      frontend: [
        "• Next.js + TypeScript",
        "• Material UI / Tailwind CSS",
        "• Client State Hydration",
      ],
      backend: ["• NestJS", "• REST APIs", "• Microservices Architecture"],
      database: ["• PostgreSQL", "• Prisma ORM", "• Optimized Indexing"],
      architecture: [
        "• Socket.io",
        "• JWT Authentication",
        "• Role-Based Access Control",
      ],
      integration: ["• Event-driven syncing", "• Real-time webhooks"],
    },
    responsibilities: [
      {
        title: {
          en: "Database Schema Optimization",
          vi: "Tối ưu hóa Schema Database",
        },
        desc: {
          en: "Designed and optimized the database schema for e-commerce and inventory management.",
          vi: "Thiết kế và tối ưu sơ đồ dữ liệu cho hệ thống thương mại điện tử và quản lý kho.",
        },
        accent: "sky",
      },
      {
        title: {
          en: "Scalable RESTful APIs",
          vi: "Xây dựng API RESTful mở rộng",
        },
        desc: {
          en: "Developed scalable APIs for auth, products, categories, carts, orders, inventory, and users.",
          vi: "Xây dựng API hiệu năng cao cho xác thực, sản phẩm, danh mục, giỏ hàng, đơn hàng, và kho hàng.",
        },
        accent: "emerald",
      },
      {
        title: { en: "JWT & RBAC Security", vi: "Bảo mật JWT & RBAC" },
        desc: {
          en: "Implemented secure JWT Authentication and Role-Based Access Control (RBAC).",
          vi: "Triển khai cơ chế xác thực JWT và phân quyền người dùng (RBAC) nghiêm ngặt.",
        },
        accent: "indigo",
      },
      {
        title: { en: "Responsive Layouts", vi: "Giao diện Responsive" },
        desc: {
          en: "Built responsive customer-facing and administrative interfaces using Next.js and React.",
          vi: "Xây dựng giao diện người dùng và trang quản trị đáp ứng cao bằng Next.js & React.",
        },
        accent: "purple",
      },
      {
        title: {
          en: "E-Commerce Workflows",
          vi: "Quy trình Thương mại điện tử",
        },
        desc: {
          en: "Developed robust shopping cart, checkout, and order processing workflows.",
          vi: "Phát triển luồng xử lý giỏ hàng, đặt hàng và quy trình thanh toán mượt mà.",
        },
        accent: "rose",
      },
      {
        title: {
          en: "Administrative Dashboard",
          vi: "Trang quản trị (Dashboard)",
        },
        desc: {
          en: "Built an admin dashboard for products, inventory, customers, suppliers, and orders.",
          vi: "Xây dựng bảng điều khiển quản trị quản lý sản phẩm, tồn kho, khách hàng, nhà cung cấp & đơn hàng.",
        },
        accent: "amber",
      },
      {
        title: { en: "Real-time Stock Sync", vi: "Đồng bộ kho thời gian thực" },
        desc: {
          en: "Implemented automatic inventory synchronization based on real-time order activities.",
          vi: "Triển khai đồng bộ hóa kho tự động dựa trên hoạt động đơn hàng thời gian thực.",
        },
        accent: "emerald",
      },
      {
        title: {
          en: "Search, Filter & Sorting",
          vi: "Tìm kiếm, Bộ lọc & Sắp xếp",
        },
        desc: {
          en: "Implemented advanced product search, filtering, sorting, and pagination.",
          vi: "Phát triển các thuật toán tìm kiếm, lọc, sắp xếp nâng cao và phân trang sản phẩm.",
        },
        accent: "indigo",
      },
      {
        title: { en: "Performance Optimization", vi: "Tối ưu hóa hiệu năng" },
        desc: {
          en: "Optimized API performance, database queries, and overall application responsiveness.",
          vi: "Tối ưu hóa thời gian phản hồi API, truy vấn cơ sở dữ liệu và hiệu năng ứng dụng.",
        },
        accent: "teal",
      },
    ],
    backendContributions: [
      {
        en: "Engineered NestJS controllers, providers, modules, and guards.",
        vi: "Xây dựng cấu trúc module, controller, provider và guard trên NestJS.",
      },
      {
        en: "Implemented Prisma database transactions for secure data operations.",
        vi: "Triển khai transaction cơ sở dữ liệu với Prisma tránh xung đột dữ liệu.",
      },
      {
        en: "Designed clean scalable REST endpoints for admin and public store.",
        vi: "Thiết kế các endpoint REST sạch cho cả trang cửa hàng công cộng và quản trị.",
      },
      {
        en: "Integrated real-time sockets for stock updates and live chat support.",
        vi: "Tích hợp Socket.io cho cập nhật số lượng kho và hỗ trợ tin nhắn trực tiếp.",
      },
    ],
    frontendContributions: [
      {
        en: "Built fast responsive web interface utilizing Material UI and Tailwind.",
        vi: "Xây dựng giao diện web phản hồi nhanh, mượt mà sử dụng Material UI & Tailwind.",
      },
      {
        en: "Implemented global cart and checkout client-side states.",
        vi: "Xây dựng trình quản lý state client cho giỏ hàng toàn cục và quy trình thanh toán.",
      },
      {
        en: "Designed advanced product search results and categories sidebar.",
        vi: "Thiết kế giao diện kết quả tìm kiếm nâng cao và thanh danh mục thông minh.",
      },
    ],
    challenges: [
      {
        title: {
          en: "Inventory Synchronization",
          vi: "Đồng bộ hóa hàng tồn kho",
        },
        color: "emerald",
        items: [
          {
            en: "Challenge: Maintaining accurate inventory levels while processing multiple customer orders simultaneously.",
            vi: "Thử thách: Duy trì mức tồn kho chính xác khi xử lý đồng thời nhiều đơn đặt hàng của khách hàng.",
          },
          {
            en: "Solution: Designed an automated inventory synchronization workflow that updates stock immediately after successful order processing.",
            vi: "Giải pháp: Thiết kế luồng đồng bộ tồn kho tự động cập nhật số lượng ngay sau khi xử lý đơn hàng thành công.",
          },
          {
            en: "Achievement: Improved inventory accuracy, prevented overselling, and streamlined inventory management.",
            vi: "Thành tựu: Cải thiện độ chính xác của kho, ngăn chặn tình trạng bán quá số lượng hiện có và tinh giản quản lý.",
          },
        ],
      },
      {
        title: { en: "Performance Optimization", vi: "Tối ưu hóa hiệu năng" },
        color: "teal",
        items: [
          {
            en: "Challenge: Ensuring fast product browsing and order processing as product data continued to grow.",
            vi: "Thử thách: Đảm bảo duyệt sản phẩm nhanh chóng và xử lý đơn hàng mượt mà khi dữ liệu tiếp tục tăng.",
          },
          {
            en: "Solution: Optimized RESTful APIs, database queries, and frontend rendering to reduce response times.",
            vi: "Giải pháp: Tối ưu hóa API RESTful, truy vấn database và kết xuất frontend để giảm thời gian phản hồi.",
          },
          {
            en: "Achievement: Delivered a faster, more responsive shopping experience for both customers and administrators.",
            vi: "Thành tựu: Mang lại trải nghiệm mua sắm nhanh hơn, phản hồi tốt hơn cho cả khách hàng và quản trị viên.",
          },
        ],
      },
    ],
  },
  "Risegate – Asset Tokenization Platform": {
    metrics: {
      type: {
        en: "Asset Tokenization Platform",
        vi: "Asset Tokenization Platform",
      },
      status: { en: "Production", vi: "Production" },
      duration: { en: "3/2023 to present", vi: "3/2023 đến hiện tại" },
      role: { en: "Full Stack Developer", vi: "Full Stack Developer" },
      teamSize: { en: "20 members", vi: "20 thành viên" },
    },
    techStack: {
      frontend: ["• Next.js + TypeScript", "• Ant Design + Tailwind CSS"],
      backend: ["• Node.js + Express.js", "• REST APIs", "• Microservices"],
      database: ["• MongoDB", "• MongoDB Driver"],
      architecture: ["• Socket.io", "• JWT & RBAC Auth", "• Apache Kafka"],
      integration: [
        "• Wagmi / Web3.js Blockchain",
        "• VNPAY",
        "• VietQR & ACB Bank",
      ],
    },
    responsibilities: [
      {
        title: { en: "Modular Architecture", vi: "Kiến trúc Mô-đun hóa" },
        desc: {
          en: "Refactored backend services into modular architecture for scalability and maintenance.",
          vi: "Tái cấu trúc backend thành kiến trúc mô-đun tăng khả năng bảo trì và mở rộng.",
        },
        accent: "sky",
      },
      {
        title: { en: "Scalable RESTful APIs", vi: "API RESTful Hiệu năng" },
        desc: {
          en: "Developed scalable RESTful APIs for digital asset, wallet, project, and transaction management.",
          vi: "Xây dựng API RESTful hiệu năng cao cho quản lý tài sản số, ví, dự án và giao dịch.",
        },
        accent: "emerald",
      },
      {
        title: { en: "Web3 Smart Wallets", vi: "Ví thông minh Web3" },
        desc: {
          en: "Integrated Wagmi and Web3.js for blockchain wallet connectivity and smart contracts.",
          vi: "Tích hợp Wagmi và Web3.js để kết nối ví blockchain và tương tác smart contract.",
        },
        accent: "indigo",
      },
      {
        title: { en: "P2P Asset Transfers", vi: "Chuyển tài sản P2P" },
        desc: {
          en: "Implemented peer-to-peer (P2P) digital asset transfers via email for unregistered users.",
          vi: "Triển khai chuyển tài sản kỹ thuật số ngang hàng (P2P) qua email cho người dùng chưa đăng ký.",
        },
        accent: "purple",
      },
      {
        title: { en: "Kafka Payment Workflows", vi: "Thanh toán qua Kafka" },
        desc: {
          en: "Built Kafka-driven asynchronous payment workflows with ACB and VietQR integrations.",
          vi: "Xây dựng luồng thanh toán bất đồng bộ dựa trên Kafka tích hợp ACB và VietQR.",
        },
        accent: "rose",
      },
      {
        title: { en: "Real-time Updates", vi: "Cập nhật thời gian thực" },
        desc: {
          en: "Implemented Redis caching and Socket.IO-based real-time updates for high responsiveness.",
          vi: "Áp dụng Redis caching và cập nhật thời gian thực qua Socket.IO tăng tốc phản hồi.",
        },
        accent: "amber",
      },
    ],
    backendContributions: [
      {
        en: "Optimized API performance and database queries to improve system scalability and responsiveness.",
        vi: "Tối ưu hóa hiệu năng API và các truy vấn cơ sở dữ liệu nâng cao tốc độ phản hồi hệ thống.",
      },
      {
        en: "Implemented JWT Authentication and Role-Based Access Control (RBAC) to secure platform operations.",
        vi: "Triển khai cơ chế xác thực JWT và phân quyền (RBAC) nghiêm ngặt bảo vệ nền tảng.",
      },
      {
        en: "Designed and engineered reliable transactional workflows with distributed message brokers.",
        vi: "Thiết kế và phát triển các quy trình giao dịch đáng tin cậy với hệ thống hàng đợi tin nhắn phân tán.",
      },
    ],
    frontendContributions: [
      {
        en: "Developed responsive and reusable user interfaces using React and Next.js.",
        vi: "Phát triển giao diện người dùng responsive và tái sử dụng bằng React & Next.js.",
      },
      {
        en: "Built interactive visual charts and secure wallet connection interfaces with responsive styling.",
        vi: "Xây dựng biểu đồ dữ liệu trực quan và giao diện kết nối ví Web3 responsive tinh gọn.",
      },
      {
        en: "Integrated Ant Design components with custom Tailwind CSS utility layers.",
        vi: "Tích hợp các thành phần Ant Design với các lớp CSS tùy biến của Tailwind.",
      },
    ],
    challenges: [
      {
        title: {
          en: "Digital Asset & Tokenization Workflow",
          vi: "Quản lý Tài sản Kỹ thuật số & Tokenization",
        },
        color: "purple",
        items: [
          {
            en: "Challenge: Building a scalable backend system that allows startups to create, publish, and manage tokenized asset projects with secure transaction workflows.",
            vi: "Thử thách: Xây dựng hệ thống backend có khả năng mở rộng lớn cho phép các startup tạo, xuất bản và quản lý các dự án tài sản mã hóa với quy trình giao dịch bảo mật.",
          },
          {
            en: "Solution: Contributed to approximately 30% of Risegate backend development, including digital asset management, wallet integration, transaction processing, and RESTful API development.",
            vi: "Giải pháp: Đóng góp khoảng 30% vào quá trình phát triển backend của Risegate, bao gồm quản lý tài sản kỹ thuật số, tích hợp ví, xử lý giao dịch và phát triển RESTful API.",
          },
          {
            en: "Achievement: Enabled startups to publish and manage tokenized projects on the platform, supporting real-world asset digitization workflows.",
            vi: "Thành tựu: Giúp các startup dễ dàng xuất bản và quản lý các dự án đã được mã hóa trên nền tảng, hỗ trợ quy trình số hóa tài sản thực.",
          },
        ],
      },
    ],
  },
  "Landing Page MetaDAP": {
    metrics: {
      type: {
        en: "Corporate Landing Page",
        vi: "Trang giới thiệu doanh nghiệp",
      },
      status: { en: "Production", vi: "Production" },
      duration: { en: "2024", vi: "2024" },
      role: { en: "Full Stack Developer", vi: "Lập trình viên Full Stack" },
      teamSize: { en: "2 members", vi: "2 thành viên" },
    },
    techStack: {
      frontend: [
        "• Next.js / TypeScript",
        "• Ant Design / Tailwind CSS",
        "• Responsive Layouts",
      ],
      backend: [
        "• Node.js + Express.js",
        "• REST APIs",
        "• Static site optimization",
      ],
      database: ["• MongoDB", "• Document Store", "• Structured registries"],
      architecture: [
        "• JWT Session",
        "• Route Chunking",
        "• Lazy Loading modules",
      ],
      integration: [
        "• Cloudinary CDN",
        "• SEO meta tag indexing",
        "• Dynamic contact forms",
      ],
    },
    responsibilities: [
      {
        title: { en: "SEO & Performance", vi: "SEO & Hiệu năng tối đa" },
        desc: {
          en: "Optimized Lighthouse performance scoring, meta tagging, and asset rendering speed.",
          vi: "Tối ưu hóa điểm số Lighthouse, thẻ meta SEO và tốc độ tải tài nguyên hình ảnh.",
        },
        accent: "sky",
      },
      {
        title: { en: "Stunning Visual design", vi: "Thiết kế Visual bắt mắt" },
        desc: {
          en: "Crafted futuristic layout grids and modern subtle backdrop glows using Tailwind CSS.",
          vi: "Xây dựng bố cục mang âm hưởng tương lai và các hiệu ứng phát sáng nhẹ bằng Tailwind.",
        },
        accent: "purple",
      },
      {
        title: { en: "Contact Forms & API", vi: "Form Liên hệ & API" },
        desc: {
          en: "Built robust server routes to validate client inquiries and store entries securely.",
          vi: "Xây dựng đường truyền máy chủ tiếp nhận yêu cầu liên hệ và lưu trữ bảo mật.",
        },
        accent: "emerald",
      },
    ],
    backendContributions: [
      {
        en: "Developed mail server notification triggers for new user forms.",
        vi: "Phát triển cơ chế kích hoạt thông báo email khi có form gửi mới.",
      },
      {
        en: "Constructed secure MongoDB database schemas for business inquiries.",
        vi: "Thiết kế cấu trúc dữ liệu MongoDB lưu trữ ý kiến liên hệ từ đối tác.",
      },
    ],
    frontendContributions: [
      {
        en: "Created smooth CSS ambient glow backgrounds and micro-interactions.",
        vi: "Thiết kế các hình nền tỏa sáng tinh tế và hiệu ứng tương tác vi mô.",
      },
      {
        en: "Implemented fully responsive designs for fluid mobile compatibility.",
        vi: "Tối ưu hóa khả năng tương thích hiển thị linh hoạt trên mọi kích cỡ màn hình di động.",
      },
    ],
    challenges: [
      {
        title: {
          en: "Visual Performance Optimization",
          vi: "Tối ưu hiệu năng hiển thị",
        },
        color: "emerald",
        items: [
          {
            en: "Challenge: Retaining high graphic aesthetic quality and complex layouts without slowing down page load.",
            vi: "Thử thách: Giữ nguyên chất lượng thẩm mỹ đồ họa cao và bố cục phức tạp nhưng không làm chậm tốc độ tải trang.",
          },
          {
            en: "Solution: Leveraged Next.js Image caching, modern WebP formats, and asynchronous chunk-by-chunk style imports.",
            vi: "Giải pháp: Tận dụng cơ chế lưu cache ảnh Next.js, chuyển đổi định dạng WebP hiện đại và nạp style bất đồng bộ.",
          },
          {
            en: "Achievement: Achieved near-perfect 95+ score on core Lighthouse mobile web performance indices.",
            vi: "Thành tựu: Đạt điểm số gần như tuyệt đối 95+ trên bảng đo chỉ số hiệu năng web di động Lighthouse.",
          },
        ],
      },
    ],
  },
  VIDE: {
    metrics: {
      type: {
        en: "Digital Economy Platform",
        vi: "Nền tảng phát triển kinh tế số",
      },
      status: { en: "Production", vi: "Production" },
      duration: { en: "2022 to present", vi: "2022 đến hiện tại" },
      role: { en: "Full Stack Developer", vi: "Lập trình viên Full Stack" },
      teamSize: { en: "10 members", vi: "10 thành viên" },
    },
    techStack: {
      frontend: ["• Next.js + TypeScript", "• Ant Design + Tailwind CSS"],
      backend: [
        "• Node.js + Express.js",
        "• REST APIs",
        "• Static site optimization",
      ],
      database: ["• MongoDB", "• Document Store"],
      architecture: [
        "• JWT Session",
        "• Route Chunking",
        "• Lazy Loading modules",
      ],
      integration: [
        "• Cloudinary CDN",
        "• SEO meta tag indexing",
        "• Dynamic contact forms",
      ],
    },
    responsibilities: [
      {
        title: {
          en: "Modern Digital Presence",
          vi: "Diện mạo Kỹ thuật số Hiện đại",
        },
        desc: {
          en: "Designed elegant user interfaces that present VIDE's services and programs with a professional information hierarchy.",
          vi: "Thiết kế các giao diện thanh lịch trình bày dịch vụ và chương trình của VIDE với phân cấp thông tin chuyên nghiệp.",
        },
        accent: "sky",
      },
      {
        title: {
          en: "Strategic Consulting Hub",
          vi: "Trung tâm Tư vấn Chiến lược",
        },
        desc: {
          en: "Created structured modular blocks displaying strategic consulting, certified training, and digital transformation initiatives.",
          vi: "Xây dựng các khối mô-đun có cấu trúc hiển thị thông tin tư vấn chiến lược, đào tạo và sáng kiến chuyển đổi số.",
        },
        accent: "purple",
      },
      {
        title: { en: "SEO & Performance Tuning", vi: "Tối ưu SEO & Hiệu năng" },
        desc: {
          en: "Fine-tuned rendering pipelines, meta tagging, and asset preloading to ensure quick accessibility for businesses and public partners.",
          vi: "Tối ưu hóa pipeline render, thẻ meta và tải trước tài nguyên nhằm đảm bảo tốc độ truy cập nhanh cho đối tác.",
        },
        accent: "emerald",
      },
    ],
    backendContributions: [
      {
        en: "Configured MongoDB schemas to seamlessly manage programs, activities, and strategic resource listings.",
        vi: "Thiết kế các schema MongoDB để quản lý mượt mà danh sách chương trình, hoạt động và tài nguyên chiến lược.",
      },
      {
        en: "Developed server-side API routes for inquiry collection, training registrations, and dynamic newsletter subscriptions.",
        vi: "Phát triển các tuyến API phía máy chủ để tiếp nhận yêu cầu liên hệ, đăng ký khóa học và đăng ký bản tin.",
      },
    ],
    frontendContributions: [
      {
        en: "Designed interactive sliders and grid layouts to clearly present VIDE's mission, vision, and core milestones since 2022.",
        vi: "Thiết kế các slide tương tác và bố cục dạng lưới để trình bày rõ ràng sứ mệnh, tầm nhìn và mốc phát triển từ năm 2022.",
      },
      {
        en: "Implemented robust multi-device responsive configurations using Tailwind CSS and Ant Design elements.",
        vi: "Triển khai cấu hình responsive đa thiết bị mạnh mẽ bằng cách sử dụng các thành phần Tailwind CSS và Ant Design.",
      },
    ],
    challenges: [
      {
        title: {
          en: "Visual Performance & Content Hierarchy",
          vi: "Hiệu năng hiển thị & Phân cấp nội dung",
        },
        color: "emerald",
        items: [
          {
            en: "Challenge: Presenting extensive institutional information (Mission, Vision, Strategic Consulting, Trainings) in a clean, professional hierarchy without overwhelming users.",
            vi: "Thử thách: Trình bày khối lượng thông tin lớn (Sứ mệnh, Tầm nhìn, Tư vấn chiến lược, Đào tạo) theo phân cấp rõ ràng, chuyên nghiệp mà không gây ngộp cho người dùng.",
          },
          {
            en: "Solution: Engineered collapsible visual cards, grid-based content chunking, and lazy loading for heavy media resources.",
            vi: "Giải pháp: Phát triển các thẻ hiển thị thu gọn linh hoạt, phân chia nội dung theo dạng lưới và tải bất đồng bộ các tài nguyên phương tiện nặng.",
          },
          {
            en: "Achievement: Delivered a modern, highly credible digital portal reflecting VIDE's leadership, facilitating faster partner onboarding and program discovery.",
            vi: "Thành tựu: Mang lại một cổng thông tin hiện đại và uy tín thể hiện vị thế dẫn đầu của VIDE, giúp các đối tác tiếp cận và khám phá chương trình nhanh chóng hơn.",
          },
        ],
      },
    ],
  },
  MetaOS: {
    metrics: {
      type: { en: "Digital Product Experience", vi: "Trải nghiệm sản phẩm số" },
      status: { en: "Production", vi: "Production" },
      duration: { en: "2024", vi: "2024" },
      role: { en: "Frontend Developer", vi: "Lập trình viên Frontend" },
      teamSize: { en: "3 members", vi: "3 thành viên" },
    },
    techStack: {
      frontend: [
        "• Next.js + TypeScript",
        "• React.js + Tailwind CSS",
        "• Framer Motion",
      ],
      backend: [
        "• Next.js SSR",
        "• Static site optimization",
        "• API route optimization",
      ],
      database: ["• Schema design", "• Resource caching"],
      architecture: [
        "• Component-based Architecture",
        "• Modular layout systems",
        "• Lazy-loading assets",
      ],
      integration: [
        "• MetaDAP ecosystem",
        "• Multi-device Responsive Design",
        "• Advanced SEO tags",
      ],
    },
    responsibilities: [
      {
        title: { en: "Responsive Landing Pages", vi: "Landing Page Phản Hồi" },
        desc: {
          en: "Developed responsive, high-performance landing pages using Next.js and TypeScript.",
          vi: "Phát triển các trang giới thiệu (landing page) phản hồi tối ưu bằng Next.js và TypeScript.",
        },
        accent: "sky",
      },
      {
        title: { en: "Reusable UI Components", vi: "Thành Phần Tái Sử Dụng" },
        desc: {
          en: "Built highly reusable and modular UI components to improve maintainability and development efficiency.",
          vi: "Xây dựng các thành phần giao diện người dùng có khả năng tái sử dụng cao giúp tối ưu hóa khả năng bảo trì.",
        },
        accent: "purple",
      },
      {
        title: { en: "Interactive Animations", vi: "Chuyển Động Tương Tác" },
        desc: {
          en: "Implemented beautiful interactive animations and smooth state transitions to enhance user experience.",
          vi: "Triển khai các hiệu ứng chuyển động và tương tác mượt mà bằng Framer Motion.",
        },
        accent: "emerald",
      },
      {
        title: { en: "SEO & Performance", vi: "SEO & Tối Ưu Hiệu Năng" },
        desc: {
          en: "Optimized page speed and configured rich SEO metadata for better accessibility and search visibility.",
          vi: "Tối ưu hóa hiệu suất trang web và cấu hình SEO giúp cải thiện thứ hạng và khả năng tìm kiếm.",
        },
        accent: "rose",
      },
    ],
    backendContributions: [
      {
        en: "Configured Next.js server-side features and SEO pre-rendering pipelines.",
        vi: "Cấu hình các tính năng server-side của Next.js và quy trình tiền kết xuất SEO.",
      },
      {
        en: "Structured optimal resource delivery through static files caching.",
        vi: "Xây dựng cơ chế tải tài nguyên tối ưu thông qua lưu trữ cache các tệp tĩnh.",
      },
    ],
    frontendContributions: [
      {
        en: "Built a rich responsive landing page structure with seamless mobile-first layouts.",
        vi: "Xây dựng cấu trúc trang đích đáp ứng phong phú với bố cục ưu tiên thiết bị di động.",
      },
      {
        en: "Leveraged Framer Motion to develop engaging hover actions and scroll-triggered animations.",
        vi: "Tận dụng Framer Motion để phát triển các hành động di chuột hấp dẫn và hoạt ảnh kích hoạt khi cuộn.",
      },
      {
        en: "Translated high-fidelity designs and product requirements into pixel-perfect interfaces.",
        vi: "Chuyển đổi bản vẽ thiết kế chất lượng cao thành giao diện người dùng chính xác đến từng điểm ảnh.",
      },
    ],
    challenges: [
      {
        title: {
          en: "Simplifying Blockchain Concepts",
          vi: "Đơn giản hóa khái niệm Blockchain",
        },
        color: "emerald",
        items: [
          {
            en: "Challenge: Presenting sophisticated tokenized asset infrastructure and ledger mechanics in a clear, digestible manner.",
            vi: "Thử thách: Trình bày cơ sở hạ tầng tài sản mã hóa tinh vi và cơ chế sổ cái theo cách rõ ràng, dễ tiếp cận.",
          },
          {
            en: "Solution: Structured content into highly visual sections, interactive tables, and component-based features with clean visual hierarchies.",
            vi: "Giải pháp: Cơ cấu nội dung thành các phần trực quan, bảng tương tác và các tính năng dạng component với phân cấp rõ ràng.",
          },
          {
            en: "Achievement: Transformed a complex backend ledger ecosystem into a highly intuitive digital product showcase.",
            vi: "Thành tựu: Biến đổi một hệ sinh thái sổ cái phức tạp thành một trải nghiệm giới thiệu sản phẩm trực quan sinh động.",
          },
        ],
      },
    ],
  },
  "Check-in Event": {
    metrics: {
      type: { en: "QR-based Event Management", vi: "Quản lý sự kiện qua mã QR" },
      status: { en: "Production", vi: "Production" },
      duration: { en: "2025", vi: "2025" },
      role: { en: "Full Stack Developer", vi: "Lập trình viên Full Stack" },
      teamSize: { en: "3 members", vi: "3 thành viên" },
    },
    techStack: {
      frontend: [
        "• Next.js + TypeScript",
        "• React.js + Tailwind CSS",
        "• Framer Motion",
      ],
      backend: [
        "• Next.js SSR",
        "• Static site optimization",
        "• API route optimization",
      ],
      database: ["• Schema design", "• Resource caching"],
      architecture: [
        "• Component-based Architecture",
        "• Modular layout systems",
        "• Lazy-loading assets",
      ],
      integration: [
        "• Event check-in ecosystem",
        "• QR Code scanning & generation",
        "• Multi-device Responsive Design",
      ],
    },
    responsibilities: [
      {
        title: { en: "Responsive Landing Pages", vi: "Landing Page Phản Hồi" },
        desc: {
          en: "Developed responsive, high-performance event registration and landing pages using Next.js and TypeScript.",
          vi: "Phát triển các trang đăng ký và giới thiệu sự kiện phản hồi mượt mà bằng Next.js và TypeScript.",
        },
        accent: "sky",
      },
      {
        title: { en: "Reusable UI Components", vi: "Thành Phần Tái Sử Dụng" },
        desc: {
          en: "Built highly reusable and modular UI components to improve maintainability and development efficiency.",
          vi: "Xây dựng các thành phần giao diện người dùng có khả năng tái sử dụng cao giúp tối ưu hóa khả năng bảo trì.",
        },
        accent: "purple",
      },
      {
        title: { en: "Interactive Animations", vi: "Chuyển Động Tương Tác" },
        desc: {
          en: "Implemented beautiful interactive animations and smooth state transitions to enhance user experience.",
          vi: "Triển khai các hiệu ứng chuyển động và tương tác mượt mà bằng Framer Motion.",
        },
        accent: "emerald",
      },
      {
        title: { en: "SEO & Performance", vi: "SEO & Tối Ưu Hiệu Năng" },
        desc: {
          en: "Optimized page speed and configured rich SEO metadata for better accessibility and search visibility.",
          vi: "Tối ưu hóa hiệu suất trang web và cấu hình SEO giúp cải thiện thứ hạng và khả năng tìm kiếm.",
        },
        accent: "rose",
      },
    ],
    backendContributions: [
      {
        en: "Configured Next.js server-side features and SEO pre-rendering pipelines.",
        vi: "Cấu hình các tính năng server-side của Next.js và quy trình tiền kết xuất SEO.",
      },
      {
        en: "Structured optimal resource delivery through static files caching.",
        vi: "Xây dựng cơ chế tải tài nguyên tối ưu thông qua lưu trữ cache các tệp tĩnh.",
      },
    ],
    frontendContributions: [
      {
        en: "Built a rich responsive landing page structure with seamless mobile-first layouts.",
        vi: "Xây dựng cấu trúc trang đích đáp ứng phong phú với bố cục ưu tiên thiết bị di động.",
      },
      {
        en: "Leveraged Framer Motion to develop engaging hover actions and scroll-triggered animations.",
        vi: "Tận dụng Framer Motion để phát triển các hành động di chuột hấp dẫn và hoạt ảnh kích hoạt khi cuộn.",
      },
      {
        en: "Translated high-fidelity designs and product requirements into pixel-perfect interfaces.",
        vi: "Chuyển đổi bản vẽ thiết kế chất lượng cao thành giao diện người dùng chính xác đến từng điểm ảnh.",
      },
    ],
    challenges: [
      {
        title: {
          en: "Swift On-Site Event Entry",
          vi: "Điểm danh Sự kiện Nhanh chóng",
        },
        color: "emerald",
        items: [
          {
            en: "Challenge: Ensuring seamless entry and rapid QR check-in flows for a large volume of attendees under offline or low-connectivity situations.",
            vi: "Thử thách: Đảm bảo luồng điểm danh nhanh và quét mã QR mượt mà cho số lượng lớn khách tham dự trong điều kiện mạng yếu hoặc không ổn định.",
          },
          {
            en: "Solution: Designed an optimized visual structure, smart resource indexing, and lightweight client-side loading strategies.",
            vi: "Giải pháp: Thiết kế cấu trúc hiển thị trực quan tối ưu hóa, sắp xếp chỉ mục tài nguyên thông minh và nạp trang phía client siêu nhẹ.",
          },
          {
            en: "Achievement: Successfully deployed and trusted for the DaVAS event check-in, significantly speeding up entrance access control.",
            vi: "Thành tựu: Triển khai và áp dụng thành công cho sự kiện DaVAS giúp kiểm soát cổng vào nhanh và chính xác.",
          },
        ],
      },
    ],
  },
  "Ôn TOEIC": {
    metrics: {
      type: { en: "AI-Powered English Learning Platform", vi: "Nền tảng học tiếng Anh ứng dụng AI" },
      status: { en: "Production", vi: "Production" },
      duration: { en: "10/2025 to present", vi: "10/2025 đến hiện tại" },
      role: { en: "Full Stack Developer (Freelance)", vi: "Lập trình viên Full Stack (Freelance)" },
      teamSize: { en: "3 members", vi: "3 thành viên" },
    },
    techStack: {
      frontend: [
        "• Next.js, React, TypeScript",
        "• Tailwind CSS, shadcn/ui",
        "• React Query, React Hook Form",
      ],
      backend: [
        "• NestJS, Node.js",
        "• RESTful APIs",
        "• JWT Authentication",
        "• Validation & API Security",
      ],
      database: [
        "• PostgreSQL",
        "• Prisma ORM",
        "• Database Design & Query Optimization",
      ],
      architecture: [
        "• Modular Backend Architecture",
        "• Real-time Communication with Socket.io",
        "• Scalable API Design",
        "• Docker-based Development & Deployment",
      ],
      integration: [
        "• OpenAI API (AI-generated feedback and learning recommendations)",
        "• Speech Recognition API (pronunciation and speaking assessment)",
        "• AI Recommendation System",
      ],
    },
    responsibilities: [
      {
        title: { en: "AI Speech & Pronunciation", vi: "AI Phân tích Giọng nói & Phát âm" },
        desc: {
          en: "Integrated Speech Recognition API & OpenAI to analyze pronunciation accuracy and offer immediate feedback.",
          vi: "Tích hợp Speech Recognition API & OpenAI phân tích phát âm và đưa ra phản hồi tức thì.",
        },
        accent: "sky",
      },
      {
        title: { en: "Real-time Vocabulary Arena", vi: "Đấu từ vựng thời gian thực" },
        desc: {
          en: "Engineered high-concurrency Socket.io WebSocket servers for 1v1 multiplayer vocabulary battles.",
          vi: "Xây dựng máy chủ WebSocket Socket.io xử lý thi đấu từ vựng đối kháng 1v1 thời gian thực.",
        },
        accent: "indigo",
      },
      {
        title: { en: "Adaptive Recommendation System", vi: "Hệ thống gợi ý lộ trình AI" },
        desc: {
          en: "Developed smart recommendation algorithms mapping weak skills to target practice modules.",
          vi: "Phát triển thuật toán gợi ý lộ trình thông minh tự động đề xuất bài luyện tập phù hợp.",
        },
        accent: "purple",
      },
      {
        title: { en: "Scalable Modular Backend", vi: "Backend mô-đun hóa trên NestJS" },
        desc: {
          en: "Architected NestJS backend services with PostgreSQL, Prisma ORM, and Redis caching layers.",
          vi: "Xây dựng backend NestJS với PostgreSQL, Prisma ORM và bộ nhớ đệm Redis tối ưu.",
        },
        accent: "emerald",
      },
    ],
    backendContributions: [
      {
        en: "Engineered NestJS backend services with JWT authentication, validation, and API security guards.",
        vi: "Phát triển backend NestJS với xác thực JWT, validation và các bộ bảo vệ API an toàn.",
      },
      {
        en: "Optimized PostgreSQL queries & Prisma ORM database models for multi-user test processing.",
        vi: "Tối ưu hóa truy vấn PostgreSQL & mô hình Prisma ORM xử lý đề thi cho nhiều người dùng đồng thời.",
      },
      {
        en: "Integrated OpenAI API for AI feedback generation and Speech Recognition for audio evaluations.",
        vi: "Tích hợp OpenAI API tạo phản hồi AI và Speech Recognition đánh giá âm thanh lời nói.",
      },
    ],
    frontendContributions: [
      {
        en: "Built responsive Next.js, React & TypeScript UI using Tailwind CSS, shadcn/ui, and React Hook Form.",
        vi: "Xây dựng giao diện Next.js, React & TypeScript mượt mà bằng Tailwind CSS, shadcn/ui và React Hook Form.",
      },
      {
        en: "Managed client server-state hydration using React Query (TanStack Query) for instant cache sync.",
        vi: "Quản lý state server-client hiệu quả bằng React Query giúp đồng bộ dữ liệu siêu tốc.",
      },
    ],
    challenges: [
      {
        title: {
          en: "Real-time AI Feedback & System Scale",
          vi: "Phản hồi AI thời gian thực & Quy mô hệ thống",
        },
        color: "indigo",
        items: [
          {
            en: "Challenge: Providing low-latency speaking assessment and real-time AI feedback for over 2,500 active learners without blocking backend queues.",
            vi: "Thử thách: Cung cấp đánh giá bài nói độ trễ thấp và phản hồi AI thời gian thực cho hơn 2.500 người dùng mà không gây nghẽn hàng đợi backend.",
          },
          {
            en: "Solution: Built an asynchronous processing pipeline with Redis caching, streaming OpenAI responses, and optimized WebSockets.",
            vi: "Giải pháp: Xây dựng quy trình xử lý bất đồng bộ kết hợp Redis cache, streaming response OpenAI và WebSocket tối ưu.",
          },
          {
            en: "Achievement: Successfully launched and scaled an AI-powered TOEIC learning platform, growing from 0 to 1,000+ users within 3 months and reaching 2,200+ users.",
            vi: "Thành tựu: Triển khai thành công và mở rộng nền tảng học TOEIC ứng dụng AI, tăng trưởng từ 0 lên 1.000+ người dùng trong vòng 3 tháng và đạt 2.200+ người dùng.",
          },
          {
            en: "Achievement: Achieved 1,300+ learning hours, 140,000+ exercises, and 10,000+ speaking practices.",
            vi: "Thành tựu: Đạt 1.300+ giờ học, 140.000+ bài tập hoàn thành và 10.000+ lượt luyện nói.",
          },
        ],
      },
    ],
  },
  LANI: {
    metrics: {
      type: {
        en: "E-Commerce & Training Platform",
        vi: "Nền tảng Thương mại điện tử & Đào tạo",
      },
      status: { en: "Production", vi: "Production" },
      duration: { en: "2025 to present", vi: "2025 đến hiện tại" },
      role: { en: "Full Stack Developer", vi: "Lập trình viên Full Stack" },
      teamSize: { en: "3 members", vi: "3 thành viên" },
    },
    techStack: {
      frontend: [
        "• Next.js + TypeScript",
        "• Tailwind CSS",
        "• i18n Bilingual Support",
        "• React Query",
      ],
      backend: [
        "• NestJS",
        "• RESTful APIs",
        "• Node.js",
        "• JWT Authentication",
      ],
      database: [
        "• PostgreSQL",
        "• Prisma ORM",
        "• Optimized Queries",
      ],
      architecture: [
        "• Role-Based Access Control (RBAC)",
        "• MVC Architecture",
        "• Server-Side Rendering (SSR)",
      ],
      integration: [
        "• Online Payment Gateway (VNPay)",
        "• Course Enrollment Portal",
        "• Interactive Feedback Engine",
        "• Cloudinary Media CDN",
      ],
    },
    responsibilities: [
      {
        title: { en: "Bilingual Localization (i18n)", vi: "Hỗ trợ Song ngữ (i18n)" },
        desc: {
          en: "Architected seamless Vietnamese and English localization across all interfaces, content, and catalog items.",
          vi: "Xây dựng hệ thống đa ngôn ngữ song ngữ Việt - Anh mượt mà cho toàn bộ giao diện, nội dung và danh mục.",
        },
        accent: "sky",
      },
      {
        title: { en: "Authentication & Security", vi: "Đăng nhập, Đăng ký & Bảo mật" },
        desc: {
          en: "Implemented secure user registration, login workflows, JWT session management, and RBAC authorization.",
          vi: "Phát triển quy trình đăng ký, đăng nhập tài khoản, quản lý phiên với JWT và phân quyền người dùng (RBAC).",
        },
        accent: "indigo",
      },
      {
        title: { en: "Multi-Category E-Commerce", vi: "Thương mại điện tử Đa dạng" },
        desc: {
          en: "Engineered high-converting product catalog, real-time cart management, and seamless multi-step checkout.",
          vi: "Phát triển danh mục sản phẩm đa dạng, quản lý giỏ hàng thời gian thực và quy trình đặt hàng thuận tiện.",
        },
        accent: "emerald",
      },
      {
        title: { en: "Training Course Enrollment", vi: "Đăng ký Khóa học Đào tạo" },
        desc: {
          en: "Built comprehensive course showcase pages with curriculum details, schedule selection, and online booking.",
          vi: "Xây dựng trang giới thiệu khóa học, chi tiết lộ trình đào tạo, chọn lịch học và đăng ký ghi danh trực tuyến.",
        },
        accent: "amber",
      },
      {
        title: { en: "Customer Feedback & Reviews", vi: "Đánh giá & Phản hồi Khách hàng" },
        desc: {
          en: "Developed interactive customer rating and review system with moderation and instant testimonial display.",
          vi: "Xây dựng hệ thống gửi phản hồi, đánh giá sao trải nghiệm khách hàng trực quan và tăng độ uy tín thương hiệu.",
        },
        accent: "rose",
      },
      {
        title: { en: "Online Payment Processing", vi: "Tích hợp Thanh toán Trực tuyến" },
        desc: {
          en: "Integrated secure online payment gateway with instant IPN callback, transaction tracking, and invoice logging.",
          vi: "Tích hợp cổng thanh toán trực tuyến bảo mật, xử lý giao dịch tức thời và tự động đối soát đơn hàng.",
        },
        accent: "teal",
      },
    ],
    backendContributions: [
      {
        en: "Engineered scalable RESTful API endpoints using NestJS for auth, products, course bookings, reviews, and payments.",
        vi: "Phát triển hệ thống RESTful API hiệu năng cao bằng NestJS cho xác thực, sản phẩm, đăng ký khóa học, đánh giá và thanh toán.",
      },
      {
        en: "Designed robust PostgreSQL database models with Prisma ORM for relational catalog and enrollment data integrity.",
        vi: "Thiết kế mô hình cơ sở dữ liệu PostgreSQL chuẩn hóa với Prisma ORM đảm bảo tính toàn vẹn dữ liệu đơn hàng và học viên.",
      },
      {
        en: "Implemented secure payment webhook listeners and automated order status update pipelines.",
        vi: "Xây dựng cơ chế webhook nhận tín hiệu thanh toán và tự động cập nhật trạng thái đơn hàng thời gian thực.",
      },
      {
        en: "Built validation layers and rate limiting to prevent spam feedback submissions and brute-force login attempts.",
        vi: "Thiết lập lớp kiểm thực dữ liệu đầu vào và giới hạn tần suất gửi yêu cầu để ngăn chặn spam feedback và dò mật khẩu.",
      },
    ],
    frontendContributions: [
      {
        en: "Designed responsive, high-fidelity corporate UI supporting instant English and Vietnamese language switching.",
        vi: "Thiết kế giao diện người dùng hiện đại, tương thích hoàn hảo mọi thiết bị và chuyển đổi ngôn ngữ Việt - Anh tức thì.",
      },
      {
        en: "Built interactive course registration forms, product showcase filters, dynamic cart, and customer review modules.",
        vi: "Phát triển form đăng ký khóa học, bộ lọc danh mục sản phẩm, giỏ hàng tương tác và khối đánh giá của khách hàng.",
      },
      {
        en: "Optimized Core Web Vitals, SSR caching, and image loading for top-tier Lighthouse performance and SEO scores.",
        vi: "Tối ưu hóa chỉ số Core Web Vitals, cơ chế kết xuất SSR và tải tài nguyên hình ảnh giúp đạt hiệu suất Lighthouse cao.",
      },
    ],
    challenges: [
      {
        title: {
          en: "Unified Bilingual Experience for E-Commerce & Training",
          vi: "Trải nghiệm Song ngữ Thống nhất cho Thương mại điện tử & Đào tạo",
        },
        color: "teal",
        items: [
          {
            en: "Challenge: Integrating two distinct business workflows (physical/digital retail products vs. structured educational training courses) into a single cohesive bilingual web platform without confusing users.",
            vi: "Thử thách: Kết hợp hài hòa hai luồng nghiệp vụ khác biệt (bán sản phẩm thương mại và tuyển sinh các khóa học đào tạo) trên cùng một nền tảng hỗ trợ song ngữ mà vẫn giữ được sự tinh gọn, dễ dùng.",
          },
          {
            en: "Solution: Architected modular components, standardized internationalization schemas (i18n), and created dedicated customer checkout/registration pipelines tailored to each product and course category.",
            vi: "Giải pháp: Thiết kế kiến trúc component dạng mô-đun, chuẩn hóa cấu trúc dữ liệu đa ngôn ngữ và tạo luồng thanh toán / ghi danh riêng biệt phù hợp cho từng loại sản phẩm và khóa đào tạo.",
          },
          {
            en: "Achievement: Successfully deployed LANI into production at lanivn.com, delivering a modern, trustworthy digital presence with complete bilingual accessibility.",
            vi: "Thành tựu: Triển khai thành công nền tảng LANI lên môi trường production tại lanivn.com, mang lại diện mạo số hiện đại, chuyên nghiệp với khả năng tiếp cận song ngữ hoàn chỉnh.",
          },
        ],
      },
    ],
  },
  BigBee: {
    metrics: {
      type: {
        en: "Creative Media & Education Brand",
        vi: "Thương hiệu Truyền thông Sáng tạo & Đào tạo",
      },
      status: { en: "Production", vi: "Production" },
      duration: { en: "2024", vi: "2024" },
      role: { en: "Frontend Developer", vi: "Lập trình viên Frontend" },
      teamSize: { en: "2 members", vi: "2 thành viên" },
    },
    techStack: {
      frontend: [
        "• Next.js + TypeScript",
        "• Tailwind CSS",
        "• Framer Motion",
        "• React.js",
      ],
      backend: [
        "• Node.js",
        "• REST APIs",
        "• Dynamic Content CMS",
      ],
      database: [
        "• MongoDB",
        "• Optimized Media Storage",
      ],
      architecture: [
        "• Component-Driven Architecture",
        "• Responsive Grid System",
        "• Client Animation Engine",
      ],
      integration: [
        "• High-Resolution Media Streaming",
        "• Social Media Channels",
        "• Inquiry & Booking Forms",
      ],
    },
    responsibilities: [
      {
        title: { en: "Visual Identity & Layouts", vi: "Định vị Nhận diện & Bố cục" },
        desc: {
          en: "Created modern digital presence combining media production, studio spaces, and English education.",
          vi: "Xây dựng nhận diện thương hiệu số hiện đại kết hợp sản xuất truyền thông, dịch vụ phòng thu và giáo dục tiếng Anh.",
        },
        accent: "amber",
      },
      {
        title: { en: "Motion & Micro-Interactions", vi: "Hiệu ứng Động & Chuyển cảnh" },
        desc: {
          en: "Engineered engaging scroll interactions, transitions, and hover effects using Framer Motion.",
          vi: "Thiết kế các hiệu ứng cuộn trang, chuyển động mượt mà và tương tác vi mô cuốn hút bằng Framer Motion.",
        },
        accent: "sky",
      },
      {
        title: { en: "Course & Studio Portals", vi: "Cổng Giới thiệu Khóa học & Studio" },
        desc: {
          en: "Structured information hierarchy for studio booking inquiries and English training programs.",
          vi: "Tổ chức phân cấp nội dung chuyên nghiệp cho cổng đặt lịch phòng thu và chương trình đào tạo tiếng Anh.",
        },
        accent: "indigo",
      },
      {
        title: { en: "Responsive Design System", vi: "Thiết kế Tương thích Đa thiết bị" },
        desc: {
          en: "Built a fully responsive layout with seamless performance across smartphones, tablets, and desktops.",
          vi: "Xây dựng giao diện responsive thích ứng linh hoạt, hiển thị sắc nét trên cả điện thoại, máy tính bảng và desktop.",
        },
        accent: "emerald",
      },
      {
        title: { en: "Performance & Media Loading", vi: "Tối ưu Tải Đa phương tiện" },
        desc: {
          en: "Optimized high-resolution images, responsive picture tags, and asynchronous style assets.",
          vi: "Tối ưu hóa hình ảnh độ nét cao, trì hoãn tải và nạp tài nguyên thông minh giúp tăng tốc độ mở trang.",
        },
        accent: "rose",
      },
    ],
    backendContributions: [
      {
        en: "Configured lightweight API routes for lead generation and booking form inquiries.",
        vi: "Thiết lập các tuyến API tiếp nhận thông tin liên hệ và yêu cầu đặt lịch dịch vụ phòng thu.",
      },
      {
        en: "Organized structured data schemas for studio portfolios and English training modules.",
        vi: "Tổ chức cấu trúc dữ liệu cho danh mục dự án studio và các gói đào tạo tiếng Anh.",
      },
    ],
    frontendContributions: [
      {
        en: "Built reusable UI components with TypeScript and Tailwind CSS for rapid scaling.",
        vi: "Phát triển các component giao diện có thể tái sử dụng bằng TypeScript và Tailwind CSS.",
      },
      {
        en: "Crafted interactive sliders, video showcase grids, and visual service highlight sections.",
        vi: "Thiết kế slider tương tác, lưới video giới thiệu sản phẩm truyền thông và khối dịch vụ nổi bật.",
      },
      {
        en: "Achieved high Lighthouse accessibility, SEO, and visual best practices scores.",
        vi: "Đạt điểm số cao về khả năng tiếp cận (Accessibility), SEO và trải nghiệm giao diện người dùng trên Lighthouse.",
      },
    ],
    challenges: [
      {
        title: {
          en: "Harmonizing Media Production with Educational Values",
          vi: "Hài hòa giữa Sản xuất Truyền thông và Giá trị Giáo dục",
        },
        color: "amber",
        items: [
          {
            en: "Challenge: Communicating two diverse facets of BigBee (high-energy media production studio vs. trustworthy English education) within a single cohesive digital identity.",
            vi: "Thử thách: Truyền tải đồng thời hai mảng hoạt động khác nhau của BigBee (phòng thu sản xuất truyền thông năng động và trung tâm tiếng Anh uy tín) trong cùng một nhận diện thương hiệu số thống nhất.",
          },
          {
            en: "Solution: Designed clear thematic sections with complementary color palettes, modern typography, and structured navigation guiding visitors naturally between services.",
            vi: "Giải pháp: Thiết kế các phân vùng nội dung rõ ràng với bảng màu bổ trợ, kiểu chữ hiện đại và hệ thống điều hướng trực quan giúp người dùng dễ dàng khám phá từng dịch vụ.",
          },
        ],
      },
    ],
  },
  "Admin System Collection": {
    metrics: {
      type: {
        en: "Internal Enterprise Systems",
        vi: "Hệ thống Quản trị Doanh nghiệp Nội bộ",
      },
      status: { en: "Production", vi: "Production" },
      duration: { en: "2024 to 2025", vi: "2024 đến 2025" },
      role: { en: "Fullstack Developer / System Architect", vi: "Lập trình viên Fullstack / Kiến trúc hệ thống" },
      teamSize: { en: "8 members", vi: "8 thành viên" },
    },
    techStack: {
      frontend: [
        "• React.js + Next.js + TypeScript",
        "• Ant Design + Tailwind CSS",
        "• TanStack Table & Virtualization",
        "• Recharts & Data Analytics",
      ],
      backend: [
        "• NestJS / Express.js",
        "• RESTful & WebSocket APIs",
        "• Microservices Architecture",
        "• JWT & Multi-Factor Auth (2FA)",
      ],
      database: [
        "• PostgreSQL & MongoDB",
        "• Prisma ORM",
        "• Redis Cache & Session Store",
      ],
      architecture: [
        "• Hierarchical RBAC & Audit Trails",
        "• Apache Kafka Event Pipelines",
        "• Centralized Log Aggregator",
      ],
      integration: [
        "• Real-time Notification Engine",
        "• Wallet Top-up & Payment Ledgers",
        "• Identity Single Sign-On (SSO)",
        "• Automated Reconciliation Webhooks",
      ],
    },
    responsibilities: [
      {
        title: { en: "Centralized Identity (IAM)", vi: "Hệ thống Quản lý Định danh (IAM)" },
        desc: {
          en: "Engineered single sign-on (SSO), JWT session lifecycles, and granular multi-level RBAC permission matrices.",
          vi: "Xây dựng hệ thống đăng nhập tập trung, kiểm soát vòng đời token JWT và ma trận phân quyền RBAC đa cấp.",
        },
        accent: "indigo",
      },
      {
        title: { en: "Top-up & Financial Operations", vi: "Hệ thống Nạp tiền & Quản lý Ví" },
        desc: {
          en: "Built administrative balance adjustments, deposit approvals, automated bank ledger reconciliations, and audit trails.",
          vi: "Phát triển cổng duyệt nạp tiền, điều chỉnh số dư, đối soát tự động với sổ cái ngân hàng và lưu vết kiểm toán.",
        },
        accent: "emerald",
      },
      {
        title: { en: "Omnichannel Notification Hub", vi: "Trung tâm Thông báo Đa kênh" },
        desc: {
          en: "Designed dynamic notification workflows delivering instant alerts across WebSockets, Email, and SMS dispatchers.",
          vi: "Thiết kế luồng thông báo thời gian thực truyền phát qua WebSockets, Email thông báo và tin nhắn SMS.",
        },
        accent: "sky",
      },
      {
        title: { en: "High-Density Data Dashboards", vi: "Bảng Điều khiển Dữ liệu Mật độ cao" },
        desc: {
          en: "Built virtualized data tables, advanced multi-column filtering, bulk status updates, and Excel/CSV data exports.",
          vi: "Xây dựng bảng dữ liệu ảo hóa, bộ lọc đa điều kiện nâng cao, cập nhật trạng thái hàng loạt và xuất dữ liệu Excel/CSV.",
        },
        accent: "purple",
      },
      {
        title: { en: "Audit Logging & Security Enforcement", vi: "Ghi Log Kiểm toán & Bảo mật" },
        desc: {
          en: "Implemented immutable administrative activity logs, IP tracking, and instant suspicious action alerts.",
          vi: "Thiết lập hệ thống ghi nhật ký hành động admin bất biến, theo dõi địa chỉ IP và cảnh báo truy cập bất thường.",
        },
        accent: "rose",
      },
      {
        title: { en: "Modular Component Architecture", vi: "Kiến trúc Giao diện Mô-đun hóa" },
        desc: {
          en: "Standardized reusable UI design tokens, forms, modals, and charts across all internal company backoffices.",
          vi: "Chuẩn hóa thư viện component, form nhập liệu, modal và biểu đồ dùng chung cho toàn bộ các trang nội bộ.",
        },
        accent: "amber",
      },
    ],
    backendContributions: [
      {
        en: "Designed unified RESTful and WebSocket API endpoints supporting high-concurrency admin operations.",
        vi: "Thiết kế các API RESTful và WebSocket hợp nhất đáp ứng các thao tác quản trị viên với độ chịu tải cao.",
      },
      {
        en: "Implemented financial transaction state machines to prevent double-spending and ledger inconsistencies.",
        vi: "Xây dựng state-machine cho giao dịch tài chính ngăn chặn lỗi duplicate tiền và sai lệch sổ cái.",
      },
      {
        en: "Created asynchronous message queues with Kafka to process bulk notification dispatches without blocking.",
        vi: "Thiết lập hàng đợi thông điệp bất đồng bộ Kafka để gửi thông báo hàng loạt mà không gây nghẽn hệ thống.",
      },
      {
        en: "Structured PostgreSQL schema indexing and Redis caching to keep complex admin analytics queries under 100ms.",
        vi: "Tối ưu hóa chỉ mục PostgreSQL và bộ đệm Redis giúp các truy vấn báo cáo thống kê phức tạp phản hồi dưới 100ms.",
      },
    ],
    frontendContributions: [
      {
        en: "Constructed slick, dark/light theme-ready enterprise dashboards using Ant Design and custom Tailwind CSS utility layers.",
        vi: "Xây dựng giao diện dashboard chuyên nghiệp, hiện đại kết hợp Ant Design và các lớp tùy biến Tailwind CSS.",
      },
      {
        en: "Implemented responsive virtualized tables handling 50,000+ data rows with zero frame drops or input lag.",
        vi: "Phát triển bảng dữ liệu ảo hóa xử lý mượt mà hơn 50.000 dòng dữ liệu mà không gây giật lag giao diện.",
      },
      {
        en: "Built interactive data visualization widgets featuring real-time financial metrics, user growth, and active sessions.",
        vi: "Phát triển các widget trực quan hóa dữ liệu hiển thị dòng tiền, tỷ lệ tăng trưởng người dùng và phiên hoạt động.",
      },
    ],
    challenges: [
      {
        title: {
          en: "Unified Architecture for Multi-Product Administration",
          vi: "Kiến trúc Hợp nhất cho Quản trị Đa sản phẩm",
        },
        color: "indigo",
        items: [
          {
            en: "Challenge: Organizing heterogeneous admin requirements (Identity, Billing/Topup, Notifications, Content Moderation) from multiple products into one cohesive, standardized internal design system.",
            vi: "Thử thách: Chuẩn hóa các luồng nghiệp vụ quản trị đa dạng (Quản lý định danh, Nạp tiền/Thanh toán, Thông báo, Quản lý nội dung) từ nhiều sản phẩm về chung một hệ thống thiết kế nội bộ đồng nhất.",
          },
          {
            en: "Solution: Abstracted domain modules into decoupled micro-frontend packages with standardized design tokens, shared authentication hooks, and unified permission boundaries.",
            vi: "Giải pháp: Trừu tượng hóa các domain nghiệp vụ thành các package mô-đun độc lập với design token chuẩn hóa, hook xác thực dùng chung và ranh giới phân quyền bảo mật thống nhất.",
          },
          {
            en: "Achievement: Reduced development time for new admin modules by 40% while delivering a unified, lightning-fast operational control room.",
            vi: "Thành tựu: Giảm 40% thời gian phát triển các tính năng quản trị mới, đồng thời cung cấp một trung tâm điều hành nội bộ mượt mà, bảo mật tuyệt đối.",
          },
        ],
      },
    ],
  },
};

const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project: initialProject,
  onClose,
  lang,
  toggleLanguage,
  onSelectProject,
}) => {
  const [lastProject, setLastProject] = useState<Project | null>(initialProject);

  useEffect(() => {
    if (initialProject) {
      setLastProject(initialProject);
    }
  }, [initialProject]);

  const project = initialProject || lastProject;

  // Dynamic Client-side SEO Meta Tags
  useEffect(() => {
    if (!project) return;

    const firstImage = (project.images && project.images.length > 0) ? project.images[0] : (project.image || "");
    const subtitleText = project.subtitle?.vi || project.subtitle?.en || project.role?.vi || project.role?.en || "Dự án";
    const titleText = `${project.title} - ${subtitleText} | Hồ Văn Thanh Phương`;
    const descText = (project.description?.vi || project.description?.en || "").replace(/\*\*/g, "").trim();

    document.title = titleText;

    const updateMeta = (selector: string, attrKey: string, attrVal: string, contentVal: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attrKey, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute("content", contentVal);
    };

    updateMeta('meta[name="description"]', 'name', 'description', descText);
    updateMeta('meta[property="og:title"]', 'property', 'og:title', titleText);
    updateMeta('meta[property="og:description"]', 'property', 'og:description', descText);
    updateMeta('meta[property="og:image"]', 'property', 'og:image', firstImage);
    updateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', titleText);
    updateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', descText);
    updateMeta('meta[name="twitter:image"]', 'name', 'twitter:image', firstImage);

    return () => {
      document.title = "Hồ Văn Thanh Phương | Full-Stack Software Engineer";
    };
  }, [project]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project?.title]);

  if (!project) {
    return null;
  }

  const images =
    project.images && project.images.length > 0
      ? project.images
      : [project.image];
  const currentData =
    PROJECT_CUSTOM_DATA[project.title] || PROJECT_CUSTOM_DATA["TokenMall"];
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "features" | "history" | "tech" | "reviews"
  >("overview");
  const [selectedNodeId, setSelectedNodeId] = useState<"std" | "web3" | "ent">(
    "std",
  );
  const [copied, setCopied] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(168);

  // Review states
  const [reviews, setReviews] = useState<
    Array<{ name: string; rating: number; date: string; content: string }>
  >([
    {
      name: lang === "en" ? "Nguyen Van Minh" : "Nguyễn Văn Minh",
      rating: 5,
      date: "2026-06-15",
      content:
        lang === "en"
          ? "Outstanding design and architecture. The user experience is flawless, lightning-fast, and fully responsive."
          : "Thiết kế và cấu trúc xuất sắc. Trải nghiệm người dùng cực kỳ mượt mà, tốc độ phản hồi nhanh và đáp ứng hoàn hảo.",
    },
    {
      name: lang === "en" ? "Jessica Taylor" : "Jessica Taylor",
      rating: 5,
      date: "2026-07-02",
      content:
        lang === "en"
          ? "Extremely professional and modular code. The attention to visual detail and micro-animations is next level!"
          : "Mã nguồn cực kỳ chuyên nghiệp và mô-đun hóa. Sự chăm chút tỉ mỉ cho từng chi tiết giao diện và hiệu ứng động rất ấn tượng!",
    },
  ]);
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewContent, setNewReviewContent] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);

  // Shuffled other projects (random 4, but stable per selected project)
  const shuffledOtherProjects = React.useMemo(() => {
    const filtered = PROJECTS.filter((p) => p.title !== project.title);
    return [...filtered].sort(() => Math.random() - 0.5).slice(0, 4);
  }, [project.title]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [project]);

  // Dynamic SEO meta tags management for Project Detail View
  useEffect(() => {
    if (!project) return;

    const defaultTitle = "Thanh Phuong | Full-Stack Software Engineer";
    const defaultDesc =
      "Portfolio of Thanh Phuong, a Full-Stack Software Engineer with experience building scalable web applications using React, Next.js, Node.js, TypeScript, and modern backend technologies. Explore projects, technical skills, and professional experience.";
    const defaultImg =
      "https://res.cloudinary.com/thanhphuongdev/image/upload/v1783936804/Screenshot_2026-07-13_165801_z65ck1.png";

    const subtitleText = project.subtitle?.[lang] || project.role?.[lang] || "Software Engineering Project";
    const pageTitle = `${project.title} - ${subtitleText} | Thanh Phuong`;
    const pageDesc = project.description?.[lang] || defaultDesc;
    const pageImage = (project.images && project.images.length > 0) ? project.images[0] : (project.image || defaultImg);
    const pageUrl = window.location.href;

    // Update document title
    document.title = pageTitle;

    // Helper function to create or update a meta tag
    const setMetaTag = (selector: string, attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Helper function to update canonical link
    const setCanonicalLink = (url: string) => {
      let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", url);
    };

    // Set Primary SEO & Social Meta Tags
    setMetaTag("meta[name='description']", "name", "description", pageDesc);
    setMetaTag("meta[property='og:title']", "property", "og:title", pageTitle);
    setMetaTag("meta[property='og:description']", "property", "og:description", pageDesc);
    setMetaTag("meta[property='og:image']", "property", "og:image", pageImage);
    setMetaTag("meta[property='og:url']", "property", "og:url", pageUrl);
    setMetaTag("meta[property='og:type']", "property", "og:type", "article");

    setMetaTag("meta[property='twitter:title']", "property", "twitter:title", pageTitle);
    setMetaTag("meta[property='twitter:description']", "property", "twitter:description", pageDesc);
    setMetaTag("meta[property='twitter:image']", "property", "twitter:image", pageImage);
    setMetaTag("meta[property='twitter:card']", "property", "twitter:card", "summary_large_image");

    setCanonicalLink(pageUrl);

    // Inject JSON-LD Structured Data for Google Rich Snippets
    const schemaObj = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": project.title,
      "headline": pageTitle,
      "description": pageDesc,
      "image": pageImage,
      "url": pageUrl,
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web",
      "author": {
        "@type": "Person",
        "name": "Ho Van Thanh Phuong",
        "jobTitle": "Full-Stack Software Engineer",
        "url": "https://checkin.metadap.io/"
      },
      "keywords": project.tags ? project.tags.join(", ") : undefined
    };

    let scriptTag = document.getElementById("project-jsonld-schema") as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "project-jsonld-schema";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaObj);

    // Cleanup & Restore Default Portfolio Meta Tags when leaving detail view
    return () => {
      document.title = defaultTitle;
      setMetaTag("meta[name='description']", "name", "description", defaultDesc);
      setMetaTag("meta[property='og:title']", "property", "og:title", defaultTitle);
      setMetaTag("meta[property='og:description']", "property", "og:description", defaultDesc);
      setMetaTag("meta[property='og:image']", "property", "og:image", defaultImg);
      setMetaTag("meta[property='og:url']", "property", "og:url", window.location.origin);
      setMetaTag("meta[property='og:type']", "property", "og:type", "website");

      setMetaTag("meta[property='twitter:title']", "property", "twitter:title", defaultTitle);
      setMetaTag("meta[property='twitter:description']", "property", "twitter:description", defaultDesc);
      setMetaTag("meta[property='twitter:image']", "property", "twitter:image", defaultImg);

      setCanonicalLink(window.location.origin);

      const existingScript = document.getElementById("project-jsonld-schema");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [project, lang]);

  // Preload all project images into memory to avoid network latency and lag on switch
  useEffect(() => {
    if (images && images.length > 0) {
      images.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [images]);

  // Auto slide every 5 seconds, resets when activeImgIndex changes, paused when zoomed
  useEffect(() => {
    if (images.length <= 1 || zoomedImage) return;
    const interval = setInterval(() => {
      setActiveImgIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeImgIndex, images.length, zoomedImage]);

  // Keyboard navigation for Lightbox carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!zoomedImage) return;
      if (e.key === "Escape") {
        setZoomedImage(null);
      } else if (e.key === "ArrowRight") {
        setActiveImgIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === "ArrowLeft") {
        setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [zoomedImage, images.length]);

  const getTechDetails = (tag: string) => {
    const details = techDetails[tag];
    if (details) return details;
    return {
      category: "Technology",
      role: {
        en: `High-performance technology utilized in building the ${tag} integration of this project.`,
        vi: `Công nghệ hiệu năng cao được sử dụng trong việc triển khai giải pháp ${tag} của dự án này.`,
      },
    };
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewContent.trim()) return;
    const newRev = {
      name: newReviewName,
      rating: newReviewRating,
      date: new Date().toISOString().split("T")[0],
      content: newReviewContent,
    };
    setReviews((prev) => [newRev, ...prev]);
    setNewReviewName("");
    setNewReviewContent("");
    setNewReviewRating(5);
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText("0x0911ddf413bc1a28a2a8934dfad1a47dfd47d4e5");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    if (hasLiked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setHasLiked(!hasLiked);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getTagIcon = (tagName: string) => {
    const skill = SKILLS.find(
      (s) => s.name.toLowerCase() === tagName.toLowerCase(),
    );
    if (!skill) {
      return (
        <span className="text-[10px] md:text-xs font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
          {tagName}
        </span>
      );
    }

    const iconElement = skill.customSvg ? (
      <div
        className="w-3.5 h-3.5 flex items-center justify-center text-white"
        dangerouslySetInnerHTML={{ __html: skill.customSvg }}
      />
    ) : skill.icon ? (
      <img
        src={skill.icon}
        alt={tagName}
        className="w-3.5 h-3.5 object-contain"
      />
    ) : (
      <img
        src={`https://cdn.simpleicons.org/${skill.iconSlug}/${skill.color.replace("#", "")}`}
        alt={tagName}
        className="w-3.5 h-3.5 object-contain"
      />
    );

    return (
      <div className="flex items-center gap-1.5 px-3 py-1 glass rounded-xl border border-white/5 text-[10px] md:text-xs font-semibold text-slate-200">
        <span className="w-4 h-4 flex items-center justify-center">
          {iconElement}
        </span>
        <span>{tagName}</span>
      </div>
    );
  };

  return (
    <div className="relative z-10 w-full min-h-screen text-slate-100 flex flex-col pt-16 md:pt-24 pb-16 md:pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Back Button Link (Clean, repositioned, no overlaps!) */}
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-slate-400 hover:text-sky-400 transition-all text-xs font-black uppercase tracking-wider mb-4 md:mb-6 cursor-pointer self-start py-2 px-3 md:p-0 rounded-xl bg-white/5 md:bg-transparent border border-white/10 md:border-transparent"
      >
        <ChevronLeft className="w-4 h-4 text-sky-400" />
        {lang === "en"
          ? "Back to Featured Projects"
          : "Quay lại danh sách dự án"}
      </button>

      {/* Title & Metadata Header Row matching image styling */}
      <div className="flex flex-col gap-2 mb-4 md:mb-8">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none uppercase">
          {project.title}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          {project.subtitle && (
            <span className="px-3 py-1 rounded-full text-[10px] md:text-xs font-mono font-black uppercase tracking-widest bg-sky-500/10 text-sky-400 border border-sky-500/20">
              {project.subtitle[lang]}
            </span>
          )}
          {project.title === "Thuc Pham Quang Da" && (
            <span className="px-3 py-1 rounded-full text-[10px] md:text-xs font-mono font-black uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {lang === "en"
                ? "Freelance Client: Quang Da Food"
                : "Khách hàng Freelance: Thực Phẩm Quảng Đà"}
            </span>
          )}
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-12">
        {/* Left Column: Image Showcase with List of images */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div
            onClick={() => setZoomedImage(images[activeImgIndex])}
            className="relative aspect-video rounded-2xl md:rounded-3xl bg-slate-950/60 border border-white/10 overflow-hidden group/gallery shadow-[0_30px_100px_rgba(0,0,0,0.5)] cursor-zoom-in"
          >
            {/* Active image */}
            <AnimatePresence>
              <motion.img
                key={activeImgIndex}
                src={images[activeImgIndex]}
                alt={`${project.title} screenshot ${activeImgIndex + 1}`}
                initial={{ opacity: 0, scale: 1.015 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ willChange: "transform, opacity" }}
              />
            </AnimatePresence>

            {/* Ambient shadow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-75 pointer-events-none" />

            {/* Left & Right Nav arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-2.5 rounded-lg md:rounded-xl bg-slate-900/90 border border-white/10 hover:bg-white hover:text-black transition-all text-white z-10 cursor-pointer shadow-lg"
                >
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-2.5 rounded-lg md:rounded-xl bg-slate-900/90 border border-white/10 hover:bg-white hover:text-black transition-all text-white z-10 cursor-pointer shadow-lg"
                >
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </>
            )}

            {/* "Xem tất cả ảnh" list photos button on bottom right */}
            <button
              onClick={() => setZoomedImage(images[activeImgIndex])}
              className="absolute bottom-3 right-3 md:bottom-4 md:right-4 bg-black/85 hover:bg-sky-500 border border-white/10 hover:border-sky-400 text-white text-[10px] md:text-[11px] font-bold px-2.5 py-1.5 md:px-3.5 md:py-2 rounded-lg md:rounded-xl flex items-center gap-1.5 transition-all shadow-2xl cursor-pointer pointer-events-auto"
            >
              <Maximize2 className="w-3.5 h-3.5 text-sky-400 group-hover:text-white" />
              {lang === "en" ? "View all screenshots" : "Xem tất cả ảnh"}
            </button>

            {/* Image counter indicator */}
            <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 bg-black/70 border border-white/10 text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded-md">
              {activeImgIndex + 1} / {images.length}
            </div>
          </div>

          {/* List of images thumbnail sliders */}
          {images.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImgIndex(i)}
                  className={`relative flex-shrink-0 w-24 md:w-32 aspect-video rounded-xl md:rounded-2xl border overflow-hidden transition-all cursor-pointer ${
                    activeImgIndex === i
                      ? "border-sky-500 ring-2 ring-sky-500/20 scale-[0.98]"
                      : "border-white/5 hover:border-white/20 hover:scale-[1.02]"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-sky-500/10 transition-opacity ${activeImgIndex === i ? "opacity-100" : "opacity-0"}`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Developer Info & Custom Metadata Card */}
        <div className="lg:col-span-5 flex flex-col gap-5 pt-2">
          {/* Developer Profile Card matching Pham Anh Quoc block */}
          <div className="glass p-4 md:p-5 rounded-xl md:rounded-2xl border border-white/5 flex items-center gap-4 hover:border-white/10 transition-all duration-300">
            <img
              src="https://res.cloudinary.com/thanhphuongdev/image/upload/v1769871580/480871455_1804998116709580_5147978810349798493_n_qyxuqm.jpg"
              alt="Hồ Văn Thanh Phương Avatar"
              className="w-12 h-12 rounded-full object-cover border border-white/20 shadow-md"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-white font-black tracking-tight text-sm uppercase">
                  HỒ VĂN THANH PHƯƠNG
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400 font-semibold mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>
                  {project.title === "Thuc Pham Quang Da"
                    ? lang === "en"
                      ? "Quang Da Food Company"
                      : "Công ty Thực phẩm Quảng Đà"
                    : "Meta Digital Asset Platform"}
                </span>
                <span className="text-slate-600">·</span>
                <span>
                  {project.title === "Thuc Pham Quang Da"
                    ? lang === "en"
                      ? "Hoa Xuan, Da Nang"
                      : "Hòa Xuân, Đà Nẵng"
                    : lang === "en"
                      ? "Da Nang, Vietnam"
                      : "Đà Nẵng, Việt Nam"}
                </span>
              </div>
            </div>
          </div>

          {/* Description Block */}
          <div className="glass p-4 md:p-5 rounded-xl md:rounded-2xl border border-white/5 space-y-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase block">
              {lang === "en" ? "NARRATIVE DESCRIPTION" : "TÀI LIỆU KHẢO SÁT"}
            </span>
            <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed whitespace-pre-line">
              {project.description[lang]}
            </p>
          </div>

          {project.link && !project.linkExpired ? (
            <motion.a
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 30px rgba(56,189,248,0.35)",
              }}
              whileTap={{ scale: 0.97 }}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-blue-500 to-purple-600 text-white font-bold uppercase tracking-[0.18em] text-xs shadow-lg shadow-sky-500/20 transition-all duration-300 cursor-pointer border border-white/10"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

              <span className="relative z-10">
                {lang === "en" ? "VIEW PROJECT" : "TRUY CẬP"}
              </span>

              <ExternalLink className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.a>
          ) : null}
        </div>
      </div>
      {/* ff */}
      {/* Core Project Metrics Container */}
      <div className="relative overflow-hidden p-4 md:p-8 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.2)] my-4 md:my-6 hover:border-white/20 transition-all duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/[0.01] rounded-full blur-2xl pointer-events-none" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 text-left">
          <div>
            <span className="text-slate-500 text-[10px] font-mono font-black uppercase tracking-wider block mb-1">
              {lang === "en" ? "Project Type" : "Loại dự án"}
            </span>
            <span className="text-white font-black text-xs md:text-sm block uppercase tracking-tight">
              {currentData.metrics.type[lang]}
            </span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] font-mono font-black uppercase tracking-wider block mb-1">
              {lang === "en" ? "Status" : "Trạng thái"}
            </span>
            <span className="text-sky-400 font-black text-xs md:text-sm block uppercase tracking-tight">
              {currentData.metrics.status[lang]}
            </span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] font-mono font-black uppercase tracking-wider block mb-1">
              {lang === "en" ? "Duration" : "Thời gian"}
            </span>
            <span className="text-slate-300 font-black text-xs md:text-sm block uppercase tracking-tight">
              {currentData.metrics.duration[lang]}
            </span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] font-mono font-black uppercase tracking-wider block mb-1">
              {lang === "en" ? "Role" : "Vai trò"}
            </span>
            <span className="text-emerald-400 font-black text-xs md:text-sm block uppercase tracking-tight">
              {currentData.metrics.role[lang]}
            </span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] font-mono font-black uppercase tracking-wider block mb-1">
              {lang === "en" ? "Team Size" : "Quy mô nhóm"}
            </span>
            <span className="text-amber-500 font-black text-xs md:text-sm block uppercase tracking-tight">
              {currentData.metrics.teamSize[lang]}
            </span>
          </div>
        </div>
      </div>

      {/* Expanded Project Case Study Details */}
      <div className="space-y-4 md:space-y-6 text-left mt-4 md:mt-6 pb-4 md:pb-6">
        {/* Section: Tech Stack Summary */}
        <div className="relative overflow-hidden p-4 md:p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.2)] space-y-4 hover:border-white/20 transition-all duration-300 group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/[0.02] rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-3 pb-3 border-b border-white/5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500/20 to-sky-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight bg-gradient-to-r from-purple-400 via-sky-400 to-teal-400 bg-clip-text text-transparent">
                {lang === "en" ? "Core Tech Stack" : "Công nghệ sử dụng"}
              </h2>
              <p className="text-[10px] font-mono text-purple-400 uppercase tracking-widest mt-0.5 font-bold">
                {lang === "en"
                  ? "System architecture & technology matrix"
                  : "Hồ sơ công nghệ & hệ sinh thái dự án"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                name: "Frontend",
                items: currentData.techStack.frontend,
                color: "sky",
                icon: <Layers className="w-4 h-4" />,
              },
              {
                name: "Backend",
                items: currentData.techStack.backend,
                color: "emerald",
                icon: <Cpu className="w-4 h-4" />,
              },
              {
                name: "Database",
                items: currentData.techStack.database,
                color: "amber",
                icon: <Database className="w-4 h-4" />,
              },
              {
                name: "Architecture",
                items: currentData.techStack.architecture,
                color: "indigo",
                icon: <Terminal className="w-4 h-4" />,
              },
              {
                name: "Integration",
                items: currentData.techStack.integration,
                color: "purple",
                icon: <Sparkles className="w-4 h-4" />,
              },
            ].map((cat, catIdx) => {
              const borderColors: Record<string, string> = {
                sky: "border-sky-500/30 bg-sky-950/15 shadow-[0_4px_24px_rgba(14,165,233,0.06)] hover:border-sky-400 hover:bg-sky-950/25 hover:shadow-[0_0_25px_rgba(14,165,233,0.2)] text-sky-400",
                emerald:
                  "border-emerald-500/30 bg-emerald-950/15 shadow-[0_4px_24px_rgba(16,185,129,0.06)] hover:border-emerald-400 hover:bg-emerald-950/25 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] text-emerald-400",
                amber:
                  "border-amber-500/30 bg-amber-950/15 shadow-[0_4px_24px_rgba(245,158,11,0.06)] hover:border-amber-400 hover:bg-amber-950/25 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)] text-amber-400",
                indigo:
                  "border-indigo-500/30 bg-indigo-950/15 shadow-[0_4px_24px_rgba(99,102,241,0.06)] hover:border-indigo-400 hover:bg-indigo-950/25 hover:shadow-[0_0_25px_rgba(99,102,241,0.2)] text-indigo-400",
                purple:
                  "border-purple-500/30 bg-purple-950/15 shadow-[0_4px_24px_rgba(168,85,247,0.06)] hover:border-purple-400 hover:bg-purple-950/25 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] text-purple-400",
              };

              const glowColors: Record<string, string> = {
                sky: "bg-sky-500/[0.04]",
                emerald: "bg-emerald-500/[0.04]",
                amber: "bg-amber-500/[0.04]",
                indigo: "bg-indigo-500/[0.04]",
                purple: "bg-purple-500/[0.04]",
              };

              const badgeBg: Record<string, string> = {
                sky: "bg-sky-500/10 border-sky-500/20",
                emerald: "bg-emerald-500/10 border-emerald-500/20",
                amber: "bg-amber-500/10 border-amber-500/20",
                indigo: "bg-indigo-500/10 border-indigo-500/20",
                purple: "bg-purple-500/10 border-purple-500/20",
              };

              return (
                <div
                  key={catIdx}
                  className={`group relative overflow-hidden p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-4 ${borderColors[cat.color]}`}
                >
                  <div
                    className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none ${glowColors[cat.color]}`}
                  />
                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center gap-2.5 font-black text-xs uppercase tracking-wider">
                      <div
                        className={`w-7 h-7 rounded-lg border flex items-center justify-center ${badgeBg[cat.color]}`}
                      >
                        {cat.icon}
                      </div>
                      <span>{cat.name}</span>
                    </div>
                    <div className="space-y-1.5 text-[11px] text-slate-300 font-semibold leading-relaxed pt-1">
                      {cat.items.map((item, idx) => (
                        <div key={idx}>{item}</div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 1: My Responsibilities */}
        <div className="relative overflow-hidden p-4 md:p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.2)] space-y-5 hover:border-white/20 transition-all duration-300 group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/[0.02] rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-3 pb-3 border-b border-white/5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500/20 to-orange-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(245,158,11,0.15)]">
                {lang === "en" ? "My Responsibilities" : "Nhiệm vụ của tôi"}
              </h2>
              <p className="text-[10px] font-mono text-amber-400 uppercase tracking-widest mt-0.5 font-bold">
                {lang === "en"
                  ? "Key contributions and implementations"
                  : "Chi tiết công việc và các module đã trực tiếp phát triển"}
              </p>
            </div>
          </div>

          {/* Premium Grid of Core Actions (Bento Style Cards with Glowing Hover state) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentData.responsibilities.map((item, idx) => {
              const cardColors: Record<string, string> = {
                sky: "border-sky-500/30 bg-sky-950/15 shadow-[0_4px_20px_rgba(14,165,233,0.06)] hover:border-sky-400 hover:bg-sky-950/25 hover:shadow-[0_0_25px_rgba(14,165,233,0.2)]",
                emerald:
                  "border-emerald-500/30 bg-emerald-950/15 shadow-[0_4px_20px_rgba(16,185,129,0.06)] hover:border-emerald-400 hover:bg-emerald-950/25 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]",
                indigo:
                  "border-indigo-500/30 bg-indigo-950/15 shadow-[0_4px_20px_rgba(99,102,241,0.06)] hover:border-indigo-400 hover:bg-indigo-950/25 hover:shadow-[0_0_25px_rgba(99,102,241,0.2)]",
                purple:
                  "border-purple-500/30 bg-purple-950/15 shadow-[0_4px_20px_rgba(168,85,247,0.06)] hover:border-purple-400 hover:bg-purple-950/25 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]",
                rose: "border-rose-500/30 bg-rose-950/15 shadow-[0_4px_20px_rgba(244,63,94,0.06)] hover:border-rose-400 hover:bg-rose-950/25 hover:shadow-[0_0_25px_rgba(244,63,94,0.2)]",
                amber:
                  "border-amber-500/30 bg-amber-950/15 shadow-[0_4px_20px_rgba(245,158,11,0.06)] hover:border-amber-400 hover:bg-amber-950/25 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]",
                teal: "border-teal-500/30 bg-teal-950/15 shadow-[0_4px_20px_rgba(20,184,166,0.06)] hover:border-teal-400 hover:bg-teal-950/25 hover:shadow-[0_0_25px_rgba(20,184,166,0.2)]",
              };

              const badgeColors: Record<string, string> = {
                sky: "bg-sky-500/10 text-sky-400 border-sky-500/20",
                emerald:
                  "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
                purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
                rose: "bg-rose-500/10 text-rose-400 border-rose-500/20",
                amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
                teal: "bg-teal-500/10 text-teal-400 border-teal-500/20",
              };

              return (
                <div
                  key={idx}
                  className={`group relative overflow-hidden flex flex-col justify-between p-5 rounded-2xl border transition-all duration-300 ${cardColors[item.accent] || "border-white/5 bg-slate-950/40 hover:border-sky-500/25"}`}
                >
                  {/* Decorative corner ambient glow */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center justify-between">
                      <span
                        className={`flex items-center justify-center w-6 h-6 rounded-lg border text-[10px] font-black ${badgeColors[item.accent]}`}
                      >
                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </span>
                      <Check className="w-4 h-4 text-emerald-400 opacity-40 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div>
                      <h4 className="text-sm md:text-base text-white font-black tracking-tight leading-tight group-hover:text-sky-400 transition-colors duration-300">
                        {item.title[lang]}
                      </h4>
                      <p className="text-xs text-slate-400 font-semibold leading-relaxed mt-1.5">
                        {item.desc[lang]}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subsections: Backend vs Frontend Details (Premium Dual Layout Control Panels) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            {/* Backend Column */}
            <div className="relative overflow-hidden p-6 md:p-8 rounded-3xl bg-sky-950/15 border border-sky-500/25 shadow-[0_4px_24px_rgba(14,165,233,0.03)] hover:border-sky-400/50 hover:bg-sky-950/25 transition-all duration-500 space-y-4 group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/[0.02] rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-3 border-b border-white/5 text-sky-400">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-black uppercase tracking-wider text-white">
                      {lang === "en"
                        ? "Backend Contributions"
                        : "Phát triển Backend"}
                    </h3>
                    <span className="text-[9px] font-mono text-sky-400 uppercase tracking-widest font-bold">
                      CORE SYSTEMS / INFRASTRUCTURE
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded-md">
                  Active
                </span>
              </div>

              <ul className="space-y-3.5">
                {currentData.backendContributions.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-xs text-slate-300 font-semibold group/item hover:text-white transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 flex-shrink-0 group-hover/item:scale-125 group-hover/item:bg-sky-300 transition-all" />
                    <span>{lang === "en" ? item.en : item.vi}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Frontend Column */}
            <div className="relative overflow-hidden p-6 md:p-8 rounded-3xl bg-purple-950/15 border border-purple-500/25 shadow-[0_4px_24px_rgba(168,85,247,0.03)] hover:border-purple-400/50 hover:bg-purple-950/25 transition-all duration-500 space-y-4 group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/[0.02] rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-3 border-b border-white/5 text-purple-400">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-black uppercase tracking-wider text-white">
                      {lang === "en"
                        ? "Frontend Contributions"
                        : "Phát triển Frontend"}
                    </h3>
                    <span className="text-[9px] font-mono text-purple-400 uppercase tracking-widest font-bold">
                      USER INTERFACES / CLIENT STATE
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-md">
                  Active
                </span>
              </div>

              <ul className="space-y-3.5">
                {currentData.frontendContributions.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-xs text-slate-300 font-semibold group/item hover:text-white transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0 group-hover/item:scale-125 group-hover/item:bg-purple-300 transition-all" />
                    <span>{lang === "en" ? item.en : item.vi}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2: Challenges, Solutions & Achievements */}
        <div className="relative overflow-hidden p-4 md:p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.2)] space-y-4 hover:border-white/20 transition-all duration-300 group text-left">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/[0.02] rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-3 pb-3 border-b border-white/5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">
                {lang === "en"
                  ? "Challenges, Solutions & Achievements"
                  : "Thử thách, Giải pháp & Thành tựu"}
              </h2>
              <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mt-0.5 font-bold">
                {lang === "en"
                  ? "Engineering breakthroughs & system outcomes"
                  : "Những cột mốc kỹ thuật cốt lõi đã đạt được"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
            {currentData.challenges.map((challenge, cIdx) => {
              const textColors: Record<string, string> = {
                emerald: "text-emerald-400",
                teal: "text-teal-400",
                sky: "text-sky-400",
                indigo: "text-indigo-400",
                purple: "text-purple-400",
                amber: "text-amber-400",
              };

              const bgColors: Record<string, string> = {
                emerald: "bg-emerald-400",
                teal: "bg-teal-400",
                sky: "bg-sky-400",
                indigo: "bg-indigo-400",
                purple: "bg-purple-400",
                amber: "bg-amber-400",
              };

              return (
                <div key={cIdx} className="space-y-4">
                  <h3 className="text-sm md:text-base font-black text-white uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-white/5">
                    <span
                      className={`w-2 h-2 rounded-full ${bgColors[challenge.color] || "bg-sky-400"}`}
                    />
                    {challenge.title[lang]}
                  </h3>
                  <ul className="space-y-3">
                    {challenge.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-slate-300 font-semibold leading-relaxed group/item hover:text-white transition-colors"
                      >
                        <span
                          className={`${textColors[challenge.color] || "text-sky-400"} mt-1 flex-shrink-0`}
                        >
                          •
                        </span>
                        <span>{lang === "en" ? item.en : item.vi}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Other Projects Section (Max 4) */}
        <div className="mt-6 pt-6 md:mt-10 md:pt-10 border-t border-white/5 text-left">
          <div className="mb-4 md:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight">
                {lang === "en" ? "Other Projects" : "Các dự án khác"}
              </h2>
              <p className="text-[10px] font-mono text-sky-400 uppercase tracking-widest mt-0.5 font-bold">
                {lang === "en"
                  ? "More featured implementations"
                  : "Các dự án tiêu biểu khác"}
              </p>
            </div>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-6 py-3 rounded-xl bg-slate-950/80 border border-white/10 overflow-hidden text-white font-bold uppercase tracking-widest text-[11px] md:text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.05)] hover:shadow-[0_0_25px_rgba(56,189,248,0.15)] self-start sm:self-auto min-w-[160px]"
            >
              {/* Glassmorphism Background Highlight */}
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Glowing hover border */}
              <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-40 blur-sm transition-opacity duration-500" />

              <span className="relative z-10 flex items-center gap-2 text-white group-hover:text-sky-300 transition-colors duration-300">
                <ArrowLeft className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition-all duration-300 group-hover:-translate-x-1" />
                {lang === "en" ? "View all projects" : "Xem tất cả dự án"}
              </span>
            </motion.button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {shuffledOtherProjects.map((otherProj, idx) => (
              <ProjectCard
                key={otherProj.title}
                project={otherProj}
                index={idx}
                lang={lang}
                onOpen={() => onSelectProject && onSelectProject(otherProj)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Image Zoom Overlay (Premium Lightbox Carousel) */}
      <AnimatePresence>
        {zoomedImage && (
          <>
            <style>{`
              html, body {
                overflow: hidden !important;
                height: 100%;
              }
              .fixed.z-\\[100\\] {
                display: none !important;
              }
            `}</style>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setZoomedImage(null)}
              className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-8 cursor-zoom-out select-none"
            >
              {/* Top Toolbar */}
              <div className="absolute top-4 left-4 right-4 md:top-6 md:left-6 md:right-6 flex items-center justify-between text-white pointer-events-none z-10">
                <div className="bg-black/60 px-3 py-1.5 md:px-4 md:py-2 rounded-xl border border-white/10 font-bold text-[10px] md:text-xs uppercase tracking-wider backdrop-blur-sm">
                  {project.title} — {activeImgIndex + 1} / {images.length}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomedImage(null);
                  }}
                  className="p-2.5 md:p-3 rounded-xl bg-slate-900/80 border border-white/10 text-white hover:bg-white hover:text-black hover:border-white hover:scale-105 active:scale-95 transition-all cursor-pointer pointer-events-auto shadow-xl flex items-center justify-center"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>

              {/* Main Interactive Zoom Area */}
              <div className="relative w-full max-w-5xl h-[65vh] md:h-[75vh] flex items-center justify-center">
                {/* Left arrow button inside Lightbox */}
                {images.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImgIndex(
                        (prev) => (prev - 1 + images.length) % images.length,
                      );
                    }}
                    className="absolute left-2 md:left-6 p-3 md:p-4 rounded-full bg-slate-900/80 border border-white/10 hover:bg-white hover:text-black text-white hover:scale-105 active:scale-95 transition-all z-20 cursor-pointer shadow-2xl pointer-events-auto flex items-center justify-center group"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                )}

                {/* Main Display Image */}
                <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                  <AnimatePresence>
                    <motion.img
                      key={activeImgIndex}
                      initial={{ opacity: 0, scale: 0.985 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.015 }}
                      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                      src={images[activeImgIndex]}
                      alt={`${project.title} zoomed view`}
                      className="absolute max-w-full max-h-full rounded-2xl object-contain shadow-2xl border border-white/10 pointer-events-auto cursor-default"
                      style={{ willChange: "transform, opacity" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (images.length > 1) {
                          setActiveImgIndex(
                            (prev) => (prev + 1) % images.length,
                          );
                        }
                      }}
                    />
                  </AnimatePresence>
                </div>

                {/* Right arrow button inside Lightbox */}
                {images.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImgIndex((prev) => (prev + 1) % images.length);
                    }}
                    className="absolute right-2 md:right-6 p-3 md:p-4 rounded-full bg-slate-900/80 border border-white/10 hover:bg-white hover:text-black text-white hover:scale-105 active:scale-95 transition-all z-20 cursor-pointer shadow-2xl pointer-events-auto flex items-center justify-center group"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}
              </div>

              {/* Bottom thumbnail selector inside Lightbox */}
              {images.length > 1 && (
                <div
                  className="mt-6 flex gap-2.5 overflow-x-auto pb-2 no-scrollbar z-20 pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImgIndex(i)}
                      className={`relative flex-shrink-0 w-16 md:w-20 aspect-video rounded-lg border overflow-hidden transition-all cursor-pointer ${
                        activeImgIndex === i
                          ? "border-sky-500 ring-2 ring-sky-500/30 scale-95"
                          : "border-white/10 hover:border-white/30 hover:scale-105"
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <div
                        className={`absolute inset-0 bg-sky-500/10 transition-opacity ${activeImgIndex === i ? "opacity-100" : "opacity-0"}`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetailView;

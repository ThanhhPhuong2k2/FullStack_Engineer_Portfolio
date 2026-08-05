
import { NavItem, Skill, Project, Language } from './types';

export const getSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9\s-]/g, "") // remove special characters
    .trim()
    .replace(/\s+/g, "-") // replace spaces with -
    .replace(/-+/g, "-"); // collapse multiple -
};

export const getNavItems = (lang: Language): NavItem[] => [
  { label: lang === 'en' ? 'Home' : 'Trang chủ', href: '#home' },
  { label: lang === 'en' ? 'Projects' : 'Dự án', href: '#experience' },
  { label: lang === 'en' ? 'Skills' : 'Kỹ năng', href: '#skills' },
  { label: lang === 'en' ? 'Journey' : 'Hành trình', href: '#journey' },
  { label: lang === 'en' ? 'Work' : 'Công việc', href: '#work' },
  { label: lang === 'en' ? 'Contact' : 'Liên hệ', href: '#contact' },
];

export interface EnhancedSkill extends Skill {
  color: string;
  iconSlug: string;
}

export const SKILLS: EnhancedSkill[] = [
  { name: 'ReactJS', category: 'Frontend', color: '#61DAFB', iconSlug: 'react' },
  { name: 'Vite', category: 'Frontend', color: '#646CFF', iconSlug: 'vite' },
  { name: 'Next.js', category: 'Frontend', color: '#ffffff', iconSlug: 'nextdotjs' },
  { name: 'Tailwind CSS', category: 'Frontend', color: '#06B6D4', iconSlug: 'tailwindcss' },
  { name: 'Ant Design', category: 'Frontend', color: '#0170FE', iconSlug: 'antdesign' },
  { name: 'Material UI', category: 'Frontend', color: '#007FFF', iconSlug: 'mui' },
  { name: 'Sass', category: 'Frontend', color: '#CC6699', iconSlug: 'sass' },
  { name: 'Bootstrap', category: 'Frontend', color: '#7952B3', iconSlug: 'bootstrap' },
  { name: 'React Redux', category: 'Frontend', color: '#764ABC', iconSlug: 'redux' },
  { name: 'React Query', category: 'Frontend', color: '#FF4154', iconSlug: 'reactquery' },
  { name: 'Axios', category: 'Frontend', color: '#5A29E4', iconSlug: 'axios' },
  { name: 'Node.js', category: 'Backend', color: '#339933', iconSlug: 'nodedotjs' },
  { name: 'NestJS', category: 'Backend', color: '#E0234E', iconSlug: 'nestjs' },
  { name: 'Express.js', category: 'Backend', color: '#ffffff', iconSlug: 'express' },
  { name: 'OpenAI API', category: 'Backend', color: '#10A37F', iconSlug: 'openai' },
  { name: 'PostgreSQL', category: 'Database', color: '#4169E1', iconSlug: 'postgresql' },
  { name: 'Prisma', category: 'Database', color: '#2D3748', iconSlug: 'prisma' },
  { name: 'Redis', category: 'Database', color: '#DC382D', iconSlug: 'redis' },
  { name: 'SQL Server', category: 'Database', color: '#CC2927', iconSlug: 'microsoftsqlserver' },
  { name: 'MySQL', category: 'Database', color: '#4479A1', iconSlug: 'mysql' },
  { name: 'MongoDB', category: 'Database', color: '#47A248', iconSlug: 'mongodb' },
  { name: 'Cloudinary', category: 'DevOps', color: '#3448C5', iconSlug: 'cloudinary' },
  { name: 'Kafka', category: 'DevOps', color: '#231F20', iconSlug: 'apachekafka' },
  { name: 'Docker', category: 'DevOps', color: '#2496ED', iconSlug: 'docker' },
  { name: 'Socket.io', category: 'DevOps', color: '#010101', iconSlug: 'socketdotio' },
  { 
    name: 'VNPay', 
    category: 'Payments', 
    color: '#E01E26', 
    iconSlug: 'vnpay',
    customSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="77" height="75" viewBox="0 0 77 75" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M49.456 57.7868C49.9185 58.4217 50.055 58.6442 50.1073 59.2084C50.1431 59.6013 50.1169 59.8258 49.9902 60.1926L45.6847 72.6775C45.4834 73.1904 45.0663 73.7575 44.4605 74.3081H49.1589C48.8105 73.9984 48.5869 73.6307 48.5056 73.1923C48.4321 72.7917 48.435 72.6407 48.5221 72.2555L49.4773 69.2904H54.945L55.7966 71.5752C55.8856 71.8142 55.9369 72.0368 55.9592 72.2933C56.0347 73.1468 55.7608 73.8494 55.0834 74.3449H62.4489C61.726 73.7013 61.0631 73.0278 60.6885 72.21L55.3108 57.7868H49.456V57.7868ZM65.1731 66.6262L59.385 58.3268L58.7966 57.7868H64.5014L68.3685 64.0607L68.6792 63.8071L71.0163 60.3329C71.5911 59.4794 71.5137 58.4884 70.695 57.7868H76.0863L69.854 66.6242L69.8511 73.0355L70.9495 74.342H64.2518L65.1963 73.0549C65.1963 70.9181 65.1179 68.7562 65.1731 66.6262V66.6262ZM34.5624 57.8013L38.2631 57.7868H42.7573C45.2298 57.7868 47.2524 59.8094 47.2524 62.281V62.8346C47.2524 65.3062 45.2289 67.1913 42.7573 67.2668L40.7076 67.3288C42.3556 66.571 43.0456 64.6568 42.8395 62.9323C42.675 61.5484 41.9618 60.2178 40.7743 60.1926L40.0253 60.1771V72.4955C40.0253 72.7355 40.0669 72.8352 40.1927 73.0462C40.394 73.381 40.6621 73.7158 40.9389 74.0507C41.0105 74.1378 41.0831 74.2249 41.1547 74.312H34.7802C34.876 74.1949 34.9698 74.0758 35.0589 73.9539C35.2524 73.6907 35.4237 73.411 35.5524 73.0994C35.6347 72.9 35.6753 72.5381V59.3052C35.6502 58.6152 34.965 58.2233 34.5624 57.8013V57.8013ZM54.1427 67.14H50.2321L52.1279 61.7362L54.1427 67.14ZM41.5418 16.4255L36.7485 21.2187L36.5095 21.4549L34.9863 22.98L31.4279 26.5394L31.1918 26.7784H31.1889L28.9427 29.0207V29.0246L28.7076 29.2597C28.034 29.9333 27.2898 30.4858 26.4982 30.9223C26.0976 31.1429 25.6882 31.3326 25.2692 31.4933C24.3363 31.8533 23.356 32.0642 22.3689 32.1262C21.764 32.1668 21.1495 32.1513 20.5476 32.0768C19.245 31.922 17.9666 31.5058 16.8005 30.8294C16.3011 30.541 15.7882 30.24 15.3634 29.8181C15.3605 29.8181 15.3605 29.8181 15.3576 29.8152C15.2647 29.7252 15.1718 29.6323 15.0789 29.5355L6.16499 20.6226C6.01306 20.4552 5.87661 20.2723 5.76241 20.0768C5.47015 19.5833 5.30273 19.0133 5.30273 18.3987C5.30273 18.3029 5.30564 18.2062 5.31532 18.1133C5.3279 17.97 5.34919 17.8336 5.37725 17.7C5.38983 17.6478 5.40241 17.5955 5.41499 17.5452C5.4208 17.5239 5.42661 17.5016 5.43338 17.4804C5.55725 17.071 5.75951 16.6829 6.03822 16.3355C6.11273 16.2455 6.19016 16.1584 6.27435 16.0713L6.42919 15.9194L15.7263 6.61842H15.7302L21.3643 0.985193C22.6205 -0.270936 24.6218 -0.327065 25.9398 0.823581L41.5418 16.4255Z" fill="#0D5BA9"/><path fill-rule="evenodd" clip-rule="evenodd" d="M20.5461 63.5125V72.3616C20.5461 72.7206 20.6294 72.7845 20.85 73.0729L21.8642 74.3938H17.0206C17.2926 73.9777 17.5655 73.5616 17.8384 73.1454C18.0494 72.8019 18.1394 72.6848 18.1394 72.2861V59.9232L16.7787 57.709H21.7974L29.9245 68.1771V59.8351C29.9245 59.4364 29.8461 59.3077 29.6352 58.9642C29.3623 58.548 29.0777 58.1435 28.8058 57.7274H33.6445L32.6352 59.0484C32.4145 59.3367 32.3313 59.4006 32.3313 59.7596V74.8167C30.4984 74.5758 28.7913 74.1277 27.2739 72.1874L20.5461 63.5125V63.5125ZM0 57.709H5.14645L9.46452 70.0932L13.1284 59.8351C13.1942 59.4364 13.1371 59.3077 12.9852 58.9642C12.7819 58.548 12.5652 58.1435 12.3629 57.7274H16.2058C15.9784 58.5645 15.6416 59.4838 15.3513 60.3277L10.3887 74.75C9.03387 74.48 7.52323 73.9438 6.35516 72.8367C5.47645 72.0035 5.16387 71.0561 4.73032 69.9277L0.579678 58.9371C0.41613 58.5035 0.214839 58.1145 0 57.709V57.709ZM69.028 25.4087L68.7919 25.6477L58.3306 36.2667L47.3458 47.42C46.9955 47.7703 46.6287 48.0867 46.2406 48.3722C46.229 48.3848 46.2135 48.3974 46.1971 48.41C46.1448 48.4467 46.0916 48.4874 46.0364 48.5242C46.0297 48.53 46.0239 48.5338 46.0181 48.5396C44.3613 49.7251 42.329 50.42 40.139 50.42C37.4332 50.42 34.9761 49.3583 33.1587 47.6309C33.1548 47.628 33.1548 47.628 33.1519 47.6251C33.0687 47.5535 32.9874 47.4819 32.9071 47.4074L31.0181 45.5183L25.71 40.2074L23.6903 38.1867C23.9787 38.2342 24.27 38.2554 24.5613 38.2554L24.8071 38.2525C25.1448 38.24 25.4835 38.2003 25.8155 38.1316C26.3584 38.0193 26.9071 37.8335 27.4471 37.579C28.6074 37.0303 29.4726 36.2696 29.8858 35.8671C30.0464 35.7083 30.1674 35.5748 30.2177 35.5158L34.3006 31.5045L34.3152 31.5229L48.3542 17.7113L48.4277 17.6222L55.2474 10.9119C56.1658 10.0148 57.599 9.89673 58.6413 10.6138L60.2574 12.23C60.2603 12.23 60.2603 12.2329 60.2603 12.2329L69.028 21.0006C69.1055 21.078 69.18 21.1583 69.2487 21.2425C70.2406 22.4677 70.1661 24.2735 69.028 25.4087ZM15.2439 29.6996C15.2816 29.7374 15.3194 29.7742 15.3571 29.8109C15.7819 30.2329 16.2977 30.5367 16.8 30.8261C17.9661 31.5016 19.2445 31.9177 20.5481 32.0725C21.149 32.1471 21.7635 32.1625 22.3684 32.1219C23.3545 32.06 24.3358 31.849 25.2697 31.489C25.6887 31.3284 26.0971 31.1387 26.4977 30.918C27.2884 30.4816 28.0335 29.929 28.7071 29.2554L28.9423 29.0203V29.0164L31.1884 26.7732H31.1913L31.4274 26.5351L32.0913 25.8713L33.8506 24.1119L34.9858 22.9767L36.509 21.4506L36.7481 21.2145L46.4052 11.5564L50.3894 7.24125C50.3981 7.23157 50.4039 7.22577 50.4135 7.21609L50.6284 7.00609C51.8439 5.78964 53.8171 5.78964 55.0326 7.00609L57.2139 9.18641H57.2168L57.2884 9.25802C56.3235 9.21157 55.349 9.55899 54.6203 10.2722L47.2403 17.5313L47.1658 17.6222L34.3219 30.2609L34.3026 30.2454L29.5723 34.8925L29.5413 34.9303C29.5287 34.9458 29.4261 35.06 29.2558 35.2274C28.8832 35.5903 28.1042 36.2764 27.0629 36.77C26.5906 36.9925 26.1097 37.1542 25.6355 37.2538C25.3529 37.309 25.0645 37.3467 24.7819 37.3593H24.5681C23.8171 37.3593 23.0787 37.1919 22.3713 36.8687L20.5848 35.0851L20.1474 34.6506L20.0729 34.5732L19.2416 33.7419L15.2439 29.6996C15.1887 29.6454 15.1335 29.5893 15.0774 29.5322L15.2439 29.6996V29.6996Z" fill="#EC1F27"/><path d="M35.1468 13.7854C34.899 14.0303 34.4926 14.0245 34.2448 13.7758C30.1058 9.60673 23.349 9.58157 19.179 13.7167C15.0129 17.8558 14.9848 24.6125 19.1239 28.7825L22.3629 32.0487C22.3842 32.0709 22.4055 32.0951 22.4181 32.1203C22.4026 32.1203 22.3871 32.1232 22.3716 32.1232C21.7823 32.1638 21.1861 32.1483 20.6006 32.0796L18.221 29.6787C13.5893 25.0132 13.6164 17.4464 18.2829 12.8148C22.9523 8.18319 30.5152 8.21318 35.1468 12.8796L35.1564 12.8883C35.4042 13.1371 35.3984 13.5367 35.1468 13.7854ZM26.529 30.9038C26.5193 30.9106 26.5106 30.9135 26.501 30.9203C26.11 31.1342 25.7132 31.32 25.3039 31.4777L20.8919 27.03C18.131 24.2467 17.7371 19.888 19.9523 16.6616C20.1506 16.3732 20.5474 16.2987 20.8358 16.4971C21.1281 16.6954 21.1987 17.0922 21.0003 17.3845C19.1297 20.1048 19.4645 23.7842 21.7948 26.1329L26.529 30.9038ZM34.7752 23.1919L33.8752 24.0909L28.9019 19.078C27.6893 17.8529 25.7035 17.8471 24.4813 19.0596C23.259 20.2761 23.2493 22.258 24.4658 23.4803L27.67 26.7125C27.9187 26.9612 27.9187 27.3648 27.6671 27.6125C27.4194 27.8603 27.0158 27.8574 26.7681 27.6096L23.56 24.3774C21.8539 22.6548 21.8626 19.8658 23.5842 18.1567C25.3068 16.4477 28.0987 16.4593 29.8048 18.1819L34.7752 23.1919ZM32.1158 25.8503L31.2168 26.7503L26.231 21.7277C25.9832 21.48 25.9861 21.0764 26.2339 20.8277C26.4855 20.58 26.889 20.5829 27.1339 20.8306L32.1158 25.8503ZM37.4364 20.5296L36.7513 21.2158L36.5374 21.4267L31.5729 16.4254C29.7303 14.5703 27.041 13.919 24.549 14.7251C24.2171 14.8335 23.8571 14.6506 23.7487 14.3196C23.6403 13.9838 23.8232 13.6238 24.159 13.5154C27.1058 12.5603 30.2955 13.3325 32.4768 15.5293L37.4364 20.5296ZM40.0987 17.8683L39.1987 18.7674L37.6193 17.1793C37.3716 16.9277 37.3745 16.5251 37.6223 16.2793C37.8739 16.0316 38.2745 16.0316 38.5223 16.2832L40.0987 17.8683Z" fill="#00A0DD" stroke="#00A0DD" stroke-width="0.0677419" stroke-miterlimit="10"/></svg>`
  },
  { 
    name: 'VietQR', 
    category: 'Payments', 
    color: '#EB1F27', 
    iconSlug: 'vietqr',
    icon: 'https://res.cloudinary.com/thanhphuongdev/image/upload/v1769887524/1280px-VietQR_Logo.svg_cdjwoj.png'
  },
  { 
    name: 'ACB', 
    category: 'Payments', 
    color: '#005BAA', 
    iconSlug: 'handshake',
    icon: 'https://res.cloudinary.com/thanhphuongdev/image/upload/v1769887730/logo-acb-inkythuatso_s6e5ny.png'
  },
  { name: 'Web3.js', category: 'Web3', color: '#F16822', iconSlug: 'web3dotjs' },
  { name: 'Ethers.js', category: 'Web3', color: '#243145', iconSlug: 'ethers' },
  { 
    name: 'Wagmi', 
    category: 'Web3', 
    color: '#38bdf8', 
    iconSlug: 'react',
    icon: 'https://res.cloudinary.com/thanhphuongdev/image/upload/v1769887863/logo-light_niqdll.svg'
  },
];

export const PROJECTS: Project[] = [
  {
    title: 'TokenMall',
    description: {
      en: 'TokenMall is an e-commerce platform dedicated to products with OCOP certification or equivalent quality standards. The system combines traditional e-commerce with blockchain technology through NFT Vouchers, while supporting Seller management, Affiliate programs, multiple payment methods, and shipping service integration to deliver a modern shopping experience.',
      vi: 'TokenMall là nền tảng thương mại điện tử dành cho các sản phẩm đạt chứng nhận OCOP hoặc các tiêu chuẩn chất lượng tương đương. Hệ thống kết hợp thương mại điện tử với công nghệ blockchain thông qua Voucher NFT, đồng thời hỗ trợ quản lý Seller, Affiliate, nhiều phương thức thanh toán và tích hợp dịch vụ vận chuyển để mang đến trải nghiệm mua sắm hiện đại.'
    },
    tags: ['Kafka', 'VNPay', 'MongoDB', 'Next.js', 'Express.js'],
    image: 'https://cdn.metadap.io/assets/d641bc04-4ebf-42f8-ba6f-9231a223c9d4/file.png?format=webp&q=75&w=200',
    link: 'https://www.facebook.com/photo.php?fbid=122124721718526001&set=pb.61565780051514.-2207520000&type=3',
    year: '2024',
    role: { en: 'Fullstack Developer', vi: 'Lập trình viên Fullstack' },
    subtitle: { en: 'E-commerce Platform', vi: 'Nền tảng Thương mại điện tử' },
    color: '#0ea5e9',
    images: [
      'https://cdn.metadap.io/assets/d641bc04-4ebf-42f8-ba6f-9231a223c9d4/file.png?format=webp&q=75&w=200',
      'https://framerusercontent.com/images/2WcBfaCxul9lkWllMPkQqPsTFw.png',
      'https://framerusercontent.com/images/1ujBIvH83QntgR4TAQCWsSlKMQM.png',
      'https://framerusercontent.com/images/xpBDFhaftMJqvOOu0Bo3xAY2uko.png',
      'https://framerusercontent.com/images/byDMwTQuzggWNz6lB6z5LE5KpEA.png',
      'https://res.cloudinary.com/fqqdj43k/image/upload/v1783706210/Thanh_to%C3%A1n_nhi%E1%BB%81u_shop_1_l%E1%BA%A7n_tyjqhd.png',
      'https://res.cloudinary.com/fqqdj43k/image/upload/v1783706210/Detail_s%E1%BA%A3n_ph%E1%BA%A9m_r54ojg.png',
      'https://res.cloudinary.com/fqqdj43k/image/upload/v1783706210/Qu%E1%BA%A3n_l%C3%BD_t%C3%A0i_kho%E1%BA%A3n_zys3fp.png',
      'https://res.cloudinary.com/fqqdj43k/image/upload/v1783706211/%C4%90%C4%83ng_k%C3%BD_b%C3%A1n_h%C3%A0ng_vn5shy.png',
      'https://res.cloudinary.com/fqqdj43k/image/upload/v1783706211/Qu%E1%BA%A3n_l%C3%BD_s%E1%BA%A3n_ph%E1%BA%A9m_lnfcv9.png',
      'https://res.cloudinary.com/fqqdj43k/image/upload/v1783706211/%C4%90%C6%A1n_h%C3%A0ng_c%E1%BB%A7a_t%C3%B4i_Ch%E1%BB%9D_x%C3%A1c_nh%E1%BA%ADn_l06rz9.png',
      'https://res.cloudinary.com/fqqdj43k/image/upload/v1783706214/Detail_s%E1%BA%A3n_ph%E1%BA%A9m1_ilqfob.png'
    ],
    features: {
      en: [
        'Secure e-commerce infrastructure supporting thousands of daily transactions',
        'Intuitive dynamic shopping cart and streamlined multi-step checkout experience',
        'Official VNPAY API implementation with instant webhook callback processing',
        'Automated real-time inventory adjustments and high-performance warehouse logs',
        'Scalable message queue integration with Apache Kafka for asynchronous order distribution'
      ],
      vi: [
        'Cơ sở hạ tầng thương mại điện tử bảo mật hỗ trợ hàng ngàn giao dịch hàng ngày',
        'Giỏ hàng động trực quan và trải nghiệm thanh toán nhiều bước tinh giản',
        'Triển khai API VNPAY chính thức với xử lý phản hồi webhook tức thời',
        'Tự động cập nhật kho hàng thời gian thực và ghi log kho hiệu năng cao',
        'Tích hợp hàng đợi tin nhắn mở rộng với Apache Kafka để phân phối đơn hàng bất đồng bộ'
      ]
    }
  },
  {
    title: 'Thuc Pham Quang Da',
    description: {
      en: 'Thực Phẩm Quảng Đà is a freelance e-commerce platform developed for **Quảng Đà Food**, a local food distributor in Da Nang. The platform provides a complete online shopping experience, including product management, inventory, shopping cart, checkout, payment, and order management, helping streamline business operations and improve customer purchasing experience.',
      vi: 'Thực Phẩm Quảng Đà là nền tảng thương mại điện tử freelance được phát triển cho **Quảng Đà Food**, một nhà phân phối thực phẩm địa phương tại Đà Nẵng. Nền tảng cung cấp trải nghiệm mua sắm trực tuyến toàn diện, bao gồm quản lý sản phẩm, tồn kho, giỏ hàng, thanh toán, thanh toán trực tuyến và quản lý đơn hàng, giúp tinh giản vận hành doanh nghiệp và nâng cao trải nghiệm mua hàng của khách hàng.'
    },
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'Prisma', 'Tailwind', 'Material UI'],
    image: 'https://res.cloudinary.com/dfbbhslan/image/upload/v1754148729/Copilot_20250802_223141_x6y7hk.png',
    link: 'https://thucphamquangda.com/',
    year: '2024',
    role: { en: 'Fullstack Developer', vi: 'Lập trình viên Fullstack' },
    subtitle: { en: 'Freelance Project', vi: 'Dự án Freelance' },
    color: '#f97316',
    images: [
      'https://res.cloudinary.com/dfbbhslan/image/upload/v1754148729/Copilot_20250802_223141_x6y7hk.png',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
      'https://res.cloudinary.com/fqqdj43k/image/upload/v1783745077/Screenshot_2026-07-11_113823_uv86tw.png',
      'https://res.cloudinary.com/fqqdj43k/image/upload/v1783745076/Screenshot_2026-07-11_113915_psuk3c.png',
      'https://res.cloudinary.com/fqqdj43k/image/upload/v1783745075/image_sjamhr.png',
      'https://res.cloudinary.com/fqqdj43k/image/upload/v1783745074/image_1_hvzl5c.png',
      'https://res.cloudinary.com/fqqdj43k/image/upload/v1783745074/banner_profile_tu87l8.webp',
      'https://res.cloudinary.com/fqqdj43k/image/upload/v1783745077/image_3_w2vhvh.png'
    ],
    features: {
      en: [
        'Clean high-converting user interfaces for fresh produce and culinary selection',
        'Intelligent inventory tracking monitoring precise expiration and batch dates',
        'Automatic low-stock threshold notifications and intelligent smart ordering system',
        'Secure dashboard for merchants to manage imports, exports, and daily analytics',
        'Flexible and robust PostgreSQL queries delivering fast real-time reporting'
      ],
      vi: [
        'Giao diện người dùng sạch, chuyển đổi cao cho thực phẩm tươi sống và tuyển chọn ẩm thực',
        'Theo dõi kho thông minh giám sát ngày hết hạn và ngày lô sản xuất chính xác',
        'Thông báo ngưỡng tồn kho thấp tự động và hệ thống đặt hàng thông minh',
        'Trang tổng quan bảo mật cho nhà bán hàng quản lý nhập, xuất và phân tích hàng ngày',
        'Truy vấn PostgreSQL linh hoạt và mạnh mẽ mang lại báo cáo thời gian thực nhanh chóng'
      ]
    }
  },
  {
    title: 'Risegate – Asset Tokenization Platform',
    description: {
      en: 'Risegate is an asset tokenization platform that enables businesses to digitize and manage real-world assets on blockchain. The platform supports asset issuance, project management, secure wallet integration, KYC verification, payment processing, and blockchain-based transaction tracking to provide a transparent and secure investment ecosystem.',
      vi: 'Risegate là nền tảng mã hóa tài sản cho phép doanh nghiệp số hóa và quản lý các tài sản thực tế trên blockchain. Nền tảng hỗ trợ phát hành tài sản, quản lý dự án, tích hợp ví bảo mật, xác thực KYC, xử lý thanh toán và theo dõi giao dịch trên blockchain nhằm mang lại một hệ sinh thái đầu tư minh bạch và an toàn.'
    },
    tags: ['Next.js', 'Express.js', 'MongoDB', 'Kafka', 'Wagmi', 'Web3.js', 'Socket.io', 'VNPAY', 'VietQR', 'ACB'],
    image: 'https://framerusercontent.com/images/oHCMlUL1ZrSH7Hr9kgKZRyab3E.png',
    link: 'https://risegate.io/',
    year: '2023',
    role: { en: 'Fullstack Developer', vi: 'Lập trình viên Fullstack' },
    subtitle: { en: 'Asset Tokenization Platform', vi: 'Nền tảng Tokenization tài sản' },
    color: '#8b5cf6',
    images: [
      'https://framerusercontent.com/images/oHCMlUL1ZrSH7Hr9kgKZRyab3E.png',
      'https://framerusercontent.com/images/CvgRf5V2QhuzNZ98ffgOSwztJs.png',
      'https://framerusercontent.com/images/bfWUzppNPtruUMk8njloQJNTSTU.png',
      'https://framerusercontent.com/images/HHItlWUVW0vw6XmmgykoGRMc.png',
      'https://res.cloudinary.com/thanhphuongdev/image/upload/v1746686812/xdu3ddabap8uohqkp8zw.png'
    ],
    features: {
      en: [
        'Refactored modular backend services architecture enhancing maintainability and scalable throughput',
        'Scalable RESTful APIs for unified digital asset, wallet connections, campaigns, and ledger transactions',
        'Decentralized Web3 smart wallet connectivity using Wagmi and Web3.js protocols',
        'Peer-to-peer (P2P) asset transmission workflows directly targeting unregistered emails securely',
        'Reliable transaction pipelines driven by Kafka with VietQR, ACB Bank ledger, and VNPAY API channels'
      ],
      vi: [
        'Tái cấu trúc hệ thống backend mô-đun hóa tăng cường tính bảo trì và khả năng chịu tải',
        'Hệ thống API RESTful hiệu năng cao cho quản lý tài sản số, liên kết ví, chiến dịch và giao dịch',
        'Kết nối ví thông minh Web3 phi tập trung sử dụng giao thức Wagmi và Web3.js',
        'Quy trình chuyển tài sản ngang hàng (P2P) bảo mật trực tiếp tới email chưa đăng ký',
        'Luồng giao dịch đáng tin cậy vận hành bởi Kafka kết hợp VietQR, đối soát ACB và cổng VNPAY'
      ]
    }
  },
  {
    title: 'Ôn TOEIC',
    description: {
      en: 'Developed an AI-powered English learning platform serving 2,500+ users, providing TOEIC learning features including Listening, Speaking, Reading, Grammar, Vocabulary, and mock tests.',
      vi: 'Phát triển nền tảng học tiếng Anh ứng dụng AI phục vụ hơn 2,500 người dùng, cung cấp các tính năng học TOEIC bao gồm Nghe, Nói, Đọc, Ngữ pháp, Từ vựng và Đề thi thử.'
    },
    tags: [
      'Next.js',
      'TypeScript',
      'NestJS',
      'PostgreSQL',
      'Redis',
      'Prisma',
      'Socket.io',
      'OpenAI API',
      'Cloudinary',
      'Docker',
      'Speech Recognition API',
      'AI Recommendation System'
    ],
    image: 'https://ontoeic.com/opengraph-image?521c820942e3ceff',
    link: 'https://www.ontoeic.com/',
    year: '2025',
    role: { en: 'Fullstack Developer (Freelance)', vi: 'Lập trình viên Fullstack (Freelance)' },
    subtitle: { en: 'AI-Powered TOEIC Learning Platform', vi: 'Nền tảng luyện thi TOEIC ứng dụng AI' },
    color: '#6366f1',
    images: [
      'https://ontoeic.com/opengraph-image?521c820942e3ceff',
      'https://res.cloudinary.com/fqqdj43k/image/upload/v1785908415/Screenshot_2026-08-05_123658_cwqrbs.png',
      'https://res.cloudinary.com/fqqdj43k/image/upload/v1785908415/729790721_27608574332126704_5403600951846826839_n_kyebij.jpg',
      'https://res.cloudinary.com/fqqdj43k/image/upload/v1785908415/728225676_27585984394385698_5479477221126610036_n_dnv9kg.jpg',
      'https://res.cloudinary.com/fqqdj43k/image/upload/v1785908417/726914633_27585944151056389_8875298119599664239_n_pdvo1g.jpg'
    ],
    features: {
      en: [
        'Developed an AI-powered English learning platform serving 2,500+ users, providing TOEIC learning features including Listening, Speaking, Reading, Grammar, Vocabulary, and mock tests.',
        'Designed and implemented frontend interfaces, backend APIs, and database architecture to support user management, learning progress tracking, and content workflows.',
        'Integrated AI and speech recognition APIs to analyze pronunciation, fluency, and speaking accuracy, providing AI-generated feedback and personalized learning recommendations.',
        'Developed vocabulary learning features, progress tracking, and a competitive vocabulary challenge system that allows users to compete with each other.',
        'Implemented AI-powered learning path recommendations based on user performance, learning goals, and progress data.'
      ],
      vi: [
        'Phát triển nền tảng học tiếng Anh ứng dụng AI phục vụ hơn 2,500 người dùng, cung cấp các tính năng học TOEIC bao gồm Nghe, Nói, Đọc, Ngữ pháp, Từ vựng và Đề thi thử.',
        'Thiết kế và phát triển giao diện người dùng, backend API và kiến trúc cơ sở dữ liệu hỗ trợ quản lý người dùng, theo dõi tiến độ học tập và quy trình quản lý nội dung.',
        'Tích hợp AI và Speech Recognition API để phân tích phát âm, độ trôi chảy và độ chính xác bài nói, cung cấp phản hồi tự động và gợi ý học tập cá nhân hóa.',
        'Phát triển các tính năng học từ vựng, theo dõi tiến trình và hệ thống thách đấu từ vựng đối kháng cho phép người dùng thi đấu trực tiếp với nhau.',
        'Triển khai thuật toán gợi ý lộ trình học tập ứng dụng AI dựa trên kết quả luyện tập, mục tiêu học tập và dữ liệu tiến độ của người dùng.'
      ]
    }
  },
  {
    title: 'Landing Page MetaDAP',
    description: {
      en: 'Landing page introducing MetaDAP’s Enterprise Blockchain platform for digital asset management and trading.',
      vi: 'Trang giới thiệu nền tảng Enterprise Blockchain của MetaDAP phục vụ quản lý và giao dịch tài sản số.'
    },
    tags: ['Express.js', 'Tailwind CSS', 'Ant Design', 'MongoDB', 'Next.js'],
    image: 'https://framerusercontent.com/images/Yyg3RYi3N3nLRtOoLhHzPEa0ryA.png',
    link: 'https://metadap.io/',
    year: '2024',
    role: { en: 'Fullstack Developer', vi: 'Lập trình viên Fullstack' },
    subtitle: { en: 'Corporate Landing Page', vi: 'Trang giới thiệu doanh nghiệp' },
    color: '#0284c7',
    images: [
      'https://framerusercontent.com/images/Yyg3RYi3N3nLRtOoLhHzPEa0ryA.png',
      'https://framerusercontent.com/images/l2jEvUGHlnF8yfRVnBgaJR57M.png',
      'https://framerusercontent.com/images/wSJLDSr0lcrUGQaKgLUefGmcGPo.png',
      'https://framerusercontent.com/images/DbdLOakkGjaljym5tuuVVwNd7E4.png',
      'https://cdn.metadap.io/assets/3c23439c-1552-4ed3-914d-665891a6135b/1730983854590-bg_metadap.png'
    ],
    features: {
      en: [
        'Supercharged SEO-optimized architecture boasting high lighthouse performance scores',
        'Sleek futuristic design accents with complex responsive CSS grids and dynamic ambient halos',
        'Comprehensive modular content blocks presenting high-tech blockchain mechanisms elegantly',
        'Slick interactive sections introducing digital registry networks and security structures'
      ],
      vi: [
        'Kiến trúc tối ưu hóa SEO siêu mạnh mẽ tự hào đạt điểm hiệu suất Lighthouse cao',
        'Điểm nhấn thiết kế tương lai đẹp mắt với lưới CSS đáp ứng phức tạp và hào quang môi trường động',
        'Các khối nội dung mô-đun toàn diện trình bày các cơ chế blockchain công nghệ cao một cách trang nhã',
        'Các phần tương tác mượt mà giới thiệu các mạng đăng ký số và cấu trúc bảo mật'
      ]
    }
  },
  {
    title: 'Verify Document',
    description: {
      en: 'Verify Document is a blockchain-based document verification platform designed to ensure the authenticity and integrity of digital records. The platform enables administrators to upload and manage original documents while allowing users to verify whether physical documents match trusted records stored on the blockchain. Result: Successfully deployed and utilized by the Department of Science and Technology of Da Nang City.',
      vi: 'Verify Document là ứng dụng xác thực tài liệu số của Sở khoa học & Công nghệ TP Đà Nẵng, sử dụng công nghệ blockchain để đảm bảo tính xác thực và tính toàn vẹn của các bản ghi kỹ thuật số. Nền tảng cho phép quản trị viên tải lên và quản lý tài liệu gốc, đồng thời cho phép người dùng đối chiếu và xác minh tài liệu vật lý với hồ sơ tin cậy được lưu trữ trên blockchain. Kết quả: Được Sở Khoa học & Công nghệ TP Đà Nẵng đưa vào sử dụng thành công.'
    },
    tags: ['Next.js', 'NestJS', 'MongoDB', 'Blockchain', 'TypeScript', 'Tailwind CSS'],
    image: 'https://framerusercontent.com/images/oQYoVQDeWpZRiRLNZegGTlOSXk.png',
    link: 'https://verify-document.risegate.io/',
    year: '2025',
    role: { en: 'Fullstack Developer', vi: 'Lập trình viên Fullstack' },
    subtitle: { en: 'Blockchain Document Verification Platform', vi: 'Nền tảng xác thực tài liệu số Blockchain' },
    color: '#10b981',
    images: [
      'https://framerusercontent.com/images/oQYoVQDeWpZRiRLNZegGTlOSXk.png',
      'https://res.cloudinary.com/fqqdj43k/image/upload/v1783934733/Screenshot_2026-07-13_162205_mcz1zx.png',
      'https://res.cloudinary.com/fqqdj43k/image/upload/v1783934733/Screenshot_2026-07-13_162241_hklnzj.png'
    ],
    features: {
      en: [
        '★ Successfully deployed and officially utilized by the Department of Science and Technology of Da Nang City (Sở Khoa học & Công nghệ TP Đà Nẵng) for secure document validation.',
        'Designed and optimized the database schema for document management and verification workflows (MongoDB).',
        'Developed RESTful APIs using NestJS for document upload, management, verification, and user operations.',
        'Implemented secure JWT Authentication and robust Role-Based Access Control (RBAC).',
        'Integrated MetaDAP Enterprise Blockchain services to store and verify document authenticity records securely.',
        'Developed seamless document verification workflows to validate physical documents against immutable blockchain records.',
        'Built modern, responsive admin dashboards and user interfaces using React, Next.js, and Tailwind CSS / shadcn.',
        'Implemented QR Code-based verification flows for lightning-fast document validation.',
        'Optimized SEO, search performance, database queries, and APIs to guarantee high visibility and system reliability.'
      ],
      vi: [
        '★ Đã triển khai thành công và đưa vào sử dụng chính thức tại Sở Khoa học & Công nghệ TP Đà Nẵng để xác thực các văn bản số một cách an toàn.',
        'Thiết kế và tối ưu hóa cấu trúc cơ sở dữ liệu cho quy trình quản lý và xác thực tài liệu (MongoDB).',
        'Phát triển hệ thống các cổng API RESTful hiệu năng cao bằng NestJS phục vụ tải lên, quản lý, xác minh tài liệu.',
        'Triển khai cơ chế xác thực JWT và Phân quyền truy cập dựa trên vai trò (RBAC) nghiêm ngặt.',
        'Tích hợp blockchain doanh nghiệp MetaDAP để lưu trữ và đối soát hồ sơ xác thực tài liệu gốc bảo mật.',
        'Xây dựng luồng công việc xác thực tài liệu thông minh nhằm đối chiếu tài liệu vật lý với hồ sơ blockchain.',
        'Xây dựng giao diện người dùng tương thích cao và bảng quản trị chuyên nghiệp bằng React, Next.js và Tailwind CSS / shadcn.',
        'Triển khai giải pháp xác thực qua mã QR Code tiện lợi giúp kiểm tra tài liệu nhanh chóng bằng thiết bị di động.',
        'Tối ưu hóa SEO, hiệu suất tải trang, truy vấn cơ sở dữ liệu và API giúp nâng cao khả năng hiển thị tìm kiếm và tính ổn định.'
      ]
    }
  },
  {
    title: 'VIDE',
    description: {
      en: 'VIDE is the Vietnam Institute of Digital Economy Development, focused on applying technology and AI-driven solutions to support business growth, competitiveness, and digital transformation. The project was designed to present the organization in a more modern, credible, and structured way across its services, programs, and public-facing digital presence.',
      vi: 'VIDE là Viện Phát triển Kinh tế Số Việt Nam, tập trung vào việc áp dụng công nghệ và các giải pháp do AI thúc đẩy nhằm hỗ trợ sự tăng trưởng, khả năng cạnh tranh và chuyển đổi số của doanh nghiệp. Dự án được thiết kế nhằm giới thiệu tổ chức theo cách hiện đại, uy tín và có cấu trúc hơn thông qua các dịch vụ, chương trình và sự hiện diện kỹ thuật số hướng tới công chúng.'
    },
    tags: ['Express.js', 'Tailwind CSS', 'Ant Design', 'MongoDB', 'Next.js'],
    image: 'https://framerusercontent.com/images/TzkRokvts9yf9XUkdO8z4zXCFys.png',
    link: 'https://vide.vn/',
    year: '2022',
    role: { en: 'Fullstack Developer', vi: 'Lập trình viên Fullstack' },
    subtitle: { en: 'Digital Economy Platform', vi: 'Nền tảng phát triển kinh tế số' },
    color: '#059669',
    images: [
      'https://framerusercontent.com/images/TzkRokvts9yf9XUkdO8z4zXCFys.png',
      'https://framerusercontent.com/images/6pVLZRvLg1L2BLSvfVmk5cL0cI.png',
      'https://framerusercontent.com/images/GU5tctqzyzZzcQbKiUrWMxFXn4.png',
      'https://res.cloudinary.com/thanhphuongdev/image/upload/v1760691387/Hero_44_m4h7su.png',
      'https://res.cloudinary.com/fqqdj43k/image/upload/v1783747244/Screenshot_2026-07-11_121850_fpajgy.png'
    ],
    features: {
      en: [
        'Designed a modern, credible, and structured interface reflecting VIDE\'s leadership in digital economy development',
        'Established a clear visual identity with high-performance navigation and smooth scroll behavior',
        'Implemented comprehensive sections for VIDE\'s mission, vision, services, and strategic training programs',
        'Optimized responsive styling for seamless access across mobile, tablet, and desktop devices'
      ],
      vi: [
        'Thiết kế giao diện hiện đại, uy tín và có cấu trúc rõ ràng phản ánh vai trò của VIDE trong phát triển kinh tế số',
        'Xây dựng bản sắc hình ảnh sắc nét với hệ thống điều hướng hiệu năng cao và hiệu ứng cuộn mượt mà',
        'Triển khai các khối nội dung toàn diện cho sứ mệnh, tầm nhìn, dịch vụ và các chương trình đào tạo chiến lược',
        'Tối ưu hóa thiết kế tương thích (responsive) giúp hiển thị mượt mà trên mọi thiết bị di động, máy tính bảng và máy tính để bàn'
      ]
    }
  },
  {
    title: 'MetaOS',
    description: {
      en: 'MetaOS is a digital product experience built for the MetaDAP ecosystem, designed to present tokenized asset infrastructure in a clearer and more accessible way. The project focused on turning a complex blockchain-based platform into a more structured interface with stronger hierarchy, usability, and product clarity.',
      vi: 'MetaOS là một trải nghiệm sản phẩm số được xây dựng cho hệ sinh thái MetaDAP, được thiết kế để trình bày cơ sở hạ tầng tài sản được mã hóa một cách rõ ràng và dễ tiếp cận hơn. Dự án tập trung vào việc chuyển đổi một nền tảng dựa trên blockchain phức tạp thành một giao diện có cấu trúc hơn với hệ thống phân cấp, khả năng sử dụng và độ rõ nét của sản phẩm tốt hơn.'
    },
    tags: ['Next.js', 'TypeScript', 'React.js', 'Tailwind CSS', 'Framer Motion'],
    image: 'https://framerusercontent.com/images/d3qQCuIz37NLapX1u7f0K2v003g.png',
    link: 'https://metaos.metadap.io/',
    year: '2024',
    role: { en: 'Frontend Developer', vi: 'Lập trình viên Frontend' },
    subtitle: { en: 'Digital Product Experience', vi: 'Trải nghiệm sản phẩm số' },
    color: '#3b82f6',
    images: [
      'https://framerusercontent.com/images/d3qQCuIz37NLapX1u7f0K2v003g.png',
      'https://res.cloudinary.com/fqqdj43k/image/upload/v1783749707/image_3_itwxrz.png',
      'https://res.cloudinary.com/fqqdj43k/image/upload/v1783749708/Screenshot_2026-07-11_130024_tqz4iy.png',
      'https://res.cloudinary.com/fqqdj43k/image/upload/v1783749707/Screenshot_2026-07-11_125942_o2ly79.png',
      'https://res.cloudinary.com/fqqdj43k/image/upload/v1783749707/Screenshot_2026-07-11_130001_slahwr.png'
    ],
    features: {
      en: [
        'Developed responsive landing pages using Next.js and TypeScript.',
        'Built reusable UI components to improve maintainability and development efficiency.',
        'Implemented interactive animations and transitions using Framer Motion to enhance user experience.',
        'Optimized page performance and SEO for better accessibility and search visibility.',
        'Translated product requirements and design concepts into a clear and user-friendly interface.'
      ],
      vi: [
        'Phát triển trang giới thiệu (landing page) phản hồi tối ưu bằng Next.js và TypeScript.',
        'Xây dựng các thành phần giao diện người dùng có khả năng tái sử dụng cao giúp tối ưu hóa khả năng bảo trì và phát triển.',
        'Triển khai các hiệu ứng chuyển động và tương tác mượt màng bằng Framer Motion nhằm nâng cao trải nghiệm người dùng.',
        'Tối ưu hóa hiệu suất trang web và cấu hình SEO giúp cải thiện thứ hạng và khả năng tìm kiếm.',
        'Chuyển đổi các yêu cầu sản phẩm và ý tưởng thiết kế thành giao diện trực quan và thân thiện với người dùng.'
      ]
    }
  },
  {
    title: 'Check-in Event',
    description: {
      en: 'Check-in Event is a QR-based event management application built to help organizers publish events, manage attendance, and streamline on-site check-in for participants, access control, and gift distribution. QR check-in flows are widely used to speed up entry, validate participation, and provide real-time attendance tracking for organizers.',
      vi: 'Check-in Event là ứng dụng quản lý sự kiện dựa trên mã QR được xây dựng nhằm giúp ban tổ chức đăng tải sự kiện, quản lý người tham dự, và tinh giản quy trình check-in tại chỗ cho người tham gia, kiểm soát ra vào và phát quà. Luồng check-in bằng mã QR được sử dụng rộng rãi để tăng tốc độ gia nhập, xác thực sự tham gia và cung cấp báo cáo theo dõi người tham gia theo thời gian thực cho nhà tổ chức. Kết quả: Được tin dùng để check-in sự kiện DaVAS.'
    },
    tags: ['Next.js', 'TypeScript', 'React.js', 'Tailwind CSS', 'Framer Motion'],
    image: 'https://framerusercontent.com/images/idX3SWLbFoGIAfCApb1vREVSPk.png',
    link: 'https://checkin.metadap.io/',
    year: '2025',
    role: { en: 'Full Stack Developer', vi: 'Lập trình viên Full Stack' },
    subtitle: { en: 'QR-based Event Management', vi: 'Hệ thống quản lý sự kiện qua mã QR' },
    color: '#ec4899',
    images: [
      'https://framerusercontent.com/images/idX3SWLbFoGIAfCApb1vREVSPk.png',
      'https://res.cloudinary.com/fqqdj43k/image/upload/v1783936004/Screenshot_2026-07-13_162241_pcz2fo.png',
      'https://res.cloudinary.com/fqqdj43k/image/upload/v1783936008/685a9ad3-5483-41f7-910e-17d305dce41b_gip0z5.png',
      'https://res.cloudinary.com/fqqdj43k/image/upload/v1783936003/Screenshot_2026-07-13_164426_wutctu.png',
      'https://res.cloudinary.com/fqqdj43k/image/upload/v1783936003/Screenshot_2026-07-13_164438_m0zz3s.png'
    ],
    features: {
      en: [
        '★ Successfully powered the DaVAS event check-in experience, managing smooth access and attendee lists.',
        'Developed responsive landing pages using Next.js and TypeScript.',
        'Built reusable UI components to improve maintainability and development efficiency.',
        'Implemented interactive animations and transitions using Framer Motion to enhance user experience.',
        'Optimized page performance and SEO for better accessibility and search visibility.',
        'Translated product requirements and design concepts into a clear and user-friendly interface.'
      ],
      vi: [
        '★ Đã áp dụng thành công cho hoạt động check-in tại sự kiện DaVAS, giúp việc điểm danh và kiểm soát lối vào diễn ra trơn tru.',
        'Phát triển trang giới thiệu (landing page) phản hồi tối ưu bằng Next.js và TypeScript.',
        'Xây dựng các thành phần giao diện người dùng có khả năng tái sử dụng cao giúp tối ưu hóa khả năng bảo trì và phát triển.',
        'Triển khai các hiệu ứng chuyển động và tương tác mượt màng bằng Framer Motion nhằm nâng cao trải nghiệm người dùng.',
        'Tối ưu hóa hiệu suất trang web và cấu hình SEO giúp cải thiện thứ hạng và khả năng tìm kiếm.',
        'Chuyển đổi các yêu cầu sản phẩm và ý tưởng thiết kế thành giao diện trực quan và thân thiện với người dùng.'
      ]
    }
  },
];

export const getExperiences = (lang: Language) => [
  {
    company: 'Ôn TOEIC (Freelance Project)',
    role: lang === 'en' ? 'Full-Stack Developer (Freelance)' : 'Lập trình viên Full-Stack (Freelance)',
    period: '10/2025 – PRESENT',
    location: lang === 'en' ? 'Da Nang, Vietnam / Remote' : 'Đà Nẵng, Việt Nam / Remote',
    achievements: lang === 'en' ? [
      'Built and scaled an AI-powered TOEIC learning platform growing to 2,500+ active users.',
      'Developed speech recognition & AI feedback for pronunciation and fluency analysis.',
      'Implemented real-time competitive vocabulary challenges using WebSockets (Socket.io).',
      'Engineered adaptive AI-based learning path recommendations based on user performance data.'
    ] : [
      'Xây dựng và phát triển nền tảng học TOEIC ứng dụng AI phục vụ hơn 2,500 người dùng.',
      'Tích hợp AI phân tích giọng nói, đánh giá phát âm và độ trôi chảy theo thời gian thực.',
      'Phát triển tính năng đấu từ vựng đối kháng thời gian thực qua Socket.io.',
      'Xây dựng hệ thống gợi ý lộ trình học tập cá nhân hóa dựa trên dữ liệu quá trình học.'
    ],
    tech: ['Next.js', 'TypeScript', 'NestJS', 'PostgreSQL', 'Redis', 'Prisma', 'Socket.io', 'OpenAI API', 'Cloudinary', 'Docker', 'Speech Recognition API', 'AI Recommendation System'],
    accent: '#6366f1'
  },
  {
    company: 'METADAP',
    role: lang === 'en' ? 'Fullstack Developer' : 'Lập trình viên Fullstack',
    period: '03/2024 – PRESENT',
    location: lang === 'en' ? 'Da Nang, Vietnam' : 'Đà Nẵng, Việt Nam',
    achievements: lang === 'en' ? [
      'Developed enterprise web applications including asset tokenization and e-commerce platforms.',
      'Built and maintained RESTful APIs for frontend-backend communication.',
      'Integrated payment gateways (VNPAY, ACB) and third-party services.',
      'Worked with Next.js, Express.js, and MongoDB in production environments.'
    ] : [
      'Phát triển ứng dụng web doanh nghiệp bao gồm token hóa tài sản và nền tảng thương mại điện tử.',
      'Xây dựng và duy trì RESTful API cho giao tiếp giữa frontend và backend.',
      'Tích hợp cổng thanh toán (VNPAY, ACB) và các dịch vụ của bên thứ ba.',
      'Làm việc với Next.js, Express.js và MongoDB trong môi trường sản phẩm thực tế.'
    ],
    tech: ['Next.js', 'Express.js', 'MongoDB', 'VNPay', 'ACB', 'Blockchain'],
    accent: '#38bdf8'
  }
];

export const getBioData = (lang: Language) => {
  if (lang === 'vi') {
    return `
Tên đầy đủ: HỒ VĂN THANH PHƯƠNG
Vị trí: Lập trình viên Fullstack
Hành trình:
1. Bắt đầu tại Đại học Duy Tân, chuyên ngành Big Data & Machine Learning.
2. Từ năm thứ 2, chuyển trọng tâm hoàn toàn sang Web Development vì đam mê xây dựng sản phẩm.
3. Từ tháng 03/2024: Làm việc tại METADAP với vai trò Lập trình viên Fullstack.
Chuyên sâu về Blockchain/Web3 với các công cụ như Web3.js, Wagmi, và Ethers.js.
`;
  }
  return `
Full Name: HO VAN THANH PHUONG
Position: Fullstack Developer
Journey:
1. Started at Duy Tan University, majoring in Big Data & Machine Learning.
2. From the 2nd year, shifted focus entirely to Web Development due to a strong passion for building products.
3. Since March 2024: Working at METADAP as a Fullstack Developer.
Specialized in Blockchain/Web3 with tools like Web3.js, Wagmi, and Ethers.js.
`;
}

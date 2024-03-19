import React, { useState } from "react";
import {
  MenuProps,
  Avatar,
  Badge,
  Space,
  Divider,
  Switch,
  ConfigProvider,
} from "antd";
import { TfiGallery } from "react-icons/tfi";
import { TbPigMoney, TbPlugConnected } from "react-icons/tb";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaBlog, FaRegComments } from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import {
  MdOutlineLibraryBooks,
  MdOutlineProductionQuantityLimits,
  MdOutlineQuiz,
  MdPlayLesson,
  MdOutlineArticle,
  MdDarkMode,
} from "react-icons/md";
import {
  BiCategoryAlt,
  BiHealth,
  BiLogIn,
  BiMoneyWithdraw,
  BiPen,
  BiQuestionMark,
  BiSolidDashboard,
} from "react-icons/bi";
import {
  FiSettings,
  FiShoppingCart,
  FiTag,
  FiUsers,
  FiHome,
  FiPhoneCall,
  FiDatabase,
  FiInfo,
  FiPenTool,
  FiUserX,
} from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  BellOutlined,
  InfoCircleTwoTone,
  LogoutOutlined,
  ShoppingCartOutlined,
  TranslationOutlined,
} from "@ant-design/icons";
import { BsSun } from "react-icons/bs";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { useTheme } from "hooks/shared/theme.hook";
import { useShoppingCart } from "hooks/shopping-cart/shopping-cart.hook";
import { useAuth } from "hooks/auth/auth.hook";
import { GrScheduleNew } from "react-icons/gr";
import { API_URL_UPLOADS_AVATARS, ROLES } from "config/constant";
import { useUser } from "hooks/user.hook";

export const useAppShellMenus = () => {
  const [language, setLanguage] = useState("en");

  const { handleSetTheme, isDarkMode } = useTheme();
  const { cartQuantity } = useShoppingCart();
  const router = useNavigate();
  const toggleLanguage = (key: string) => {
    setLanguage(key);
    console.log(language);
  };

  const redirectToCart = () => {
    router("/shopping-cart");
  };
  const { logoutUserFunction, isAuthenticated, user } = useAuth();
  const {users} = useUser()
  const avatar = users.find(u => u.id === user.id);

  // roles.some(role => user.roles.map(ur => ur.name).includes(role))
  function filterMenuItemsByRole(items: any["items"], userRoles: string[]) {
    return items
      .filter((item: any) => item.roles.some((r) => userRoles.includes(r)))
      .map((item) => {
        if (item.children) {
          return {
            ...item,
            children: filterMenuItemsByRole(item.children, userRoles),
          };
        }
        return item;
      });
  }
  // interface MenuPropsExtend
  // const items2: MenuProps["items"] = [
  const items2: any["items"] = [
    {
      label: (
        <Link to="/dashboard" style={{ padding: 0 }}>
          Dashboard
        </Link>
      ),
      key: "dashboard",
      icon: <FiDatabase size={21} color="#023202" />,
      roles: [
        ROLES.ADMIN,
        ROLES.PETOWNER,
        ROLES.DOCTOR,
        ROLES.TRAINER,
        ROLES.CREATOR,
      ],
    },
    // blog
    {
      label: "Blog",
      key: "blog",
      icon: <BiPen size={21} color="#023202" />,
      children: [
        {
          label: (
            <Link to="/admin/posts" style={{ padding: 0 }}>
              Posts
            </Link>
          ),
          key: "posts",
          icon: <FaBlog size={21} color="#08a30a" />,
          roles: [ROLES.ADMIN, ROLES.CREATOR],
        },
        {
          label: (
            <Link to="/admin/documents" style={{ padding: 0 }}>
              Documents
            </Link>
          ),
          key: "documents",
          icon: <TiDocumentText size={21} color="#08a30a" />,
          roles: [ROLES.ADMIN, ROLES.CREATOR],
        },
      ],
      roles: [ROLES.ADMIN, ROLES.CREATOR],
    },
    {
      label: "Health",
      key: "health",
      icon: <BiHealth size={21} color="#023202" />,
      children: [
        {
          label: (
            <Link to="/admin/consultations" style={{ padding: 0 }}>
              Consultations
            </Link>
          ),
          key: "consultations",
          icon: <FaBlog size={21} color="#08a30a" />,
          roles: [ROLES.ADMIN, ROLES.DOCTOR],
        },
        {
          label: (
            <Link to="/admin/appointments" style={{ padding: 0 }}>
              Appointments
            </Link>
          ),
          key: "appointments",
          icon: <GrScheduleNew size={21} color="#08a30a" />,
          roles: [ROLES.ADMIN, ROLES.DOCTOR],
        },
      ],
      roles: [ROLES.ADMIN, ROLES.DOCTOR],
    },
    // end blog

    // ecommerce
    {
      label: "Ecommerce",
      key: "ecommerce",
      icon: <BiMoneyWithdraw size={21} color="#023202" />,
      children: [
        {
          label: (
            <Link to="/admin/products" style={{ padding: 0 }}>
              Products
            </Link>
          ),
          key: "products",
          icon: <MdOutlineProductionQuantityLimits size={21} color="#08a30a" />,
          roles: [ROLES.ADMIN],
        },
        {
          label: (
            <Link to="/admin/stores" style={{ padding: 0 }}>
              Stores
            </Link>
          ),
          key: "stores",
          icon: <FiShoppingCart size={21} color="#08a30a" />,
          roles: [ROLES.ADMIN],
        },
        {
          label: (
            <Link to="/admin/payments" style={{ padding: 0 }}>
              Payments
            </Link>
          ),
          key: "payments",
          icon: <TbPigMoney size={21} color="#08a30a" />,
          roles: [ROLES.ADMIN],
        }, // remember to pass the key prop
        {
          label: (
            <Link to="/admin/orders" style={{ padding: 0 }}>
              Orders
            </Link>
          ),
          key: "orders",
          icon: <AiOutlineShoppingCart size={21} color="#08a30a" />,
          roles: [ROLES.ADMIN],
        }, // remember to pass the key prop
      ],
      roles: [ROLES.ADMIN],
    },

    // settings
    {
      label: "Settings",
      key: "settings",
      icon: <FiSettings size={21} color="#023202" />,
      children: [
        {
          label: (
            <Link to="/admin/users" style={{ padding: 0 }}>
              Users
            </Link>
          ),
          key: "users",
          icon: <FiUsers size={21} color="#08a30a" />,
          roles: [ROLES.ADMIN],
        }, // remember to pass the key prop
        {
          label: (
            <Link to="/admin/reviews" style={{ padding: 0 }}>
              Reviews
            </Link>
          ),
          key: "reviews",
          icon: <FaRegComments size={21} color="#08a30a" />,
          roles: [ROLES.ADMIN],
        },
        {
          label: (
            <Link to="/admin/roles" style={{ padding: 0 }}>
              Roles
            </Link>
          ),
          key: "roles",
          icon: <FiPenTool size={21} color="#08a30a" />,
          roles: [ROLES.ADMIN],
        },
        {
          label: (
            <Link to="/admin/user-roles" style={{ padding: 0 }}>
              User-roles
            </Link>
          ),
          key: "user-roles",
          icon: <FiUserX size={21} color="#08a30a" />,
          roles: [ROLES.ADMIN],
        },
        {
          label: (
            <Link to="/admin/user-specialties" style={{ padding: 0 }}>
              User Specialties
            </Link>
          ),
          key: "user-specialties",
          icon: <FiUserX size={21} color="#08a30a" />,
          roles: [ROLES.ADMIN],
        },
      ],
      roles: [ROLES.ADMIN],
    }, // remember to pass the key prop
    // end settings

    // lms module
    {
      label: "LMS",
      key: "lms",
      icon: <FaRegComments size={21} color="#023202" />,
      children: [
        {
          label: (
            <Link to="/admin/courses" style={{ padding: 0 }}>
              Courses
            </Link>
          ),
          key: "courses",
          icon: <MdOutlineLibraryBooks size={21} color="#08a30a" />,
          roles: [ROLES.ADMIN, ROLES.TRAINER],
        },
        {
          label: (
            <Link to="/admin/enrollments" style={{ padding: 0 }}>
              Enrollments
            </Link>
          ),
          key: "enrollments",
          icon: <TbPlugConnected size={21} color="#08a30a" />,
          roles: [ROLES.ADMIN, ROLES.TRAINER],
        },
      ],
      roles: [ROLES.ADMIN, ROLES.TRAINER],
    },
    // configurations
    {
      label: "Configuration",
      key: "configuration",
      icon: <BiSolidDashboard size={21} color="#023202" />,
      children: [
        {
          label: (
            <Link to="/admin/categories" style={{ padding: 0 }}>
              Categories
            </Link>
          ),
          key: "categories",
          icon: <BiCategoryAlt size={21} color="#08a30a" />,
          roles: [ROLES.ADMIN, ROLES.CREATOR, ROLES.TRAINER],
        },
        {
          label: (
            <Link to="/admin/tags" style={{ padding: 0 }}>
              Tags
            </Link>
          ),
          key: "tags",
          icon: <FiTag size={21} color="#08a30a" />,
          roles: [ROLES.ADMIN, ROLES.CREATOR, ROLES.TRAINER],
        },
        {
          label: (
            <Link to="/admin/banners" style={{ padding: 0 }}>
              Banners
            </Link>
          ),
          key: "banners",
          icon: <TfiGallery size={21} color="#08a30a" />,
          roles: [ROLES.ADMIN, ROLES.CREATOR, ROLES.TRAINER],
        },
      ],
      roles: [ROLES.ADMIN, ROLES.CREATOR, ROLES.TRAINER],
    },
    // end configurations
  ];

  const GeneralMenuItemsWithIcons: MenuProps["items"] = [
    {
      label: (
        <NavLink to="/" style={{ padding: 0 }}>
          Home
        </NavLink>
      ),
      key: "home",
      icon: <FiHome size={21} color="#08a30a" />,
    },
    {
      label: (
        <NavLink to="/products" style={{ padding: 0 }}>
          Products
        </NavLink>
      ),
      key: "products",
      icon: <MdOutlineProductionQuantityLimits size={21} color="#08a30a" />,
    },

    {
      label: (
        <NavLink to="/posts" style={{ padding: 0 }}>
          Posts
        </NavLink>
      ),
      key: "posts",
      icon: <MdOutlineArticle size={21} color="#08a30a" />,
    },
    {
      label: (
        <NavLink to="/courses" style={{ padding: 0 }}>
          Courses
        </NavLink>
      ),
      key: "courses",
      icon: <MdOutlineLibraryBooks size={21} color="#08a30a" />,
    },
    {
      label: (
        <NavLink to="/about-us" style={{ padding: 0 }}>
          About Us
        </NavLink>
      ),
      key: "about-us",
      icon: <FiInfo size={21} color="#08a30a" />,
    },
    {
      label: (
        <NavLink to="/contact-us" style={{ padding: 0 }}>
          Contact Us
        </NavLink>
      ),
      key: "contact-us",
      icon: <FiPhoneCall size={21} color="#08a30a" />,
    },
    {
      label: (
        <NavLink to="/auth/login" style={{ padding: 0 }}>
          Sign in
        </NavLink>
      ),
      key: "login",
      icon: <BiLogIn size={21} color="#08a30a" />,
    },
  ];

  const GeneralMenuItemsWithoutIcons: MenuProps["items"] = [
    {
      label: (
        <NavLink to="/" style={{ padding: 0 }}>
          Home
        </NavLink>
      ),
      key: "home",
    },
    {
      label: (
        <NavLink to="/our_services" style={{ padding: 0 }}>
          Services
        </NavLink>
      ),
      key: "services",
    },
    {
      label: (
        <NavLink to="/products" style={{ padding: 0 }}>
          Products
        </NavLink>
      ),
      key: "products",
    },

    {
      label: (
        <NavLink to="/posts" style={{ padding: 0 }}>
          Posts
        </NavLink>
      ),
      key: "posts",
    },
    {
      label: (
        <NavLink to="/courses" style={{ padding: 0 }}>
          Courses
        </NavLink>
      ),
      key: "courses",
    },
    {
      label: (
        <NavLink to="/contact-us" style={{ padding: 0 }}>
          Contact Us
        </NavLink>
      ),
      key: "contact-us",
    },
  ];

  const rightMenus: ItemType[] = [
    {
      label: <Link to={"/auth/login"}>Signin</Link>,
      key: "signin",
      style: {
        display: isAuthenticated ? "none" : "",
      },
    }, // remember to pass the key prop
    {
      label: (
        <b
          style={{
            fontSize: 20,
            color: "#317610",
            position: "absolute",
            right: 5,
            bottom: 15,
          }}
        >
          {cartQuantity}
        </b>
      ),
      icon: (
        <span>
          <ShoppingCartOutlined
            className="app-header__icon"
            size={30}
            style={{ fontSize: 25 }}
          />
        </span>
      ),
      key: "shopping-cart",
      onClick: redirectToCart,
    }, // remember to pass the key prop

    {
      label: "",
      key: "notification",
      icon: (
        <Badge dot color="#f77908" count={1} className="app-header__link">
          <BellOutlined className="app-header__icon" style={{ fontSize: 23 }} />
        </Badge>
      ),
      children: [
        {
          label: (
            <>
              <Link to="/">
                <Space size="middle" align="start">
                  <InfoCircleTwoTone
                    twoToneColor="#52c41a"
                    style={{ fontSize: 23 }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "wrap",
                    }}
                  >
                    <h3>Notification title</h3>
                    <p style={{ flex: 1 }}>
                      Lorem ipsum dolor sit, amet consectetur
                    </p>
                  </div>
                </Space>
              </Link>
            </>
          ),
          key: "notification-key",
          style: {
            display: !isAuthenticated ? "none" : "",
          },
        },
        {
          label: <Link to="/">mark all as read</Link>,
          key: "mark-as-read",
        },
      ],
      style: {
        display: !isAuthenticated ? "none" : "",
      },
    }, // which is required
    {
      label: "",
      key: "language",
      icon: (
        <TranslationOutlined
          className="app-header__icon"
          style={{ fontSize: 23 }}
        />
      ),
      children: [
        {
          label: `English`,
          key: "en",
          icon: (
            <>
              <img
                src="/en.png"
                alt="English"
                style={{
                  maxWidth: "100%",
                  height: "18px",
                  marginRight: "8px",
                }}
              />
            </>
          ),
          onClick: () => toggleLanguage("en"),
        },
        {
          label: `French`,
          key: "fr",
          icon: (
            <>
              <img
                src="/fr.png"
                alt="English"
                style={{
                  maxWidth: "100%",
                  height: "18px",
                  marginRight: "8px",
                }}
              />
            </>
          ),
          onClick: () => toggleLanguage("fr"),
        },
      ],
    }, // which is required
    {
      label: "",
      key: "avatar",
      icon: (
        <Avatar
          style={{
            color: "#fff",
            backgroundColor: "#08a30a",
            fontWeight: "bold",
            fontSize: 14,
          }}
          src={`${API_URL_UPLOADS_AVATARS}/${avatar?.avatar}`}
        >
          {user?.username?.charAt(0).toUpperCase()}
        </Avatar>
      ),
      children: [
        {
          label: <strong>{user?.username}</strong>,
          key: "profile_name",
        },
        {
          label: (
            <>
              <p
                style={{
                  letterSpacing: 1.875,
                  marginBottom: 0,
                  color: "#2D3239",
                  fontSize: ".75rem",
                }}
              >
                {"My Profile".toUpperCase()}
              </p>
              <Divider style={{ margin: 2 }} />
            </>
          ),
          key: "profile_path",
          type: "group",
          children: [
            {
              label: (
                <Link to="/dashboard" onClick={() => {}}>
                  Admin
                </Link>
              ),
              key: "dashboard",
            },
            {
              label: (
                <Link to="/appointments" onClick={() => {}}>
                  My Appointments
                </Link>
              ),
              key: "appointments",
            },
            {
              label: (
                <Link to="/classroom" onClick={() => {}}>
                  My Classroom
                </Link>
              ),
              key: "classroom",
            },
            {
              label: (
                <Link
                  to="/profile?=settings"
                  // onClick={() => handleRoute('settings')}
                >
                  My Settings
                </Link>
              ),
              key: "my-settings",
            },
            {
              label: (
                <>
                  <Link
                    to="#"
                    onClick={() => {
                      logoutUserFunction();
                      router("/");
                    }}
                  >
                    Logout
                  </Link>
                </>
              ),
              key: "logout",
              icon: <LogoutOutlined />,
            },
            // {
            //   label: (
            //     <ConfigProvider
            //       theme={{
            //         token: {
            //           colorPrimary: "#08a30a",
            //         },
            //       }}
            //     >
            //       <Switch
            //         defaultChecked={isDarkMode}
            //         // size="small"
            //         onChange={handleSetTheme}
            //         checkedChildren={<BsSun size={18} />}
            //         unCheckedChildren={<MdDarkMode size={18} color="#333" />}
            //       />
            //     </ConfigProvider>
            //   ),
            //   key: "theme",
            //   style: {
            //     padding: 0,
            //   },
            // }, // remember to pass the key prop
          ],
        },
      ],
      style: {
        display: !isAuthenticated ? "none" : "",
      },
    }, // which is required
  ];

  return {
    items2,
    GeneralMenuItemsWithoutIcons,
    GeneralMenuItemsWithIcons,
    rightMenus,
    filterMenuItemsByRole,
  };
};

import React from "react";
import { Icon } from "@aws-amplify/ui-react";

import {
  MdDashboard,
  MdModeEditOutline,
  MdAccountBox,
  MdOutlineTableChart,
} from "react-icons/md";

export const baseConfig = {
  projectLink: "/", // GitHub link in the navbar
  docsRepositoryBase: "", // base URL for the docs repository
  titleSuffix: "",
  search: true,
  header: true,
  headerText: "UTCert",
  footer: true,
  footerText: (
    <>
      <span>
        © UTC {new Date().getFullYear()}, Made with ❤️ by {""}
        <a href="https://github.com/mrtzdev" target="_blank" rel="noreferrer">
          Nhom 4
        </a>
      </span>
    </>
  ),

  logo: (
    <>
      <img
        src={process.env.PUBLIC_URL + "/logo.png"}
        alt="logo"
        width="30"
        height="22"
      />
    </>
  ),
};

/// Navigation sidebar
export const appNavs = [
  {
    eventKey: "dashboard",
    icon: <Icon as={MdDashboard} />,
    title: "Dashboard",
    to: "/",
  },

  {
    eventKey: "tables",
    icon: <Icon as={MdOutlineTableChart} />,
    title: "Credentials",
    to: "/issued-tables",
    children: [
      {
        eventKey: "basic-table",
        title: "Issued",
        to: "/issued-tables",
      },
      {
        eventKey: "users",
        title: "Received",
        to: "/received-table",
      },
    ],
  },
  {
    eventKey: "forms",
    icon: <Icon as={MdModeEditOutline} />,
    title: "Contacts",
    to: "/contacts"
  },
  {
    eventKey: "profile",
    icon: <Icon as={MdAccountBox} />,
    title: "Profile",
    to: "/profile",
  },
];

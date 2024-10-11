import {
  EmailIcon,
  ReminderIcon,
  TemplateIcon,
} from "./DashboardLayout.vectors";

export const mainMenuItem = [
  {
    title: "Templates",
    icon: <TemplateIcon />,
    link: "/templates",
  },
  {
    title: "Notifications",
    icon: <ReminderIcon />,
    link: "/notifications",
  },
  {
    title: "Logs",
    icon: <EmailIcon />,
    link: "/logs",
  },
];

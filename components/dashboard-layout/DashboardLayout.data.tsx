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
    title: "Reminders",
    icon: <ReminderIcon />,
    link: "/reminders",
  },
  {
    title: "Logs",
    icon: <EmailIcon />,
    link: "/logs",
  },
];

import DashboardLayout from "@/components/dashboard-layout/DashboardLayout";

export const metadata = {
  title: "Stack Reminder",
  description:
    "Keep track of recurring payments and send reminders to customers for upcoming or overdue payments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

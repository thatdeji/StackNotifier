import DashboardLayout from "@/components/dashboard-layout/DashboardLayout";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Stack Reminder",
  description:
    "Keep track of recurring payments and send reminders to customers for upcoming or overdue payments.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log(process.env.MAIL_PASS);
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}

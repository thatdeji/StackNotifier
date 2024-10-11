import DashboardLayout from "@/components/dashboard-layout/DashboardLayout";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Stack Notifier",
  description:
    "Keep track of recurring payments and send notifications to customers for upcoming or overdue payments.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}

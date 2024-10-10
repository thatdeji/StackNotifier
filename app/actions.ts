"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "@/database.types";

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/templates");
};

interface Reminder {
  id: number;
  created_at: string;
  name: string;
  template_name: string | null;
  template_id: number | null;
  event: string;
  description: string;
  success_emails: number | null;
  failed_emails: number | null;
}

interface Template {
  id: number;
  created_at: string;
  name: string;
  template: string;
  description: string;
  reminder_name: string;
  reminder_id: number;
}

export const getReminders = async () => {
  const supabase = createClient();

  let { data: reminders, error } = await supabase
    .from("reminders")
    .select(`*, template:template_id (*)`);
  console.log(reminders);

  if (error) {
    throw new Error(error.message);
  }

  if (reminders) {
    return reminders;
  }
};

type SingleReminder = {
  id: number;
  name: string;
};

export const getTemplates = async () => {
  const supabase = createClient();

  const { data: templates, error } = await supabase
    .from("templates")
    .select("*, reminder:reminders!reminder_id(id, name)");

  if (error) {
    throw new Error(error.message);
  }

  if (templates) {
    return templates;
  }
};

export const getSingleTemplate = async (id: number) => {
  const supabase = createClient();

  let { data: template, error } = await supabase
    .from("templates")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (template) {
    return template;
  }
};

export const addTemplate = async (
  formData: Pick<
    Database["public"]["Tables"]["templates"]["Row"],
    "description" | "name" | "reminder_id" | "template"
  >
) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("templates")
    .insert([formData])
    .select();

  if (data) {
    return data;
  }
  if (error) {
    throw new Error(error.message);
  }
};

export const deleteTemplate = async (id: number) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("templates")
    .delete()
    .eq("id", id)
    .select();
  if (data) {
    return data;
  }
  if (error) {
    throw new Error(error.message);
  }
};

export const editTemplate = async (
  formData: Partial<
    Pick<
      Database["public"]["Tables"]["templates"]["Row"],
      "description" | "name" | "reminder_id" | "template"
    >
  > & { id: number }
) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("templates")
    .update(formData)
    .eq("id", formData.id)
    .select();
  if (data) {
    return data;
  }
  if (error) {
    throw new Error(error.message);
  }
};

export const editReminder = async (
  formData: Partial<
    Pick<
      Database["public"]["Tables"]["reminders"]["Row"],
      "description" | "name" | "event" | "template_id"
    >
  > & { id: number }
) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("reminders")
    .update(formData)
    .eq("id", formData.id)
    .select();
  if (data) {
    return data;
  }
  if (error) {
    throw new Error(error.message);
  }
};

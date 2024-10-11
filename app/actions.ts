"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Database } from "@/database.types";
import { PAGINATION_LIMIT } from "@/utils/constants";

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

export const getReminders = async () => {
  const supabase = createClient();

  let {
    data: reminders,
    error,
    count,
  } = await supabase
    .from("reminders")
    .select(`*, template:template_id (*)`, { count: "exact" })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  if (reminders) {
    return { reminders, count };
  }
};

export const editReminder = async (
  formData: Partial<
    Pick<
      Database["public"]["Tables"]["reminders"]["Row"],
      "description" | "name" | "template_id"
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

export const getTemplates = async () => {
  const supabase = createClient();

  const {
    data: templates,
    error,
    count,
  } = await supabase
    .from("templates")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  if (templates) {
    return { templates, count };
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
    "description" | "name" | "template"
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

  // Check for reminders associated with this template &  update them to remove the template association
  const { data: reminders, error: remindersError } = await supabase
    .from("reminders")
    .select("*")
    .eq("template_id", id);

  if (remindersError) {
    throw new Error(remindersError.message);
  }

  if (reminders && reminders.length > 0) {
    const { error: updateRemindersError } = await supabase
      .from("reminders")
      .update({ template_id: null })
      .eq("template_id", id);

    if (updateRemindersError) {
      throw new Error(updateRemindersError.message);
    }
  }

  //  Delete template after handling reminders
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
      "description" | "name" | "template"
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

export const getLogs = async (page: number) => {
  const supabase = createClient();

  const {
    data: logs,
    error,
    count,
  } = await supabase
    .from("logs")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(page, page + PAGINATION_LIMIT)
    .limit(10);

  if (error) {
    throw new Error(error.message);
  }

  if (logs) {
    return { logs, count };
  }
};

export const addLog = async (
  formData: Pick<
    Database["public"]["Tables"]["logs"]["Row"],
    "message" | "status" | "title" | "type"
  >
) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("logs")
    .insert([formData])
    .select();

  if (data) {
    return data;
  }
  if (error) {
    throw new Error(error.message);
  }
};

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

export const getNotifications = async (page: number) => {
  const supabase = createClient();

  let {
    data: notifications,
    error,
    count,
  } = await supabase
    .from("notifications")
    .select(`*, template:template_id (*)`, { count: "exact" })
    .order("created_at", { ascending: false })
    .range(page, page + PAGINATION_LIMIT)
    .limit(PAGINATION_LIMIT);

  if (error) {
    throw new Error(error.message);
  }

  if (notifications) {
    return { notifications, count };
  }
};

export const editNotification = async (
  formData: Partial<
    Pick<
      Database["public"]["Tables"]["notifications"]["Row"],
      "description" | "name" | "template_id"
    >
  > & { id: number }
) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("notifications")
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

export const getTemplates = async (page: number) => {
  const supabase = createClient();

  const {
    data: templates,
    error,
    count,
  } = await supabase
    .from("templates")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(page, page + PAGINATION_LIMIT)
    .limit(PAGINATION_LIMIT);

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

  // Check for notifications associated with this template &  update them to remove the template association
  const { data: notifications, error: notificationsError } = await supabase
    .from("notifications")
    .select("*")
    .eq("template_id", id);

  if (notificationsError) {
    throw new Error(notificationsError.message);
  }

  if (notifications && notifications.length > 0) {
    const { error: updatenotificationsError } = await supabase
      .from("notifications")
      .update({ template_id: null })
      .eq("template_id", id);

    if (updatenotificationsError) {
      throw new Error(updatenotificationsError.message);
    }
  }

  //  Delete template after handling notifications
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
    .limit(PAGINATION_LIMIT);

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

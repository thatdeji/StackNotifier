"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
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

export const getReminders = async () => {
  const supabase = createClient();

  let { data: reminders, error } = await supabase
    .from("reminders")
    .select(`*, template:template_id (*)`)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  if (reminders) {
    return reminders;
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

  const { data: templates, error } = await supabase
    .from("templates")
    .select("*, reminder:reminders!reminder_id(id, name)")
    .order("created_at", { ascending: false });

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

  // Step 1: Check for dependent reminders
  const { data: reminders, error: remindersError } = await supabase
    .from("reminders")
    .select("*")
    .eq("template_id", id); // Check for reminders associated with this template

  // Handle any errors during the reminders query
  if (remindersError) {
    throw new Error(remindersError.message);
  }

  // Step 2: If there are reminders, update them to remove the template association
  if (reminders && reminders.length > 0) {
    const { error: updateRemindersError } = await supabase
      .from("reminders")
      .update({ template_id: null }) // Remove the template association
      .eq("template_id", id);

    if (updateRemindersError) {
      throw new Error(updateRemindersError.message);
    }
  }

  // Step 3: Delete the template after handling reminders
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

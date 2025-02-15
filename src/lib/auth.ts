import { PrismaClient } from '@prisma/client';
import { supabase } from './supabase';

const prisma = new PrismaClient();

export async function signUp(email: string, password: string, name?: string) {
  try {
    // Create user in Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    // Create user in Prisma database
    const user = await prisma.user.create({
      data: {
        id: authData.user!.id,
        email,
        name,
      },
    });

    return { user, error: null };
  } catch (error) {
    return { user: null, error };
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) throw authError;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    return { user, error: null };
  } catch (error) {
    return { user: null, error };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    return { error };
  }
}

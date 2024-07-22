"use server"
import { auth } from "@/auth"
import prisma from "../lib/prisma";

export async function GetUser(){
    const session = await auth();
    if (!session?.user?.email) return null;
    const user = await prisma.user.findFirst({
        where:{email: session?.user?.email},
    })
    
    return user;
}
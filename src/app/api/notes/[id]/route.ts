import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import {prisma} from "@/lib/prisma";

//PUT → update a note by ID for the logged-in user
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { content } = await req.json();

  const note = await prisma.note.updateMany({
    where: {
      id: params.id,
      user: { email: session.user.email },
    },
    data: { content },
  });

  if (note.count === 0) {
    return NextResponse.json({ error: "Note not found or unauthorized" }, { status: 404 });
  }

  return NextResponse.json({ message: "Note updated successfully" });
}

//DELETE → delete a note by ID for the logged-in user
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const note = await prisma.note.deleteMany({
    where: {
      id: params.id,
      user: { email: session.user.email },
    },
  });

  if (note.count === 0) {
    return NextResponse.json({ error: "Note not found or unauthorized" }, { status: 404 });
  }

  return NextResponse.json({ message: "Note deleted successfully" });
}   

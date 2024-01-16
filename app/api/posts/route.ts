import { NextApiRequest, NextApiResponse } from "next";
import { DB } from "./constant";
import { NextRequest, NextResponse } from "next/server";
let posts: any[] = [...DB];
export const GET = async (req: NextRequest) => {
  try {
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to fetch posts" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const newPost = await req.json(); // res now contains body
    if (posts.length >= 10) {
      posts = [...DB]; // Reset the database if there are 10 or more posts
      return NextResponse.json(posts[0]);
    } else {
      const postWithId = { ...newPost, id: posts.length + 1 };
      posts.push(postWithId);
      return NextResponse.json(postWithId);
    }
  } catch (error) {
    return NextResponse.json({ error: "Unable to add post" }, { status: 500 });
  }
};

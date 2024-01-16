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
      if (newPost.title && newPost.auth) {
        const postWithId = { ...newPost, id: posts.length + 1 };
        posts.push(postWithId);
        return NextResponse.json(postWithId);
      } else {
        return NextResponse.json(
          { error: "Unable to add post invalid body" },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json({ error: "Unable to add post" }, { status: 500 });
  }
};

import { DB } from "./constant";
import { NextRequest, NextResponse } from "next/server";
var posts: any[] = [...DB];
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
      posts = [
        {
          id: 1,
          title: "This database is reset every 10 records",
          author: "Better safe than sorry",
        },
      ]; // Reset the database if there are 10 or more posts
      return NextResponse.json({
        id: 1,
        title: "This database is reset every 10 records",
        author: "Better safe than sorry",
      });
    } else {
      console.log(newPost);
      if (newPost.title && newPost.author) {
        const postWithId = { ...newPost, id: posts.length + 1 };
        posts.push(postWithId);
        return NextResponse.json(postWithId);
      } else {
        return NextResponse.json(
          { error: "Unable to add post invalid" },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json({ error: "Unable to add post" }, { status: 500 });
  }
};

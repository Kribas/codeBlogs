import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../styles/Blog.module.css";
import * as fs from "fs";

const Blog = (props) => {
  const [blogs, setBlogs] = useState(props.allBlogs);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {blogs.map((blog) => (
          <div key={blog.title} className="blogs">
            <Link href={`/blogpost/${blog.slug}`}>
              <div className={styles.blogItem}>
                <h3>{blog.title}</h3>
                <p>{blog.content.substr(0, 140)}...</p>
              </div>
            </Link>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Blog;

export async function getStaticProps(context) {
  let data = await fs.promises.readdir("blogPost");
  let myFile;
  let allBlogs = [];
  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    console.log("Item", item);
    myFile = await fs.promises.readFile("blogPost/" + item, "utf-8");
    allBlogs.push(JSON.parse(myFile));
  }
  return {
    props: {
      allBlogs,
    },
  };
}

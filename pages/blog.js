import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../styles/Blog.module.css";
import InfiniteScroll from "react-infinite-scroll-component";

import * as fs from "fs";

const Blog = (props) => {
  const [blogs, setBlogs] = useState(props.allBlogs);
  const [count, setCount] = useState(2);

  const fetchData = async () => {
    let d = await fetch(`http://localhost:3000/api/blogs/?count=${count + 2}`);
    setCount(count + 2);
    let data = await d.json();
    setBlogs(data);
  };

  console.log("Blogs", blogs);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <InfiniteScroll
          dataLength={blogs.length} //This is important field to render the next data
          next={fetchData}
          hasMore={props.allCount !== blogs.length}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {blogs.map((blog) => (
            <div key={blog.id} className="blogs">
              <div className={styles.blogItem}>
                <h3>{blog.title}</h3>
                <p>{blog.content.substr(0, 140)}...</p>
              </div>
              <Link href={`/blogpost/${blog.slug}`}>
                <button className={styles.btn}>Read More</button>
              </Link>
            </div>
          ))}{" "}
        </InfiniteScroll>
      </main>
    </div>
  );
};

export default Blog;

export async function getStaticProps(context) {
  let data = await fs.promises.readdir("blogPost");
  const allCount = data.length;
  let myFile;
  let allBlogs = [];
  for (let index = 0; index < allCount; index++) {
    const item = data[index];
    console.log("Item", item);
    myFile = await fs.promises.readFile("blogPost/" + item, "utf-8");
    allBlogs.push(JSON.parse(myFile));
  }
  return {
    props: {
      allBlogs,
      allCount,
    },
  };
}

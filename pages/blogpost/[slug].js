import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Blog.module.css";
import * as fs from "fs";

const Slug = (props) => {
  const [blog, setBlog] = useState(props.myBlog);

  function createMarkup() {
    return { __html: blog.metaDesc };
  }

  return (
    <div>
      <div className={styles.container}>
        <main className={styles.main}>
          <h3 className={styles.blog__title}>{blog && blog.title}</h3>
          {blog && <div dangerouslySetInnerHTML={createMarkup()}></div>}
        </main>
      </div>
    </div>
  );
};

export default Slug;

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: "how-to-learn-flask" } },
      { params: { slug: "how-to-learn-js" } },
      { params: { slug: "how-to-learn-nextjs" } },
    ],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;

  let myBlog = await fs.promises.readFile(`blogPost/${slug}.json`, "utf-8");

  return {
    props: {
      myBlog: JSON.parse(myBlog),
    },
  };
}

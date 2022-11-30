import React, { useState } from "react";
import styles from "../styles/Contact.module.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, email, phone, desc };
    fetch("http://localhost:3000/api/postContact", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((data) => {
      console.log("Success", data);
      alert("Thanks for contacting us");
      setName("");
      setPhone("");
      setEmail("");
      setDesc("");
    });
  };

  return (
    <div className={styles.container}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.mb3}>
          <label htmlFor="name" className={styles.form_label}>
            Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            className={styles.form_control}
            id="name"
            name="name"
            value={name}
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="email" className={styles.form_label}>
            Email
          </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className={styles.form_control}
            id="email"
            name="email"
            value={email}
            required
          />
        </div>

        <div className={styles.mb3}>
          <label htmlFor="phone" className={styles.form_label}>
            Phone
          </label>
          <input
            type="phone"
            onChange={(e) => setPhone(e.target.value)}
            className={styles.form_control}
            id="phone"
            name="phone"
            value={phone}
            required
          />
        </div>

        <div className={styles.mb3}>
          <label className={styles.form_label} for="desc">
            Elaborate your concern
          </label>

          <textarea
            onChange={(e) => setDesc(e.target.value)}
            className={styles.form_control}
            value={desc}
            id="desc"
            required
          ></textarea>
        </div>

        <button type="submit" className={styles.btn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;

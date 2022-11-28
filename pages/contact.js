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
      <form onSubmit={handleSubmit}>
        <div className={styles.mb3}>
          <label htmlFor="name" className={styles.form_label}>
            Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            aria-describedby="emailHelp"
          />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="email" className={styles.form_label}>
            Email
          </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="email"
            name="email"
            value={email}
          />
        </div>

        <div className={styles.mb3}>
          <label htmlFor="phone" className={styles.form_label}>
            Phone
          </label>
          <input
            type="phone"
            onChange={(e) => setPhone(e.target.value)}
            className="form-control"
            id="phone"
            name="phone"
            value={phone}
          />
        </div>

        <div class="form-floating">
          <label for="desc">Elaborate your concern</label>

          <textarea
            onChange={(e) => setDesc(e.target.value)}
            class="form-control"
            value={desc}
            placeholder="Write your concern here"
            id="desc"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;

import axios from "axios";
import React, { useState } from "react";

function App() {
  const [phone_number, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("");

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending message...");

    const formData = new FormData();
    formData.append("phone_number", phone_number);
    formData.append("message", message);
    formData.append("image", image);
    axios
      .post("http://127.0.0.1:5000/send_message", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setStatus("Message sent successfully!");
      })
      .catch((error) => {
        console.error(error);
        setStatus("Failed to send message.");
      });
  };

  return (
    <div className="mt-5">
      <form className="w-25 border p-3 ms-auto me-auto" onSubmit={handleSubmit}>
        <center>
          <h2>Send Message</h2>
        </center>
        <div>
          <label htmlFor="phone_number">Phone Number:</label>
          <input
            className="form-control"
            type="text"
            id="phone_number"
            name="phone_number"
            value={phone_number}
            onChange={handlePhoneChange}
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            value={message}
            onChange={handleMessageChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            className="form-control"
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <br />
        <center>
          <button className="btn btn-primary" type="submit">
            Send Message
          </button>
        </center>
        <br />
        {status && <div className="text-danger">{status}</div>}
      </form>
    </div>
  );
}

export default App;

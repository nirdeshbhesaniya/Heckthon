import { useState } from "react";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, subject, message });
    alert("Message Sent!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center">Contact Us</h2>
        <p className="text-center text-gray-600 mb-6">
          Got a technical issue? Want to send feedback about a beta feature? Let us know.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Your Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-md outline-none focus:ring focus:ring-blue-200"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Subject Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md outline-none focus:ring focus:ring-blue-200"
              placeholder="Let us know how we can help you"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          {/* Message Field */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Your Message</label>
            <textarea
              className="w-full p-2 border rounded-md outline-none focus:ring focus:ring-blue-200"
              placeholder="Leave a comment..."
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

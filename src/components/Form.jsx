import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const SimpleForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !experience || !rating) return;

    setReviews([...reviews, { name, experience, rating }]);

    // clear
    setName("");
    setExperience("");
    setRating(0);
    setHover(0);
  };

  return (
    <div style={{ width: "400px", margin: "30px auto", fontFamily: "Arial" }}>
      <h2>Leave a Review</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        <textarea
          placeholder="Write your experience..."
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          rows="4"
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        <div style={{ marginBottom: 15 }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              size={28}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              color={star <= (hover || rating) ? "#ff9900" : "#ccc"}
              style={{ cursor: "pointer", marginRight: 5 }}
            />
          ))}
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            background: "#228B22",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit Review
        </button>
      </form>

      <div style={{ marginTop: 30 }}>
        {reviews.map((r, i) => (
          <div key={i} style={{
              border: "1px solid #ddd",
              padding: 10,
              marginBottom: 10,
              borderRadius: 5,
              background: "#fafafa",
            }}
          >
            <h4>{r.name}</h4>
            <div style={{ marginBottom: 5 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={20}
                  color={star <= r.rating ? "#ff9900" : "#ccc"}
                />
              ))}
            </div>
            <p>{r.experience}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleForm;

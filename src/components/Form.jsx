import React from 'react';
import styled from 'styled-components';
import { IoStarSharp } from "react-icons/io5";
import { useState } from 'react';

const Form = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [experience, setExperience] = useState({});
  const [testimonials, setTestimonials] = useState([]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setExperience({ ...experience, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTestimonial = { ...experience, rating };
    setTestimonials([...testimonials, newTestimonial]);
  }

  return (
    <StyledWrapper>
      <div className="glitch-form-wrapper">
        <form className="glitch-card" onSubmit={handleSubmit} method="POST">
          <div className="card-header">
            <div className="card-title">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                <path d="M12 11.5a3 3 0 0 0 -3 2.824v1.176a3 3 0 0 0 6 0v-1.176a3 3 0 0 0 -3 -2.824z" />
              </svg>
              <span>WRITE_REVIEW</span>
            </div>
            <div className="card-dots"><span /><span /><span /></div>
          </div>
          <div className="card-body">
            <div className="form-group">
              <input type="text" id="username" name="username" required placeholder onChange={handleInput} />
              <label htmlFor="username" className="form-label" data-text="USERNAME">USERNAME</label>
            </div>
            <div className="form-group">
              <input type="text" id="review" name="review" required placeholder onChange={handleInput} />
              <label htmlFor="password" className="form-label" data-text="ACCESS_KEY">REVIEW</label>
            </div>
            <div className="form-group">
              {
                [...Array(5)].map((_, index) => {
                  const val = index + 1;
                  return <IoStarSharp key={index} color={val <= (rating || hover) ? "#00f2ea" : "#373737ff"} size={24} style={{ marginRight: '4px', cursor: 'pointer' }} onClick={() => setRating(val)} onMouseEnter={() => setHover(val)} onMouseLeave={() => setHover(0)} />
                })
              }
            </div>
            <button data-text="INITIATE_CONNECTION" type="submit" className="submit-btn">
              <span className="btn-text">SUBMIT_TESTIMONIAL</span>
            </button>
          </div>
        </form>
      </div>
      <div className="testimonials-container">
        <h3 className="section-title">Testimonials</h3>

        {testimonials.length === 0 ? (
          <p className="empty-note">No testimonials yet — be the first!</p>
        ) : (
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <article className="testimonial-card" key={t.id}>

                <div className="meta">
                  <div className="name">{t.username}</div>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <IoStarSharp
                        key={s}
                        size={18}
                        color={s <= t.rating ? "#00f2ea" : "#373737ff"}
                      />
                    ))}
                  </div>
                </div>

                <p className="testimonial-text">{t.review}</p>

                <div className="card-footer">
            
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* --- Root Variables for the component --- */
  .glitch-form-wrapper {
    --bg-color: #0d0d0d;
    --primary-color: #00f2ea;
    --secondary-color: #a855f7;
    --text-color: #e5e5e5;
    --font-family: "Fira Code", Consolas, "Courier New", Courier, monospace;
    --glitch-anim-duration: 0.5s;
  }

  .glitch-form-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: var(--font-family);
    background-color: #050505;
  }

  /* --- Card Structure --- */
  .glitch-card {
    background-color: var(--bg-color);
    width: 100%;
    max-width: 380px;
    border: 1px solid rgba(0, 242, 234, 0.2);
    box-shadow:
      0 0 20px rgba(0, 242, 234, 0.1),
      inset 0 0 10px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    margin: 1rem;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 0.5em 1em;
    border-bottom: 1px solid rgba(0, 242, 234, 0.2);
  }

  .card-title {
    color: var(--primary-color);
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    display: flex;
    align-items: center;
    gap: 0.5em;
  }

  .card-title svg {
    width: 1.2em;
    height: 1.2em;
    stroke: var(--primary-color);
  }

  .card-dots span {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #333;
    margin-left: 5px;
  }

  .card-body {
    padding: 1.5rem;
  }

  /* --- Form Elements --- */
  .form-group {
    position: relative;
    margin-bottom: 1.5rem;
  }

  .form-label {
    position: absolute;
    top: 0.75em;
    left: 0;
    font-size: 1rem;
    color: var(--primary-color);
    opacity: 0.6;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    pointer-events: none;
    transition: all 0.3s ease;
  }

  .form-group input {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 2px solid rgba(0, 242, 234, 0.3);
    padding: 0.75em 0;
    font-size: 1rem;
    color: var(--text-color);
    font-family: inherit;
    outline: none;
    transition: border-color 0.3s ease;
  }

  .form-group input:focus {
    border-color: var(--primary-color);
  }

  .form-group input:focus + .form-label,
  .form-group input:not(:placeholder-shown) + .form-label {
    top: -1.2em;
    font-size: 0.8rem;
    opacity: 1;
  }

  .form-group input:focus + .form-label::before,
  .form-group input:focus + .form-label::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--bg-color);
  }

  .form-group input:focus + .form-label::before {
    color: var(--secondary-color);
    animation: glitch-anim var(--glitch-anim-duration)
      cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  .form-group input:focus + .form-label::after {
    color: var(--primary-color);
    animation: glitch-anim var(--glitch-anim-duration)
      cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both;
  }

  @keyframes glitch-anim {
    0% {
      transform: translate(0);
      clip-path: inset(0 0 0 0);
    }
    20% {
      transform: translate(-5px, 3px);
      clip-path: inset(50% 0 20% 0);
    }
    40% {
      transform: translate(3px, -2px);
      clip-path: inset(20% 0 60% 0);
    }
    60% {
      transform: translate(-4px, 2px);
      clip-path: inset(80% 0 5% 0);
    }
    80% {
      transform: translate(4px, -3px);
      clip-path: inset(30% 0 45% 0);
    }
    100% {
      transform: translate(0);
      clip-path: inset(0 0 0 0);
    }
  }

  /* --- Button Styling --- */
  .submit-btn {
    width: 100%;
    padding: 0.8em;
    margin-top: 1rem;
    background-color: transparent;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    font-family: inherit;
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    cursor: pointer;
    position: relative;
    transition: all 0.3s;
    overflow: hidden;
  }

  .submit-btn:hover,
  .submit-btn:focus {
    background-color: var(--primary-color);
    color: var(--bg-color);
    box-shadow: 0 0 25px var(--primary-color);
    outline: none;
  }

  .submit-btn:active {
    transform: scale(0.97);
  }

  /* --- Glitch Effect for Button --- */
  .submit-btn .btn-text {
    position: relative;
    z-index: 1;
    transition: opacity 0.2s ease;
  }

  .submit-btn:hover .btn-text {
    opacity: 0;
  }

  .submit-btn::before,
  .submit-btn::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    background-color: var(--primary-color);
    transition: opacity 0.2s ease;
  }

  .submit-btn:hover::before,
  .submit-btn:focus::before {
    opacity: 1;
    color: var(--secondary-color);
    animation: glitch-anim var(--glitch-anim-duration)
      cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  .submit-btn:hover::after,
  .submit-btn:focus::after {
    opacity: 1;
    color: var(--bg-color);
    animation: glitch-anim var(--glitch-anim-duration)
      cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both;
  }

  @media (prefers-reduced-motion: reduce) {
    .form-group input:focus + .form-label::before,
    .form-group input:focus + .form-label::after,
    .submit-btn:hover::before,
    .submit-btn:focus::before,
    .submit-btn:hover::after,
    .submit-btn:focus::after {
      animation: none;
      opacity: 0;
    }

    .submit-btn:hover .btn-text {
      opacity: 1;
    }
  } 
  .testimonials-container {
  max-width: 1100px;
  margin: 2rem auto 4rem;
  padding: 0 1rem;
  color: var(--text-color);
}

.section-title {
  color: var(--primary-color);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  margin-bottom: 1rem;
  font-family: var(--font-family);
}

.empty-note {
  color: rgba(229,229,229,0.6);
  text-align: center;
  margin-top: 1rem;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.2rem;
}

.testimonial-card {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(0, 242, 234, 0.18);
  box-shadow:
    0 0 10px rgba(0, 242, 234, 0.1),
    inset 0 0 8px rgba(0,0,0,0.7);
  padding: 1.2rem;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.name {
  color: #00f2ea;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.95rem;
  letter-spacing: 0.05em;
}

.stars {
  display: flex;
  gap: 4px;
  margin-top: 4px;
}

.testimonial-text {
  color: rgba(255, 255, 255, 1)!important;
  font-size: 0.95rem;
  line-height: 1.35;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.delete-btn:hover {
  background: var(--primary-color);
  color: black;
  box-shadow: 0 0 10px var(--primary-color);
}

`;

export default Form;

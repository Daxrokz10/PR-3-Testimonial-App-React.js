import React, { useState } from 'react';
import styled from 'styled-components';
import { FaStar } from "react-icons/fa";

const Form = () => {
    const [star, setStar] = useState(0);
    const [selectedRating, setSelectedRating] = useState(0);
    const [formData, setFormData] = useState({ name: '', experience: '' });
    const [testimonials, setTestimonials] = useState([]);

    const handleMouseEnter = (index) => {
        setStar(index + 1);
    }

    const handleMouseLeave = () => {
        setStar(0);
    }

    const handleClick = (val) => {
        setSelectedRating(val);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.experience && selectedRating) {
            setTestimonials(prev => [...prev, { ...formData, rating: selectedRating }]);
            setFormData({ name: '', experience: '' });
            setSelectedRating(0);
            document.querySelector('input[name="name"]').value = '';
            document.querySelector('textarea[name="experience"]').value = '';
        }
    }

    return (
        <StyledWrapper>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="card cart">
                        <label className="title">TESTIMONIAL</label>
                        <div className="steps">
                            <div className="step">
                                <div>
                                    <span>NAME</span>
                                    <label htmlFor="">Enter your name</label><br />
                                    <input 
                                        type="text" 
                                        name='name' 
                                        className='input_field'
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <hr />
                                <div>
                                    <span>DESCRIBE YOUR EXPERIENCE</span>
                                    <label htmlFor="">Write your testimonial here</label><br />
                                    <textarea 
                                        name="experience" 
                                        rows="10" 
                                        cols="28" 
                                        className='input_field'
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                                <hr />
                                <div className="promo">
                                    <span>LEAVE A RATING</span>
                                    {
                                        [1,2,3,4,5].map((val, i) => {
                                            return <FaStar key={i}
                                                color={i < star || i < selectedRating ? "rgb(16, 86, 82)" : "rgb(201, 193, 178)"}
                                                onMouseEnter={() => handleMouseEnter(i)}
                                                onMouseLeave={() => handleMouseLeave()}
                                                onClick={() => handleClick(val)}
                                                style={{fontSize: "24px", marginRight: "8px", cursor: "pointer"}}
                                            ></FaStar>
                                        }
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card checkout">
                        <div className="footer">
                            <button type="submit" className="checkout-btn">Submit Review</button>
                        </div>
                    </div>
                </form>

                {testimonials.length > 0 && (
                    <div className="testimonials-section">
                        <h2>Testimonials</h2>
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="testimonial-card">
                                <div className="testimonial-header">
                                    <h3>{testimonial.name}</h3>
                                    <div className="stars">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar 
                                                key={i} 
                                                color={i < testimonial.rating ? "rgb(16, 86, 82)" : "rgb(201, 193, 178)"}
                                                style={{fontSize: "18px", marginRight: "4px"}}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="testimonial-text">{testimonial.experience}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  /* Body */
  .container {
    display: grid;
    grid-template-columns: auto;
    gap: 0px;
    max-width: 900px;
    margin: 40px auto;
    padding: 20px;
  }

  hr {
    height: 1px;
    background-color: rgba(16, 86, 82, .75);
    border: none;
  }

  .card {
    width: 400px;
    background: rgb(255, 250, 235);
    box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01), 0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09), 0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
  }

  .title {
    width: 100%;
    height: 40px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 20px;
    border-bottom: 1px solid rgba(16, 86, 82, .75);
    font-weight: 700;
    font-size: 11px;
    color: #000000;
  }

  /* Cart */
  .cart {
    border-radius: 19px 19px 0px 0px;
  }

  .cart .steps {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }

  .cart .steps .step {
    display: grid;
    gap: 10px;
  }

  .cart .steps .step span {
    font-size: 13px;
    font-weight: 600;
    color: #000000;
    margin-bottom: 8px;
    display: block;
  }

  .cart .steps .step p {
    font-size: 11px;
    font-weight: 600;
    color: #000000;
  }

  /* Promo */
  .promo form {
    display: grid;
    grid-template-columns: 1fr 80px;
    gap: 10px;
    padding: 0px;
  }

  .input_field {
    width: auto;
    height: 36px;
    padding: 0 0 0 12px;
    border-radius: 5px;
    outline: none;
    border: 1px solid  rgb(16, 86, 82);
    background-color: rgb(251, 243, 228);
    transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
    font-family: inherit;
  }

  .input_field:focus {
    border: 1px solid transparent;
    box-shadow: 0px 0px 0px 2px rgb(251, 243, 228);
    background-color: rgb(201, 193, 178);
  }

  textarea.input_field {
    padding: 12px;
    height: auto;
    resize: vertical;
  }

  .promo form button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 18px;
    gap: 10px;
    width: 100%;
    height: 36px;
    background: rgba(16, 86, 82, .75);
    box-shadow: 0px 0.5px 0.5px #F3D2C9, 0px 1px 0.5px rgba(239, 239, 239, 0.5);
    border-radius: 5px;
    border: 0;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    color: #000000;
  }

  /* Checkout */
  .payments .details {
    display: grid;
    grid-template-columns: 10fr 1fr;
    padding: 0px;
    gap: 5px;
  }

  .payments .details span:nth-child(odd) {
    font-size: 12px;
    font-weight: 600;
    color: #000000;
    margin: auto auto auto 0;
  }

  .payments .details span:nth-child(even) {
    font-size: 13px;
    font-weight: 600;
    color: #000000;
    margin: auto 0 auto auto;
  }

  .checkout .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px 10px 20px;
    background-color: rgba(16, 86, 82, .5);
  }

  .price {
    position: relative;
    font-size: 22px;
    color: #2B2B2F;
    font-weight: 900;
  }

  .checkout .checkout-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 36px;
    background: rgba(16, 86, 82, .55);
    box-shadow: 0px 0.5px 0.5px rgba(16, 86, 82, .75), 0px 1px 0.5px rgba(16, 86, 82, .75);
    border-radius: 7px;
    border: 1px solid rgb(16, 86, 82);
    color: #000000;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
    cursor: pointer;
  }

  .checkout .checkout-btn:hover {
    background: rgba(16, 86, 82, .75);
  }

  /* Testimonials Section */
  .testimonials-section {
    margin-top: 40px;
    width: 100%;
  }

  .testimonials-section h2 {
    font-size: 24px;
    font-weight: 700;
    color: #000000;
    margin-bottom: 20px;
    text-align: center;
  }

  .testimonial-card {
    background: rgb(255, 250, 235);
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 15px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.07), 0px 2px 4px rgba(0, 0, 0, 0.05);
    border-left: 4px solid rgba(16, 86, 82, .75);
  }

  .testimonial-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .testimonial-header h3 {
    font-size: 16px;
    font-weight: 600;
    color: #000000;
    margin: 0;
  }

  .testimonial-header .stars {
    display: flex;
    align-items: center;
  }

  .testimonial-text {
    font-size: 14px;
    color: #333333;
    line-height: 1.6;
    margin: 0;
    word-wrap: break-word;
  }
`;

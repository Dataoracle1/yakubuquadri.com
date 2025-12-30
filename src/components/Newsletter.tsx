import React, { useState } from 'react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would send this to a backend
    console.log('Subscribing email:', email);
    setSubscribed(true);
    setEmail('');
    
    // Reset subscribed message after 3 seconds
    setTimeout(() => {
      setSubscribed(false);
    }, 3000);
  };

  return (
    <section className="newsletter">
      <div className="container">
        <h2>Stay Updated</h2>
        <p>
          Subscribe to our newsletter to get updates on our latest offers, new products, and exclusive deals.
        </p>
        {subscribed ? (
          <div className="subscription-success">
            Thanks for subscribing! You'll receive our updates soon.
          </div>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
export default function FeatureCards() {
  return (
    <section className="feature-cards-section">
      <div className="feature-card section-box" id="kitchen">
        <div className="feature-icon">🍽</div>
        <div>
          <h3>Order Healthy Meals</h3>
          <p>Dietary Kitchen Package</p>
          <span>
            Get healthy prepared meals based on personalised plans.
          </span>
        </div>
      </div>

      <div className="feature-card section-box" id="allergy">
        <div className="feature-icon">⚠</div>
        <div>
          <h3>Allergy Information</h3>
          <p>Important Food Alerts</p>
          <span>
            Learn about allergy-safe foods and ingredients to avoid.
          </span>
        </div>
      </div>
    </section>
  );
}
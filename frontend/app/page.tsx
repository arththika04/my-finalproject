import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="landing-page">
      <section className="hero-banner">
        <div className="hero-text">
          <h1>Is Your Diet Healthy?</h1>
          <p>Find out how unhealthy food affects your body</p>

          <Link href="/quiz" className="landing-btn">
            Take Quiz
          </Link>
        </div>

        <div className="hero-image">
          <Image
            src="/healthy-diet.jpg"
            alt="Healthy diet"
            width={520}
            height={360}
            priority
          />
        </div>
      </section>

      <section className="content-grid">
        <div className="left-column">
          <div className="card large-card">
            <h2>⚠ Dangers of Unhealthy Eating</h2>

            <Link
              href="/videos/unhealthy-eating"
              className="video-card large-video"
            >
              <div className="play-circle">▶</div>
            </Link>

            <p className="card-description">
              Learn how unhealthy food affects your body and long-term health.
            </p>
          </div>

          <div className="card order-card">
            <div className="order-content">
              <div>
                <h2>🍽 Order Healthy Meals</h2>
                <h3>Dietary Kitchen Prepares</h3>
                <p>Healthy meals delivered to your door.</p>

                <Link href="/order" className="landing-btn small-btn">
                  Order Now
                </Link>
              </div>

              <div className="meal-illustration">
                <div className="plate-base"></div>
                <div className="food-cover"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="right-column">
          <div className="card side-card">
            <h2>Dietary Kitchen Food Videos</h2>
            <span className="post-label">Instagram Post</span>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="video-card small-video"
            >
              <div className="play-circle">▶</div>
            </a>

            <p className="card-description">
              See how unhealthy meals can affect your body.
            </p>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="landing-btn small-btn"
            >
              View Post
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
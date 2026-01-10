import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

export function LandingPage() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Prepare Students for
            <span className={styles.titleGradient}> Exam Success</span>
          </h1>
          <p className={styles.subtitle}>
            The modern exam preparation platform that helps teachers create practice exams
            and gives students the feedback they need to improve.
          </p>
          <div className={styles.actions}>
            <Link to="/register" className={styles.primaryButton}>
              <span className="material-icons-outlined">rocket_launch</span>
              Get Started Free
            </Link>
            <Link to="/login" className={styles.secondaryButton}>
              Sign In
            </Link>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.mockupCard}>
            <div className={styles.mockupHeader}>
              <span className={styles.mockupDot} />
              <span className={styles.mockupDot} />
              <span className={styles.mockupDot} />
            </div>
            <div className={styles.mockupContent}>
              <div className={styles.mockupQuestion}>
                <div className={styles.mockupQuestionNumber}>Question 5 of 20</div>
                <div className={styles.mockupQuestionText}>What is the capital of France?</div>
                <div className={styles.mockupOptions}>
                  <div className={styles.mockupOption}>Berlin</div>
                  <div className={`${styles.mockupOption} ${styles.mockupOptionSelected}`}>Paris</div>
                  <div className={styles.mockupOption}>Madrid</div>
                  <div className={styles.mockupOption}>Rome</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className={styles.problemSection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>The Challenge</h2>
          <p className={styles.sectionSubtitle}>
            Traditional exam preparation leaves both students and teachers in the dark
          </p>
          <div className={styles.problemGrid}>
            <div className={styles.problemCard}>
              <span className={`material-icons-outlined ${styles.problemIcon}`}>menu_book</span>
              <h3>Static Materials</h3>
              <p>Students practice with books and PDFs without receiving immediate feedback on their performance.</p>
            </div>
            <div className={styles.problemCard}>
              <span className={`material-icons-outlined ${styles.problemIcon}`}>visibility_off</span>
              <h3>No Visibility</h3>
              <p>Teachers lack insight into which topics students struggle with most.</p>
            </div>
            <div className={styles.problemCard}>
              <span className={`material-icons-outlined ${styles.problemIcon}`}>schedule</span>
              <h3>Time-Consuming</h3>
              <p>Manual grading takes hours that could be spent on actual teaching.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className={styles.solutionSection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>The Examineer Solution</h2>
          <p className={styles.sectionSubtitle}>
            A complete platform for creating, taking, and analyzing practice exams
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionContent}>
          <div className={styles.featuresGrid}>
            {/* For Teachers */}
            <div className={styles.featureCard}>
              <div className={styles.featureCardHeader}>
                <span className={`material-icons-outlined ${styles.featureIcon}`}>school</span>
                <h3>For Teachers</h3>
              </div>
              <ul className={styles.featureList}>
                <li>
                  <span className={`material-icons-outlined ${styles.checkIcon}`}>check_circle</span>
                  Create exam-like practice tests in minutes
                </li>
                <li>
                  <span className={`material-icons-outlined ${styles.checkIcon}`}>check_circle</span>
                  Add multiple-choice questions with point values
                </li>
                <li>
                  <span className={`material-icons-outlined ${styles.checkIcon}`}>check_circle</span>
                  Assign exams to students with one click
                </li>
                <li>
                  <span className={`material-icons-outlined ${styles.checkIcon}`}>check_circle</span>
                  View individual and class-level results
                </li>
                <li>
                  <span className={`material-icons-outlined ${styles.checkIcon}`}>check_circle</span>
                  Identify knowledge gaps at a glance
                </li>
              </ul>
            </div>

            {/* For Students */}
            <div className={styles.featureCard}>
              <div className={styles.featureCardHeader}>
                <span className={`material-icons-outlined ${styles.featureIcon}`}>person</span>
                <h3>For Students</h3>
              </div>
              <ul className={styles.featureList}>
                <li>
                  <span className={`material-icons-outlined ${styles.checkIcon}`}>check_circle</span>
                  Take practice exams that mirror real tests
                </li>
                <li>
                  <span className={`material-icons-outlined ${styles.checkIcon}`}>check_circle</span>
                  Distraction-free exam interface
                </li>
                <li>
                  <span className={`material-icons-outlined ${styles.checkIcon}`}>check_circle</span>
                  Get instant scores after submission
                </li>
                <li>
                  <span className={`material-icons-outlined ${styles.checkIcon}`}>check_circle</span>
                  See which questions were correct or wrong
                </li>
                <li>
                  <span className={`material-icons-outlined ${styles.checkIcon}`}>check_circle</span>
                  Reduce exam anxiety through practice
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorksSection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <p className={styles.sectionSubtitle}>
            Get started in three simple steps
          </p>
          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>1</div>
              <h3>Create Your Exam</h3>
              <p>Build practice exams with multiple-choice questions. Set point values and mark correct answers.</p>
            </div>
            <div className={styles.stepConnector}>
              <span className="material-icons-outlined">arrow_forward</span>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>2</div>
              <h3>Assign to Students</h3>
              <p>Invite students and assign exams. They can access and complete exams from any device.</p>
            </div>
            <div className={styles.stepConnector}>
              <span className="material-icons-outlined">arrow_forward</span>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>3</div>
              <h3>Review Results</h3>
              <p>See scores instantly. Identify weak areas and adjust your teaching accordingly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section className={styles.valueSection}>
        <div className={styles.sectionContent}>
          <div className={styles.valueGrid}>
            <div className={styles.valueCard}>
              <span className={`material-icons-outlined ${styles.valueIcon}`}>speed</span>
              <h3>Instant Feedback</h3>
              <p>No more waiting for grades. Students know their results immediately after submission.</p>
            </div>
            <div className={styles.valueCard}>
              <span className={`material-icons-outlined ${styles.valueIcon}`}>insights</span>
              <h3>Data-Driven Teaching</h3>
              <p>Make informed decisions about what to focus on based on real student performance data.</p>
            </div>
            <div className={styles.valueCard}>
              <span className={`material-icons-outlined ${styles.valueIcon}`}>devices</span>
              <h3>Works Everywhere</h3>
              <p>Students can practice on any device with a web browser. No apps to install.</p>
            </div>
            <div className={styles.valueCard}>
              <span className={`material-icons-outlined ${styles.valueIcon}`}>lock</span>
              <h3>Secure & Reliable</h3>
              <p>Built with security in mind. Your exam content and student data are protected.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>Ready to Transform Exam Preparation?</h2>
          <p>Join teachers who are already using Examineer to help students succeed.</p>
          <div className={styles.ctaActions}>
            <Link to="/register" className={styles.ctaPrimaryButton}>
              <span className="material-icons-outlined">rocket_launch</span>
              Start Free Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

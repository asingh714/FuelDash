import "./TermsOfUse.scss";

import React from "react";

const TermsOfUse = () => {
  return (
    <div>
      <header>
        <h1>Terms of Use for FuelDash Inc.</h1>
      </header>

      <nav>
        <h2>Navigation</h2>
        <ul>
            <li><a href="#welcome">Welcome to FuelDash</a></li>
            <li><a href="#acceptance">Acceptance of Terms</a></li>
            <li><a href="#modifications">Modifications</a></li>
            <li><a href="#user-registration">User Registration</a></li>
            <li><a href="#use-of-services">Use of Services</a></li>
            <li><a href="#intellectual-property">Intellectual Property</a></li>
            <li><a href="#data-and-privacy">Data and Privacy</a></li>
            <li><a href="#disclaimer">Disclaimer</a></li>
            <li><a href="#limitation">Limitation of Liability</a></li>
            <li><a href="#governing-law">Governing Law</a></li>
        </ul>
    </nav>

    <main></main>

      <main>
        <span>Last Updated: September 13, 2023</span>

        <section id="welcome">
          <h2>Welcome to FuelDash Inc.</h2>
          <p>
            Welcome to FuelDash, a real-time analytics dashboard designed for
            independent gas station owners. These Terms of Use ("Terms") govern
            your access to and use of our services, including our various
            websites, APIs, email notifications, applications, buttons, widgets,
            ads, and other covered services (the “Services”).
          </p>
        </section>

        <section id="acceptance">
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing or using our Services, you agree to be bound by these
            Terms. If you do not agree with these Terms, please do not access or
            use the Services.
          </p>
        </section>

        <section id="modifications">
          <h2>Modifications</h2>
          <p>
            FuelDash Inc. reserves the right to modify or replace these Terms at
            any time. It is your responsibility to review the Terms
            periodically.
          </p>
        </section>

        <section id="user-registration">
          <h2>User Registration</h2>
          <p>
            To use FuelDash, you may be required to register for an account. You
            agree to provide accurate, current, and complete information during
            the registration process and update such information to keep it
            accurate, current, and complete.
          </p>
        </section>

        <section id="use-of-services">
          <h2>Use of Services</h2>
          <p>
            You agree not to misuse the Services. For example, you must not:
          </p>
          <ul>
            <li>Attempt unauthorized access</li>
            <li>Use the Service for any illegal activities</li>
            <li>Upload or share content that is harmful or inappropriate</li>
          </ul>
        </section>

        <section id="intellectual-property">
          <h2>Intellectual Property</h2>
          <p>
            All content, design, graphics, and other intellectual property
            appearing on this platform are the property of FuelDash Inc.
            Unauthorized use is strictly prohibited.
          </p>
        </section>

        <section id="data-and-privacy">
          <h2>Data and Privacy</h2>
          <p>
            Please refer to our Privacy Policy for information on how we
            collect, use, and disclose your personal information.
          </p>
        </section>

        <section id="disclaimer">
          <h2>Disclaimer of Warranties</h2>
          <p>
            The Services are provided "as-is." FuelDash Inc. disclaims all
            warranties, whether express or implied, including implied warranties
            of merchantability, fitness for a particular purpose, and
            non-infringement.
          </p>
        </section>

        <section id="limitation">
          <h2>Limitation of Liability</h2>
          <p>
            FuelDash Inc. shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages, or any loss of profits
            or revenues, whether incurred directly or indirectly.
          </p>
        </section>

        <section id="governing-law">
          <h2>Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State in which FuelDash
            Inc. is registered, without respect to its conflict of laws
            principles.
          </p>
        </section>
      </main>
    </div>
  );
};

export default TermsOfUse;

import BackButton from "../../components/Backbutton";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">

        <BackButton />

        <h1 className="mt-8 text-5xl font-black">
          Privacy <span className="text-indigo-500">Policy</span>
        </h1>

        <p className="mt-4 text-slate-400">
          Last Updated: January 2026
        </p>

        <div className="mt-10 space-y-8 text-slate-300 leading-8">

          <section>
            <h2 className="text-2xl font-bold text-white">
              Information We Collect
            </h2>

            <p>
              AuraBank collects personal information including your name,
              email address, phone number, account information, transaction
              history, and device information to provide secure banking
              services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              How We Use Your Information
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Process banking transactions.</li>
              <li>Verify your identity.</li>
              <li>Protect against fraud.</li>
              <li>Improve banking services.</li>
              <li>Provide customer support.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Data Security
            </h2>

            <p>
              We use encryption, secure authentication, OTP verification,
              and continuous monitoring to protect your information from
              unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Cookies
            </h2>

            <p>
              Cookies help improve website functionality, maintain secure
              sessions, and enhance user experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Third-Party Services
            </h2>

            <p>
              Trusted third-party providers may assist with payment
              processing, authentication, and fraud prevention while
              maintaining strict security standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Contact Us
            </h2>

            <p>
              If you have any questions regarding this Privacy Policy,
              please contact AuraBank Customer Support.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
import BackButton from "../../components/Backbutton";

function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">  

      <div className="max-w-5xl mx-auto px-6 py-10">

        <BackButton />

        <h1 className="mt-8 text-5xl font-black">
          Terms <span className="text-indigo-500">of Service</span>
        </h1>

        <p className="mt-4 text-slate-400">
          Last Updated: January 2026
        </p>

        <div className="mt-10 space-y-8 text-slate-300 leading-8">

          <section>
            <h2 className="text-2xl font-bold text-white">
              Acceptance of Terms
            </h2>

            <p>
              By using AuraBank services, you agree to comply with these
              Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Account Responsibilities
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate information.</li>
              <li>Maintain account security.</li>
              <li>Keep your password confidential.</li>
              <li>Protect your OTP verification codes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Transactions
            </h2>

            <p>
              Users are responsible for reviewing transaction details
              before confirming transfers. Completed transactions may not
              be reversible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Prohibited Activities
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Fraudulent activity.</li>
              <li>Money laundering.</li>
              <li>Unauthorized account access.</li>
              <li>Illegal financial transactions.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Service Availability
            </h2>

            <p>
              AuraBank aims to provide reliable banking services but cannot
              guarantee uninterrupted availability during maintenance or
              unforeseen technical issues.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Changes to Terms
            </h2>

            <p>
              We may update these Terms of Service from time to time.
              Continued use of our services indicates acceptance of any
              revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Contact
            </h2>

            <p>
              For questions regarding these Terms, please contact
              AuraBank Customer Support.
            </p>
          </section>

        </div>

      </div>

    </div>
  );
}

export default TermsOfService;
import { Fraunces, Manrope } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const display = Fraunces({ subsets: ["latin"], weight: ["500", "600"], style: ["normal", "italic"], variable: "--font-display" });
const body = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body" });

export const metadata = { title: "Privacy notice | Kenol Junior Angels Academy" };

const RETENTION_UNSUCCESSFUL = "12 months";
const LAST_UPDATED = "September 2026";

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 mt-10 text-2xl font-bold" style={{ color: "#2a0d0d" }}>{children}</h2>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-lg leading-8" style={{ color: "#4a3636" }}>{children}</p>;
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className={`${display.variable} ${body.variable}`} style={{ fontFamily: "var(--font-body)" }}>
        <section className="px-6 py-14 sm:px-10 md:py-20 lg:px-16" style={{ background: "#fbf5ec" }}>
          <div className="mx-auto max-w-2xl">
            <span className="mb-5 block h-1 w-16 rounded-full" style={{ background: "#e8b23d" }} />
            <h1 className="text-4xl italic leading-[1.1] sm:text-5xl" style={{ fontFamily: "var(--font-display)", color: "#2a0d0d" }}>
              Privacy notice
            </h1>
            <p className="mt-3 text-sm" style={{ color: "#8a7a6d" }}>Last updated {LAST_UPDATED}</p>

            <H>Who we are</H>
            <P>
              Kenol Junior Angels Academy, Kenol Town, near Kenol Catholic Church, P.O. Box 340 – 01020, Kenol,
              is responsible for the information you give us on the admission form.
            </P>

            <H>What we collect</H>
            <P>
              About the child: full name, date of birth, gender, the level applied for, and previous school (if any).
              About you: your name, relationship to the child, phone numbers, and area. If you provide a second
              parent or guardian, we also collect their name, relationship and phone number. We also record the
              date and time you agreed to this notice. We do not collect medical or special-needs information
              online; you can share it with the school in person.
            </P>

            <H>Why we collect it</H>
            <P>
              Only to process the application: to contact you, verify documents, arrange an interview, and decide
              on admission. We do not sell your information or use it for advertising.
            </P>

            <H>Who can see it</H>
            <P>
              Authorised school staff, through a password-protected system. Our website and database are hosted by
              service providers who store data on our behalf and are not allowed to use it for their own purposes.
              We do not send your contact details by email; staff read them in the password-protected system.
            </P>

            <H>How long we keep it</H>
            <P>
              If your child joins the school, the information becomes part of the school record. If the application
              is unsuccessful or you withdraw, we delete it after {RETENTION_UNSUCCESSFUL}.
            </P>

            <H>Your rights</H>
            <P>
              Under the Data Protection Act, 2019, you may ask to see the information we hold, correct it, or have
              it deleted. Contact us on 0723 248 400 or kjuniorangels1@gmail.com. If you are unhappy with how we
              handle your information, you may complain to the Office of the Data Protection Commissioner.
            </P>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
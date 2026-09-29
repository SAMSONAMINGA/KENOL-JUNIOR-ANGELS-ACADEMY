import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ApplyForm from "./ApplyForm";
import { LEVEL_OPTIONS, type LevelCode } from "@/lib/levels";
import { makeFormToken } from "@/lib/antispam";

export default async function ApplyPage({ searchParams }: { searchParams: Promise<{ level?: string }> }) {
  const requested = (await searchParams).level;
  const defaultLevel = LEVEL_OPTIONS.find((l) => l.code === requested)?.code as LevelCode | undefined;

  return (
    <>
      <Header />
      <main className="bg-[#f8f4f0] py-12 md:py-16">
        <div className="mx-auto max-w-2xl px-4">
          <a href="/admissions" className="mb-6 inline-block text-sm font-semibold text-[#6e0000] hover:underline">
            &larr; Back to Admissions
          </a>
          <h1 className="mb-2 text-3xl font-bold text-[#6e0000] md:text-4xl">Admission Application</h1>
          <p className="mb-8 text-gray-600">Fields marked * are required. It takes about 5 minutes.</p>
          <ApplyForm defaultLevel={defaultLevel} formToken={makeFormToken()} />
        </div>
      </main>
      <Footer />
    </>
  );
}
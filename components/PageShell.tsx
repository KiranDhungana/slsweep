import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs, { type Crumb } from "@/components/seo/Breadcrumbs";

type Props = {
  crumbs: Crumb[];
  children: React.ReactNode;
  className?: string;
};

/** Standard inner page: header, visible breadcrumbs, content, footer. */
export default function PageShell({ crumbs, children, className = "" }: Props) {
  return (
    <>
      <Header />
      <main className={`min-h-screen bg-gradient-to-b from-brand-50/40 via-white to-white ${className}`}>
        <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-8">
          <Breadcrumbs items={crumbs} />
        </div>
        {children}
      </main>
      <Footer />
    </>
  );
}

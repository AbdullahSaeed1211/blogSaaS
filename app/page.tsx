import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Hero } from "./components/frontend/Hero";
import { Logos } from "./components/frontend/Logos";
import { Features } from "./components/frontend/Features";
import { PricingTable } from "./components/shared/Pricing";
import { redirect } from "next/navigation";
import { FAQ } from "./components/frontend/FAQ";
import { Footer } from "./components/frontend/Footer";
import { HowItWorks } from "./components/frontend/Works";
import CTA from "./components/frontend/CTACard";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const session = await getUser();

  if (session?.id) {
    return redirect("/dashboard");
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <Hero />
      <Logos />
      <Features />
      <HowItWorks />
      <FAQ />
      <PricingTable />
      <CTA />
      <Footer />
    </div>
  );
}

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { SubmitButton } from "../dashboard/SubmitButtons";
import Link from "next/link";
import { CreateSubscription } from "@/app/actions";

interface iAppProps {
  id: number;
  cardTitle: string;
  cardDescription: string;
  priceTitle: string;
  benefits: string[];
}

export const PricingPlans: iAppProps[] = [
  {
    id: 0,
    cardTitle: "Freelancer",
    cardDescription: "Best for people starting out",
    priceTitle: "Free",
    benefits: [
      "1 Site",
      "Upto 1000 Visitors",
      "2 GB of storage",
      "Email support",
      "Help center access",
    ],
  },
  {
    id: 1,
    cardTitle: "Startups",
    cardDescription: "Best for small businesses and professionals",
    priceTitle: "$12.99",
    benefits: [
      "Unlimited Sites",
      "Upto 5000 Visitors",
      "5 GB of storage",
      "Priority email support",
      "Help center access",
    ],
  },
];

export function PricingTable() {
  return (
    <>
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-semibold text-primary-green">Pricing</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Pricing Plans for everyone and every budget!
        </h1>
        <p className="max-w-2xl mx-auto text-center leading-tight mt-6 text-lg text-muted-foreground">
          Choose the plan that fits your needs. Try it out for free!
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 mt-15 lg:grid-cols-2">
        {PricingPlans.map((plan) => (
          <Card
            key={plan.id}
            className={plan.id === 1 ? "border-primary-green" : ""}>
            <CardHeader>
              <CardTitle>
                {plan.id === 1 ? (
                  <div className="flex items-center justify-between ">
                    <h3 className="text-primary-green">Startup</h3>
                    <p className="rounded-full bg-primary-green/30 px-3 py-1 text-xs font-semibold leading-5 text-primary-green">
                      Most Popular
                    </p>
                  </div>
                ) : (
                  <>{plan.cardTitle}</>
                )}
              </CardTitle>
              <CardDescription>{plan.cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mt-6 text-4xl font-bold tracking-tighter">
                {plan.priceTitle}
              </p>
              <ul className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                {plan.benefits.map((benefit, index) => (
                  <li key={index} className="flex gap-x-3">
                    <Check className="text-primary-green size-5" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {plan.id === 1 ? (
                <form action={CreateSubscription} className="w-full">
                  <SubmitButton text="Buy plan" className=" mt-5 w-full"/>
                </form>
              ) : (
                <Button className="mt-5 w-full" variant="outline" asChild>
                  <Link href={`/dashboard`}>
                  Try for Free
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

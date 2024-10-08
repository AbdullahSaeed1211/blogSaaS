import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XIcon } from "lucide-react";
import Link from "next/link";

export default function CancelledRoute() {
  return (
    <div className="w-full flex flex-1 items-center justify-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <XIcon className="size-10 rounded-full bg-red-500/30 text-red-500 p-2" />
          </div>
          <div className="mt-3 text-center sm:mt-5 w-full ">
            <h2 className="text-xl font-semibold">Payment Cancelled</h2>
            <p className="text-sm mt-2 text-muted-foreground tracking-tight">
              Your payment was cancelled. You wont be charged. Please try again
            </p>

            <Button className="w-full mt-5" asChild>
              <Link className="" href={`/dashboard`}>Return to Dashboard</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

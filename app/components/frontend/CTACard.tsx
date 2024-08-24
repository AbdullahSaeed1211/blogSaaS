import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Component() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="w-full">
        <Card className="w-full max-w-full mx-auto overflow-hidden shadow-lg bg-white dark:bg-gray-900 rounded-3xl">
          <CardContent className="p-0">
            <div className="relative overflow-hidden bg-gradient-to-br from-[#e0f7fa] via-[#b2ebf2] to-[#80deea] dark:from-[#004d40] dark:via-[#00796b] dark:to-[#004d40]">
              <div
                className="absolute inset-0 bg-grid-gray-200/[0.2] bg-[size:20px_20px] dark:bg-grid-gray-800/[0.2]"
                style={{
                  maskImage: "linear-gradient(to bottom, transparent, black)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent, black)",
                }}
              ></div>
              <div className="relative px-6 py-12 md:px-10 md:py-16 text-center">
                <span className="inline-block text-sm font-semibold tracking-wider text-primary  dark:text-white bg-white/80 dark:bg-primary-green/30 px-4 py-2 rounded-full mb-6 shadow-sm">
                  Get Started Today!
                </span>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-gray-100 mb-4">
                  Setup your Blog{" "}
                  <span className="block text-primary dark:text-primary-green mt-2 drop-shadow-sm">
                    in Minutes!
                  </span>
                </h2>

                <p className="max-w-xl mx-auto text-base md:text-lg text-gray-800 dark:text-gray-300 leading-relaxed mb-8">
                  Creating a blog shouldn{`'`}t be a hassle. With BlogSquirrel,
                  you can launch your blog effortlessly in just a few minutes.
                  Choose a plan that fits your needs and start sharing your
                  story today.
                </p>

                <div className="flex sm:flex-row items-center justify-center gap-4">
                  <LoginLink>
                    <Button variant="secondary" className="w-full text-base md:text-lg px-6 py-2 font-semibold rounded-lg duration-300">
                      Sign in
                    </Button>
                  </LoginLink>
                  <RegisterLink>
                    <Button className="bg-primary w-full text-base md:text-lg px-6 py-2 font-semibold rounded-lg duration-300">
                      Try for free
                    </Button>
                  </RegisterLink>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

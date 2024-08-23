import { Cloud, Lock, Key, CreditCard, Database, UploadCloud, Layout, Edit } from 'lucide-react';

const features = [
  {
    name: "Seamless User Authentication",
    description: "Protect your content with industry-leading multi-factor authentication and OAuth integration for hassle-free sign-ins.",
    icon: Lock,
  },
  {
    name: "Effortless Payment Management",
    description: "Handle subscriptions and payments seamlessly through Stripe, ensuring your revenue flows smoothly.",
    icon: CreditCard,
  },
  {
    name: "Scalable Database Solutions",
    description: "Reliable data storage with built-in scaling, ensuring your blog grows effortlessly with your audience.",
    icon: Database,
  },
  {
    name: "Intuitive Content Creation",
    description: "Create and manage posts with ease using a powerful text editor designed for a seamless writing experience.",
    icon: Edit,
  },
  {
    name: "Beautiful Customizable Design",
    description: "Style your blog effortlessly with modern UI components, giving you a professional look without the hassle.",
    icon: Layout,
  },
  {
    name: "Optimized Performance",
    description: "Powered by the latest technology, your blog will be fast, responsive, and ready to handle high traffic.",
    icon: Cloud,
  },
];




export function Features() {
  return (
    <div className="py-24 sm:py-32">
      <div className="max-w-2xl mx-auto lg:text-center">
        <p className="font-semibold leading-7 text-primary-green">Blog Faster</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Get your blog up and running in minutes
        </h1>
        <p className="mt-6 text-base leading-snug text-muted-foreground">
        Say goodbye to complicated setups! BlogSquirrel helps you create a fast, professional blog with ease. Start now, and you&amps;ll have your blog live in no time.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <div className="text-base font-semibold leading-7">
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                {feature.name}
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-snug">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
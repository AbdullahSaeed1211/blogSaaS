import { UserCheck, FileText, Monitor, Layout } from 'lucide-react';

const steps = [
  {
    name: 'Log in or Sign up',
    description: 'Get started by creating an account or logging in to access your personalized dashboard.',
    icon: UserCheck,
  },
  {
    name: 'Create Your Site',
    description: 'Set up your blog site in just a few clicks. Choose a name, pick a design, and get ready to share your stories.',
    icon: Monitor,
  },
  {
    name: 'Write Articles',
    description: 'Craft your content easily with our intuitive editor. Create and manage multiple articles effortlessly.',
    icon: FileText,
  },
  {
    name: 'Publish and Share',
    description: 'Once you’re happy with your articles, publish them instantly and showcase your blog to the world.',
    icon: Layout,
  },
];

export function HowItWorks() {
  return (
    <div className="pb-24 sm:pb-32">
      <div className="max-w-2xl mx-auto lg:text-center">
        <p className="font-semibold leading-7 text-primary-green">How It Works</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Build your blog in 4 easy steps
        </h2>
        <p className="mt-6 text-base leading-snug text-muted-foreground">
          Follow these steps to create your site, write articles, and share your blog with the world in minutes.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 lg:gap-y-16">
          {steps.map((step) => (
            <div key={step.name} className="relative pl-16">
              <div className="text-base font-semibold leading-7">
                <div className="absolute left-0 top-0 flex items-center justify-center rounded-lg bg-primary size-10">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                {step.name}
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-snug">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

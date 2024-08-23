import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

const faqData = [
  {
    question: "What makes BlogSquirrel different from other blogging platforms?",
    answer: "BlogSquirrel is designed to be fast and user-friendly. Our seamless setup, multi-factor authentication, and advanced SEO tools ensure that your blog not only launches quickly but also grows effortlessly with your audience.",
  },
  {
    question: "How secure is BlogSquirrel for my blog and user data?",
    answer: "Security is a top priority at BlogSquirrel. With multi-factor authentication, OAuth integration, and encrypted databases, your data and your users’ data are always protected.",
  },
  {
    question: "Can I customize the design of my blog?",
    answer: "Absolutely! BlogSquirrel provides a range of customizable modern UI components, allowing you to style your blog to suit your brand while maintaining a professional look.",
  },
  {
    question: "How does BlogSquirrel handle payments and subscriptions?",
    answer: "We use Stripe for seamless payment and subscription management. Whether you're handling one-time payments or recurring subscriptions, BlogSquirrel makes the process easy.",
  },
  {
    question: "Is BlogSquirrel scalable?",
    answer: "Yes! BlogSquirrel is built with scalability in mind. Our database solutions ensure that as your blog grows, it can easily handle more traffic without compromising on performance.",
  },
];

export function FAQ() {
  return (
    <div className="pb-24 sm:pb-32">
      <div className="max-w-2xl mx-auto lg:text-center">
        <p className="font-semibold leading-7 text-primary-green">Got Questions?</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-6 text-base leading-snug text-muted-foreground">
          Got questions? We{`'`}ve got answers. Explore our FAQ section to find out more about BlogSquirrel and how you can get your blog up and running in minutes.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <Accordion.Root type="single" collapsible>
          {faqData.map((faq, index) => (
            <Accordion.Item key={index} value={`item-${index}`} className="border-b py-4">
              <Accordion.Header>
                <Accordion.Trigger className="w-full flex justify-between items-center text-left font-semibold text-lg">
                  {faq.question}
                  <ChevronDown className="ml-2 w-5 h-5 transition-transform duration-300" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="mt-4 text-sm text-muted-foreground">
                {faq.answer}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </div>
  );
}

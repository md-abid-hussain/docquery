import { CheckCircle } from "lucide-react"

const benefits = [
  "Improved documentation searchability and accessibility",
  "Enhanced AI-powered question answering capabilities",
  "Streamlined knowledge management for development teams",
  "Faster onboarding and reduced learning curve for new team members",
  "Efficient utilization of existing documentation resources",
  "Seamless integration with popular documentation formats and platforms",
]

export function Benefits() {
  return (
    <section id="benefits" className="w-full py-12 md:py-24 lg:py-32 bg-zinc-50 dark:bg-zinc-900">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Benefits of DocQuery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start space-x-4"
            >
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <p className="text-zinc-700 dark:text-zinc-300">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


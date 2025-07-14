import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, Cloud, Database, Server, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Portfolio() {
  const projects = [
    {
      title: "AWS Migration Project",
      description:
        "Migrated from Console as code to Infrastructure as Code with AWS CDK Typescript",
      technologies: ["Terraform", "AWS", "Azure", "GCP", "GitHub Actions"],
      link: "https://github.com/yourusername/multi-cloud-infra",
      icon: <Cloud className="h-5 w-5" />,
    },
    {
      title: "Kubernetes Monitoring Stack",
      description:
        "Complete observability solution with Prometheus, Grafana, and Jaeger for microservices monitoring and distributed tracing.",
      technologies: ["Kubernetes", "Prometheus", "Grafana", "Jaeger", "Helm"],
      link: "https://github.com/yourusername/k8s-monitoring",
      icon: <Server className="h-5 w-5" />,
    },
    {
      title: "Serverless Data Pipeline",
      description:
        "Event-driven data processing pipeline using AWS Lambda, SQS, and DynamoDB with automatic scaling and error handling.",
      technologies: ["AWS Lambda", "SQS", "DynamoDB", "Python", "CloudFormation"],
      link: "https://github.com/yourusername/serverless-pipeline",
      icon: <Database className="h-5 w-5" />,
    },
    {
      title: "Zero-Trust Security Framework",
      description:
        "Implementation of zero-trust architecture using HashiCorp Vault, Consul Connect, and service mesh for secure microservices communication.",
      technologies: ["HashiCorp Vault", "Consul", "Istio", "mTLS", "RBAC"],
      link: "https://github.com/yourusername/zero-trust-framework",
      icon: <Shield className="h-5 w-5" />,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Portfolio
            </h1>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" asChild className="hover:bg-blue-50">
                <Link href="#projects">Projects</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="hover:bg-purple-50">
                <Link href="#contact">Contact</Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="mb-8">
            <div className="relative mb-6">
              <Image
                src="/profile_pic.png"
                alt="Profile"
                width={150}
                height={150}
                className="rounded-full mx-auto border-4 border-gradient-to-r from-blue-400 to-purple-400 shadow-xl"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 blur-xl"></div>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Jihad Muhammad
            </h1>
            <p className="text-xl text-blue-700 mb-6 font-medium">Cloud Engineer & DevOps Specialist</p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Passionate about building scalable, secure, and efficient cloud infrastructure. Experienced in multi-cloud
              environments, containerization, and automation.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
            >
              <Link href="#projects">View Projects</Link>
            </Button>
            <Button variant="outline" asChild className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent">
              <Link href="mailto:jihadmuhammad822@gmail.com">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gradient-to-br from-white via-blue-50/50 to-purple-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-800 to-purple-800 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A collection of cloud engineering projects showcasing infrastructure automation, monitoring, security, and
              scalable architectures.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
            {projects.map((project, index) => {
              const gradients = [
                "from-blue-500 to-cyan-500",
                "from-purple-500 to-pink-500",
                "from-green-500 to-teal-500",
                "from-orange-500 to-red-500",
              ]
              const bgColors = [
                "bg-gradient-to-br from-blue-50 to-cyan-50",
                "bg-gradient-to-br from-purple-50 to-pink-50",
                "bg-gradient-to-br from-green-50 to-teal-50",
                "bg-gradient-to-br from-orange-50 to-red-50",
              ]

              return (
                <Card
                  key={index}
                  className={`group hover:shadow-xl transition-all duration-300 border-0 ${bgColors[index % 4]} hover:scale-105`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 bg-gradient-to-r ${gradients[index % 4]} rounded-lg text-white shadow-md`}>
                        {project.icon}
                      </div>
                      <CardTitle className="text-xl text-gray-800">{project.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base leading-relaxed text-gray-600">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          className={`text-xs bg-gradient-to-r ${gradients[index % 4]} text-white border-0`}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className={`group-hover:bg-gradient-to-r group-hover:${gradients[index % 4]} group-hover:text-white transition-all border-gray-300 text-gray-700`}
                    >
                      <Link href={project.link} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        View Project
                        <ExternalLink className="h-3 w-3 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Lets Connect</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Interested in collaborating or discussing cloud engineering opportunities? I would love to hear from you.
          </p>

          <div className="flex justify-center gap-4">
            <Button asChild className="bg-white text-purple-600 hover:bg-gray-100 shadow-lg">
              <Link href="mailto:your.email@example.com">Email Me</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
            >
              <Link href="https://www.linkedin.com/in/jihad-muhammad-111339111/" target="_blank" rel="noopener noreferrer">
                LinkedIn
                <ExternalLink className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
            >
              <Link href="https://github.com/jihad0822" target="_blank" rel="noopener noreferrer">
                GitHub
                <ExternalLink className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-white">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

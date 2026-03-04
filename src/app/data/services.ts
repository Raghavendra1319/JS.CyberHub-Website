export interface Service {
  id: string;
  name: string;
  category: "security" | "development" | "consulting" | "training";
  shortDescription: string;
  fullDescription: string;
  price: number;
  duration: string;
  image: string;
  features: string[];
  popular?: boolean;
}

export const services: Service[] = [
  {
    id: "malware-security",
    name: "Malware Security Assessment",
    category: "security",
    shortDescription: "Comprehensive malware detection and removal service",
    fullDescription: "Protect your systems from malicious software with our advanced malware security assessment. We use cutting-edge tools to detect, analyze, and remove threats while implementing preventive measures.",
    price: 499,
    duration: "2-3 hours",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    features: [
      "Deep system scan",
      "Threat identification & removal",
      "Security patch implementation",
      "Prevention strategy setup",
      "Detailed security report"
    ],
    popular: true
  },
  {
    id: "network-security",
    name: "Network Security Audit",
    category: "security",
    shortDescription: "Complete network vulnerability assessment",
    fullDescription: "Ensure your network infrastructure is secure with our comprehensive security audit. We identify vulnerabilities, test for weaknesses, and provide actionable recommendations.",
    price: 799,
    duration: "1-2 days",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    features: [
      "Network vulnerability scan",
      "Penetration testing",
      "Firewall configuration review",
      "Access control assessment",
      "Detailed audit report"
    ],
    popular: true
  },
  {
    id: "web-development",
    name: "Custom Website Development",
    category: "development",
    shortDescription: "Professional website development services",
    fullDescription: "Get a modern, responsive website built with the latest technologies. We create custom solutions tailored to your business needs with a focus on performance and user experience.",
    price: 2999,
    duration: "2-4 weeks",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    features: [
      "Custom design & development",
      "Responsive mobile-first design",
      "SEO optimization",
      "Content management system",
      "6 months support"
    ]
  },
  {
    id: "app-development",
    name: "Mobile App Development",
    category: "development",
    shortDescription: "Native and cross-platform app development",
    fullDescription: "Transform your ideas into powerful mobile applications. We develop both iOS and Android apps using modern frameworks to ensure quality and performance.",
    price: 4999,
    duration: "6-8 weeks",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    features: [
      "iOS & Android development",
      "Modern UI/UX design",
      "API integration",
      "App store deployment",
      "3 months support"
    ],
    popular: true
  },
  {
    id: "business-consulting",
    name: "Business Strategy Consulting",
    category: "consulting",
    shortDescription: "Strategic business guidance and planning",
    fullDescription: "Get expert advice on business strategy, growth planning, and operational optimization. We help startups and SMBs make informed decisions.",
    price: 599,
    duration: "2-hour session",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    features: [
      "Business model analysis",
      "Growth strategy planning",
      "Market research insights",
      "Risk assessment",
      "Action plan document"
    ]
  },
  {
    id: "security-training",
    name: "Cybersecurity Training",
    category: "training",
    shortDescription: "Employee security awareness training",
    fullDescription: "Educate your team on cybersecurity best practices. Our training programs cover everything from basic security hygiene to advanced threat detection.",
    price: 899,
    duration: "Full day workshop",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
    features: [
      "Interactive workshop sessions",
      "Real-world scenarios",
      "Best practices guide",
      "Phishing simulation",
      "Certification of completion"
    ]
  },
  {
    id: "data-recovery",
    name: "Data Recovery Service",
    category: "security",
    shortDescription: "Professional data recovery and backup",
    fullDescription: "Recover lost or corrupted data from various storage devices. We also help implement robust backup solutions to prevent future data loss.",
    price: 699,
    duration: "1-3 days",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop",
    features: [
      "Hard drive recovery",
      "Cloud backup setup",
      "Data migration",
      "Disaster recovery planning",
      "24/7 emergency support"
    ]
  },
  {
    id: "compliance-audit",
    name: "Compliance Auditing",
    category: "consulting",
    shortDescription: "Regulatory compliance assessment",
    fullDescription: "Ensure your business meets industry compliance standards. We audit your systems and processes against relevant regulations and provide compliance roadmaps.",
    price: 1299,
    duration: "3-5 days",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop",
    features: [
      "Compliance gap analysis",
      "GDPR/ISO assessment",
      "Policy documentation",
      "Remediation plan",
      "Compliance certificate"
    ]
  },
  {
    id: "software-development",
    name: "Custom Software Development",
    category: "development",
    shortDescription: "Tailored software solutions",
    fullDescription: "Build custom software applications designed specifically for your business processes. We develop scalable, maintainable solutions using modern technologies.",
    price: 5999,
    duration: "8-12 weeks",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
    features: [
      "Custom application development",
      "Database design",
      "Cloud deployment",
      "Integration services",
      "1 year maintenance"
    ]
  },
  {
    id: "device-protection",
    name: "Device Protection Setup",
    category: "security",
    shortDescription: "Comprehensive device security configuration",
    fullDescription: "Secure all your business devices with enterprise-grade protection. We configure antivirus, firewalls, and implement security policies across your organization.",
    price: 399,
    duration: "1 day",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    features: [
      "Endpoint security setup",
      "Antivirus installation",
      "Security policy configuration",
      "User access management",
      "Ongoing monitoring"
    ]
  },
  {
    id: "risk-management",
    name: "IT Risk Management",
    category: "consulting",
    shortDescription: "Identify and mitigate IT risks",
    fullDescription: "Comprehensive IT risk assessment and management strategy. We help you identify potential threats and implement mitigation strategies to protect your business.",
    price: 999,
    duration: "1 week",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    features: [
      "Risk assessment",
      "Threat modeling",
      "Mitigation strategies",
      "Incident response planning",
      "Risk monitoring framework"
    ]
  }
];

export const categories = [
  { id: "all", name: "All Services" },
  { id: "security", name: "Security" },
  { id: "development", name: "Development" },
  { id: "consulting", name: "Consulting" },
  { id: "training", name: "Training" }
];

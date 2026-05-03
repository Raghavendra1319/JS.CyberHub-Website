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
    price: 18000,
    duration: "3-4 hours",
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
    fullDescription: "Ensure your network infrastructure is secure with our comprehensive security audit. We identify vulnerabilities, test for weaknesses, and provide actionable recommendations tailored for Indian businesses.",
    price: 28000,
    duration: "2-3 days",
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
    fullDescription: "Get a modern, responsive website built with the latest technologies. We create custom solutions tailored to Indian businesses with a focus on performance, user experience, and mobile-first approach.",
    price: 85000,
    duration: "3-5 weeks",
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
    fullDescription: "Transform your ideas into powerful mobile applications optimized for the Indian market. We develop both iOS and Android apps using modern frameworks to ensure quality, performance, and seamless user experience.",
    price: 175000,
    duration: "8-10 weeks",
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
    fullDescription: "Get expert advice on business strategy, growth planning, and operational optimization tailored for the Indian business landscape. We help startups and SMBs make informed decisions and scale effectively.",
    price: 18000,
    duration: "3-hour session",
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
    fullDescription: "Educate your team on cybersecurity best practices with training programs designed for Indian enterprises. Our comprehensive workshops cover everything from basic security hygiene to advanced threat detection and compliance.",
    price: 28000,
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
    fullDescription: "Recover lost or corrupted data from various storage devices with our expert data recovery services. We also help implement robust backup solutions to prevent future data loss and ensure business continuity.",
    price: 22000,
    duration: "2-4 days",
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
    fullDescription: "Ensure your business meets industry compliance standards including IT Act 2000, DPDPA 2023, and international regulations. We audit your systems and processes against relevant regulations and provide comprehensive compliance roadmaps.",
    price: 45000,
    duration: "4-6 days",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop",
    features: [
      "Compliance gap analysis",
      "GDPR/ISO/DPDPA assessment",
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
    fullDescription: "Build custom software applications designed specifically for your business processes. We develop scalable, maintainable solutions using modern technologies with focus on cost-effectiveness and Indian market requirements.",
    price: 225000,
    duration: "10-14 weeks",
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
    fullDescription: "Secure all your business devices with enterprise-grade protection suitable for SMEs and enterprises. We configure antivirus, firewalls, and implement security policies across your organization with ongoing support.",
    price: 13000,
    duration: "1-2 days",
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
    fullDescription: "Comprehensive IT risk assessment and management strategy tailored for Indian businesses. We help you identify potential threats and implement mitigation strategies to protect your business with cost-effective solutions.",
    price: 32000,
    duration: "1-2 weeks",
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

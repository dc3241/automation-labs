// AI Automation Guide Content Management
// Centralized content for the 7-day guide

export interface DayContent {
  id: number;
  title: string;
  subtitle: string;
  overview: string;
  timeEstimate: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  sections: {
    title: string;
    content: string;
    checklist: string[];
  }[];
  tools: {
    name: string;
    category: string;
    description: string;
    pricing: string;
    bestFor: string[];
    affiliateUrl?: string;
    diyTime: string;
    doneForYou?: boolean;
  }[];
  upsell: {
    title: string;
    description: string;
    cta: string;
    price?: string;
  };
}

export interface BusinessType {
  id: string;
  name: string;
  description: string;
  icon: string;
  painPoints: string[];
  quickWins: string[];
}

export const BUSINESS_TYPES: BusinessType[] = [
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Online stores selling physical or digital products',
    icon: '🛒',
    painPoints: [
      'Manual order processing',
      'Inventory management',
      'Customer support tickets',
      'Review collection'
    ],
    quickWins: [
      'Automated email sequences',
      'Inventory alerts',
      'Customer chatbots',
      'Review request automation'
    ]
  },
  {
    id: 'agency',
    name: 'Marketing Agency',
    description: 'Agencies providing marketing services to clients',
    icon: '🎯',
    painPoints: [
      'Client reporting',
      'Content scheduling',
      'Lead management',
      'Proposal generation'
    ],
    quickWins: [
      'Automated reports',
      'Content calendar automation',
      'CRM integration',
      'Template systems'
    ]
  },
  {
    id: 'saas',
    name: 'SaaS Company',
    description: 'Software-as-a-Service companies with recurring revenue',
    icon: '💻',
    painPoints: [
      'User onboarding',
      'Feature adoption',
      'Churn prevention',
      'Support scaling'
    ],
    quickWins: [
      'Onboarding sequences',
      'Usage analytics',
      'Automated support',
      'Feature announcements'
    ]
  },
  {
    id: 'influencer',
    name: 'Content Creator',
    description: 'Influencers and content creators building personal brands',
    icon: '📱',
    painPoints: [
      'Content planning',
      'Cross-platform posting',
      'Engagement management',
      'Brand partnerships'
    ],
    quickWins: [
      'Content automation',
      'Social media scheduling',
      'Engagement bots',
      'Partnership tracking'
    ]
  },
  {
    id: 'other',
    name: 'Other Business',
    description: 'Service businesses or other types not listed above',
    icon: '🏢',
    painPoints: [
      'Process efficiency',
      'Customer communication',
      'Time management',
      'Growth scaling'
    ],
    quickWins: [
      'Workflow automation',
      'Communication tools',
      'Task automation',
      'Growth tracking'
    ]
  }
];

export const GUIDE_CONTENT: DayContent[] = [
  {
    id: 1,
    title: 'AI Opportunity Assessment',
    subtitle: 'Audit your business and identify automation opportunities',
    overview: 'Start your AI automation journey by conducting a comprehensive business audit. We\'ll help you map your current processes, identify time drains, and pinpoint the highest-impact automation opportunities.',
    timeEstimate: '2-3 hours',
    difficulty: 'Beginner',
    sections: [
      {
        title: 'Business Process Audit',
        content: 'Map out your current business processes and identify bottlenecks. Use our worksheet to document time spent on repetitive tasks.',
        checklist: [
          'Document your daily workflow',
          'Identify tasks taking >30 minutes daily',
          'List repetitive customer interactions',
          'Map data flow between systems',
          'Calculate time costs per task'
        ]
      },
      {
        title: 'Quick Wins Identification',
        content: 'Focus on low-effort, high-impact automation opportunities that can be implemented quickly.',
        checklist: [
          'Email auto-responses setup',
          'Social media posting automation',
          'Basic chatbot implementation',
          'Invoice generation automation',
          'Calendar scheduling automation'
        ]
      },
      {
        title: 'ROI Calculation Framework',
        content: 'Learn to calculate the return on investment for each automation opportunity.',
        checklist: [
          'Calculate current time costs',
          'Estimate automation implementation time',
          'Project monthly time savings',
          'Assign monetary value to saved time',
          'Prioritize by ROI and effort'
        ]
      }
    ],
    tools: [
      {
        name: 'Process Street',
        category: 'Process Management',
        description: 'Create and track business processes with AI-powered workflow automation',
        pricing: 'Paid $25+/mo',
        bestFor: ['ecommerce', 'agency', 'saas'],
        diyTime: '2-3 hours',
        doneForYou: true
      },
      {
        name: 'Zapier',
        category: 'Workflow Automation',
        description: 'Connect 5,000+ apps with automated workflows',
        pricing: 'Freemium $20+/mo',
        bestFor: ['ecommerce', 'agency', 'saas', 'influencer'],
        diyTime: '1-2 hours'
      },
      {
        name: 'Toggl Track',
        category: 'Time Tracking',
        description: 'AI-powered time tracking and productivity insights',
        pricing: 'Freemium $10+/mo',
        bestFor: ['agency', 'saas'],
        diyTime: '30 minutes'
      }
    ],
    upsell: {
      title: 'Professional Business Audit',
      description: 'Let our experts conduct a comprehensive audit of your business processes and create a custom automation roadmap.',
      cta: 'Get Your Custom Audit',
      price: '$497'
    }
  },
  {
    id: 2,
    title: 'Content Creation Automation',
    subtitle: 'Scale your content production with AI-powered tools',
    overview: 'Transform your content creation process with AI writing tools, automated content calendars, and smart content distribution. Learn to maintain quality while dramatically increasing output.',
    timeEstimate: '3-4 hours',
    difficulty: 'Beginner',
    sections: [
      {
        title: 'AI Writing Workflows',
        content: 'Set up AI writing assistants to create blog posts, social media content, and marketing copy while maintaining your brand voice.',
        checklist: [
          'Set up AI writing tool accounts',
          'Create brand voice guidelines',
          'Develop content templates',
          'Test different AI prompts',
          'Establish quality review process'
        ]
      },
      {
        title: 'Content Calendar Automation',
        content: 'Automate your content planning and scheduling across multiple platforms.',
        checklist: [
          'Import existing content calendar',
          'Set up automated posting schedules',
          'Create content batch workflows',
          'Implement approval processes',
          'Track content performance'
        ]
      },
      {
        title: 'UGC Collection Systems',
        content: 'Automate user-generated content collection and management.',
        checklist: [
          'Set up automated review requests',
          'Create hashtag tracking systems',
          'Implement content approval workflows',
          'Build UGC galleries',
          'Track engagement metrics'
        ]
      }
    ],
    tools: [
      {
        name: 'Copy.ai',
        category: 'Content Creation',
        description: 'AI writing assistant for marketing copy, blog posts, and social media',
        pricing: 'Freemium $36+/mo',
        bestFor: ['ecommerce', 'agency', 'influencer'],
        diyTime: '1-2 hours'
      },
      {
        name: 'Jasper',
        category: 'Content Creation',
        description: 'Advanced AI writing tool for long-form content and marketing materials',
        pricing: 'Paid $49+/mo',
        bestFor: ['agency', 'saas'],
        diyTime: '2-3 hours'
      },
      {
        name: 'Buffer',
        category: 'Social Media',
        description: 'Social media scheduling and analytics with AI insights',
        pricing: 'Freemium $6+/mo',
        bestFor: ['ecommerce', 'agency', 'influencer'],
        diyTime: '1 hour'
      },
      {
        name: 'Later',
        category: 'Social Media',
        description: 'Visual content calendar and Instagram automation',
        pricing: 'Freemium $18+/mo',
        bestFor: ['ecommerce', 'influencer'],
        diyTime: '1 hour'
      }
    ],
    upsell: {
      title: 'Custom Content Automation Setup',
      description: 'Our team will set up your complete content creation automation system, including AI tools, workflows, and quality control processes.',
      cta: 'Get Content Automation Setup',
      price: '$997'
    }
  },
  {
    id: 3,
    title: 'Social Media Management',
    subtitle: 'Automate your social presence across all platforms',
    overview: 'Master social media automation with cross-platform posting, engagement automation, and AI-powered analytics. Build a consistent brand presence without the manual work.',
    timeEstimate: '2-3 hours',
    difficulty: 'Intermediate',
    sections: [
      {
        title: 'Cross-Platform Posting Automation',
        content: 'Set up automated posting across Instagram, Facebook, Twitter, LinkedIn, and TikTok with platform-specific optimization.',
        checklist: [
          'Connect all social media accounts',
          'Set up posting schedules by platform',
          'Create platform-specific content variations',
          'Implement hashtag optimization',
          'Test posting automation'
        ]
      },
      {
        title: 'Engagement Automation',
        content: 'Automate likes, comments, and responses while maintaining authentic engagement.',
        checklist: [
          'Set up auto-like systems',
          'Create comment templates',
          'Implement DM auto-responses',
          'Build engagement tracking',
          'Monitor automation performance'
        ]
      },
      {
        title: 'Analytics Dashboards',
        content: 'Create comprehensive social media analytics dashboards for performance tracking.',
        checklist: [
          'Connect analytics tools',
          'Set up automated reports',
          'Create performance benchmarks',
          'Implement alert systems',
          'Schedule weekly reviews'
        ]
      }
    ],
    tools: [
      {
        name: 'Hootsuite',
        category: 'Social Media',
        description: 'Complete social media management platform with AI analytics',
        pricing: 'Paid $49+/mo',
        bestFor: ['ecommerce', 'agency'],
        diyTime: '2-3 hours'
      },
      {
        name: 'Sprout Social',
        category: 'Social Media',
        description: 'Enterprise social media management with advanced automation',
        pricing: 'Paid $249+/mo',
        bestFor: ['agency', 'saas'],
        diyTime: '3-4 hours'
      },
      {
        name: 'ManyChat',
        category: 'Chat Automation',
        description: 'Build chatbots and automated conversations for social media',
        pricing: 'Freemium $15+/mo',
        bestFor: ['ecommerce', 'agency'],
        diyTime: '2-3 hours'
      }
    ],
    upsell: {
      title: 'Done-for-You Social Media Automation',
      description: 'Our team will set up and manage your complete social media automation system, including content creation, posting, and engagement.',
      cta: 'Get Social Media Automation',
      price: '$1,497/month'
    }
  },
  {
    id: 4,
    title: 'Customer Communication',
    subtitle: 'Automate customer service and communication workflows',
    overview: 'Transform your customer communication with automated email sequences, intelligent chatbots, and streamlined support processes. Provide 24/7 customer service without the overhead.',
    timeEstimate: '4-5 hours',
    difficulty: 'Intermediate',
    sections: [
      {
        title: 'Email Automation Sequences',
        content: 'Create sophisticated email automation sequences for onboarding, nurturing, and retention.',
        checklist: [
          'Map customer journey stages',
          'Create email templates',
          'Set up trigger conditions',
          'Implement personalization',
          'Test email sequences'
        ]
      },
      {
        title: 'Chatbot Implementation',
        content: 'Deploy intelligent chatbots to handle common customer inquiries and route complex issues.',
        checklist: [
          'Identify common questions',
          'Create chatbot responses',
          'Set up routing rules',
          'Implement human handoff',
          'Monitor chatbot performance'
        ]
      },
      {
        title: 'Review Collection Systems',
        content: 'Automate review collection and management to build social proof and improve ratings.',
        checklist: [
          'Set up review request triggers',
          'Create review templates',
          'Implement follow-up sequences',
          'Build review monitoring',
          'Create response workflows'
        ]
      }
    ],
    tools: [
      {
        name: 'ActiveCampaign',
        category: 'Email Marketing',
        description: 'Marketing automation with AI-powered personalization',
        pricing: 'Paid $29+/mo',
        bestFor: ['ecommerce', 'agency', 'saas'],
        diyTime: '3-4 hours'
      },
      {
        name: 'Intercom',
        category: 'Customer Support',
        description: 'AI-powered customer service and communication platform',
        pricing: 'Paid $39+/mo',
        bestFor: ['saas', 'ecommerce'],
        diyTime: '2-3 hours'
      },
      {
        name: 'Tidio',
        category: 'Live Chat',
        description: 'AI chatbots and live chat for ecommerce websites',
        pricing: 'Paid $18+/mo',
        bestFor: ['ecommerce', 'agency'],
        diyTime: '1-2 hours'
      },
      {
        name: 'Trustpilot',
        category: 'Review Management',
        description: 'Automated review collection and reputation management',
        pricing: 'Paid $199+/mo',
        bestFor: ['ecommerce', 'agency'],
        diyTime: '1 hour'
      }
    ],
    upsell: {
      title: 'Custom Communication Workflows',
      description: 'We\'ll design and implement your complete customer communication automation system, including email sequences, chatbots, and support workflows.',
      cta: 'Get Communication Automation',
      price: '$1,997'
    }
  },
  {
    id: 5,
    title: 'Sales & Lead Generation',
    subtitle: 'Automate your sales process and lead nurturing',
    overview: 'Optimize your sales funnel with CRM automation, intelligent lead scoring, and automated proposal generation. Convert more prospects while reducing manual sales work.',
    timeEstimate: '3-4 hours',
    difficulty: 'Intermediate',
    sections: [
      {
        title: 'CRM Automation',
        content: 'Set up your CRM with automated lead capture, qualification, and nurturing workflows.',
        checklist: [
          'Import existing leads',
          'Set up lead capture forms',
          'Create qualification criteria',
          'Implement lead scoring',
          'Build nurturing sequences'
        ]
      },
      {
        title: 'Lead Scoring Systems',
        content: 'Implement AI-powered lead scoring to prioritize your highest-value prospects.',
        checklist: [
          'Define scoring criteria',
          'Set up behavior tracking',
          'Create scoring algorithms',
          'Implement alerts',
          'Test scoring accuracy'
        ]
      },
      {
        title: 'Proposal Automation',
        content: 'Automate proposal generation and follow-up to close deals faster.',
        checklist: [
          'Create proposal templates',
          'Set up automated generation',
          'Implement approval workflows',
          'Build follow-up sequences',
          'Track proposal performance'
        ]
      }
    ],
    tools: [
      {
        name: 'Pipedrive',
        category: 'CRM',
        description: 'Sales CRM with AI-powered lead scoring and automation',
        pricing: 'Paid $15+/mo',
        bestFor: ['agency', 'saas'],
        diyTime: '2-3 hours'
      },
      {
        name: 'HubSpot',
        category: 'Marketing Hub',
        description: 'Complete inbound marketing platform with automation',
        pricing: 'Freemium $45+/mo',
        bestFor: ['saas', 'agency'],
        diyTime: '3-4 hours'
      },
      {
        name: 'PandaDoc',
        category: 'Document Automation',
        description: 'Automated proposal and contract generation',
        pricing: 'Paid $19+/mo',
        bestFor: ['agency', 'saas'],
        diyTime: '1-2 hours'
      }
    ],
    upsell: {
      title: 'Sales Automation Consulting',
      description: 'Our sales automation experts will audit your current process and implement a complete sales automation system to increase conversions.',
      cta: 'Get Sales Automation Setup',
      price: '$2,497'
    }
  },
  {
    id: 6,
    title: 'Operations & Admin',
    subtitle: 'Streamline your business operations with automation',
    overview: 'Automate your back-office operations including invoicing, project management, and team coordination. Reduce administrative overhead and improve efficiency.',
    timeEstimate: '2-3 hours',
    difficulty: 'Beginner',
    sections: [
      {
        title: 'Invoice Automation',
        content: 'Set up automated invoicing, payment reminders, and financial tracking.',
        checklist: [
          'Set up automated invoicing',
          'Create payment reminder sequences',
          'Implement expense tracking',
          'Build financial dashboards',
          'Set up tax automation'
        ]
      },
      {
        title: 'Project Management Workflows',
        content: 'Automate project creation, task assignment, and progress tracking.',
        checklist: [
          'Create project templates',
          'Set up task automation',
          'Implement progress tracking',
          'Build team notifications',
          'Create reporting systems'
        ]
      },
      {
        title: 'Team Coordination Systems',
        content: 'Automate team communication, scheduling, and collaboration workflows.',
        checklist: [
          'Set up team chat automation',
          'Create meeting scheduling',
          'Implement file sharing',
          'Build notification systems',
          'Create collaboration workflows'
        ]
      }
    ],
    tools: [
      {
        name: 'QuickBooks',
        category: 'Accounting',
        description: 'Automated invoicing and financial management',
        pricing: 'Paid $30+/mo',
        bestFor: ['ecommerce', 'agency', 'saas'],
        diyTime: '1-2 hours'
      },
      {
        name: 'Asana',
        category: 'Project Management',
        description: 'Work management platform with AI-powered insights',
        pricing: 'Freemium $11+/mo',
        bestFor: ['agency', 'saas'],
        diyTime: '2-3 hours'
      },
      {
        name: 'Slack',
        category: 'Team Communication',
        description: 'Team collaboration with automated workflows',
        pricing: 'Freemium $7+/mo',
        bestFor: ['agency', 'saas'],
        diyTime: '1 hour'
      }
    ],
    upsell: {
      title: 'Complete Operations Overhaul',
      description: 'Our operations experts will audit your current systems and implement a complete operational automation overhaul to streamline your business.',
      cta: 'Get Operations Overhaul',
      price: '$3,497'
    }
  },
  {
    id: 7,
    title: 'Analytics & Next Steps',
    subtitle: 'Measure success and plan your automation future',
    overview: 'Set up comprehensive analytics dashboards to measure your automation ROI and plan your next steps. Learn to optimize and scale your automation efforts.',
    timeEstimate: '2-3 hours',
    difficulty: 'Intermediate',
    sections: [
      {
        title: 'Dashboard Setup',
        content: 'Create comprehensive analytics dashboards to track all your automation metrics in one place.',
        checklist: [
          'Connect all data sources',
          'Create key metric dashboards',
          'Set up automated reports',
          'Implement alert systems',
          'Schedule regular reviews'
        ]
      },
      {
        title: 'ROI Measurement',
        content: 'Calculate and track the return on investment for each automation implementation.',
        checklist: [
          'Calculate baseline metrics',
          'Track time savings',
          'Measure cost reductions',
          'Monitor revenue impact',
          'Create ROI reports'
        ]
      },
      {
        title: 'Optimization Strategies',
        content: 'Learn advanced strategies to optimize and scale your automation efforts.',
        checklist: [
          'Identify optimization opportunities',
          'Plan scaling strategies',
          'Create maintenance schedules',
          'Build team training plans',
          'Set future automation goals'
        ]
      }
    ],
    tools: [
      {
        name: 'Google Analytics 4',
        category: 'Analytics',
        description: 'Advanced web analytics with AI insights',
        pricing: 'Free',
        bestFor: ['ecommerce', 'agency', 'saas', 'influencer'],
        diyTime: '1-2 hours'
      },
      {
        name: 'Mixpanel',
        category: 'Product Analytics',
        description: 'AI-powered product analytics and user behavior tracking',
        pricing: 'Paid $25+/mo',
        bestFor: ['saas', 'ecommerce'],
        diyTime: '2-3 hours'
      },
      {
        name: 'Hotjar',
        category: 'User Experience',
        description: 'Heatmaps and user behavior analytics',
        pricing: 'Freemium $39+/mo',
        bestFor: ['ecommerce', 'saas'],
        diyTime: '1 hour'
      }
    ],
    upsell: {
      title: 'Book Your Custom Automation Strategy Call',
      description: 'Schedule a 60-minute strategy call with our automation experts to create a custom roadmap for your next phase of automation.',
      cta: 'Book Strategy Call',
      price: '$497'
    }
  }
];

export function getDayContent(dayNumber: number): DayContent | null {
  return GUIDE_CONTENT.find(day => day.id === dayNumber) || null;
}

export function getBusinessType(typeId: string): BusinessType | null {
  return BUSINESS_TYPES.find(type => type.id === typeId) || null;
}

export function getToolsForDay(dayNumber: number, businessType?: string) {
  const dayContent = getDayContent(dayNumber);
  if (!dayContent) return [];
  
  if (!businessType) return dayContent.tools;
  
  return dayContent.tools.filter(tool => 
    tool.bestFor.includes(businessType) || tool.bestFor.includes('other')
  );
}

export function getPersonalizedRecommendations(businessType: string, dayNumber: number) {
  const tools = getToolsForDay(dayNumber, businessType);
  const businessInfo = getBusinessType(businessType);
  
  return {
    tools,
    businessInfo,
    personalizedMessage: businessInfo ? 
      `Based on your ${businessInfo.name.toLowerCase()} business, here are the tools that will have the biggest impact:` :
      'Here are the recommended tools for this day:'
  };
}

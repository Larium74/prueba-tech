import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const dynamicContent = [
  {
    id: '1',
    title: 'Descubre la Tecnología del Futuro',
    description: 'Explora las últimas innovaciones en inteligencia artificial y automatización que están transformando el mundo digital.',
    ctaText: 'Aprende Más',
    ctaUrl: 'https://example.com/ai-future',
    imageUrl: 'https://images.unsplash.com/photo-1677442d019cecf9418f51f05b2c7edf?w=400&h=250&fit=crop',
    backgroundColor: '#FF6B6B'
  },
  {
    id: '2',
    title: 'Desarrollo Web Moderno',
    description: 'Domina React, TypeScript y las herramientas de desarrollo más demandadas en la industria tech actual.',
    ctaText: 'Ver Curso',
    ctaUrl: 'https://example.com/web-dev',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop',
    backgroundColor: '#4ECDC4'
  },
  {
    id: '3',
    title: 'Cloud Computing Avanzado',
    description: 'Implementa soluciones escalables en AWS, Google Cloud y Azure para tus proyectos empresariales.',
    ctaText: 'Explorar',
    ctaUrl: 'https://example.com/cloud',
    imageUrl: 'https://images.unsplash.com/photo-1667482747304-19651cf1f0f7?w=400&h=250&fit=crop',
    backgroundColor: '#95E1D3'
  },
  {
    id: '4',
    title: 'Data Science & Analytics',
    description: 'Transforma datos en insights valiosos usando Python, Machine Learning y análisis estadístico avanzado.',
    ctaText: 'Comenzar',
    ctaUrl: 'https://example.com/data-science',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    backgroundColor: '#FFB3BA'
  },
  {
    id: '5',
    title: 'Seguridad Cibernética',
    description: 'Protege tus aplicaciones y datos con las mejores prácticas de seguridad en la era digital.',
    ctaText: 'Asegurar',
    ctaUrl: 'https://example.com/cybersecurity',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop',
    backgroundColor: '#9D84B7'
  },
  {
    id: '6',
    title: 'DevOps & CI/CD',
    description: 'Automatiza tu pipeline de desarrollo con Docker, Kubernetes y herramientas de integración continua.',
    ctaText: 'Automatizar',
    ctaUrl: 'https://example.com/devops',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
    backgroundColor: '#FFD93D'
  },
  {
    id: '7',
    title: 'Mobile Development',
    description: 'Crea apps multiplataforma con React Native, Flutter y las últimas tecnologías móviles.',
    ctaText: 'Desarrollar',
    ctaUrl: 'https://example.com/mobile',
    imageUrl: 'https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=400&h=250&fit=crop',
    backgroundColor: '#A8DADC'
  },
  {
    id: '8',
    title: 'Blockchain & Web3',
    description: 'Aprende sobre blockchain, contratos inteligentes y el futuro descentralizado de internet.',
    ctaText: 'Explorar Web3',
    ctaUrl: 'https://example.com/web3',
    imageUrl: 'https://images.unsplash.com/photo-1639762681057-408e4b62d72d?w=400&h=250&fit=crop',
    backgroundColor: '#E63946'
  },
  {
    id: '9',
    title: 'Machine Learning Aplicado',
    description: 'Implementa modelos de ML en producción usando TensorFlow, PyTorch y scikit-learn.',
    ctaText: 'Aprender ML',
    ctaUrl: 'https://example.com/ml',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=400&h=250&fit=crop',
    backgroundColor: '#06D6A0'
  },
  {
    id: '10',
    title: 'Frontend Performance',
    description: 'Optimiza la velocidad y rendimiento de tus aplicaciones web modernas con Webpack y Vite.',
    ctaText: 'Optimizar',
    ctaUrl: 'https://example.com/performance',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
    backgroundColor: '#118AB2'
  },
  {
    id: '11',
    title: 'API REST Design',
    description: 'Diseña y desarrolla APIs robustas y escalables siguiendo los estándares de la industria.',
    ctaText: 'Diseñar API',
    ctaUrl: 'https://example.com/api-design',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop',
    backgroundColor: '#073B4C'
  },
  {
    id: '12',
    title: 'Testing & QA',
    description: 'Domina pruebas unitarias, integración y e2e para garantizar código de calidad.',
    ctaText: 'Testar',
    ctaUrl: 'https://example.com/testing',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
    backgroundColor: '#F4A261'
  },
  {
    id: '13',
    title: 'GraphQL Mastery',
    description: 'Crea APIs flexibles y eficientes con GraphQL, Apollo y herramientas modernas.',
    ctaText: 'Aprender GraphQL',
    ctaUrl: 'https://example.com/graphql',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop',
    backgroundColor: '#E76F51'
  },
  {
    id: '14',
    title: 'Microservicios Escalables',
    description: 'Arquitectura y desarrollo de microservicios para aplicaciones empresariales modernas.',
    ctaText: 'Escalar',
    ctaUrl: 'https://example.com/microservices',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop',
    backgroundColor: '#2A9D8F'
  },
  {
    id: '15',
    title: 'UX/UI Design Principles',
    description: 'Aprende diseño centrado en el usuario y crea interfaces hermosas e intuitivas.',
    ctaText: 'Diseñar',
    ctaUrl: 'https://example.com/ux-ui',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    backgroundColor: '#FF006E'
  },
  {
    id: '16',
    title: 'Serverless Architecture',
    description: 'Despliega aplicaciones sin gestionar servidores usando AWS Lambda, Firebase y más.',
    ctaText: 'Desplegar',
    ctaUrl: 'https://example.com/serverless',
    imageUrl: 'https://images.unsplash.com/photo-1667482747304-19651cf1f0f7?w=400&h=250&fit=crop',
    backgroundColor: '#8338EC'
  },
  {
    id: '17',
    title: 'Container Orchestration',
    description: 'Domina Docker y Kubernetes para orquestar containers en producción.',
    ctaText: 'Orquestar',
    ctaUrl: 'https://example.com/k8s',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
    backgroundColor: '#3A86FF'
  },
  {
    id: '18',
    title: 'Database Design',
    description: 'Diseña bases de datos eficientes con SQL, NoSQL y soluciones modernas.',
    ctaText: 'Diseñar BD',
    ctaUrl: 'https://example.com/databases',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop',
    backgroundColor: '#FB5607'
  },
  {
    id: '19',
    title: 'AI-Powered Applications',
    description: 'Integra IA en tus aplicaciones usando APIs de OpenAI, Google AI y más.',
    ctaText: 'Integrar IA',
    ctaUrl: 'https://example.com/ai-apps',
    imageUrl: 'https://images.unsplash.com/photo-1677442d019cecf9418f51f05b2c7edf?w=400&h=250&fit=crop',
    backgroundColor: '#FFBE0B'
  },
  {
    id: '20',
    title: 'Community & Networking',
    description: 'Únete a nuestra comunidad de desarrolladores y expande tu red profesional.',
    ctaText: 'Unirse',
    ctaUrl: 'https://example.com/community',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
    backgroundColor: '#12A4D9'
  },
  {
    id: '21',
    title: 'Advanced TypeScript',
    description: 'Domina tipos avanzados, genéricos y patrones de TypeScript para código robusto.',
    ctaText: 'Aprende TS',
    ctaUrl: 'https://example.com/typescript',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop',
    backgroundColor: '#0096FF'
  },
  {
    id: '22',
    title: 'Agile & Scrum Mastery',
    description: 'Implementa metodologías ágiles efectivas en tus equipos de desarrollo.',
    ctaText: 'Agilizar',
    ctaUrl: 'https://example.com/agile',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
    backgroundColor: '#00D084'
  },
  {
    id: '23',
    title: 'Git & Version Control',
    description: 'Domina Git, colaboración en equipo y estrategias de branching avanzadas.',
    ctaText: 'Controlar Versiones',
    ctaUrl: 'https://example.com/git',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop',
    backgroundColor: '#DC2F02'
  },
  {
    id: '24',
    title: 'Microinteractions Design',
    description: 'Crea microinteracciones deliciosas que mejoren la experiencia del usuario.',
    ctaText: 'Diseñar',
    ctaUrl: 'https://example.com/microinteractions',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    backgroundColor: '#E63946'
  },
  {
    id: '25',
    title: 'API Documentation',
    description: 'Documenta tus APIs de forma clara con Swagger, OpenAPI y herramientas modernas.',
    ctaText: 'Documentar',
    ctaUrl: 'https://example.com/api-docs',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop',
    backgroundColor: '#457B9D'
  },
  {
    id: '26',
    title: 'Accessibility First',
    description: 'Desarrolla aplicaciones inclusivas accesibles para todos los usuarios.',
    ctaText: 'Accesibilidad',
    ctaUrl: 'https://example.com/a11y',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    backgroundColor: '#1D3557'
  },
  {
    id: '27',
    title: 'Monitoring & Logging',
    description: 'Implementa monitoreo efectivo y logging centralizado para tus aplicaciones.',
    ctaText: 'Monitorear',
    ctaUrl: 'https://example.com/monitoring',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop',
    backgroundColor: '#F1FAEE'
  },
  {
    id: '28',
    title: 'Error Handling & Recovery',
    description: 'Estrategias robustas para manejo de errores y recuperación en producción.',
    ctaText: 'Manejar Errores',
    ctaUrl: 'https://example.com/error-handling',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop',
    backgroundColor: '#A23B72'
  },
  {
    id: '29',
    title: 'Real-time Applications',
    description: 'Crea aplicaciones en tiempo real con WebSockets, Socket.io y Firebase.',
    ctaText: 'Tiempo Real',
    ctaUrl: 'https://example.com/realtime',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop',
    backgroundColor: '#F18F01'
  },
  {
    id: '30',
    title: 'Career Development',
    description: 'Acelera tu carrera tech con recursos, mentorías y oportunidades profesionales.',
    ctaText: 'Desarrollar Carrera',
    ctaUrl: 'https://example.com/career',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
    backgroundColor: '#06A77D'
  }
];

app.get('/api/banner-content', (req, res) => {
  try {
    const randomIndex = Math.floor(Math.random() * dynamicContent.length);
    const content = dynamicContent[randomIndex];
    
    res.json({
      success: true,
      data: content,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching banner content',
    });
  }
});

app.get('/api/banner-content/all', (req, res) => {
  try {
    res.json({
      success: true,
      data: dynamicContent,
      count: dynamicContent.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching banner content',
    });
  }
});

app.get('/api/banner-content/:id', (req, res) => {
  try {
    const { id } = req.params;
    const content = dynamicContent.find(item => item.id === id);
    
    if (!content) {
      return res.status(404).json({
        success: false,
        error: 'Content not found',
      });
    }
    
    res.json({
      success: true,
      data: content,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching banner content',
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(` Banner API Server running on http://localhost:${PORT}`);
  console.log(` API Documentation:`);
  console.log(`   GET /api/banner-content - Get random banner content`);
  console.log(`   GET /api/banner-content/all - Get all banner content`);
  console.log(`   GET /api/banner-content/:id - Get specific banner content`);
  console.log(`   GET /api/health - Health check`);
});

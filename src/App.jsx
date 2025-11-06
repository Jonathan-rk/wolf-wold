import { useState, useEffect, useRef } from "react";
import { FiArrowRight, FiArrowDown } from "react-icons/fi";
import { FaPenNib, FaBolt, FaDesktop, FaMapMarkerAlt, FaUserClock, FaWhatsapp} from "react-icons/fa";
import { FaArrowUpLong } from "react-icons/fa6";
import { IoRocketSharp } from "react-icons/io5";
import { PiBuildingApartmentFill } from "react-icons/pi";
import { BsDatabaseFillUp } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import "./App.css";

const WolfLandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState("");
  const observerRef = useRef(null);

  // Scroll handler para back to top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer para animações fade-in
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const fadeElements = document.querySelectorAll(".fade-in");
    fadeElements.forEach((element) => {
      observerRef.current.observe(element);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Smooth scroll para links internos
  const handleNavClick = (e, href) => {
    setIsMenuOpen(false);

    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const position =
          target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: position, behavior: "smooth" });
      }
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, message } = formData;
    let whatsappMessage = `*🐺 Novo Contato - Wolf*%0A%0A`;
    whatsappMessage += `*Nome:* ${encodeURIComponent(name)}%0A`;
    whatsappMessage += `*E-mail:* ${encodeURIComponent(email)}%0A`;
    whatsappMessage += `%0A*Mensagem:*%0A${encodeURIComponent(message)}`;

    const phoneNumber = "5547999790495";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    window.open(whatsappURL, "_blank");

    setSubmitStatus("sent");

    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setSubmitStatus("");
    }, 2000);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <header id="header">
        <nav>
          <div className="logo">
            <img src="public/Logo.svg" alt="" />
          </div>
          <ul
            className={`nav-links ${isMenuOpen ? "active" : ""}`}
            id="navLinks"
          >
            <li>
              <a href="#inicio" onClick={(e) => handleNavClick(e, "#inicio")}>
                Início
              </a>
            </li>
            <li>
              <a href="#sobre" onClick={(e) => handleNavClick(e, "#sobre")}>
                Sobre
              </a>
            </li>
            <li>
              <a
                href="#servicos"
                onClick={(e) => handleNavClick(e, "#servicos")}
              >
                Serviços
              </a>
            </li>
            <li>
              <a
                href="#ferramentas"
                onClick={(e) => handleNavClick(e, "#ferramentas")}
              >
                Ferramentas
              </a>
            </li>
            <li>
              <a
                href="#projetos"
                onClick={(e) => handleNavClick(e, "#projetos")}
              >
                Projetos
              </a>
            </li>
            <li>
              <a
                href="#contato"
                className="nav-cta"
                onClick={(e) => handleNavClick(e, "#contato")}
              >
                Começar Projeto
              </a>
            </li>
          </ul>
          <div
            className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
            id="menuToggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-content">
          <div className="hero-badge">Sua presença digital começa aqui</div>
          <h1>
            <span className="gradient-text">WOLF</span>
          </h1>
          <p>
            Criamos páginas que expressam a essência da sua marca, com design
            inteligente, performance e identidade que se destacam em qualquer
            cenário digital.
          </p>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">20+</span>
              <span className="hero-stat-label">Projetos Entregues</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">98%</span>
              <span className="hero-stat-label">Satisfação</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">0%</span>
              <span className="hero-stat-label">De sites genéricos</span>
            </div>
          </div>

          <div className="hero-buttons">
            <a
              href="#contato"
              className="btn-primary"
              onClick={(e) => handleNavClick(e, "#contato")}
            >
              Solicitar Orçamento <FiArrowRight />
            </a>
            <a
              href="#projetos"
              className="btn-secondary"
              onClick={(e) => handleNavClick(e, "#projetos")}
            >
              {" "}
              Ver Projetos <FiArrowDown />{" "}
            </a>
          </div>
        </div>
      </section>

      <section className="about fade-in" id="sobre">
        <div className="section-header">
          <span className="section-badge">SOBRE NÓS</span>
          <h2>Sobre a Wolf</h2>
          <p>Transformamos visões em experiências digitais de alto impacto</p>
        </div>
        <div className="about-content">
          <div className="about-text">
            <h3>Quem Somos</h3>
            <p>
              A Wolf é especializada na criação de landing pages e sites
              personalizados que não apenas impressionam visualmente, mas também
              geram resultados concretos para nossos clientes.
            </p>
            <p>
              Com uma equipe de designers e desenvolvedores apaixonados,
              combinamos criatividade, tecnologia e estratégia para entregar
              soluções digitais que elevam marcas e maximizam conversões.
            </p>
            <p>
              Somos certificados em UX Design, desenvolvimento web moderno e
              marketing digital, garantindo que cada projeto seja construído com
              as melhores práticas do mercado.
            </p>
          </div>
          <div className="about-values">
            <div className="value-item">
              <h4>🎯 Missão</h4>
              <p>
                Criar páginas que transformam visitantes em clientes através de
                design excepcional e performance otimizada.
              </p>
            </div>
            <div className="value-item">
              <h4>💎 Valores</h4>
              <p>
                Excelência, inovação, transparência e compromisso com resultados
                mensuráveis para todos os nossos clientes.
              </p>
            </div>
            <div className="value-item">
              <h4>🚀 Visão</h4>
              <p>
                Ser referência em soluções digitais de alta performance para
                negócios que buscam se destacar.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="services fade-in" id="servicos">
        <div className="section-header">
          <span className="section-badge">SERVIÇOS</span>
          <h2>O Que Fazemos</h2>
          <p>
            Soluções digitais completas para transformar sua presença online
          </p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">
              <IoRocketSharp />
            </div>
            <h3>Criação de Landing Pages</h3>
            <p>
              Páginas otimizadas para conversão com design persuasivo e
              copywriting estratégico que transformam visitantes em clientes
              qualificados.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <PiBuildingApartmentFill />
            </div>
            <h3>Sites Institucionais</h3>
            <p>
              Sites completos que transmitem credibilidade profissional e
              fortalecem o posicionamento da sua marca no mercado.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaPenNib />
            </div>
            <h3>Redesign de Sites</h3>
            <p>
              Modernização completa de sites existentes com foco em performance,
              experiência do usuário e resultados mensuráveis.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaBolt />
            </div>
            <h3>Otimização Visual e Performance</h3>
            <p>
              Otimização técnica avançada garantindo carregamento ultra-rápido e
              excelente experiência em todos os dispositivos.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaDesktop />
            </div>
            <h3>Criação de Sites Profissionais</h3>
            <p>
              Desenvolvemos sites modernos, responsivos e otimizados para
              garantir uma presença digital sólida e de alto desempenho para sua
              marca.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <BsDatabaseFillUp />
            </div>
            <h3>Instalação em Provedor</h3>
            <p>
              Realizamos a instalação completa do seu site em qualquer provedor,
              garantindo que ele funcione de forma rápida, segura e estável
              desde o primeiro acesso.
            </p>
          </div>
        </div>
      </section>

      <section className="technologies fade-in" id="ferramentas">
        <div className="section-header">
          <span className="section-badge">FERRAMENTAS</span>
          <h2>Tecnologias que Utilizamos</h2>
          <p>Trabalhamos com as melhores ferramentas do mercado</p>
        </div>
        <div className="tech-grid">
          <div className="tech-card">
            <div className="tech-icon">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                alt="React"
              />
            </div>
            <h4>React</h4>
          </div>

          <div className="tech-card">
            <div className="tech-icon">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                alt="Node.js"
              />
            </div>
            <h4>Node.js</h4>
          </div>

          <div className="tech-card">
            <div className="tech-icon">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg"
                alt="MariaDB"
              />
            </div>
            <h4>MariaDB</h4>
          </div>

          <div className="tech-card">
            <div className="tech-icon">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
                alt="Figma"
              />
            </div>
            <h4>Figma</h4>
          </div>

          <div className="tech-card">
            <div className="tech-icon">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
                alt="CSS3"
              />
            </div>
            <h4>CSS3</h4>
          </div>

          <div className="tech-card">
            <div className="tech-icon">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg"
                alt="WordPress"
              />
            </div>
            <h4>WordPress</h4>
          </div>
        </div>
      </section>

      <section className="projects fade-in" id="projetos">
        <div className="section-header">
          <span className="section-badge">PORTFÓLIO</span>
          <h2>Projetos em Destaque</h2>
          <p>Conheça alguns dos trabalhos que desenvolvemos</p>
        </div>
        <div className="projects-grid">
          <div className="project-card">
            <div className="project-image">
              <img src="public/costura.png" alt="" />
            </div>
            <div className="project-info">
              <span className="project-category">Landing Page</span>
              <h3>Curso de Costureira</h3>
              <p className="project-client">
                <strong>Cliente:</strong> Escola de Costura Online
              </p>
              <p>
                <strong>Desafio:</strong> Criar uma landing page envolvente que
                atraísse novos alunos, apresentando o curso de costura de forma
                clara e mostrando benefícios.
              </p>
              <a
                href="https://landing-page-model2.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn-project">Ver Projeto</button>
              </a>
            </div>
          </div>

          <div className="project-card">
            <div className="project-image">
              <img src="public/barbearia.png" alt="" />
            </div>
            <div className="project-info">
              <span className="project-category">Redesign</span>
              <h3>Curso de Barbearia</h3>
              <p className="project-client">
                <strong>Cliente:</strong> Escola de Barbearia
              </p>
              <p>
                <strong>Desafio:</strong> Redesign completo da landing page para
                destacar a qualidade do curso, reforçar a identidade da escola e
                aumentar o número de inscrições.
              </p>
              <a
                href="https://baberariapro.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn-project">Ver Projeto</button>
              </a>
            </div>
          </div>

          <div className="project-card">
            <div className="project-image">
              <img src="public/devforge.png" alt="" />
            </div>
            <div className="project-info">
              <span className="project-category">Redsigner</span>
              <h3>DevForge</h3>
              <p className="project-client">
                <strong>Cliente:</strong> Plataforma de Programação
              </p>
              <p>
                <strong>Desafio:</strong> Redesign da página de captura para o
                curso de programação, garantindo maior conversão de visitantes e
                com layout moderno.
              </p>
              <a
                href="https://devforge-nine.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn-project">Ver Projeto</button>
              </a>
            </div>
          </div>

          <div className="project-card">
            <div className="project-image">
              <img src="public/solidaconstrucao.png" alt="" />
            </div>
            <div className="project-info">
              <span className="project-category">Site Institucional</span>
              <h3>Solida Construção</h3>
              <p className="project-client">
                <strong>Cliente:</strong> Empresa de Construção
              </p>
              <p>
                <strong>Desafio:</strong> Criar uma página moderna e atrativa
                que apresentasse os serviços, destaca projetos realizados e
                convertesse visitantes em clientes.
              </p>
              <a
                href="https://solidaconstrucao.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn-project">Ver Projeto</button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="contact fade-in" id="contato">
        <div className="section-header">
          <span className="section-badge">CONTATO</span>
          <h2>Vamos Conversar?</h2>
          <p>
            Entre em contato e descubra como podemos transformar sua presença
            digital
          </p>
        </div>
        <div className="contact-grid">
          <div className="contact-info-card">
            <h3>Fale Conosco</h3>
            <div className="contact-item">
              <div className="contact-item-icon">
                <IoLogoWhatsapp />
              </div>
              <div className="contact-item-info">
                <h4>WhatsApp</h4>
                <p>Resposta em até 30 minutos</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="contact-item-info">
                <h4>Localização</h4>
                <p>Joinville, Santa Catarina - Brasil</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">
                <FaUserClock />
              </div>
              <div className="contact-item-info">
                <h4>Horário de Atendimento</h4>
                <p>Segunda a Sexta: 9h às 18h</p>
              </div>
            </div>
          </div>

          <div className="contact-form-card">
            <div id="contactForm">
              <div className="form-group">
                <label htmlFor="name">Nome Completo *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Mensagem *</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Conte-nos sobre seu projeto..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button
                type="button"
                className={`btn-submit ${
                  submitStatus === "sent" ? "sent" : ""
                }`}
                style={
                  submitStatus === "sent"
                    ? {
                        background: "linear-gradient(135deg, #10b981, #059669)",
                      }
                    : {}
                }
                onClick={handleSubmit}
              >
                {submitStatus === "sent"
                  ? "✓ Redirecionando para WhatsApp..."
                  : "Enviar Mensagem via WhatsApp"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h4>WOLF</h4>
            <p>
              Criando experiências digitais que convertem e encantam desde 2020.
              Transformamos sua visão em realidade digital.
            </p>
          </div>
          <div className="footer-section">
            <h4>Serviços</h4>
            <a href="#servicos" onClick={(e) => handleNavClick(e, "#servicos")}>
              Landing Pages
            </a>
            <a href="#servicos" onClick={(e) => handleNavClick(e, "#servicos")}>
              Sites Institucionais
            </a>
            <a href="#servicos" onClick={(e) => handleNavClick(e, "#servicos")}>
              Redesign de Sites
            </a>
            <a href="#servicos" onClick={(e) => handleNavClick(e, "#servicos")}>
              Instalação em Provedor
            </a>
          </div>
          <div className="footer-section">
            <h4>Empresa</h4>
            <a href="#sobre" onClick={(e) => handleNavClick(e, "#sobre")}>
              Sobre Nós
            </a>
            <a
              href="#ferramentas"
              onClick={(e) => handleNavClick(e, "#ferramentas")}
            >
              Ferramentas
            </a>
            <a href="#projetos" onClick={(e) => handleNavClick(e, "#projetos")}>
              Portfólio
            </a>
            <a href="#contato" onClick={(e) => handleNavClick(e, "#contato")}>
              Contato
            </a>
          </div>
          <div className="footer-section">
            <h4>Contato</h4>
            <p>(47) 9979-0495</p>
            <p>Joinville, SC - Brasil</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Wolf. Todos os direitos reservados.</p>
        </div>
      </footer>

      <a
        href="https://wa.me/5547999790495?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento"
        className="whatsapp-btn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp />
        <span className="tooltip">Fale conosco no WhatsApp</span>
      </a>

      <div
        className={`back-to-top ${showBackToTop ? "visible" : ""}`}
        id="backToTop"
        onClick={scrollToTop}
      >
        <FaArrowUpLong />
      </div>
    </>
  );
};

export default WolfLandingPage;

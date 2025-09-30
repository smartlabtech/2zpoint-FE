import React, {useEffect, useState, useRef} from "react"
import {useNavigate} from "react-router-dom"
import {
  Container,
  Text,
  Title,
  Button,
  Group,
  Stack,
  Box,
  Grid,
  Card,
  Badge,
  List,
  Accordion,
  Anchor,
  Avatar,
  Rating,
  Alert,
  Affix,
  Transition,
  rem,
  useMantineTheme,
  useMatches
} from "@mantine/core"
import {useWindowScroll, useMediaQuery} from "@mantine/hooks"
import {
  MdCheck,
  MdWarning,
  MdArrowForward,
  MdAccessTime,
  MdGroups,
  MdTrendingUp,
  MdRocket,
  MdSchool,
  MdAutoAwesome,
  MdShowChart
} from "react-icons/md"
import SiteMetaTags from "../../../components/SEO/SiteMetaTags"
import PageSEO from "../../../components/SEO/PageSEO"

const Landing1 = () => {
  const navigate = useNavigate()
  const theme = useMantineTheme()
  const [scroll, scrollTo] = useWindowScroll()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeFaq, setActiveFaq] = useState(null)
  const [spotsLeft, setSpotsLeft] = useState(12)
  const [countdown, setCountdown] = useState({
    days: 5,
    hours: 14,
    minutes: 32
  })

  // Responsive breakpoints
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isSmallMobile = useMediaQuery("(max-width: 480px)")
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)")

  // Countdown timer effect
  useEffect(() => {
    // Get or set the countdown end time
    let endTime = localStorage.getItem("countdownEndTime")

    if (!endTime || new Date(endTime) < new Date()) {
      // Set countdown for 5 days from now
      endTime = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
      localStorage.setItem("countdownEndTime", endTime)

      // Reset spots
      localStorage.setItem("spotsLeft", "12")
    }

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = new Date(endTime).getTime() - now

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))

        setCountdown({days, hours, minutes})

        // Update spots from localStorage
        const spots = localStorage.getItem("spotsLeft") || "12"
        setSpotsLeft(parseInt(spots))
      } else {
        // Reset countdown if expired
        localStorage.removeItem("countdownEndTime")
        localStorage.removeItem("spotsLeft")
      }
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 60000) // Update every minute

    // Occasionally reduce spots
    const spotsTimer = setInterval(() => {
      let spots = parseInt(localStorage.getItem("spotsLeft") || "12")
      if (spots > 3 && Math.random() < 0.3) {
        spots--
        localStorage.setItem("spotsLeft", spots.toString())
        setSpotsLeft(spots)
      }
    }, 300000) // Every 5 minutes

    return () => {
      clearInterval(timer)
      clearInterval(spotsTimer)
    }
  }, [])

  const styles = {
    heroBackground: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "100vh",
      background:
        "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #dbeafe 100%)",
      zIndex: -1,
      overflow: "hidden"
    },
    patternOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "100%",
      opacity: 0.03,
      backgroundImage:
        "repeating-linear-gradient(45deg, #1e40af 0, #1e40af 1px, transparent 1px, transparent 15px), repeating-linear-gradient(-45deg, #1e40af 0, #1e40af 1px, transparent 1px, transparent 15px)"
    },
    floatingShape: {
      position: "absolute",
      borderRadius: "50%",
      background:
        "linear-gradient(135deg, rgba(30, 64, 175, 0.1), rgba(5, 150, 105, 0.1))",
      animation: "float 20s ease-in-out infinite",
      pointerEvents: "none"
    },
    logo: {
      fontSize: "24px",
      fontWeight: 700,
      color: "#1e40af"
    },
    logoWrapper: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
      transition: "transform 0.3s ease"
    },
    logoSquare: {
      width: "32px",
      height: "32px",
      background: "linear-gradient(135deg, #1e40af, #059669)",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    trustBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      background: "white",
      border: "1px solid #e5e7eb",
      padding: "6px 14px",
      borderRadius: "20px",
      marginBottom: "20px",
      fontSize: "13px",
      fontWeight: 600,
      color: "#4b5563",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)"
    },
    heroTitle: {
      fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: "-0.02em"
    },
    statItem: {
      display: "flex",
      flexDirection: "column",
      position: "relative"
    },
    statNumber: {
      fontSize: "2rem",
      fontWeight: 700,
      color: "#1e40af",
      lineHeight: 1,
      marginBottom: "4px"
    },
    statLabel: {
      fontSize: "0.875rem",
      color: "#6b7280",
      fontWeight: 500
    },
    problemSection: {
      background: "#fef2f2",
      border: "1px solid #fecaca",
      borderRadius: "12px",
      padding: "40px",
      margin: "60px 0",
      position: "relative",
      overflow: "hidden"
    },
    warningIcon: {
      width: "24px",
      height: "24px",
      background: "#dc2626",
      color: "white",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold"
    },
    featureIcon: {
      width: "48px",
      height: "48px",
      background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px"
    },
    testimonialCard: {
      background: "white",
      borderRadius: "12px",
      padding: "40px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
      transition: "transform 0.3s ease",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 15px 40px rgba(0, 0, 0, 0.1)"
      }
    },
    countdownItem: {
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      borderRadius: "12px",
      padding: "20px 24px",
      minWidth: "100px",
      transition: "transform 0.3s ease",
      "&:hover": {
        transform: "scale(1.05)",
        background: "rgba(255, 255, 255, 0.15)"
      }
    }
  }

  // Add CSS animations and prevent horizontal scroll
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      html, body {
        overflow-x: hidden !important;
        max-width: 100% !important;
      }
      @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        33% { transform: translateY(-30px) rotate(120deg); }
        66% { transform: translateY(20px) rotate(240deg); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes slideIn {
        from {
          transform: translateX(-100%);
        }
        to {
          transform: translateX(0);
        }
      }
      .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
      }
      .animate-on-scroll.visible {
        opacity: 1;
        transform: translateY(0);
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  // Scroll animations observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    }, observerOptions)

    // Observe all elements with animate-on-scroll class
    setTimeout(() => {
      document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        observer.observe(el)
      })
    }, 100)

    return () => observer.disconnect()
  }, [])

  const faqData = [
    {
      question: 'What exactly is included in the "Free Round"?',
      answer:
        "The Free Round is a 7-day trial where you get full access to 3 live sessions, our community platform, and basic templates. No credit card required. After 7 days, you can continue with a paid membership or leave with no obligations."
    },
    {
      question: "How much time do I need to commit weekly?",
      answer:
        "Most members invest 5-7 hours per week, including one 90-minute live session. Sessions are recorded if you can't attend, and all happen after 7 PM Cairo time or on weekends."
    },
    {
      question: "What are the paid membership options after the trial?",
      answer:
        "After your free trial, you can join our Growth Plan at 2,499 EGP/month (includes all sessions, community access, and monthly mentorship) or our VIP Accelerator at 7,999 EGP/month (adds weekly 1-on-1 coaching and done-for-you services). Both have a 30-day money-back guarantee."
    },
    {
      question: "Is this suitable if I don't have a business idea yet?",
      answer:
        "Absolutely! 73% of our members start without a clear idea. Week 1-2 focuses on idea discovery and validation, helping you identify profitable opportunities based on your skills and market demand."
    },
    {
      question: "What happens after the 90-day program?",
      answer:
        "You'll have lifetime access to our alumni network, continued education resources, and quarterly mastermind events. Many members continue with monthly mentorship. By day 90, you should have a profitable, systemized business."
    }
  ]

  const testimonials = [
    {
      name: "Ahmed Hassan",
      title: "Banking Executive & Financial Consultant",
      text: "After 15 years in banking, I thought it was too late to start something new. 2zpoint helped me launch my financial consulting practice in just 4 months. I'm now earning an extra 15,000 EGP monthly while still employed full-time.",
      initials: "AH"
    },
    {
      name: "Sara Mohamed",
      title: "Marketing Manager at Vodafone",
      text: "As a marketing manager with 2 kids, time was my biggest concern. The program's flexibility allowed me to build my social media agency at my own pace. Hit 5 clients in month 3!",
      initials: "SM"
    },
    {
      name: "Karim Abdel-Rahman",
      title: "IT Director at Telecom Egypt",
      text: "The accountability system kept me on track. Having peers who understand the corporate-to-entrepreneur journey made this possible. Revenue: 0 to 35k EGP in 4 months.",
      initials: "KA"
    }
  ]

  // SEO data for the landing page
  const seoData = {
    title: "Transform Your Expertise Into a Thriving Side Business",
    description:
      "Join 500+ professionals in Egypt building successful side businesses. Live masterclasses, expert mentorship, and a supportive community for entrepreneurs aged 28-50.",
    keywords:
      "side business Egypt, entrepreneurship Egypt, professional development, career transition, business coaching, online business, side hustle",
    type: "website",
    image: "/og-image-2zpoint.jpg"
  }

  return (
    <Box style={{overflow: "hidden", maxWidth: "100%"}}>
      {/* SEO Meta Tags */}
      <SiteMetaTags
        title="Transform Your Expertise Into a Thriving Side Business"
        description="Join 500+ professionals in Egypt building successful side businesses. Live masterclasses, expert mentorship, and a supportive community for entrepreneurs aged 28-50."
        keywords="side business Egypt, entrepreneurship Egypt, professional development, career transition, business coaching, online business, side hustle"
      />
      <PageSEO {...seoData} url="/" />

      {/* Background */}
      <Box style={{...styles.heroBackground, overflow: "hidden"}}>
        <Box style={styles.patternOverlay} />
        {!isMobile && (
          <>
            <Box
              style={{
                ...styles.floatingShape,
                width: "300px",
                height: "300px",
                top: "10%",
                right: "-150px",
                opacity: 0.5
              }}
            />
            <Box
              style={{
                ...styles.floatingShape,
                width: "200px",
                height: "200px",
                bottom: "10%",
                left: "-100px",
                opacity: 0.5,
                animationDelay: "5s"
              }}
            />
          </>
        )}
      </Box>

      {/* Header */}
      <Box
        component="header"
        style={{
          background:
            scroll.y > 50
              ? "rgba(255, 255, 255, 0.95)"
              : "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          padding: scroll.y > 50 ? "15px 0" : "20px 0",
          position: "fixed",
          width: "100%",
          top: 0,
          zIndex: 1000,
          boxShadow:
            scroll.y > 50
              ? "0 4px 6px rgba(0, 0, 0, 0.1)"
              : "0 1px 3px rgba(0, 0, 0, 0.05)",
          transition: "all 0.3s ease"
        }}
      >
        <Container size="xl" px="20px">
          <Group justify="space-between">
            <Box
              style={styles.logoWrapper}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"
              }}
            >
              <Box style={styles.logoSquare} />
              <Text style={styles.logo}>2zpoint</Text>
            </Box>

            <Group gap={40} visibleFrom="md">
              <Anchor href="#features" c="gray.6" fw={500}>
                Features
              </Anchor>
              <Anchor href="#community" c="gray.6" fw={500}>
                Community
              </Anchor>
              <Anchor href="#pricing" c="gray.6" fw={500}>
                Pricing
              </Anchor>
              <Anchor href="#testimonials" c="gray.6" fw={500}>
                Success Stories
              </Anchor>
            </Group>

            <Button
              size="md"
              style={{
                background: "#1e40af",
                color: "white"
              }}
              onClick={() =>
                document
                  .getElementById("signup")
                  ?.scrollIntoView({behavior: "smooth"})
              }
            >
              Join Free Round
            </Button>
          </Group>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box
        component="section"
        style={{
          padding: isMobile ? "100px 0 60px" : "120px 0 80px",
          position: "relative",
          minHeight: isMobile ? "auto" : "90vh",
          display: "flex",
          alignItems: "center"
        }}
      >
        <Container size="xl" px={isMobile ? "16px" : "20px"}>
          <Grid gutter={isMobile ? 40 : 60} align="center">
            <Grid.Col span={{base: 12, md: 6}}>
              <Box
                style={{
                  ...styles.trustBadge,
                  animation: "fadeInUp 0.8s ease 0.2s both"
                }}
              >
                <span
                  style={{
                    color: "#059669",
                    animation: "pulse 2s infinite",
                    marginRight: "8px"
                  }}
                >
                  ✔
                </span>
                <span style={{color: "#111827"}}>
                  Trusted by 500+ Entrepreneurs in Egypt
                </span>
              </Box>

              <h1
                style={{
                  fontSize: isSmallMobile
                    ? "1.75rem"
                    : isMobile
                    ? "2rem"
                    : "3rem",
                  lineHeight: isMobile ? 1.2 : 1.1,
                  fontWeight: 800,
                  color: "#111827",
                  animation: "fadeInUp 0.8s ease 0.3s both",
                  marginBottom: "20px"
                }}
              >
                Transform Your Expertise Into a{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #1e40af, #059669)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}
                >
                  Thriving Side Business
                </span>
              </h1>

              <Text
                size={isMobile ? "md" : "xl"}
                c="gray.6"
                mb={30}
                style={{
                  fontSize: isSmallMobile
                    ? "1rem"
                    : isMobile
                    ? "1.1rem"
                    : "1.25rem",
                  lineHeight: 1.6,
                  animation: "fadeInUp 0.8s ease 0.4s both"
                }}
              >
                Join live masterclasses with industry experts and build your
                business alongside ambitious professionals who understand the
                journey from employee to entrepreneur.
              </Text>

              <Group
                gap={16}
                mt={32}
                style={{
                  animation: "fadeInUp 0.8s ease 0.5s both",
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row"
                }}
              >
                <Button
                  size="lg"
                  style={{
                    background: "#1e40af",
                    padding: isMobile ? "14px 32px" : "14px 32px",
                    fontSize: "16px",
                    fontWeight: 600,
                    width: isMobile ? "100%" : "auto",
                    transition: "all 0.3s ease",
                    position: "relative",
                    overflow: "hidden"
                  }}
                  onClick={() =>
                    document
                      .getElementById("learn-more")
                      ?.scrollIntoView({behavior: "smooth"})
                  }
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#1e3a8a"
                    e.currentTarget.style.transform = "translateY(-1px)"
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(30, 64, 175, 0.2)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#1e40af"
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "none"
                  }}
                >
                  Join Our Next Free Round
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  style={{
                    color: "#1e40af",
                    borderColor: "#1e40af",
                    borderWidth: "2px",
                    padding: isMobile ? "14px 32px" : "14px 32px",
                    fontSize: "16px",
                    fontWeight: 600,
                    width: isMobile ? "100%" : "auto",
                    transition: "all 0.3s ease",
                    background: "white"
                  }}
                  onClick={() =>
                    document
                      .getElementById("demo")
                      ?.scrollIntoView({behavior: "smooth"})
                  }
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#1e40af"
                    e.currentTarget.style.color = "white"
                    e.currentTarget.style.transform = "translateY(-1px)"
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(30, 64, 175, 0.2)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "white"
                    e.currentTarget.style.color = "#1e40af"
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "none"
                  }}
                >
                  Watch Success Stories
                </Button>
              </Group>

              <Group
                gap={isMobile ? 20 : 40}
                justify={isMobile ? "space-between" : "flex-start"}
                style={{
                  paddingTop: isMobile ? "30px" : "40px",
                  marginTop: isMobile ? "30px" : "0",
                  borderTop: "1px solid #e5e7eb",
                  animation: "fadeInUp 0.8s ease 0.6s both"
                }}
              >
                <Box
                  style={{
                    flex: isMobile ? 1 : "initial",
                    textAlign: isMobile ? "center" : "left",
                    position: "relative"
                  }}
                >
                  <Text
                    style={{
                      fontSize: isMobile ? "1.5rem" : "2rem",
                      fontWeight: 800,
                      color: "#1e40af"
                    }}
                  >
                    500+
                  </Text>
                  <Text
                    style={{
                      fontSize: isMobile ? "0.75rem" : "0.875rem",
                      color: "#6b7280",
                      marginTop: "4px"
                    }}
                  >
                    Active Members
                  </Text>
                </Box>
                <Box
                  style={{
                    flex: isMobile ? 1 : "initial",
                    textAlign: isMobile ? "center" : "left",
                    position: "relative",
                    paddingLeft: !isMobile ? "40px" : 0,
                    borderLeft: !isMobile ? "2px solid #e5e7eb" : "none"
                  }}
                >
                  <Text
                    style={{
                      fontSize: isMobile ? "1.5rem" : "2rem",
                      fontWeight: 800,
                      color: "#1e40af"
                    }}
                  >
                    50+
                  </Text>
                  <Text
                    style={{
                      fontSize: isMobile ? "0.75rem" : "0.875rem",
                      color: "#6b7280",
                      marginTop: "4px"
                    }}
                  >
                    Expert Sessions/Year
                  </Text>
                </Box>
                <Box
                  style={{
                    flex: isMobile ? 1 : "initial",
                    textAlign: isMobile ? "center" : "left",
                    position: "relative",
                    paddingLeft: !isMobile ? "40px" : 0,
                    borderLeft: !isMobile ? "2px solid #e5e7eb" : "none"
                  }}
                >
                  <Text
                    style={{
                      fontSize: isMobile ? "1.5rem" : "2rem",
                      fontWeight: 800,
                      color: "#1e40af"
                    }}
                  >
                    87%
                  </Text>
                  <Text
                    style={{
                      fontSize: isMobile ? "0.75rem" : "0.875rem",
                      color: "#6b7280",
                      marginTop: "4px"
                    }}
                  >
                    Launch Success Rate
                  </Text>
                </Box>
              </Group>
            </Grid.Col>

            <Grid.Col span={{base: 12, md: 6}} visibleFrom="md">
              <Box
                style={{
                  position: "relative",
                  animation: "fadeInUp 0.8s ease 0.8s both"
                }}
              >
                <Box
                  style={{
                    background: "white",
                    borderRadius: "12px",
                    padding: "30px",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                    transform: "perspective(1000px) rotateY(-5deg)",
                    transition: "transform 0.3s ease",
                    position: "relative"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "perspective(1000px) rotateY(0deg)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "perspective(1000px) rotateY(-5deg)"
                  }}
                >
                  <Box
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "20px",
                      background: "#dc2626",
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      animation: "pulse 2s infinite"
                    }}
                  >
                    <Box
                      component="span"
                      style={{
                        width: "8px",
                        height: "8px",
                        background: "white",
                        borderRadius: "50%",
                        animation: "pulse 1s infinite"
                      }}
                    />
                    LIVE SESSION
                  </Box>

                  <Box
                    style={{
                      textAlign: "center",
                      marginBottom: "24px",
                      fontWeight: 700,
                      color: "#111827"
                    }}
                  >
                    What Our Members Achieve
                  </Box>

                  <Box
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "20px"
                    }}
                  >
                    <Box
                      style={{
                        background: "#f9fafb",
                        padding: "20px",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                        transition: "all 0.3s ease",
                        cursor: "pointer"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)"
                        e.currentTarget.style.boxShadow =
                          "0 4px 12px rgba(0, 0, 0, 0.08)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)"
                        e.currentTarget.style.boxShadow = "none"
                      }}
                    >
                      <Text
                        size="xs"
                        c="#6b7280"
                        style={{fontSize: "0.875rem", marginBottom: "8px"}}
                      >
                        Average First Sale
                      </Text>
                      <Text
                        style={{
                          fontSize: "1.75rem",
                          fontWeight: 700,
                          color: "#111827"
                        }}
                      >
                        Week 3
                      </Text>
                      <Text
                        size="xs"
                        c="#059669"
                        fw={600}
                        style={{fontSize: "0.75rem"}}
                      >
                        87% close their first client
                      </Text>
                    </Box>

                    <Box
                      style={{
                        background: "#f9fafb",
                        padding: "20px",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                        transition: "all 0.3s ease",
                        cursor: "pointer"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)"
                        e.currentTarget.style.boxShadow =
                          "0 4px 12px rgba(0, 0, 0, 0.08)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)"
                        e.currentTarget.style.boxShadow = "none"
                      }}
                    >
                      <Text
                        size="xs"
                        c="#6b7280"
                        style={{fontSize: "0.875rem", marginBottom: "8px"}}
                      >
                        Weekly Time Investment
                      </Text>
                      <Text
                        style={{
                          fontSize: "1.75rem",
                          fontWeight: 700,
                          color: "#111827"
                        }}
                      >
                        5-7 hrs
                      </Text>
                      <Text
                        size="xs"
                        c="#059669"
                        fw={600}
                        style={{fontSize: "0.75rem"}}
                      >
                        Fits around your schedule
                      </Text>
                    </Box>

                    <Box
                      style={{
                        background: "#f9fafb",
                        padding: "20px",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                        transition: "all 0.3s ease",
                        cursor: "pointer"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)"
                        e.currentTarget.style.boxShadow =
                          "0 4px 12px rgba(0, 0, 0, 0.08)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)"
                        e.currentTarget.style.boxShadow = "none"
                      }}
                    >
                      <Text
                        size="xs"
                        c="#6b7280"
                        style={{fontSize: "0.875rem", marginBottom: "8px"}}
                      >
                        Community Support
                      </Text>
                      <Text
                        style={{
                          fontSize: "1.75rem",
                          fontWeight: 700,
                          color: "#111827"
                        }}
                      >
                        24/7
                      </Text>
                      <Text
                        size="xs"
                        c="#059669"
                        fw={600}
                        style={{fontSize: "0.75rem"}}
                      >
                        500+ active members
                      </Text>
                    </Box>

                    <Box
                      style={{
                        background: "#f9fafb",
                        padding: "20px",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                        transition: "all 0.3s ease",
                        cursor: "pointer"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)"
                        e.currentTarget.style.boxShadow =
                          "0 4px 12px rgba(0, 0, 0, 0.08)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)"
                        e.currentTarget.style.boxShadow = "none"
                      }}
                    >
                      <Text
                        size="xs"
                        c="#6b7280"
                        style={{fontSize: "0.875rem", marginBottom: "8px"}}
                      >
                        ROI Timeline
                      </Text>
                      <Text
                        style={{
                          fontSize: "1.75rem",
                          fontWeight: 700,
                          color: "#111827"
                        }}
                      >
                        Month 2
                      </Text>
                      <Text
                        size="xs"
                        c="#059669"
                        fw={600}
                        style={{fontSize: "0.75rem"}}
                      >
                        Avg. investment recovered
                      </Text>
                    </Box>
                  </Box>

                  <Box
                    mt="xl"
                    p="md"
                    style={{
                      background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
                      borderRadius: "8px"
                    }}
                  >
                    <Text
                      size="xs"
                      c="#6b7280"
                      mb="xs"
                      style={{fontSize: "0.875rem"}}
                    >
                      Member Success Rate
                    </Text>
                    <Box
                      style={{
                        width: "100%",
                        height: "10px",
                        background: "rgba(255, 255, 255, 0.5)",
                        borderRadius: "5px",
                        overflow: "hidden"
                      }}
                    >
                      <Box
                        style={{
                          height: "100%",
                          background:
                            "linear-gradient(90deg, #1e40af, #059669)",
                          width: "73%",
                          animation: "slideIn 1s ease"
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* Social Proof Bar */}
      <Box
        py={30}
        style={{background: "white", borderBottom: "1px solid #e5e7eb"}}
      >
        <Container size="xl" px="20px">
          <Text
            ta="center"
            size="sm"
            c="gray.6"
            mb="lg"
            tt="uppercase"
            style={{letterSpacing: "1px"}}
          >
            OUR MEMBERS WORK AT
          </Text>
          <Group justify="center" gap={50}>
            {["Vodafone", "CIB Bank", "Orange", "PwC", "Orascom"].map(
              (company) => (
                <Text
                  key={company}
                  fw={700}
                  size="xl"
                  c="gray.6"
                  style={{opacity: 0.6}}
                >
                  {company}
                </Text>
              )
            )}
          </Group>
        </Container>
      </Box>

      {/* Problem Section */}
      <Container
        size="xl"
        px={isMobile ? "16px" : "20px"}
        my={isMobile ? 40 : 60}
      >
        <Box
          style={{
            ...styles.problemSection,
            padding: isMobile ? "30px 20px" : styles.problemSection.padding,
            margin: isMobile ? "40px 0" : styles.problemSection.margin
          }}
        >
          <Group
            mb="lg"
            align={isMobile ? "flex-start" : "center"}
            wrap={isMobile ? "wrap" : "nowrap"}
          >
            <Box style={styles.warningIcon}>!</Box>
            <Title order={3} c="red.7" size={isMobile ? "1.25rem" : "1.5rem"}>
              The Reality of Building a Side Business After 30
            </Title>
          </Group>

          <Stack gap="md">
            {[
              "You have valuable expertise but struggle to package it into a profitable business model",
              "Limited time between your career and family responsibilities makes progress feel impossible",
              "Overwhelmed by conflicting advice from YouTube gurus who've never walked in your shoes",
              "Fear of jeopardizing your stable income while pursuing entrepreneurial ambitions",
              "Lack of a professional network that understands both corporate life and entrepreneurship"
            ].map((problem, index) => (
              <Group key={index} align="flex-start">
                <Text c="red.6" fw="bold">
                  →
                </Text>
                <Text c="gray.6" style={{flex: 1, lineHeight: 1.6}}>
                  {problem}
                </Text>
              </Group>
            ))}
          </Stack>

          <Alert
            mt="xl"
            color="red"
            variant="light"
            styles={{
              root: {
                background: "rgba(220, 38, 38, 0.05)",
                borderLeft: "4px solid #dc2626"
              }
            }}
          >
            <Text fw={600}>The cost of inaction is real:</Text> Every month you
            delay is another month of potential income lost, while watching
            younger competitors with less experience capture your market. Our
            members report an average of 12 months wasted on trial-and-error
            before finding us.
          </Alert>
        </Box>
      </Container>

      {/* Features Section */}
      <Box id="features" py={isMobile ? 60 : 80} style={{background: "white"}}>
        <Container size="xl" px={isMobile ? "16px" : "20px"}>
          <Box ta="center" mb={isMobile ? 40 : 60}>
            <Title
              order={2}
              size={isSmallMobile ? rem(24) : isMobile ? rem(28) : rem(40)}
              fw={800}
              mb={16}
            >
              A Learning System Designed for Busy Professionals
            </Title>
            <Text size={isMobile ? "md" : "lg"} c="gray.6">
              We understand you can't quit your job to chase a dream. Our
              program fits into your life, not the other way around.
            </Text>
          </Box>

          <Grid gutter={isMobile ? 20 : 30}>
            {[
              {
                icon: "📊",
                title: "Strategic Planning Sessions",
                desc: "Weekly 90-minute masterclasses on market validation, pricing strategies, and scaling—scheduled after work hours."
              },
              {
                icon: "🎯",
                title: "Accountability Partners",
                desc: "Get matched with peers at your stage. Share wins, solve challenges, and stay motivated through structured check-ins."
              },
              {
                icon: "💼",
                title: "Professional Network",
                desc: "Connect with 500+ members who balance careers with side businesses. Find partners, mentors, and your first customers."
              },
              {
                icon: "🤖",
                title: "AI-Powered Tools",
                desc: "Leverage cutting-edge AI for content creation, market research, and automation—multiply your limited time."
              },
              {
                icon: "📈",
                title: "Proven Frameworks",
                desc: "Skip the guesswork with battle-tested templates for everything from client proposals to social media campaigns."
              },
              {
                icon: "🎓",
                title: "Expert Mentorship",
                desc: "Learn from successful entrepreneurs who built 6-figure businesses while maintaining their careers."
              }
            ].map((feature, index) => (
              <Grid.Col key={index} span={{base: 12, sm: 6, md: 4}}>
                <Card
                  p="xl"
                  radius="lg"
                  style={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    transition: "all 0.3s ease",
                    height: "100%",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)"
                    e.currentTarget.style.boxShadow =
                      "0 10px 30px rgba(0, 0, 0, 0.1)"
                    e.currentTarget.style.borderColor = "#1e40af"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "none"
                    e.currentTarget.style.borderColor = "#e5e7eb"
                  }}
                >
                  <Box style={styles.featureIcon} mb="md">
                    <Text size="xl">{feature.icon}</Text>
                  </Box>
                  <Title order={4} mb="xs">
                    {feature.title}
                  </Title>
                  <Text c="gray.6" style={{lineHeight: 1.6}}>
                    {feature.desc}
                  </Text>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box
        id="testimonials"
        py={isMobile ? 60 : 80}
        style={{background: "#f9fafb"}}
      >
        <Container size="xl" px={isMobile ? "16px" : "20px"}>
          <Box ta="center" mb={isMobile ? 40 : 60}>
            <Title
              order={2}
              size={isSmallMobile ? rem(24) : isMobile ? rem(28) : rem(40)}
              fw={800}
            >
              Success Stories from Professionals Like You
            </Title>
          </Box>

          <Grid gutter={isMobile ? 20 : 30}>
            {testimonials.map((testimonial, index) => (
              <Grid.Col key={index} span={{base: 12, md: 4}}>
                <Box
                  className="animate-on-scroll"
                  style={{
                    background: "white",
                    borderRadius: "12px",
                    padding: isMobile ? "30px 24px" : "40px",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                    height: "100%",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = "translateY(-5px)"
                      e.currentTarget.style.boxShadow =
                        "0 15px 40px rgba(0, 0, 0, 0.1)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = "translateY(0)"
                      e.currentTarget.style.boxShadow =
                        "0 10px 30px rgba(0, 0, 0, 0.05)"
                    }
                  }}
                >
                  <div
                    style={{
                      color: "#fbbf24",
                      fontSize: "1.25rem",
                      marginBottom: "16px"
                    }}
                  >
                    ★★★★★
                  </div>
                  <p
                    style={{
                      color: "#111827",
                      fontSize: isMobile ? "1rem" : "1.1rem",
                      lineHeight: 1.6,
                      marginBottom: "24px",
                      fontStyle: "italic"
                    }}
                  >
                    "{testimonial.text}"
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px"
                    }}
                  >
                    <div
                      style={{
                        width: isMobile ? "48px" : "56px",
                        height: isMobile ? "48px" : "56px",
                        background: "linear-gradient(135deg, #1e40af, #059669)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: isMobile ? "18px" : "20px"
                      }}
                    >
                      {testimonial.initials}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column"
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 700,
                          color: "#111827"
                        }}
                      >
                        {testimonial.name}
                      </div>
                      <div
                        style={{
                          color: "#6b7280",
                          fontSize: "0.875rem"
                        }}
                      >
                        {testimonial.title}
                      </div>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          color: "#059669",
                          fontSize: "0.75rem",
                          marginTop: "4px",
                          fontWeight: 600
                        }}
                      >
                        ✓ Verified Member Since 2024
                      </div>
                    </div>
                  </div>
                </Box>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box py={isMobile ? 60 : 80} style={{background: "white"}}>
        <Container size="md" px={isMobile ? "16px" : "20px"}>
          <Box ta="center" mb={isMobile ? 40 : 60}>
            <Title
              order={2}
              size={isSmallMobile ? rem(24) : isMobile ? rem(28) : rem(40)}
              fw={800}
            >
              Frequently Asked Questions
            </Title>
          </Box>

          <Accordion value={activeFaq} onChange={setActiveFaq}>
            {faqData.map((faq, index) => (
              <Accordion.Item key={index} value={`item-${index}`}>
                <Accordion.Control>
                  <Text fw={600}>{faq.question}</Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <Text c="gray.6">{faq.answer}</Text>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Container>
      </Box>

      {/* Countdown Section */}
      <Container
        size="xl"
        px={isMobile ? "16px" : "20px"}
        my={isMobile ? 40 : 60}
      >
        <Box
          p={isMobile ? "40px 20px" : "60px"}
          style={{
            background: "linear-gradient(135deg, #1e40af, #1e3a8a)",
            color: "white",
            borderRadius: isMobile ? "0" : "16px",
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
            margin: isMobile ? "0 -16px" : "0"
          }}
        >
          <Title
            order={2}
            mb={16}
            c="white"
            size={isSmallMobile ? rem(24) : isMobile ? rem(28) : rem(32)}
          >
            Limited Spots for Q1 2025 Cohort
          </Title>
          <Text size={isMobile ? "md" : "lg"} mb={40} style={{opacity: 0.9}}>
            Join 50 ambitious professionals starting their entrepreneurial
            journey this quarter
          </Text>

          <Group justify="center" gap={isMobile ? "md" : "xl"} mb={40}>
            <Box
              style={{
                ...styles.countdownItem,
                padding: isMobile ? "16px" : "20px 24px",
                minWidth: isMobile ? "70px" : "100px"
              }}
            >
              <Text size={isMobile ? rem(32) : rem(40)} fw={800}>
                {spotsLeft}
              </Text>
              <Text
                size="xs"
                tt="uppercase"
                style={{letterSpacing: "1px", opacity: 0.9}}
              >
                Spots Left
              </Text>
            </Box>
            <Box
              style={{
                ...styles.countdownItem,
                padding: isMobile ? "16px" : "20px 24px",
                minWidth: isMobile ? "70px" : "100px"
              }}
            >
              <Text size={isMobile ? rem(32) : rem(40)} fw={800}>
                {countdown.days}
              </Text>
              <Text
                size="xs"
                tt="uppercase"
                style={{letterSpacing: "1px", opacity: 0.9}}
              >
                Days
              </Text>
            </Box>
            <Box
              style={{
                ...styles.countdownItem,
                padding: isMobile ? "16px" : "20px 24px",
                minWidth: isMobile ? "70px" : "100px"
              }}
            >
              <Text size={isMobile ? rem(32) : rem(40)} fw={800}>
                {countdown.hours}
              </Text>
              <Text
                size="xs"
                tt="uppercase"
                style={{letterSpacing: "1px", opacity: 0.9}}
              >
                Hours
              </Text>
            </Box>
            <Box
              style={{
                ...styles.countdownItem,
                padding: isMobile ? "16px" : "20px 24px",
                minWidth: isMobile ? "70px" : "100px"
              }}
            >
              <Text size={isMobile ? rem(32) : rem(40)} fw={800}>
                {countdown.minutes}
              </Text>
              <Text
                size="xs"
                tt="uppercase"
                style={{letterSpacing: "1px", opacity: 0.9}}
              >
                Minutes
              </Text>
            </Box>
          </Group>

          <Button
            size={isMobile ? "lg" : "xl"}
            fullWidth={isMobile}
            style={{
              background: "white",
              color: "#1e40af"
            }}
            onClick={() => navigate("/register")}
          >
            Reserve Your Spot - Join Free Round
          </Button>
        </Box>
      </Container>

      {/* Final CTA Section */}
      <Box py={isMobile ? 60 : 80} style={{background: "#f9fafb"}}>
        <Container size="xl" px={isMobile ? "16px" : "20px"}>
          <Box ta="center" mb={isMobile ? 40 : 60}>
            <Title
              order={2}
              size={isSmallMobile ? rem(24) : isMobile ? rem(28) : rem(40)}
              fw={800}
              mb={16}
            >
              Everything You Need to Launch Successfully
            </Title>
            <Text size={isMobile ? "md" : "lg"} c="gray.6">
              A complete ecosystem designed for professionals building
              businesses on the side
            </Text>
          </Box>

          <Box
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(300px, 1fr))",
              gap: isMobile ? "16px" : "24px",
              maxWidth: "900px",
              margin: "0 auto 60px auto"
            }}
          >
            {[
              "50+ Live Expert Sessions Annually",
              "24/7 Community Support",
              "Proven Business Templates",
              "1-on-1 Mentor Matching",
              "AI Tools & Automation Training",
              "Lifetime Alumni Access"
            ].map((item, index) => (
              <Box
                key={index}
                className="animate-on-scroll"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}
              >
                <span
                  style={{
                    color: "#059669",
                    fontSize: "1.5rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Arial, sans-serif",
                    lineHeight: 1
                  }}
                >
                  ✔
                </span>
                <span
                  style={{
                    color: "#111827",
                    fontWeight: 500
                  }}
                >
                  {item}
                </span>
              </Box>
            ))}
          </Box>

          <Box ta="center">
            <Button
              size={isMobile ? "lg" : "xl"}
              fullWidth={isMobile}
              style={{
                background: "#1e40af",
                fontSize: isMobile ? "1.1rem" : "1.25rem",
                padding: isMobile ? "16px 40px" : "18px 60px"
              }}
              onClick={() => navigate("/register")}
            >
              Join Our Next Free Round
            </Button>
            <Text mt="md" c="gray.6" size="sm">
              Limited spots available • Community-driven learning • 100% free to
              start
            </Text>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        py={isMobile ? "40px 0 30px" : "60px 0"}
        style={{background: "#111827", color: "white"}}
      >
        <Container size="xl" px={isMobile ? "16px" : "20px"}>
          <Grid
            gutter={isMobile ? 30 : 40}
            mb={isMobile ? 30 : 40}
            columns={12}
          >
            <Grid.Col span={{base: 12, xs: 12, sm: 5, md: 5, lg: 4}}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "center" : "flex-start",
                  justifyContent: isMobile ? "center" : "flex-start",
                  gap: "8px",
                  marginBottom: "16px",
                  textAlign: isMobile ? "center" : "left"
                }}
              >
                <Box
                  style={{
                    ...styles.logoSquare,
                    margin: isMobile ? "0 auto 8px" : "0"
                  }}
                />
                <Text style={{...styles.logo, color: "white"}}>2zpoint</Text>
              </Box>
              <Text
                c="#9ca3af"
                size="sm"
                style={{
                  lineHeight: 1.6,
                  maxWidth: "350px",
                  textAlign: isMobile ? "center" : "left",
                  margin: isMobile ? "0 auto" : "0"
                }}
              >
                Empowering professionals aged 28-50 to build successful side
                businesses without sacrificing career stability.
              </Text>
            </Grid.Col>
            <Grid.Col span={{base: 12, xs: 12, sm: 2.33, md: 2.33, lg: 2.66}}>
              <Text
                fw={600}
                size="sm"
                tt="uppercase"
                mb="md"
                style={{
                  letterSpacing: "1px",
                  color: "#d1d5db",
                  fontSize: "0.875rem",
                  textAlign: isMobile ? "center" : "center"
                }}
              >
                Program
              </Text>
              <Stack gap="xs" align={isMobile ? "center" : "center"}>
                <Anchor
                  href="#"
                  style={{
                    color: "#9ca3af",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    transition: "color 0.3s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#9ca3af")
                  }
                >
                  How It Works
                </Anchor>
                <Anchor
                  href="#"
                  style={{
                    color: "#9ca3af",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    transition: "color 0.3s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#9ca3af")
                  }
                >
                  Success Stories
                </Anchor>
                <Anchor
                  href="#"
                  style={{
                    color: "#9ca3af",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    transition: "color 0.3s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#9ca3af")
                  }
                >
                  Pricing
                </Anchor>
                <Anchor
                  href="#"
                  style={{
                    color: "#9ca3af",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    transition: "color 0.3s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#9ca3af")
                  }
                >
                  FAQ
                </Anchor>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{base: 12, xs: 12, sm: 2.33, md: 2.33, lg: 2.66}}>
              <Text
                fw={600}
                size="sm"
                tt="uppercase"
                mb="md"
                style={{
                  letterSpacing: "1px",
                  color: "#d1d5db",
                  fontSize: "0.875rem",
                  textAlign: isMobile ? "center" : "center"
                }}
              >
                Resources
              </Text>
              <Stack gap="xs" align={isMobile ? "center" : "center"}>
                <Anchor
                  href="#"
                  style={{
                    color: "#9ca3af",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    transition: "color 0.3s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#9ca3af")
                  }
                >
                  Free Workshop
                </Anchor>
                <Anchor
                  href="#"
                  style={{
                    color: "#9ca3af",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    transition: "color 0.3s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#9ca3af")
                  }
                >
                  Business Calculator
                </Anchor>
                <Anchor
                  href="#"
                  style={{
                    color: "#9ca3af",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    transition: "color 0.3s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#9ca3af")
                  }
                >
                  Blog
                </Anchor>
                <Anchor
                  href="#"
                  style={{
                    color: "#9ca3af",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    transition: "color 0.3s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#9ca3af")
                  }
                >
                  Podcast
                </Anchor>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{base: 12, xs: 12, sm: 2.33, md: 2.33, lg: 2.66}}>
              <Text
                fw={600}
                size="sm"
                tt="uppercase"
                mb="md"
                style={{
                  letterSpacing: "1px",
                  color: "#d1d5db",
                  fontSize: "0.875rem",
                  textAlign: isMobile ? "center" : "center"
                }}
              >
                Support
              </Text>
              <Stack gap="xs" align={isMobile ? "center" : "center"}>
                <Anchor
                  href="#"
                  style={{
                    color: "#9ca3af",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    transition: "color 0.3s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#9ca3af")
                  }
                >
                  Contact Us
                </Anchor>
                <Anchor
                  href="#"
                  style={{
                    color: "#9ca3af",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    transition: "color 0.3s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#9ca3af")
                  }
                >
                  Schedule Call
                </Anchor>
                <Anchor
                  href="#"
                  style={{
                    color: "#9ca3af",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    transition: "color 0.3s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#9ca3af")
                  }
                >
                  Community
                </Anchor>
                <Anchor
                  href="#"
                  style={{
                    color: "#9ca3af",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    transition: "color 0.3s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#9ca3af")
                  }
                >
                  Terms & Privacy
                </Anchor>
              </Stack>
            </Grid.Col>
          </Grid>

          <Box pt={32} style={{borderTop: "1px solid #374151"}}>
            <Text ta="center" style={{color: "#9ca3af", fontSize: "0.875rem"}}>
              © {new Date().getFullYear()} 2zpoint. Designed for ambitious
              professionals ready to build their legacy.
            </Text>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Landing1

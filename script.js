const siteConfig = {
  whatsappUrl: "https://wa.me/27763942585?text=Hi%20Online%20in%2048%20Hrs%2C%20I%20want%20to%20chat%20about%20a%20website.",
  facebookUrl: "",
  whopLinks: {
    starter: "https://whop.com/online-in-48hrs/starter-package-d7/",
    professional: "https://whop.com/online-in-48hrs/professional-package-e2/",
    premium: ""
  },
  portfolioSites: [
    {
      title: "Graven Services",
      url: "https://graven-services.vercel.app",
      summary: "Service-led business website with a clearer offer structure and a more credible online presence.",
      category: "Services",
      filter: "services"
    },
    {
      title: "Arnold Woodworks",
      url: "https://arnold-woodworks-site.vercel.app",
      summary: "Craft and trades website built to highlight workmanship and drive direct enquiries.",
      category: "Craft / Trades",
      filter: "trades"
    },
    {
      title: "TG Graphics",
      url: "https://tg-graphics-site.vercel.app",
      summary: "Creative service website with stronger presentation, cleaner sections, and a more polished feel.",
      category: "Creative",
      filter: "creative"
    },
    {
      title: "Skippa Corner",
      url: "https://skippa-corner-site.vercel.app",
      summary: "Local business website designed to make the brand feel active, visible, and easy to contact.",
      category: "Retail / Local Business",
      filter: "retail"
    },
    {
      title: "Ezasembila Laundry",
      url: "https://ezasembila-laundry-site.vercel.app",
      summary: "Laundry service website with clearer pathways for customers and a more trustworthy first impression.",
      category: "Services",
      filter: "services"
    },
    {
      title: "KBC Safety",
      url: "https://kbc-safety-site.vercel.app",
      summary: "Safety and industrial website with a stronger corporate tone and organized service presentation.",
      category: "Services",
      filter: "services"
    },
    {
      title: "Deon M Art Gallery",
      url: "https://deonm-art-gallery.vercel.app",
      summary: "Gallery-style website created to present artwork in a more curated and premium way.",
      category: "Creative",
      filter: "creative"
    },
    {
      title: "Thulzer Auto Care",
      url: "https://thulzer-auto-care-site.vercel.app",
      summary: "Automotive business website with sharper trust signals and stronger service-led messaging.",
      category: "Automotive / Trades",
      filter: "trades"
    }
  ]
};

const yearNode = document.querySelector("#year");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const menuToggle = document.querySelector("#menuToggle");
const siteNav = document.querySelector("#siteNav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealNodes = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }

        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}

function applySocialLink(id, url) {
  const node = document.querySelector(id);
  if (!node) {
    return;
  }

  if (!url) {
    node.classList.add("is-hidden");
    return;
  }

  if ("href" in node) {
    node.href = url;
  }

  node.classList.remove("is-hidden");
}

applySocialLink("#whatsappLink", siteConfig.whatsappUrl);
applySocialLink("#facebookLink", siteConfig.facebookUrl);
applySocialLink("#floatingWhatsapp", siteConfig.whatsappUrl);

const whopButtons = document.querySelectorAll("[data-whop-plan]");
const whopEmptyNote = document.querySelector("#whopEmptyNote");
let hasWhopLinks = false;

whopButtons.forEach((button) => {
  const plan = button.getAttribute("data-whop-plan");
  const url = siteConfig.whopLinks[plan];

  if (url) {
    button.href = url;
    button.target = "_blank";
    button.rel = "noreferrer";
    hasWhopLinks = true;
  }
});

if (!hasWhopLinks && whopEmptyNote) {
  whopEmptyNote.classList.remove("is-hidden");
}

function buildPortfolioCard(site, isCatalogue = false) {
  const card = document.createElement("article");
  card.className = `portfolio-card ${isCatalogue ? "catalogue-card" : ""}`.trim();
  card.dataset.category = site.filter || "";

  const heading = document.createElement("h3");
  heading.textContent = site.title;

  const domain = document.createElement("p");
  domain.className = "portfolio-domain";
  domain.textContent = site.url.replace(/^https?:\/\//, "");

  const summary = document.createElement("p");
  summary.textContent = site.summary;

  const meta = document.createElement("div");
  meta.className = "portfolio-meta";

  const tag = document.createElement("span");
  tag.className = "portfolio-tag";
  tag.textContent = site.category;

  const link = document.createElement("a");
  link.className = "portfolio-link";
  link.href = site.url;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = "View live website";

  meta.append(tag, link);
  card.append(heading, domain, summary, meta);

  return card;
}

const portfolioGrid = document.querySelector("#portfolioGrid");
const portfolioEmptyNote = document.querySelector("#portfolioEmptyNote");
const examplesGrid = document.querySelector("#examplesGrid");

if (portfolioGrid) {
  if (!siteConfig.portfolioSites.length) {
    if (portfolioEmptyNote) {
      portfolioEmptyNote.classList.remove("is-hidden");
    }
  } else {
    const limit = Number(portfolioGrid.getAttribute("data-portfolio-limit")) || siteConfig.portfolioSites.length;
    siteConfig.portfolioSites.slice(0, limit).forEach((site) => {
      portfolioGrid.append(buildPortfolioCard(site));
    });
  }
}

if (examplesGrid) {
  siteConfig.portfolioSites.forEach((site) => {
    examplesGrid.append(buildPortfolioCard(site, true));
  });

  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      examplesGrid.querySelectorAll(".catalogue-card").forEach((card) => {
        const category = card.dataset.category;
        const shouldShow = filter === "all" || category === filter;
        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });
}

const draftForm = document.querySelector("#draftForm");
const formSuccess = document.querySelector("#formSuccess");

if (draftForm && formSuccess) {
  draftForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = draftForm.querySelector(".form-submit");
    const originalText = submitButton.textContent;

    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    try {
      const formData = new FormData(draftForm);
      const response = await fetch("https://formspree.io/f/xbdpwwjv", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Something went wrong. Please try again.");
      }

      if (typeof fbq === "function") {
        fbq("track", "Lead", {
          content_name: "Website Lead Form",
          content_category: "Lead Form"
        });
      }

      draftForm.hidden = true;
      formSuccess.hidden = false;
      draftForm.reset();
    } catch (error) {
      alert(error.message || "Network error. Please try again.");
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  });
}

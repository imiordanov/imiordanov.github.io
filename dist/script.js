/**
 * Main JavaScript file for Iordan Iordanov's personal website
 * Last updated: April 2025
 */

$(document).ready(function () {
  // Initialize Semantic UI components
  $(".ui.dropdown").dropdown();
  $(".ui.accordion").accordion();
  $(".tabular.menu .item").tab();

  // Initialize progress bars
  $(".ui.progress").progress();

  // Update copyright year
  $("#currentYear").text(new Date().getFullYear());

  // Add fade-in animation class to major sections
  const sectionsToAnimate = [
    "#about",
    "#work",
    "#education",
    ".education-item",
    "#projects",
    ".featured-project",
    ".ui.card",
    "#trivia",
    "#contact",
  ];

  sectionsToAnimate.forEach((selector) => {
    $(selector).addClass("fade-in");
  });

  // Hero section typing effect
  function typeEffect(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = "";

    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  }

  // Run typing effect on page load
  const heroSubheader = $(".hero-section h2.ui.header")[0];
  if (heroSubheader) {
    const originalText = heroSubheader.textContent;
    heroSubheader.textContent = "";
    setTimeout(() => {
      typeEffect(heroSubheader, originalText, 80);
    }, 500);
  }

  // Handle scroll animations
  function handleScrollAnimations() {
    const elements = document.querySelectorAll(".fade-in");

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("visible");
      }
    });
  }

  // Navigation - Active state on scroll
  $(window).scroll(function () {
    let scrollPosition = $(window).scrollTop();

    // Highlight active menu item
    $("section").each(function () {
      let sectionTop = $(this).offset().top - 100;
      let sectionBottom = sectionTop + $(this).outerHeight();

      if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
        let id = $(this).attr("id");
        $(".ui.menu a.item").removeClass("active");
        $('.ui.menu a.item[href="#' + id + '"]').addClass("active");
      }
    });

    // Check for animations
    handleScrollAnimations();
  });

  // Initial check for animations
  handleScrollAnimations();

  // Smooth scrolling for anchor links
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();

    let target = $(this.hash);
    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top - 70,
        },
        800
      );
    }
  });

  // Toggle earlier positions
  $("#showMoreExperience").on("click", function () {
    $("#earlierPositions").slideToggle();

    if ($(this).find("i").hasClass("down")) {
      $(this).html('<i class="chevron up icon"></i> Hide Earlier Positions');
    } else {
      $(this).html('<i class="chevron down icon"></i> Show Earlier Positions');
    }
  });

  // Toggle research events
  $("#showResearchEvents").on("click", function () {
    $("#researchEvents").slideToggle();

    if ($(this).find("i").hasClass("down")) {
      $(this).html(
        '<i class="chevron up icon"></i> Hide Research Events & Collaborations'
      );
    } else {
      $(this).html(
        '<i class="chevron down icon"></i> Show Research Events & Collaborations'
      );
    }
  });

  // Contact form submission
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();

    // In a real implementation, you would send the form data to a server
    // For now, let's just show an alert
    alert(
      "Thank you for your message! This is a demonstration form. In a real implementation, your message would be sent."
    );
    $(this)[0].reset();
  });

  // Add hover effects for timeline content
  $(".timeline-content").hover(
    function () {
      $(this).parent().find(":before").css("background-color", "#1a6aa5");
    },
    function () {
      $(this).parent().find(":before").css("background-color", "#3498db");
    }
  );
});

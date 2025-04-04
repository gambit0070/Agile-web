document.addEventListener("DOMContentLoaded", function() {
    const modeToggle = document.getElementById("modeToggle");
    if (localStorage.getItem("mode") === "light") {
      document.body.classList.add("light-mode");
      modeToggle.checked = true;
    }
    modeToggle.addEventListener("change", function() {
      if (modeToggle.checked) {
        document.body.classList.add("light-mode");
        localStorage.setItem("mode", "light");
      } else {
        document.body.classList.remove("light-mode");
        localStorage.setItem("mode", "dark");
      }
    });
    const timelineItems = document.querySelectorAll(".timeline-item");
    const detailsContainer = document.getElementById("timeline-details");
    const timelineData = {
        "exp1": {
             "title": "HSE University (2018 - 2022)",
             "details": "Bachelor's of Economics and Finance. \nGPA 73.6%. \nRussia. \nSaint-petersburg"
         },
         "exp2": {
             "title": "Humboldt-Universität zu Berlin (2020 - 2021)",
             "details": "ERASMUS Student Exchange. \nGermany. \nBerlin."
         },
         "exp3": {
             "title": "OSTC - ATON (2021 - 2022)",
             "details": "Commodity-Trader.\nRanked in the top 2.4% of candidates who successfully completed the recruitment program.\nSpecialized in natural gas, gasoil, and cocoa commodities.\nExcelled in calendar spreads trading, earning 7x the monthly standard on trading bot patterns."
         },
         "exp4": {
             "title": "AST (2022 - 2023)",
             "details": "Supervised the creation and testing of 14 trading bots for various purposes. \nAchieved an average total profit of 26% across all bots."
         },
         "exp5": {
             "title": "University of Western Australia (2023 - 2025)",
             "details": "Masters of Informational Technology"
         },
         "exp6": {
             "title": "AASYP 360 (2024 - 2025)",
             "details": "Developed a full document management application from scratch. \nKey features include: \nFile upload and organization. \nSorting and quick search with tag-based filtering. \nDocument preview and multi-layer permissions. \nControl rules for different user roles. \nTwo-step authentication."
         }
      };
    timelineItems.forEach(item => {
      item.addEventListener("click", () => {
        const expId = item.getAttribute("data-id");
        if (timelineData[expId]) {
          const { title, details } = timelineData[expId];
          detailsContainer.innerHTML = `
            <h3>${title}</h3>
            <p>${details}</p>
          `;
        } else {
          detailsContainer.innerHTML = `<p>No details available for this item (${expId}).</p>`;
        }
      });
    });
    const ctx = document.getElementById('skillsRadarChart');
    if (ctx) {
      const skillData = {
        labels: [
          "JavaScript",
          "Python",
          "HTML/CSS",
          "Trading",
          "Finance",
          "Algorithms",
          "Machine Learning",
          "Communication",
          "C++",
          "Java",
          "Data Structures",
          "Design"
        ],
        datasets: [{
          label: "Skill Level",
          data: [70, 90, 85, 95, 95, 80, 70, 100, 40, 35, 65, 40],
          fill: true,
          backgroundColor: "rgba(220, 20, 60, 0.2)",
          borderColor: "rgba(220, 20, 60, 1)",
          pointBackgroundColor: "rgba(220, 20, 60, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(220, 20, 60, 1)"
        }]
      };
      const radarConfig = {
        type: 'radar',
        data: skillData,
        options: {
          scales: {
            r: {
              angleLines: { color: "var(--secondary-color)" },
              grid: { color: "var(--secondary-color)" },
              suggestedMin: 50,
              suggestedMax: 100
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'bottom'
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }
      };
      new Chart(ctx, radarConfig);
    }
    const languageBars = document.querySelectorAll(".language-bar");
    languageBars.forEach(bar => {
      bar.querySelector(".bar-fill").style.width = "0%";
    });
    const observerLang = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const level = bar.getAttribute("data-level");
          bar.querySelector(".bar-fill").style.width = level + "%";
          observerLang.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });
    languageBars.forEach(bar => {
      observerLang.observe(bar);
    });
    const fadeSections = document.querySelectorAll(".fade-on-scroll");
    const observerFade = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-show");
          observerFade.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    fadeSections.forEach(section => {
      observerFade.observe(section);
    });
});
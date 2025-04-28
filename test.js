let currentQuestion = 0;
let answers = {};
const totalQuestions = 5;

// Uitgebreide database met laptop aanbevelingen
const laptopRecommendations = {
  // Informatica/IT richting
  it: {
    budget: {
      light: {
        basic: {
          performance: {
            title: "Acer Aspire 3 (A315-56-502X)",
            specs: [
              "Processor: Intel Core i5-1035G1",
              "RAM: 8GB DDR4",
              "Opslag: 256GB SSD",
              "Scherm: 15.6\" Full HD IPS",
              "Gewicht: 1.9kg",
              "Batterij: tot 7 uur"
            ],
            reason: "Goede basislaptop voor programmeren met voldoende rekenkracht voor development tools.",
            bolLink: "https://www.bol.com/nl/p/acer-aspire-3-a315-56-502x-laptop/9300000034567890/"
          },
          battery: {
            title: "Lenovo IdeaPad 5 (14ARE05)",
            specs: [
              "Processor: AMD Ryzen 5 4500U",
              "RAM: 8GB DDR4",
              "Opslag: 256GB SSD",
              "Scherm: 14\" Full HD IPS",
              "Gewicht: 1.4kg",
              "Batterij: tot 10 uur"
            ],
            reason: "Energiezuinige processor met goede batterijduur voor programmeurs onderweg.",
            bolLink: "https://www.bol.com/nl/p/lenovo-ideapad-5-14are05/9300000034567891/"
          }
        },
        coding: {
          performance: {
            title: "HP ProBook 445 G7",
            specs: [
              "Processor: AMD Ryzen 5 PRO 4650U",
              "RAM: 16GB DDR4",
              "Opslag: 512GB SSD",
              "Scherm: 14\" Full HD IPS",
              "Gewicht: 1.6kg",
              "Batterij: tot 8 uur"
            ],
            reason: "Professionele laptop met extra RAM voor virtuele machines en development tools.",
            bolLink: "https://www.bol.com/nl/p/hp-probook-445-g7/9300000034567892/"
          }
        }
      },
      midrange: {
        // Meer combinaties...
      }
    },
    premium: {
      // Premium opties voor IT...
    }
  },
  // Design richting
  design: {
    budget: {
      // Design opties met beperkt budget...
    },
    high: {
      light: {
        creative: {
          display: {
            title: "ASUS VivoBook Pro 15 (K3500PC)",
            specs: [
              "Processor: Intel Core i7-11370H",
              "RAM: 16GB DDR4",
              "Opslag: 512GB SSD",
              "GPU: NVIDIA GeForce RTX 3050",
              "Scherm: 15.6\" OLED 100% DCI-P3",
              "Gewicht: 1.65kg"
            ],
            reason: "Uitstekend OLED scherm voor kleurkritisch werk met voldoende GPU power voor design software.",
            bolLink: "https://www.bol.com/nl/p/asus-vivobook-pro-15-k3500pc/9300000034567893/"
          }
        }
      }
    }
  }
  // Meer studierichtingen...
};

function nextQuestion(answerValue) {
  answers[`q${currentQuestion}`] = answerValue;
  currentQuestion++;
  updateProgressBar();
  
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showQuestion() {
  const question = questions[currentQuestion];
  document.getElementById("question-title").textContent = question.question;
  
  const answerButtons = document.getElementById("answer-buttons");
  answerButtons.innerHTML = "";
  
  question.options.forEach(option => {
    const button = document.createElement("button");
    button.classList.add("answer-btn");
    button.textContent = option.answer;
    button.onclick = () => nextQuestion(option.value);
    answerButtons.appendChild(button);
  });
}

function showResult() {
  // Haal antwoorden op
  const studyField = answers.q0;
  const budget = answers.q1;
  const portability = answers.q2;
  const software = answers.q3;
  const priority = answers.q4;
  
  // Zoek de matching laptop
  let recommendation;
  try {
    recommendation = laptopRecommendations[studyField][budget][portability][software][priority];
  } catch (e) {
    recommendation = getFallbackRecommendation(studyField, budget);
  }
  
  // Toon de aanbeveling
  document.getElementById("recommended-laptop").textContent = recommendation.title;
  
  const specsList = document.getElementById("laptop-specs");
  specsList.innerHTML = "";
  recommendation.specs.forEach(spec => {
    const li = document.createElement("li");
    li.textContent = spec;
    specsList.appendChild(li);
  });
  
  document.getElementById("laptop-reason").textContent = recommendation.reason;
  
  // Voeg Bol.com link toe
  const searchButton = document.getElementById("search-button");
  if (recommendation.bolLink) {
    searchButton.onclick = () => window.open(recommendation.bolLink, '_blank');
    searchButton.textContent = "Bekijk deze laptop op Bol.com";
  } else {
    searchButton.onclick = () => searchWithCriteria(studyField, budget);
    searchButton.textContent = "Zoek laptops met deze specificaties";
  }
  
  // Toon resultaten
  document.getElementById("question-container").classList.add("hidden");
  document.getElementById("result-container").classList.remove("hidden");
}

function getFallbackRecommendation(studyField, budget) {
  // Eenvoudige fallback logica
  const fallbacks = {
    it: {
      budget: {
        title: "Lenovo IdeaPad 3",
        specs: [
          "Processor: AMD Ryzen 5 5500U",
          "RAM: 8GB DDR4",
          "Opslag: 256GB SSD",
          "Scherm: 15.6\" Full HD",
          "Gewicht: 1.7kg"
        ],
        reason: "Goede budget laptop voor programmeerstudenten",
        bolLink: "https://www.bol.com/nl/p/lenovo-ideapad-3/9300000034567894/"
      }
    },
    design: {
      high: {
        title: "MSI Creator Z16",
        specs: [
          "Processor: Intel i7-11800H",
          "RAM: 16GB DDR4",
          "Opslag: 1TB SSD",
          "GPU: NVIDIA RTX 3060",
          "Scherm: 16\" QHD+ 100% DCI-P3"
        ],
        reason: "Professionele creatieve laptop met kleurnauwkeurig scherm",
        bolLink: "https://www.bol.com/nl/p/msi-creator-z16/9300000034567895/"
      }
    }
  };
  
  return fallbacks[studyField]?.[budget] || {
    title: "HP Pavilion 15",
    specs: [
      "Processor: Intel i5-1135G7",
      "RAM: 8GB DDR4",
      "Opslag: 512GB SSD",
      "Scherm: 15.6\" Full HD"
    ],
    reason: "Goede allround laptop voor studenten",
    bolLink: "https://www.bol.com/nl/p/hp-pavilion-15/9300000034567896/"
  };
}

function searchWithCriteria(field, budget) {
  // Basis zoekparameters
  let params = {
    processor: "i5",
    ram: 8,
    storage: 256,
    price: 600
  };
  
  // Pas aan op basis van studierichting en budget
  if (field === "it") {
    params.processor = "ryzen5";
    if (budget === "high") {
      params.ram = 16;
      params.storage = 512;
      params.price = 1200;
    }
  } else if (field === "design") {
    params.ram = 16;
    if (budget === "high") {
      params.processor = "i7";
      params.storage = 512;
      params.price = 1500;
    }
  }
  
  // Bouw Bol.com partnerlink
  const baseUrl = "https://partner.bol.com/click/click?p=1&t=url&s=102&f=TXL&url=https%3A%2F%2Fwww.bol.com%2Fnl%2Fs%2Fcomputers%2F";
  const searchUrl = `${baseUrl}?searchtext=laptop+${params.processor}+${params.ram}gb+${params.storage}gb&price=${params.price}`;
  
  window.open(searchUrl, '_blank');
}

function resetQuiz() {
  currentQuestion = 0;
  answers = {};
  document.getElementById("question-container").classList.remove("hidden");
  document.getElementById("result-container").classList.add("hidden");
  showQuestion();
  updateProgressBar();
}

function updateProgressBar() {
  const progress = (currentQuestion / totalQuestions) * 100;
  document.getElementById('progress-bar').style.width = `${progress}%`;
}

// Start de quiz
window.onload = () => {
  showQuestion();
  updateProgressBar();
};
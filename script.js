document.addEventListener("DOMContentLoaded", function() {
  const checkboxes = document.querySelectorAll(".card-checkbox input[type='checkbox']");
  const summaryElement = document.getElementById("checkbox-summary");
  const progressElement = document.getElementById("progress");
  const feedbackElement = document.getElementById("feedback-message");
  const rewardContainer = document.getElementById("reward-container");
  let currentRewardGroup = null;
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
  checkboxes.forEach((checkbox, index) => {
    const key = "card-checkbox-" + index;
    if (localStorage.getItem(key) === "true") {
      checkbox.checked = true;
    }
    checkbox.addEventListener("change", function() {
      localStorage.setItem(key, checkbox.checked);
      updateSummary();
    });
  });
  updateSummary();
  function updateSummary() {
    let count = 0;
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) count++;
    });
    summaryElement.textContent = "Steps to success: " + count + " out of " + checkboxes.length;
    let percent = (count / checkboxes.length) * 100;
    progressElement.style.width = percent + "%";
    let feedback = "";
    let newGroup = 0;
    if (count === 0) {
      feedback = "0 chances to find a job";
      newGroup = 0;
    } else if (count <= 4) {
      feedback = "Good start but don't forget to Keep going";
      newGroup = 1;
    } else if (count <= 8) {
      feedback = "Impressive";
      newGroup = 2;
    } else if (count <= 12) {
      feedback = "Very good, already better than the most";
      newGroup = 3;
    } else if (count >= 13) {
      feedback = "Perfect, take your cookies";
      newGroup = 4;
    }
    feedbackElement.textContent = feedback;
    if (newGroup === 0) {
      rewardContainer.innerHTML = "";
      currentRewardGroup = 0;
      return;
    }
    if (newGroup !== currentRewardGroup) {
      rewardContainer.innerHTML = "";
      let apiUrl = "";
      switch(newGroup) {
        case 1:
          apiUrl = "https://randomfox.ca/floof/";
          break;
        case 2:
          apiUrl = "https://random.dog/woof.json";
          break;
        case 3:
          apiUrl = "https://api.thecatapi.com/v1/images/search";
          break;
        case 4:
          apiUrl = "https://api.thecatapi.com/v1/images/search";
          break;
      }
      if (apiUrl !== "") {
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            let img = document.createElement("img");
            if(newGroup === 1) {
              img.src = data.image;
            } else if(newGroup === 2) {
              img.src = data.url;
            } else if(newGroup === 3) {
              img.src = data[0].url;
            } else if(newGroup === 4) {
              img.src = data[0].url;
            }
            img.alt = "Cute animal";
            img.style.maxWidth = "300px";
            img.style.marginTop = "10px";
            rewardContainer.appendChild(img);
            currentRewardGroup = newGroup;
          })
          .catch(error => console.error("Error fetching reward image:", error));
      }
    }
  }
});
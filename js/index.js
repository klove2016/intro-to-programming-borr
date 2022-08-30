const today = new Date();
const thisYear = today.getFullYear();
const footer = document.querySelector("footer");
const copyright = document.createElement("p");
copyright.innerHTML = `© KJ Loving ${thisYear}`;
footer.appendChild(copyright);
footer.style.fontSize = "large";
footer.style.fontWeight = "bold";
footer.style.textDecoration = "underline";

const skills = ["JS", "HTML", "CSS"];
const skillsSection = document.getElementById("mySkills");
const skillsList = skillsSection.querySelector("ul");
skills.forEach((skill) => {
  const skillItem = document.createElement("li");
  skillItem.innerText = skill;
  skillsList.appendChild(skillItem);
});
skillsList.style.textAlign = "left";
document.getElementById("contact").style.textAlign = "left";
document.getElementById("contact").querySelector("h1").style.textAlign =
  "center";
const messageForm = document.getElementsByName("leave_message")[0];

const nameRes = document.getElementsByName("name")[0];

const emailRes = document.getElementsByName("email")[0];

const messageRes = document.getElementsByName("message")[0];

const submitButton = document.getElementsByName("submit")[0];

let submitForm = function (e) {
  e.preventDefault();
  clientName = nameRes.value;
  clientEmail = emailRes.value;
  clientMessage = messageRes.value;

  const messageSection = document.getElementById("messages");

  const messageList = messageSection.querySelector("ul");
  const newMessage = document.createElement("li");

  newMessage.innerHTML = `<a href="mailto:${clientEmail}">${clientName}</a> 
 <span id="msg-span"> wrote: ${clientMessage}</span>`;

  messageList.appendChild(newMessage);
  const removeButton = document.createElement("button");
  removeButton.innerText = "Remove";
  removeButton.setAttribute("type", "button");
  messageForm.reset();
  function removeComment() {
    entry = removeButton.parentNode;
    entry.remove();
    if (
      document.getElementById("messages").querySelector("ul")
        .childElementCount === 0
    ) {
      document.getElementById("messages").style.visibility = "hidden";
    }
  }
  newMessage.appendChild(removeButton);
  messageList.appendChild(newMessage);
  removeButton.addEventListener("click", removeComment);

  document.getElementById("messages").style.visibility = "visible";
};
messageForm.addEventListener("submit", submitForm);

if (
  document.getElementById("messages").querySelector("ul").childElementCount ===
  0
) {
  document.getElementById("messages").style.visibility = "hidden";
}
const githubRequest = new XMLHttpRequest();
githubRequest.open("GET", "https://api.github.com/users/klove2016/repos");

githubRequest.send();

githubRequest.onload = function () {
  const repos = JSON.parse(githubRequest.responseText);

  const projectSection = document.getElementById("projects");
  const projectList = projectSection.querySelector("ul");
  for (let i = 0; i < repos.length; i++) {
    eachRepo = repos[i];
    project = document.createElement("li");
    const repoStrName = eachRepo.name.toString();
    const repoNoDashName = repoStrName.replaceAll("-", " ");
    const repoRealName = repoNoDashName.split(" ");
    for (let i = 0; i < repoRealName.length; i++) {
      if (repoRealName[i].length > 3) {
        repoRealName[i] =
          repoRealName[i][0].toUpperCase() + repoRealName[i].substr(1) + " ";
      } else {
        repoRealName[i] = repoRealName[i] + " ";
      }
    }
    const createdAt =
      eachRepo.created_at.slice(5, 10) +
      "-" +
      eachRepo.created_at.substring(0, 4);
    const updatedAt =
      eachRepo.updated_at.slice(5, 10) +
      "-" +
      eachRepo.updated_at.substring(0, 4);
    project.innerHTML = `<a  href="${eachRepo.html_url}">${repoRealName.join("")}</a> <p> Created on: ${createdAt}</p> <p> Last updated: ${updatedAt}  </p> <p> Description: ${
      eachRepo.description
    }</p>`;
    console.log(eachRepo);
    projectList.appendChild(project);
  }
};

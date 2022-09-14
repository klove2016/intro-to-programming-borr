const today = new Date();
const thisYear = today.getFullYear();
const footer = document.querySelector("footer");
const copyright = document.createElement("p");
copyright.innerHTML = `© KJ Loving ${thisYear}`;
footer.appendChild(copyright);
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
      document.getElementById("messages").style.display = "none";
      document.getElementById("messageSubmitForm").style.width = '100%';
    }
  }
  newMessage.appendChild(removeButton);
  messageList.appendChild(newMessage);
  removeButton.addEventListener("click", removeComment);
  document.getElementById("messageSubmitForm").style.width = '';

  document.getElementById("messages").style.display = "";
};
messageForm.addEventListener("submit", submitForm);

if (
  document.getElementById("messages").querySelector("ul").childElementCount ===
  0
) {
  document.getElementById("messages").style.display = "none";
  document.getElementById("messageSubmitForm").style.width = '100%';
}


fetch ('https://api.github.com/users/klove2016/repos').then(response => {
  return response.json();
  }).then(function(data){
  const projectSection = document.getElementById("projects");
  const projectList = projectSection.querySelector("ul");
  for (let i = 0; i < data.length; i++) {
    const eachRepo = data[i];
    const project = document.createElement("li");
    const repoRealName = eachRepo.name.split("-");
    const repoNameShown = repoRealName.map(nameWord => (
      nameWord.length > 3 ? nameWord[0].toUpperCase() + nameWord.substr(1) : nameWord
    )).join(' ');
    const createdAt =
      eachRepo.created_at.slice(5, 10) +
      "-" +
      eachRepo.created_at.substring(0, 4);
    const updatedAt =
      eachRepo.updated_at.slice(5, 10) +
      "-" +
      eachRepo.updated_at.substring(0, 4);
    project.innerHTML = `<span class='arrow'>&#10095</span> <a  href="${eachRepo.html_url}">${repoNameShown}</a> <p>Created on: ${createdAt}</p> <p> Last updated: ${updatedAt}  </p> <p> Description: ${
      eachRepo.description
    }</p>`;
    projectList.appendChild(project);
  }
}).catch((error) => {
  console.error(error);
  const projectSectionError = document.getElementById("projects");
  cannotFind = document.createElement("p");
  cannotFind.setAttribute('id','error');
  cannotFind.innerText = ' Cannot pull projects from Github at this time.';
  projectSectionError.appendChild(cannotFind);
})
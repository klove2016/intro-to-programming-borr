document.body.style.backgroundColor = "lightblue";
const today = new Date();
const thisYear = today.getFullYear();
const footer = document.querySelector("footer");
const copyright = document.createElement("p");
copyright.innerHTML = `KJ Loving ${thisYear}`;
footer.appendChild(copyright);
footer.style.fontSize = "large";
footer.style.textAlign = "center";
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
  newMessage.appendChild(removeButton);
  messageList.appendChild(newMessage);
  console.log(newMessage);
  messageForm.reset();
  function removeComment() {
    entry = removeButton.parentNode;
    entry.remove();
  }
  removeButton.addEventListener("click", removeComment);

  document.getElementById("messages").style.visibility = "visible";
};

submitButton.addEventListener("click", submitForm);

if (
  document.getElementById("messages").querySelector("ul").childElementCount ===
  0
) {
  document.getElementById("messages").style.visibility = "hidden";
}

const logregBox = document.querySelector('.logreg-box');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link'); 

registerLink.addEventListener('click', () => {
    logregBox.classList.add('active');
});

loginLink.addEventListener('click', () => {
    logregBox.classList.remove('active');
});

const typewriterContainer = document.getElementById("typewriter-container");

const textLines = [
  "Welcome!",
  "To The New",
  "Sound Experience.",
];

let lineIndex = 0;
let charIndex = 0;

function typeLine() {
  if (charIndex < textLines[lineIndex].length) {
    typewriterContainer.innerHTML += textLines[lineIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeLine, 100);
  } else {
    if (lineIndex < textLines.length - 1) {
      typewriterContainer.innerHTML += "<br>";
      lineIndex++;
      charIndex = 0;
      setTimeout(typeLine, 500);
    } else {
      typewriterContainer.classList.add("no-cursor");
    }
  }
}

typewriterContainer.classList.add("typewriter");
typeLine();

const textElement = document.getElementById('text');
const socialIconsElement = document.getElementById('social-icons');

        setTimeout(() => {
            textElement.classList.add('appear');
        }, 4800);

        setTimeout(() => {
            socialIconsElement.classList.add('appear');
        }, 5400);


     

const formElement = document.getElementById("register-form");
formElement.addEventListener(("submit"), async (event) => {
  event.preventDefault();
  let username = document.getElementById("username").value;
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let edadString = document.getElementById("edad").value;
  let edad = parseInt(edadString, 10);
  let correo = document.getElementById("correo").value;
  let passwd = document.getElementById("passwd").value;

  let registro = {
    username,
    nombre,
    apellido,
    edad,
    correo,
    passwd
  }

  let registroJson = JSON.stringify(registro);
  console.log(registroJson)
  
  const response = await fetch("http://localhost:3001/api/auth/register", {
    method: 'POST',
    headers: {
      'Content-Type':'application/json', 
      'api_key': 'leifer-01'
    },
    body: registroJson
  });

  const result = await response.json();
  console.log(result);

});


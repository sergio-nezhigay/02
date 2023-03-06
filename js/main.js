let firstName = prompt("Enter your name...").trim();
firstName = firstName[0].toUpperCase() + firstName.slice(1);
let surname = prompt("Enter your surname...").trim();
surname = surname[0].toUpperCase() + surname.slice(1);
let email = prompt("Enter your email...").replaceAll("\\s+", "").toLowerCase();
if (!email.includes("@"))
  email = `not valid email <b>${email}</b> (symbol @ not exist)`;
else if (email[0] === "@")
  email = `not valid email <b>${email}</b> (symbol @ find in first place)`;
else if (email[email.length - 1] === "@")
  email = `not valid email <b>${email}</b> (symbol @ find in last place)`;

const year = +prompt("Enter your birth year...").replaceAll("\\s+", "");

const currentYear = new Date().getFullYear();

const age = currentYear - year;

document.write(
  `<h2>
    Full Name: ${firstName} ${surname}<br>
    Email: ${email}<br>
    Age: ${age}
  </h2>`
);

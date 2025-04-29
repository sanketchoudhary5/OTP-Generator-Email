const step1 = document.querySelector(".step1");
const step2 = document.querySelector(".step2");
const step3 = document.querySelector(".step3");
const emailAddress = document.getElementById("emailAddress");
const verifyEmail = document.getElementById("verifyEmail");
const inputs = document.querySelectorAll(".otp-group input");
const nextButton = document.querySelector(".nextButton");
const verifyButton = document.querySelector(".verifyButton");
let OTP = "";  //Stores the generated OTP.

window.addEventListener("load", () => {
  emailjs.init("PWMP4CRWaPL1ZNtvx");
  step2.style.display = "none";
  step3.style.display = "none";
  nextButton.classList.add("disable");
  verifyButton.classList.add("disable");
});

// Function to validate email format
const validateEmail = (email) => {
  let re = /\S+@\S+\.\S+/;
  if (re.test(email)) {
    nextButton.classList.remove("disable");  //Enables the "Next" button only if the email is valid.
  } else {
    nextButton.classList.add("disable");
  }
};

// Function to generate a 4-digit OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
};

// OTP input handling
inputs.forEach((input, index) => {
  input.addEventListener("keyup", (e) => {
    e.target.value = e.target.value.replace(/\D/, "").substring(0, 1); // Allow only one digit

    // Move to next input field automatically
    if (e.target.value !== "" && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }

    // Enable verify button only when all inputs are filled
    if (Array.from(inputs).every(inp => inp.value.trim() !== "")) {
      verifyButton.classList.remove("disable");
    } else {
      verifyButton.classList.add("disable");
    }
  });
});

const serviceID = "service_e42e37e";
const templateID = "template_z8lgtmb";

nextButton.addEventListener("click", () => {
  nextButton.innerHTML = "&#9889; Sending...";
  OTP = generateOTP(); // Generate OTP

  console.log("Generated OTP:", OTP); // Debugging purpose

  let templateParams = {
    from_name: "nehavaidya's Dev Community",
    OTP: OTP,
    message: "Please find your OTP below",
    to_email: emailAddress.value, // Corrected email parameter
  };

  emailjs.send(serviceID, templateID, templateParams)
    .then((res) => {
      console.log("Email sent:", res);
      nextButton.innerHTML = "Next →";
      step1.style.display = "none";
      step2.style.display = "block";
      step3.style.display = "none";
      verifyEmail.textContent = emailAddress.value;
    })
    .catch((err) => {
      console.error("Error sending email:", err);
      nextButton.innerHTML = "Next →";
    });
});

verifyButton.addEventListener("click", () => {
  let enteredOTP = "";
  inputs.forEach((input) => {
    enteredOTP += input.value;
  });

  console.log("Entered OTP:", enteredOTP); // Debugging
  console.log("Expected OTP:", OTP);

  if (parseInt(OTP) === parseInt(enteredOTP)) {
    step1.style.display = "none";
    step2.style.display = "none";
    step3.style.display = "block";
  } else {
    verifyButton.classList.add("error-shake");

    setTimeout(() => {
      verifyButton.classList.remove("error-shake");
    }, 1000);
  }
});

function changeMyEmail() {
  step1.style.display = "block";
  step2.style.display = "none";
  step3.style.display = "none";
  inputs.forEach(input => input.value = ""); // Clear OTP input fields
  verifyButton.classList.add("disable");
}

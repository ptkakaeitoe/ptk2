// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQCcP80nPbSkhSuVcU3ReV1D_vmmruRkA",
  authDomain: "chattest-33900.firebaseapp.com",
  projectId: "chattest-33900",
  storageBucket: "chattest-33900.appspot.com",
  messagingSenderId: "129586005906",
  appId: "1:129586005906:web:7573307f9755586b18e34b",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to your database
const db = firebase.database();

// Check for stored username or open modal
let username = localStorage.getItem("username");
if (!username) {
  // Keep the modal open by not doing anything here.
  // The modal handling will be done via the button click event in the HTML part.
} else {
  // Hide the login modal if username exists and show the chat
  document.getElementById("usernameModal").style.display = "none";
  document.getElementById("chat").style.display = "block";
}

// Function to send message
function sendMessage(e) {
  e.preventDefault(); // Prevent the default form submit action

  // Get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value.trim(); // Trim message to remove any leading/trailing spaces

  // Check if the message is not empty
  if (message) {
    // Clear the input box
    messageInput.value = "";

    // Create db collection and send in the data
    db.ref("messages/" + timestamp).set({
      username,
      message,
    });
  }
}

// Listen for form submission
document.getElementById("message-form").addEventListener("submit", sendMessage);

// Fetch chat from Firebase
const fetchChat = db.ref("messages/");

fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const messageElement = `<li class="${
    username === messages.username ? "sent" : "receive"
  }"><span>${messages.username}: </span>${messages.message}</li>`;

  // Append the message on the page
  const messagesContainer = document.getElementById("messages");
  messagesContainer.innerHTML += messageElement;

  // Scroll to the latest message
  messagesContainer.lastElementChild.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });
});

// Add event listener for the username submission
document
  .getElementById("submit-username")
  .addEventListener("click", function () {
    username = document.getElementById("username-input").value.trim();
    if (username) {
      localStorage.setItem("username", username);
      document.getElementById("usernameModal").style.display = "none";
      document.getElementById("chat").style.display = "block";
    }
  });

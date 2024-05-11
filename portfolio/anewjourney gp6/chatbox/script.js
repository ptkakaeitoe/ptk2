// const openaiApiKey = "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"; // Replace with your actual API key
// const userMessage = "what is "; // The message from the user

// fetch("https://api.openai.com/v1/chat/completions", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${openaiApiKey}`,
//   },
//   body: JSON.stringify({
//     model: "gpt-3.5-turbo", // or another model version
//     messages: [
//       {
//         role: "user",
//         content: userMessage,
//       },
//     ],
//   }),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     // Accessing the message content
//     const messageContent = data.choices[0].message.content; // This line might need adjustment
//     console.log(messageContent); // Log the actual response message content
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
// document.addEventListener("DOMContentLoaded", function () {
//   document.getElementById("sendPrompt").addEventListener("click", function () {
//     const openaiApiKey = "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"; // Keep this secure
//     const userMessage = document.getElementById("promptInput").value; // Get the user's message from the input field

//     fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${openaiApiKey}`,
//       },
//       body: JSON.stringify({
//         model: "gpt-3.5-turbo", // or another model version
//         messages: [
//           {
//             role: "user",
//             content: userMessage,
//           },
//         ],
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Correctly accessing the text content of the response
//         const messageContent = data.choices[0].text; // Adjusted to the correct path
//         document.getElementById("responseText").innerText = messageContent; // Displaying the response
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         document.getElementById("responseText").innerText =
//           "Error: " + error.toString();
//       });
//   });
// });

// document.addEventListener("DOMContentLoaded", function () {
//   document.getElementById("sendPrompt").addEventListener("click", function () {
//     const openaiApiKey = "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"; // Replace with your actual API key, keep this secure
//     const userMessage = document.getElementById("promptInput").value; // Get the user's message from the input field

//     fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${openaiApiKey}`,
//       },
//       body: JSON.stringify({
//         model: "gpt-3.5-turbo", // or another model version
//         messages: [
//           {
//             role: "user",
//             content: userMessage,
//           },
//         ],
//       }),
//     })
//       .then((data) => {
//         console.log("API Response:", JSON.stringify(data, null, 2)); // Log the full response object for better visibility

//         // Checking if the 'choices' array exists and contains at least one item
//         if (data.choices && data.choices.length > 0) {
//           // Assuming the response text is in the first item of 'choices' array
//           const messageContent = data.choices[0].text; // Accessing the text content of the first choice
//           if (messageContent) {
//             // Ensure messageContent is not undefined or empty
//             document.getElementById("responseText").innerText = messageContent;
//           } else {
//             // If 'text' is not found within the first choice
//             console.error(
//               "No text content found in the first choice:",
//               data.choices[0]
//             );
//             document.getElementById("responseText").innerText =
//               "No text content found in the response.";
//           }
//         } else {
//           // If 'choices' array is missing or empty
//           console.error(
//             "Unexpected response structure or 'choices' array is empty:",
//             data
//           );
//           document.getElementById("responseText").innerText =
//             "Unexpected response structure or 'choices' array is empty.";
//         }
//       })

//       .catch((error) => {
//         console.error("Error:", error);
//         document.getElementById("responseText").innerText =
//           "Error: " + error.toString();
//       });
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("sendPrompt").addEventListener("click", function () {
    const openaiApiKey = "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"; // Replace with your actual API key, keep this secure
    const userMessage = document.getElementById("promptInput").value; // Get the user's message from the input field

    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // or another model version
        messages: [
          {
            role: "user",
            content: userMessage,
          },
        ],
      }),
    })
      .then((response) => response.json()) // This line was missing to parse the response body as JSON
      .then((data) => {
        console.log("API Response:", JSON.stringify(data, null, 2)); // Logging the full API response for visibility

        if (
          data.choices &&
          data.choices.length > 0 &&
          data.choices[0].message &&
          data.choices[0].message.content
        ) {
          const messageContent = data.choices[0].message.content; // Correctly accessing the content from the message object
          document.getElementById("responseText").innerText = messageContent;
        } else {
          console.error("No valid response in 'choices'", data);
          document.getElementById("responseText").innerText =
            "No valid response found.";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("responseText").innerText =
          "Error: " + error.toString();
      });
  });
});

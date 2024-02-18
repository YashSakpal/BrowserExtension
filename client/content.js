// content.js
// This code will be executed on every page where the extension is active.

// Function to add a class to elements

function preventAnchorClick(event) {
    event.preventDefault();
    
    // Create a popup container
    const popup = document.createElement("div");
    popup.className = "popup";
    document.body.appendChild(popup);

    // Create popup content
    const popupContent = document.createElement("div");
    popupContent.className = "popup-content";
    popup.appendChild(popupContent);

    // Add text to the popup content
    const popupText = document.createElement("p");
    popupText.textContent = "This is a malicious link!";
    popupContent.appendChild(popupText);

    // Add a cancel button
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "OK";
    cancelButton.addEventListener("click", function () {
      popup.style.display = "none"; // Hide the popup when cancel button is clicked
    });
    popupContent.appendChild(cancelButton);

    // Apply CSS styling
    const style = document.createElement("style");
    style.textContent = `
    .popup {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        border: 1px solid #ccc;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        width: 80%;
    }

    .popup-content {
        text-align: center;
    }

    .popup button {
        margin-top: 10px;
        padding: 5px 10px;
        background-color: #007bff;
        color: #fff;
        border: none;
        cursor: pointer;
    }
`;
    document.head.appendChild(style);

    // Show the popup
    popup.style.display = "block";
  }


function addClassToElements(className) {
  const elements = Array.from(document.getElementsByTagName("a"));
//   console.log(elements); // Replace with your desired selector
  elements.forEach((element) => {
    element.classList.add(className);
  });
}

// Add your class to specific elements
addClassToElements("popup-button"); // Replace with your desired class name


// Making a POST request with JSON data
const postData = {
    "links": ["haha.com", "ok.com"]
}

const makeAPICall = (data) => {

fetch("http://localhost:5004/verify-urls", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
})
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        // console.log(data);
        var anchorElements = document.querySelectorAll("a");

        anchorElements.forEach(element => {
            element.removeEventListener("click", preventAnchorClick);
          });

        anchorElements.forEach(function (element) {
          console.log('tagg', element.href, data.links.includes(element.href))
            if (data.links.includes(element.href)){
              element.addEventListener("click", preventAnchorClick);}
           });
    })
    .catch(error => {
        console.error("Error:", error);
    });
}




var anchorElements = document.querySelectorAll("a");
//   console.log("anchorelemnts", anchorElements);

  const urls = Array.from(anchorElements).map(item => item.href)

 makeAPICall({links: urls})

 console.log('hehe', anchorElements)
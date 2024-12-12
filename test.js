function addTimestamp() {
    // Get the current timestamp in ISO format
    var timestamp = new Date().toISOString();
    // Assign the timestamp to the hidden input field
    document.getElementById("timestamp").value = timestamp;
    console.log("Timestamp assigned:", timestamp); // Log the timestamp to the console for verification
}
  function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        first_name: params.get("first_name"),
        last_name: params.get("last_name"),
        email: params.get("email"),
        mobile_phone: params.get("mobile_phone"),
        business_name: params.get("business_name"),
        timestamp: params.get("timestamp"),
    };
}

// Display the form data
function displayFormData() {
    const data = getQueryParams();
    const formDataList = document.getElementById("form-data");
    
    // Loop through the data object and create list items
    for (let key in data) {
        if (data[key]) { // Make sure there is data to display
            const listItem = document.createElement("li");
            if (key === "timestamp") {
                // Format the timestamp nicely
                const formattedDate = new Date(data[key]).toLocaleString();
                listItem.textContent = `Timestamp: ${formattedDate}`;
            } else {
                listItem.textContent = `${key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}: ${data[key]}`;
            }
            formDataList.appendChild(listItem);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayFormData();
});
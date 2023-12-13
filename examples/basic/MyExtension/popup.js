console.log('Hello World!!');


// This function will run when the button is clicked
function myButtonClickFunction() {
    console.log('Button clicked!');
    // Add any other logic you want to execute here
    browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
        console.log("Received response: ", response);
    });
}

// Event listener for the button
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('myButton').addEventListener('click', myButtonClickFunction);
});


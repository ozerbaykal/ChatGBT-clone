// Html
const chatInput = document.querySelector("#chat-input")
const sendButton = document.querySelector("#send-btn");

let userText = null

const handleOutGoingChat = (e) => {
    e.preventDefault()
    userText = chatInput.value


}


//olay izleyicileri
sendButton.addEventListener("click", handleOutGoingChat)
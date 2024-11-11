// Html
const chatInput = document.querySelector("#chat-input")
const sendButton = document.querySelector("#send-btn");
const defaultText = document.querySelector(".default-text");
const chatContainer = document.querySelector(".chat-container");


let userText = null

//gönderdiğimiz html class isimine göre ibze bir html oluşturur.
const createELement = (html, className) => {
    //yeni div oluşutur
    const chatDiv = document.createElement("div")
    //oluşturduğumuz dive parametre olrak aldığığımız className i class olarak ekle
    chatDiv.classList.add("chat", className)

    //oluşturduğumuz divin içerisine dışarıdan gelen html parametreisni ekle i ekle
    chatDiv.innerHTML = html




    return chatDiv
}

const showTypingAnimation = () => {
    const html = `
   <div class="chat-content">
        <div class="chat-details">
            <img src="./images/chatbot.jpg" alt="" />
            <div class="typing-animation">
                <div class="typing-dot" style="--delay: 0.2s"></div>
                <div class="typing-dot" style="--delay: 0.3s"></div>
                <div class="typing-dot" style="--delay: 0.4s"></div>
            </div>
        </div>
   </div>
    
    `;

    const incomingChatDiv = createELement(html, "incoming")
    chatContainer.appendChild(incomingChatDiv)


}




const handleOutGoingChat = () => {

    userText = chatInput.value.trim();
    //inputun içinde veri yoksa durdur
    if (!userText) {
        alert("Bir veri giriniz")
        return;
    }

    const html = `
    <div class="chat-content">
          <div class="chat-details">
            <img src="./images/user.jpg" alt="" />
            <p></p>
          </div>
    </div>
    
    
    
    
    `;
    //kullanıcının mesajını içeren bğr div oluştur ve chatContainer yapısına ekle
    const outgoingChatDiv = createELement(html, "outgoing")

    defaultText.remove()

    outgoingChatDiv.querySelector("p").textContent = userText
    chatContainer.appendChild(outgoingChatDiv)

    setTimeout(showTypingAnimation, 500)

        ;

}


//olay izleyicileri
sendButton.addEventListener("click", handleOutGoingChat)
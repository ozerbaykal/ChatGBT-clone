// Html
const chatInput = document.querySelector("#chat-input")
const sendButton = document.querySelector("#send-btn");
const defaultText = document.querySelector(".default-text");


let userText = null


const createELement = (html, className) => {
    //yeni div oluşutur
    const chatDiv = document.createElement("div")
    //oluşturduğumuz dive parametre olrak aldığığımız className i class olarak ekle
    chatDiv.classList.add("chat", className)

    //oluşturduğumuz divin içerisine dışarıdan gelen html parametreisni ekle i ekle
    chatDiv.innerHTML = html
    console.log(chatDiv)



    return chatDiv
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
    const outgoingChatDiv = createELement(html, "outgoing")

    defaultText.remove()

}


//olay izleyicileri
sendButton.addEventListener("click", handleOutGoingChat)
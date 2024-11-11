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

const getChatResponse = async () => {
    const pElement = document.createElement("p")

    //url i tanımla
    const url = 'https://chatgpt-42.p.rapidapi.com/geminipro';
    //options'ı tanımla
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': 'e48aae4760msh168a32d55c6ea2fp1054afjsn68df4fe6d656',
            'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                messages: [
                    {
                        role: 'user',
                        content: `${userText}`
                    }
                ],
                temperature: 0.9,
                top_k: 5,
                top_p: 0.9,
                max_tokens: 256,
                web_access: false
            }


        )


    }
    //api ye istek at
    try {
        //api ye url ve options kullanarak istek at ve bekle
        const response = await fetch(url, options);
        //gelen cevabı json a çevir ve bekle
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }

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

    getChatResponse()


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
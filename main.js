// Html
const chatInput = document.querySelector("#chat-input")
const sendButton = document.querySelector("#send-btn");
const defaultText = document.querySelector(".default-text");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#delete-btn");


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

const getChatResponse = async (incomingChatDiv) => {
    const pElement = document.createElement("p")

    //url i tanımla
    const url = 'https://chatgpt-42.p.rapidapi.com/geminipro';
    //options'ı tanımla
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': 'e48aae4760msh168a32d55c6ea2fp1054afjsn68df4fe6d656',
            'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
            'Content-Type': 'application/json',
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
        pElement.innerHTML = result.result;
    } catch (error) {
        console.error(error);
    }
    //animasyonu kaldırabilmek için queryselector ile  sectik ve ekranda remove ile kaldrdık.
    incomingChatDiv.querySelector(".typing-animation").remove()
    //api den gelen cevabı ekrana aktarabilmek için chat-details i seçip bir değişkene aktardık
    // const detailDiv = incomingChatDiv.querySelector("chat-details")
    // //bu detail içerisine oluşturdugumuz pElementini aktardık
    // detailDiv.appendChild(pElement)
    incomingChatDiv.querySelector(".chat-details").appendChild(pElement)

    chatInput.value = null


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


    getChatResponse(incomingChatDiv)


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



}


//olay izleyicileri
sendButton.addEventListener("click", handleOutGoingChat)

//text area ya girilen kalvyeden herhangi bir tuşa bastığımız anda bu olay izleyicisi çalışır
chatInput.addEventListener("keydown", (e) => {
    //klavyeden enter tuşuna basıldığı anda handleOutGoingChat fonk çalıştır
    if (e.key === "Enter") {
        handleOutGoingChat();
    }


})
//* ThemeButtona her tıkladığımızda bodye light mode classını ekle ve çıkar
themeButton.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    //* body light-mode classını içeriyorsa themeButton içerisindeki yazıyı dark_mode yap.İçermiyorsa light_mode yap.
    themeButton.innerText = document.body.classList.contains("light-mode")
        ? "dark_mode"
        : "light_mode";
});
//* Sil butonuna tıkladığımızda chat-container divini siler ve yerine defaultText 'i aktarır.

deleteButton.addEventListener("click", () => {
    //* Confirm ile ekrana bir mesaj bastırdık.Confirm bize true ve false değer döndürür.
    //* Tamam tuşuna basıldığında true döndürür.
    //* İptal tuşuna basıldığında false döndürür.
    if (confirm("Tüm sohbetleri silmek istediğinize emin misiniz?")) {
        chatContainer.remove();
    } else {

        const defaultText = `
      <div class="default-text">
          <h1>ChatGPT Clone</h1>
      </div>
      <div class="chat-container"></div>
      <div class="typing-container">
          <div class="typing-content">
              <div class="typing-textarea">
                  <textarea
                  id="chat-input"
                  placeholder="Aratmak istediğiniz veriyi giriniz..."
                  ></textarea>
                  <span class="material-symbols-outlined" id="send-btn"> send </span>
              </div>
              <div class="typing-controls">
                  <span class="material-symbols-outlined" id="theme-btn">
                  light_mode
                  </span>
                  <span class="material-symbols-outlined" id="delete-btn">
                  delete
                  </span>
              </div>
          </div>
      </div>
    `;

        document.body.innerHTML = defaultText;
    }
});
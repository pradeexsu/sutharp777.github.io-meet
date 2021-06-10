const MIC_OFF = "mic_off";
const MIC_ON = "more_horiz";
const TWITTER_BASE = "https://twitter.com/intent/tweet?text=Hello%20@sutharp777%20";

window.addEventListener("load", () => {
    const users = document.querySelector("div.users");
    const profile = document.querySelector("div.navbar .people");
    const msg = document.querySelector("div.navbar .msg");
    const msgContainer = document.querySelector("div.msg_container");
    const bottom = document.querySelector(".bottom");
    const sendMessageIcon = document.querySelector(".msg_container .send i");
    const currentMessage = document.querySelector(".msg_container .send input");
    const messagesList = document.querySelector(".msg_container .messages");

    let lastTime = null;

    const sixtySecElapsed = () => {
        let current = new Date();

        if (lastTime === null || (current - lastTime) / 1000 > 60) {
            lastTime = current;
            return true;
        }

        lastTime = current;
        return false;
    };

    const getFormatedTime = () => (lastTime ? `${lastTime.getHours()}:${lastTime.getMinutes()}` : "");
    const getCurrentTime = () => {
        let current = new Date();
        return `${current.getHours()}:${current.getMinutes()}`;
    };

    const displayMain = (name) => {
        document.querySelector(".main_container .active").classList.toggle("active");
        let current = document.querySelector(`.main_container  .${name}`);
        current.classList.add("active");
    };

    const navbarDisplay = (e) => {
        if (e.target.classList.contains("people")) {
            users.classList.add("active");
            profile.classList.add("selected");
            bottom.classList.add("main");
            msgContainer.classList.remove("active");
            msg.classList.remove("selected");
            bottom.classList.remove("msg");
        } else {
            msgContainer.classList.add("active");
            msg.classList.add("selected");
            bottom.classList.add("msg");
            users.classList.remove("active");
            profile.classList.remove("selected");
            bottom.classList.remove("main");
        }
    };

    const userSelected = (e) => {

        let prev = document.querySelector("div.users .selected");
        if (prev != null && prev.querySelector(".mic") != null) {
            prev.classList.remove("selected");
            prev.querySelector(".mic").innerText = MIC_OFF;
        }

        let current = e.target;
        if (current != null && current.querySelector(".mic") != null) {
            current.classList.add("selected");
            current.querySelector(".mic").innerText = MIC_ON;
            displayMain(current.classList[1]);
        }
    };

    const sendMessage = (e) => {
        if ((e.type === "click" || e.which === 13) && currentMessage.value.length > 0) {
            let newMessage = document.createElement("div");

            if (sixtySecElapsed()) {
                let dateTag = document.createElement("p");
                dateTag.innerHTML = `<b>You</b> <span>${getFormatedTime()}</span>`;
                let message = document.createElement("p");
                newMessage.appendChild(dateTag);
                message.innerText = currentMessage.value;
                newMessage.appendChild(message);
            } else {
                newMessage.innerText = currentMessage.value;
            }

            messagesList.appendChild(newMessage);
            currentMessage.value = "";
        }
    };

    const addListeners = () => {
        for (let i = 0; i < users.children.length; i++) {
            users.children[i].addEventListener("click", userSelected);
        }

        profile.addEventListener("click", navbarDisplay);
        msg.addEventListener("click", navbarDisplay);

        currentMessage.addEventListener("keypress", sendMessage);
        sendMessageIcon.addEventListener("click", sendMessage);
    };

    document.getElementById("time").innerText = getCurrentTime();
    addListeners();
});
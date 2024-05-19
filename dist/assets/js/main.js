"use strict";let preview=document.getElementById("preview"),fileName="",previewImg=document.createElement("img");function dragNdrop(e){e=e.target.files;0<e.length&&(fileName=URL.createObjectURL(e[0]),previewImg.setAttribute("src",fileName),document.querySelector(".post_img").setAttribute("src",fileName),preview.innerHTML="",preview.appendChild(previewImg))}function drag(){document.getElementById("uploadFile").parentNode.className="draging dragBox"}function drop(){document.getElementById("uploadFile").parentNode.className="dragBox"}document.querySelectorAll(".add_post_link a").forEach(function(e){e.addEventListener("click",function(e){e.preventDefault();e=e.target.id;if(console.log(e),"post-pic"===e)document.querySelector(".uploadOuter").style.display="block",document.querySelector(".post_img").style.display="block";else if("post-felling"===e)fetchingApi();else if("post-video"===e){document.getElementById("webCam").style.display="block";let t=document.getElementById("vid");e=navigator.mediaDevices;vid.muted=!0,e.getUserMedia({video:!0,audio:!0}).then(e=>{t.srcObject=e,t.addEventListener("loadedmetadata",()=>{t.play()})}).catch(alert)}})}),document.getElementById("button_value").onclick=()=>{var e=document.getElementById("input_value").value,t=(preview.style.display="none",document.querySelector(".uploadOuter").style.display="none",document.createElement("div"));t.classList.add("add_post_container"),t.style.display="block",t.innerHTML=`
        <div class="post_row">
            <div class="user_profile">
                <img src="images/5.jpg" alt="Pro We Are Pro You Now">
                <div>
                    <p>Sajeda Jomaa</p>
                    <small>${new Date}<small>
                </div>
            </div>
            <a href=""><i class=""></i></a>
        </div>
        <p>${e}</p>
        <div class="uploadOuter">
            <span class="dragBox">
                Drag and Drop image here
                <input type="file" onChange="dragNdrop(event)" ondragover="drag()" ondrop="drop()"
                    id="uploadFile" />
            </span>
        </div>
        <div class="post_image_container">
            <img class="post_img" src="${fileName}" alt="postImage">
        </div>
        <div class="post_row">
            <div class="activity_icon">
                <div><img src="images/like-blue.png" alt="Like Kardo">290</div>
                <div><img src="images/comments.png" alt="Like Kardo">98</div>
                <div><img src="images/share.png" alt="Like Kardo">9834</div>
            </div>
            <div class="post_profile_icon">
                <img src="images/5.jpg" alt="Profile Pic"> <i
                    class="fa fa-caret-down"></i>
            </div>
        </div>
    `,("http://localhost:8000/userProfile.html"===window.location.href?document.body.querySelector(".post_col"):document.body.querySelector(".main_content")).appendChild(t)};const emojiSelector=document.getElementById("emojiSelector");function fetchingApi(){emojiSelector.classList.toggle("active"),emojiSelector.style.display="block",fetch("https://emoji-api.com/emojis?access_key=8f1226c4f21f2ba77b7c603b0ade575a4271e3b5").then(e=>e.json()).then(e=>loadEmoji(e))}let selectedEmoji="";function loadEmoji(e){e.forEach(t=>{var e=document.createElement("li");e.textContent=t.character,e.addEventListener("click",function(){console.log("Emoji clicked "+t.character),selectedEmoji=t.character;var e=document.getElementById("input_value");e.value=selectedEmoji+" "+e.value,document.querySelector(".post_text").innerHTML=" "+t.character}),emojiList.appendChild(e)})}var settingsMenu=document.querySelector(".setting_menu"),darkBtn=document.getElementById("dark_btn");function settingsMenuToggle(){settingsMenu.classList.toggle("setting_menu_height")}function passvalue(){document.getElementById("")}darkBtn.onclick=function(){darkBtn.classList.toggle("dark_btn_on")};let btnGet=document.querySelector("#button_value"),inputGet=document.querySelector("#input_vlaue"),post=document.querySelector("#post");btnGet.addEventListener("click",()=>{post.innerText=inputGet.value});
//# sourceMappingURL=main.js.map

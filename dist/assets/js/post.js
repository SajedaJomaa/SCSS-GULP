"use strict";let settingsMenu=document.querySelector(".setting_menu"),darkBtn=document.getElementById("dark_btn"),input=document.getElementById("input_value"),preview=document.getElementById("preview"),previewImgs=[],modal;function createPostModal(){let a=document.createElement("div");a.classList.add("modal"),a.innerHTML=`
        <div class="modal-content">
        <div class="user_profile_modal">
        <img src="assets/images/5.jpg" alt="Pro We Are Pro You Now">
        <div>
            <p class="userName">Sajeda Jomaa</p>
            <small class="date">Public </small>
        </div>
    </div>
            <span class="close_button">&times;</span>
            <div class="post_input_container">
                <input id="input_value" placeholder="What's on Your Mind?" />
                <div id="demo">
                    <div id="review"></div>
                </div>
                <div id="previewText"></div>
                <div class="uploadOuter">
                    <span class="dragBox">
                        Drag and Drop image here
                        <input type="file" onChange="dragNdrop(event)" ondragover="drag()" ondrop="drop()"
                            id="uploadFile" />
                    </span>
                </div>
                <div id="preview"></div>
                <hr>
                <button id="button_value">Post</button>

                <div class="add_post_link">
                    <a href="#" id="post-video">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24">
                            <path fill="#e31c1c"
                                d="M16 4a1 1 0 0 1 1 1v4.2l5.213-3.65a.5.5 0 0 1 .787.41v12.08a.5.5 0 0 1-.787.41L17 14.8V19a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM7.4 8.829a.4.4 0 0 0-.392.32L7 9.228v5.542a.4.4 0 0 0 .542.374l.073-.036l4.355-2.771a.401.401 0 0 0 .063-.625l-.063-.05L7.615 8.89a.4.4 0 0 0-.215-.06" />
                        </svg>Live Video
                    </a>
                    <a href="#" id="post-pic">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24">
                            <path fill="#7dc45f" d="m12 13.5l6-4l-6-4zM9.025 17q-.825 0-1.412-.587T7.025 15V4q0-.825.588-1.412T9.025 2h11q.825 0 1.413.588T22.025 4v11q0 .825-.587 1.413T20.025 17zm-3.3 4.875q-.825.125-1.475-.4t-.75-1.35L2.15 9.2q-.1-.825.413-1.475t1.337-.75l1.125-.125V16q0 1.25.875 2.125T8.025 19H18.3q-.15.6-.6 1.038t-1.1.512z" />
                        </svg>Photo/Video
                    </a>
                    <a href="#" id="post-felling">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24">
                            <path fill="#ffde05" d="M12 17.5c2.33 0 4.3-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5M8.5 11A1.5 1.5 0 0 0 10 9.5A1.5 1.5 0 0 0 8.5 8A1.5 1.5 0 0 0 7 9.5A1.5 1.5 0 0 0 8.5 11m7 0A1.5 1.5 0 0 0 17 9.5A1.5 1.5 0 0 0 15.5 8A1.5 1.5 0 0 0 14 9.5a1.5 1.5 0 0 0 1.5 1.5M12 20a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8m0-18C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2" />
                        </svg>Feeling/Activity
                    </a>
                    <div id="webCam">
                        <video id="vid"></video>
                    </div>
                    <ul class="utility-group">
                        <li class="emoji-selector" id="emojiSelector">
                            <ul id="emojiList" class="emoji-list"></ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `,document.body.appendChild(a),a.querySelector(".close_button").onclick=function(){a.style.display="none"},window.onclick=function(e){e.target==a&&(a.style.display="none")},a.style.display="block",document.getElementById("button_value").style.display="block",a.querySelectorAll(".add_post_link a").forEach(function(e){e.addEventListener("click",function(e){e.preventDefault();e=e.target.id;if(console.log(e),"post-pic"===e)a.querySelector(".uploadOuter").style.display="block";else if("post-felling"===e)fetchingApi();else if("post-video"===e){a.querySelector("#webCam").style.display="block";let t=a.querySelector("#vid");e=navigator.mediaDevices;t.muted=!0,e.getUserMedia({video:!0,audio:!0}).then(e=>{t.srcObject=e,t.addEventListener("loadedmetadata",()=>{t.play()}),t.stream=e}).catch(alert)}})}),a.querySelector("#button_value").addEventListener("click",function(){var e=a.querySelector("#input_value").value,t=document.getElementById("preview"),i=document.querySelector(".uploadOuter"),t=(t.style.display="none",i.style.display="none",{id:Date.now(),user:{name:"Sajeda Jomaa",profileImage:"assets/images/5.jpg"},content:e,images:previewImgs,date:(new Date).toISOString(),urlPreview:{url:o.url,title:o.title,description:o.description,image:o.image,domain:o.domain}});savePostToLocalStorage(t),displayPost(t),previewImgs=[],document.getElementById("input_value").value=""});let o={};return a.querySelector("#input_value").addEventListener("keydown",function(){setTimeout(function(){var e=a.querySelector("#input_value").value.match(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi);e&&0<e.length?($("#demo").css("display","block"),$("#review").css("display","block"),$("#review").html('<center><img src="https://loading.io/spinners/spinner/index.ajax-spinner-preloader.gif" class="loading"/>'),fetchUrlPreview(e[0])):$("#review").css("display","none")},50)}),a}function settingsMenuToggle(){settingsMenu.classList.toggle("setting_menu_height")}function dragNdrop(e){e=e.target.files;0<e.length&&Array.from(e).forEach(e=>{var t=new FileReader;t.onload=function(e){var e=e.target.result,t=(previewImgs.push(e),document.createElement("img"));t.setAttribute("src",e),preview.appendChild(t)},t.readAsDataURL(e)})}function drag(){document.getElementById("uploadFile").parentNode.className="draging dragBox"}function drop(){document.getElementById("uploadFile").parentNode.className="dragBox"}function savePostToLocalStorage(e){var t=JSON.parse(localStorage.getItem("posts"))||[];t.push(e),localStorage.setItem("posts",JSON.stringify(t))}function createImageModal(){let t=document.createElement("div");t.classList.add("image-modal"),t.innerHTML=`
        <div class="image-modal-content">
            <span class="close">&times;</span>
            <div class="image-gallery"></div>
        </div>
    `,document.body.appendChild(t),t.querySelector(".close").onclick=function(){t.style.display="none"},t.onclick=function(e){e.target===t&&(t.style.display="none")}}function showImagesInModal(e){var t=document.querySelector(".image-modal");let i=t.querySelector(".image-gallery");i.innerHTML="",e.forEach(e=>{var t=document.createElement("img");t.src=e,i.appendChild(t)}),t.style.display="block"}function displayPost(i){var e=document.createElement("div");e.classList.add("add_post_container"),e.style.display="block",e.dataset.id=i.id;let a=`
        <div class="post_row">
            <div class="user_profile">
                <img src="${i.user.profileImage}" alt="Profile Image">
                <div class="post_profile_data">
                    <p class="userName">${i.user.name}</p>
                    <p class="date"><small>${new Date(i.date).toLocaleString()}</small></p>
                </div>
            </div>
            <a href=""><i class=""></i></a>
            <button class="delete_post" onclick="deletePost(${i.id})">Delete</button>
            </div>
        <p class="postContent">${i.content}</p>
    `;0<i.images.length&&(a+='<div class="post_image_container grid_image_container">',i.images.forEach((e,t)=>{t<3?a+=`<img class="post_img" src="${e}" alt="postImage" onclick="showImagesInModal(${JSON.stringify(i.images)})">`:3===t&&(a+=`
                    <div class="more_images">
                        <img class="post_img" src="${e}" alt="postImage">
                        <div class="more_overlay">+${i.images.length-4}</div>
                    </div>
                `)}),a+="</div>"),i.urlPreview&&i.urlPreview.url&&(a+=`
            <div class="url_preview">
                <a href="${i.urlPreview.url}" target="_BLANK">
                    <img src="${i.urlPreview.image}" alt="Preview Image"/>
                    <div>
                        <h4>${i.urlPreview.title}</h4>
                        <p>${i.urlPreview.description}</p>
                        <span>${i.urlPreview.domain}</span>
                    </div>
                </a>
            </div>
        `),a+=`
        <div class="post_row">
            <div class="activity_icon">
                <div><img src="assets/images/like-blue.png" alt="Like">290</div>
                <div><img src="assets/images/comments.png" alt="Comments">98</div>
                <div><img src="assets/images/share.png" alt="Share">9834</div>
            </div>
            <div class="post_profile_icon">
                <img src="assets/images/5.jpg" alt="Profile Pic"> <i class="fa fa-caret-down"></i>
            </div>
        </div>
    `,e.innerHTML=a,document.body.querySelector(".main_content").appendChild(e),e.querySelectorAll(".post_img").forEach(e=>{e.addEventListener("click",function(){showImagesInModal(i.images)})})}function deletePost(t){let e=JSON.parse(localStorage.getItem("posts"))||[];e=e.filter(e=>e.id!==t),localStorage.setItem("posts",JSON.stringify(e));var i=document.querySelector(`.add_post_container[data-id='${t}']`);i&&i.remove()}function loadPostsFromLocalStorage(){let e=localStorage.getItem("posts");if(e){try{e=JSON.parse(e)}catch(e){return void console.error("Error parsing JSON:",e)}e.sort((e,t)=>new Date(t.date)-new Date(e.date)),e.forEach(e=>{displayPost(e)})}}document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll(".add_post_link a").forEach(function(e){e.addEventListener("click",function(e){e.preventDefault();e=e.target.id;console.log(e),"post-pic"!==e&&"post-felling"!==e&&"post-video"!==e||createPostModal()})})}),input.addEventListener("click",function(){modal=createPostModal()}),darkBtn.onclick=function(){darkBtn.classList.toggle("dark_btn_on")},createImageModal(),document.addEventListener("DOMContentLoaded",()=>{loadPostsFromLocalStorage()});const emojiSelector=document.getElementById("emojiSelector"),emojiList=document.getElementById("emojiList");function fetchingApi(){emojiSelector.classList.toggle("active"),emojiSelector.style.display="block",fetch("https://emoji-api.com/emojis?access_key=8f1226c4f21f2ba77b7c603b0ade575a4271e3b5").then(e=>e.json()).then(e=>loadEmoji(e))}let selectedEmoji="";function loadEmoji(e){emojiList.innerHTML="",e.forEach(t=>{var e=document.createElement("li");e.textContent=t.character,e.addEventListener("click",function(){console.log(`Emoji clicked ${t.character} `),selectedEmoji=t.character;var e=document.getElementById("input_value");e.value=selectedEmoji+" "+e.value,document.querySelector(".post_text").innerHTML=` ${t.character} `}),emojiList.appendChild(e)})}function fetchUrlPreview(l){$.post("https://graph.facebook.com/v20.0/",{id:l,scrape:!0,access_token:"EAAiYtZBMt3wABOxW98U7pZBswevkvjVq7SXIMvchuqWZBwmcCcizmZA0yUAto6jZCq3Ku0wEBXkVj4pW5ZAx1edXUwYc8LpeNMYNrSXL9QEUu0UmG7TZCRZBw3OeluuG8uajjnFO88jgL42z4f8bPAti2UmI2ABj5XzZCcd2NOsZC6jES1GfHDisohwxZBTbumeKhvFjb2QvKSvk3ZB3riApHzv4tmCgBULIGq4fTtwZD"}).done(function(e){var t,i,a,o;e?(t=e.title||"",i=e.description||"",e=e.image[0]?e.image[0].url:"",a=l.split("/"),o='<a href="'+l+'" target="_BLANK"><img src="'+e+'"/><div><h4>'+t+"</h4><p>"+i+"</p><span>"+a[2]+"</span></div></a>",t||i||e?$("#review").html(o):$("#review").html("<p>No preview available.</p>"),urlData={url:l,title:t,description:i,image:e,domain:a[2]}):$("#review").html("<p>Unable to fetch preview.</p>")}).fail(function(){$("#review").html("<p>Error fetching preview.</p>")})}
//# sourceMappingURL=post.js.map

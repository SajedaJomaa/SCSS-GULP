let currentPage=1,isFetching=!1,hasMore=!0,lastImage;const root=document.querySelector(".fb_body");async function fetchData(){if(!isFetching&&hasMore){isFetching=!0;try{var e=await(await fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=10`)).json();console.log(e),0===e.length?hasMore=!1:(e.forEach(e=>{var t=document.createElement("div");t.classList.add("add_post_scrolling"),t.innerHTML=`
            <div class="post_col">
                <div class="post_row">
                    <div class="user_profile">
                        <img src="assets/images/5.jpg" alt="Profile Picture">
                        <div>
                            <p>Sajeda Jomaa</p>
                            <small>${(new Date).toLocaleString()}<small>
                        </div>
                    </div>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur,</p>
                <div class="post_image_container">
                    <img class="post_img" src="${e.download_url}" alt="Post Image">
                </div>
                <div class="post_row">
                    <div class="activity_icon">
                        <div><img src="assets/images/like-blue.png" alt="Like">290</div>
                        <div><img src="assets/images/comments.png" alt="Comments">98</div>
                        <div><img src="assets/images/share.png" alt="Share">9834</div>
                    </div>
                    <div class="post_profile_icon">
                        <img src="assets/images/5.jpg" alt="Profile Pic"> <i class="fa fa-caret-down"></i>
                    </div>
                </div></div>`,root.appendChild(t)}),lastImage=("http://localhost:8000/userProfile.html"===window.location.href?document.body.querySelector(".post_col"):root).lastElementChild,currentPage++,observeLastImage())}catch(e){console.error("Error fetching data:",e)}finally{isFetching=!1}}}function observeLastImage(){const t=new IntersectionObserver(e=>{e[0].isIntersecting&&!isFetching&&hasMore&&(t.unobserve(lastImage),fetchData())},{threshold:.01});lastImage&&t.observe(lastImage)}function downloadImage(e,a){fetch(e).then(e=>e.blob()).then(e=>{var t=document.createElement("a");t.href=URL.createObjectURL(e),t.download=a,document.body.appendChild(t),t.click(),document.body.removeChild(t)}).catch(e=>console.error("Download failed:",e))}fetchData();let preview=document.getElementById("preview"),previewImgs=[];function dragNdrop(e){e=e.target.files;0<e.length&&Array.from(e).forEach(e=>{var t=new FileReader;t.onload=function(e){var e=e.target.result,t=(previewImgs.push(e),document.createElement("img"));t.setAttribute("src",e),preview.appendChild(t)},t.readAsDataURL(e)})}function drag(){document.getElementById("uploadFile").parentNode.className="draging dragBox"}function drop(){document.getElementById("uploadFile").parentNode.className="dragBox"}function savePostToLocalStorage(e){var t=JSON.parse(localStorage.getItem("posts"))||[];t.push(e),localStorage.setItem("posts",JSON.stringify(t))}function displayPost(e){var t=document.createElement("div");t.classList.add("add_post_container"),t.style.display="block",t.dataset.id=e.id;let a=`
        <div class="post_row">
            <div class="user_profile">
                <img src="${e.user.profileImage}" alt="Profile Image">
                <div>
                    <p>${e.user.name}</p>
                    <small>${new Date(e.date).toLocaleString()}<small>
                </div>
            </div>
            <a href=""><i class=""></i></a>
            <button class="delete_post" onclick="deletePost(${e.id})">Delete</button>
        </div>
        <p>${e.content}</p>
    `;0<e.images.length&&(a+='<div class="post_image_container grid_image_container">',e.images.forEach(e=>{a+=`<img class="post_img" src="${e}" alt="postImage">`}),a+="</div>"),a+=`
        <div class="post_row">
            <div class="activity_icon">
                <div><img src="assets/images/like-blue.png" alt="Like Kardo">290</div>
                <div><img src="assets/images/comments.png" alt="Like Kardo">98</div>
                <div><img src="assets/images/share.png" alt="Like Kardo">9834</div>
            </div>
            <div class="post_profile_icon">
                <img src="assets/images/5.jpg" alt="Profile Pic"> <i class="fa fa-caret-down"></i>
            </div>
        </div>
    `,t.innerHTML=a,("http://localhost:8000/userProfile.html"===window.location.href?document.body.querySelector(".post_col"):document.body.querySelector(".main_content")).appendChild(t)}function deletePost(t){let e=JSON.parse(localStorage.getItem("posts"))||[];e=e.filter(e=>e.id!==t),localStorage.setItem("posts",JSON.stringify(e));var a=document.querySelector(`.add_post_container[data-id='${t}']`);a&&a.remove()}function loadPostsFromLocalStorage(){var e=JSON.parse(localStorage.getItem("posts"))||[];e.sort((e,t)=>new Date(t.date)-new Date(e.date)),e.forEach(e=>{displayPost(e)})}document.querySelectorAll(".add_post_link a").forEach(function(e){e.addEventListener("click",function(e){e.preventDefault();e=e.target.id;if(console.log(e),"post-pic"===e)document.querySelector(".uploadOuter").style.display="block";else if("post-felling"===e)fetchingApi();else if("post-video"===e){document.getElementById("webCam").style.display="block";let t=document.getElementById("vid");e=navigator.mediaDevices;t.muted=!0,e.getUserMedia({video:!0,audio:!0}).then(e=>{t.srcObject=e,t.addEventListener("loadedmetadata",()=>{t.play()})}).catch(alert)}})}),document.getElementById("button_value").onclick=()=>{var e=document.getElementById("input_value").value,e=(preview.style.display="none",document.querySelector(".uploadOuter").style.display="none",{id:Date.now(),user:{name:"Sajeda Jomaa",profileImage:"assets/images/5.jpg"},content:e,images:previewImgs,date:(new Date).toISOString()});savePostToLocalStorage(e),displayPost(e),previewImgs=[],document.getElementById("input_value").value=""},document.addEventListener("DOMContentLoaded",loadPostsFromLocalStorage);const emojiSelector=document.getElementById("emojiSelector");function fetchingApi(){emojiSelector.classList.toggle("active"),emojiSelector.style.display="block",fetch("https://emoji-api.com/emojis?access_key=8f1226c4f21f2ba77b7c603b0ade575a4271e3b5").then(e=>e.json()).then(e=>loadEmoji(e))}let selectedEmoji="";function loadEmoji(e){e.forEach(t=>{var e=document.createElement("li");e.textContent=t.character,e.addEventListener("click",function(){console.log("Emoji clicked "+t.character),selectedEmoji=t.character;var e=document.getElementById("input_value");e.value=selectedEmoji+" "+e.value,document.querySelector(".post_text").innerHTML=" "+t.character}),emojiSelector.appendChild(e)})}var settingsMenu=document.querySelector(".setting_menu"),darkBtn=document.getElementById("dark_btn");function settingsMenuToggle(){settingsMenu.classList.toggle("setting_menu_height")}function urlReview(i){$.get("https://query.yahooapis.com/v1/public/yql",{q:'SELECT content FROM data.headers WHERE url="'+i+'" and ua="de6874b9d12bdf50878895da84524018"',format:"xml",env:"store://datatables.org/alltableswithkeys"}).done(function(e){var e=$(e).find("content").text(),t=null!=$(e).filter("title").text()&&null!=$(e).filter("title").text()?$(e).filter("title").text():"",a=null!=$(e).filter('meta[name="description"]').attr("content")&&null!=$(e).filter('meta[name="description"]').attr("content")?$(e).filter('meta[name="description"]').attr("content"):null!=$(e).filter('meta[property="og:description"]').attr("content")&&null!=$(e).filter('meta[property="og:description"]').attr("content")?$(e).filter('meta[property="og:description"]').attr("content"):"",e=null!=$(e).filter('meta[property="og:image"]').attr("content")&&null!=$(e).filter('meta[property="og:image"]').attr("content")?$(e).filter('meta[property="og:image"]').attr("content"):null!=$(e).find("img:eq(0)").attr("src")&&null!=$(e).find("img:eq(0)").attr("src")?$(e).find("img:eq(0)").attr("src"):"",o=i.toString().split("/"),o='<a href="'+i+'" target="_BLANK"><img src="'+e+'"/><div><h4>'+t+"</h4><p>"+a+"</p><span>"+o[2]+"</span></div></a>";""==t&&""==a&&""==e||$("#review").html(o)})}darkBtn.onclick=function(){darkBtn.classList.toggle("dark_btn_on")},$("#input_value").keydown(function(){setTimeout(function(){var e=$("#input_value").val().match(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi);e&&0<e.length?($("#review").css("display","block"),$("#review").html('<center><img src="https://loading.io/spinners/spinner/index.ajax-spinner-preloader.svg" class="loading"/></center>'),urlReview(e)):$("#review").css("display","none")},50)});
//# sourceMappingURL=main.js.map

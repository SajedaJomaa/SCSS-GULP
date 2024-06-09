let currentPage=1,isFetching=!1,hasMore=!0,lastImage;const root=document.querySelector(".fb_body");async function fetchData(){if(!isFetching&&hasMore){isFetching=!0;try{var e=await fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=10`);if(!e.ok)throw new Error("HTTP error! status: "+e.status);var s=await e.json();console.log(s),0===s.length?hasMore=!1:(s.forEach(e=>{var s=document.createElement("div");s.classList.add("add_post_scrolling"),s.innerHTML=`
                <div class="post_col">
                    <div class="post_row">
                        <div class="user_profile">
                            <img src="assets/images/5.jpg" alt="Profile Picture">
                            <div>
                                <p class="userName">Sajeda Jomaa</p>
                                <small class="date">${(new Date).toLocaleString()}<small>
                            </div>
                        </div>
                    </div>
                    <p class="postContent">Lorem ipsum dolor sit amet consectetur,</p>
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
                    </div>
                </div>`,root.appendChild(s)}),lastImage=root.lastElementChild,currentPage++,observeLastImage())}catch(e){console.error("Error fetching data:",e)}finally{isFetching=!1}}}function observeLastImage(){const s=new IntersectionObserver(e=>{e[0].isIntersecting&&!isFetching&&hasMore&&(s.unobserve(lastImage),fetchData())},{threshold:.01});lastImage&&s.observe(lastImage)}function downloadImage(e,a){fetch(e).then(e=>e.blob()).then(e=>{var s=document.createElement("a");s.href=URL.createObjectURL(e),s.download=a,document.body.appendChild(s),s.click(),document.body.removeChild(s)}).catch(e=>console.error("Download failed:",e))}fetchData();
//# sourceMappingURL=infinityScroll.js.map

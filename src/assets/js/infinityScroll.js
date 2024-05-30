let currentPage = 1;
let isFetching = false;
let hasMore = true;
let lastImage;
const root = document.querySelector('.fb_body');

async function fetchData() {
    if (isFetching || !hasMore) return;

    isFetching = true;
    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=10`);
        const data = await response.json();
        console.log(data);

        if (data.length === 0) {
            hasMore = false;
            return;
        }
        data.forEach(image => {
            const div = document.createElement('div');
            div.classList.add("add_post_scrolling");
            div.innerHTML = `
            <div class="post_col">
                <div class="post_row">
                    <div class="user_profile">
                        <img src="assets/images/5.jpg" alt="Profile Picture">
                        <div>
                            <p class="userName">Sajeda Jomaa</p>
                            <small class="date">${new Date().toLocaleString()}<small>
                        </div>
                    </div>
                </div>
                <p class="postContent">Lorem ipsum dolor sit amet consectetur,</p>
                <div class="post_image_container">
                    <img class="post_img" src="${image.download_url}" alt="Post Image">
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
                </div></div>`;
            // if (window.location.href === 'http://localhost:8000/userProfile.html') {

            // document.body.querySelector('.post_col').appendChild(div);

            // } else {
            root.appendChild(div);
            // }
        });
        if (window.location.href === 'http://localhost:8000/userProfile.html') {
            lastImage = document.body.querySelector('.post_col').lastElementChild;
            currentPage++;
            observeLastImage();

        } else {
            lastImage = root.lastElementChild;
            currentPage++;
            observeLastImage();
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        isFetching = false;
    }
}

function observeLastImage() {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isFetching && hasMore) {
            observer.unobserve(lastImage);
            fetchData();
        }
    }, { threshold: 0.01 });

    if (lastImage) {
        observer.observe(lastImage);
    }
}

function downloadImage(url, filename) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        })
        .catch(error => console.error('Download failed:', error));
}

fetchData();


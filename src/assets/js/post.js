"use strict";

let settingsMenu = document.querySelector(".setting_menu");
let darkBtn = document.getElementById("dark_btn");
let input = document.getElementById('input_value');
let preview = document.getElementById("preview");
let previewImgs = [];
let modal;

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.add_post_link a').forEach(function (anchor) {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();
            let clickedAnchorId = event.target.id;
            console.log(clickedAnchorId);
            if (clickedAnchorId === 'post-pic') {
                createPostModal();
            } else if (clickedAnchorId === 'post-felling') {
                createPostModal();
            } else if (clickedAnchorId === 'post-video') {
                createPostModal();
            }
        })
    });
});
input.addEventListener('click', function () {
    modal = createPostModal();

});

function createPostModal() {
    let modal = document.createElement('div');

    modal.classList.add('modal');
    modal.innerHTML = `
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
    `;

    document.body.appendChild(modal);

    let closeModal = modal.querySelector('.close_button');
    closeModal.onclick = function () {
        modal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    modal.style.display = 'block';
    document.getElementById('button_value').style.display = 'block';
    modal.querySelectorAll('.add_post_link a').forEach(function (anchor) {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();
            let clickedAnchorId = event.target.id;
            console.log(clickedAnchorId);
            if (clickedAnchorId === 'post-pic') {
                modal.querySelector('.uploadOuter').style.display = 'block';
            } else if (clickedAnchorId === 'post-felling') {
                fetchingApi();
            } else if (clickedAnchorId === 'post-video') {
                modal.querySelector('#webCam').style.display = 'block';
                let video = modal.querySelector("#vid");
                let mediaDevices = navigator.mediaDevices;
                video.muted = true;
                mediaDevices
                    .getUserMedia({
                        video: true,
                        audio: true,
                    })
                    .then((stream) => {
                        video.srcObject = stream;
                        video.addEventListener("loadedmetadata", () => {
                            video.play();
                        });

                        video.stream = stream;
                    })
                    .catch(alert);
            }
        });
    });
    modal.querySelector('#button_value').addEventListener('click', function () {
        let inputValue = modal.querySelector('#input_value').value;
        let preview = document.getElementById("preview");
        let uploadOuter = document.querySelector('.uploadOuter');
        preview.style.display = 'none';
        uploadOuter.style.display = 'none';

        let post = {
            id: Date.now(),
            user: {
                name: 'Sajeda Jomaa',
                profileImage: 'assets/images/5.jpg',
            },
            content: inputValue,
            images: previewImgs,
            date: new Date().toISOString(),
            urlPreview: {
                url: urlData.url,
                title: urlData.title,
                description: urlData.description,
                image: urlData.image,
                domain: urlData.domain
            }
        };

        savePostToLocalStorage(post);
        displayPost(post);

        previewImgs = [];
        document.getElementById('input_value').value = "";
    });
    let urlData = {};


    modal.querySelector('#input_value').addEventListener('keydown', function () {
        setTimeout(function () {
            let status = modal.querySelector('#input_value').value;

            let urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
                url = status.match(urlRegex);

            if (url) {
                if (url.length > 0) {
                    $('#demo').css("display", "block");
                    $('#review').css("display", "block");
                    $('#review').html('<center><img src="https://loading.io/spinners/spinner/index.ajax-spinner-preloader.gif" class="loading"/>');

                    fetchUrlPreview(url[0]);
                } else {
                    $('#review').css("display", "none");
                }
            } else {
                $('#review').css("display", "none");
            }
        }, 50);
    });

    return modal;
}

function settingsMenuToggle() {
    settingsMenu.classList.toggle("setting_menu_height");
}

darkBtn.onclick = function () {
    darkBtn.classList.toggle("dark_btn_on");
};



function dragNdrop(event) {
    let files = event.target.files;
    if (files.length > 0) {
        Array.from(files).forEach(file => {
            let reader = new FileReader();
            reader.onload = function (e) {
                let base64Image = e.target.result;
                previewImgs.push(base64Image);

                let previewImg = document.createElement("img");
                previewImg.setAttribute("src", base64Image);
                preview.appendChild(previewImg);
            };
            reader.readAsDataURL(file);
        });
    }
}

function drag() {
    document.getElementById('uploadFile').parentNode.className = 'draging dragBox';
}

function drop() {
    document.getElementById('uploadFile').parentNode.className = 'dragBox';
}





function savePostToLocalStorage(post) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
}



function createImageModal() {
    let modal = document.createElement('div');
    modal.classList.add('image-modal');
    modal.innerHTML = `
        <div class="image-modal-content">
            <span class="close">&times;</span>
            <div class="image-gallery"></div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.close').onclick = function () {
        modal.style.display = 'none';
    };

    modal.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

createImageModal();

function showImagesInModal(images) {
    let modal = document.querySelector('.image-modal');
    let gallery = modal.querySelector('.image-gallery');
    gallery.innerHTML = '';

    images.forEach(imgSrc => {
        let img = document.createElement('img');
        img.src = imgSrc;
        gallery.appendChild(img);
    });

    modal.style.display = 'block';
}

function displayPost(post) {
    let add_post_container = document.createElement('div');
    add_post_container.classList.add('add_post_container');
    add_post_container.style.display = 'block';
    add_post_container.dataset.id = post.id;

    let postContent = `
        <div class="post_row">
            <div class="user_profile">
                <img src="${post.user.profileImage}" alt="Profile Image">
                <div class="post_profile_data">
                    <p class="userName">${post.user.name}</p>
                    <p class="date"><small>${new Date(post.date).toLocaleString()}</small></p>
                </div>
            </div>
            <a href=""><i class=""></i></a>
            <button class="delete_post" onclick="deletePost(${post.id})">Delete</button>
            </div>
        <p class="postContent">${post.content}</p>
    `;

    if (post.images.length > 0) {
        postContent += `<div class="post_image_container grid_image_container">`;
        post.images.forEach((imgSrc, index) => {
            if (index < 3) {
                postContent += `<img class="post_img" src="${imgSrc}" alt="postImage" onclick="showImagesInModal(${JSON.stringify(post.images)})">`;
            } else if (index === 3) {
                postContent += `
                    <div class="more_images">
                        <img class="post_img" src="${imgSrc}" alt="postImage">
                        <div class="more_overlay">+${post.images.length - 4}</div>
                    </div>
                `;
            }
        });
        postContent += `</div>`;
    }

    if (post.urlPreview && post.urlPreview.url) {
        postContent += `
            <div class="url_preview">
                <a href="${post.urlPreview.url}" target="_BLANK">
                    <img src="${post.urlPreview.image}" alt="Preview Image"/>
                    <div>
                        <h4>${post.urlPreview.title}</h4>
                        <p>${post.urlPreview.description}</p>
                        <span>${post.urlPreview.domain}</span>
                    </div>
                </a>
            </div>
        `;
    }

    postContent += `
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
    `;

    add_post_container.innerHTML = postContent;

    // if (window.location.href === 'http://localhost:8000/userProfile.html') {
    document.body.querySelector('.main_content').appendChild(add_post_container);

    add_post_container.querySelectorAll('.post_img').forEach(img => {
        img.addEventListener('click', function () {
            showImagesInModal(post.images);
        });
    });
}


function deletePost(postId) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts = posts.filter(post => post.id !== postId);
    localStorage.setItem('posts', JSON.stringify(posts));

    let postElement = document.querySelector(`.add_post_container[data-id='${postId}']`);
    if (postElement) {
        postElement.remove();
    }
}

function loadPostsFromLocalStorage() {
    let posts = localStorage.getItem('posts');
    if (!posts) {
        return;
    }

    try {
        posts = JSON.parse(posts);
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return;
    }

    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    posts.forEach(post => {
        displayPost(post);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadPostsFromLocalStorage();
});

const emojiSelector = document.getElementById('emojiSelector');
const emojiList = document.getElementById('emojiList');

function fetchingApi() {
    emojiSelector.classList.toggle('active');
    emojiSelector.style.display = 'block';
    fetch('https://emoji-api.com/emojis?access_key=8f1226c4f21f2ba77b7c603b0ade575a4271e3b5')
        .then(res => res.json())
        .then(data => loadEmoji(data));
}

let selectedEmoji = '';

function loadEmoji(data) {
    emojiList.innerHTML = '';
    data.forEach(emoji => {
        let li = document.createElement('li');
        li.textContent = emoji.character;
        li.addEventListener('click', function () {
            console.log(`Emoji clicked ${emoji.character} `);
            selectedEmoji = emoji.character;
            let inputField = document.getElementById('input_value');
            inputField.value = selectedEmoji + ' ' + inputField.value;
            document.querySelector('.post_text').innerHTML = ` ${emoji.character} `;
        });
        emojiList.appendChild(li);
    });
}
// let urlData = {};

// $('#input_value').keydown(function () {
//     setTimeout(function () {
//         let status = $('#input_value').val();

//         let urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
//             url = status.match(urlRegex);

//         if (url) {
//             if (url.length > 0) {
//                 $('#demo').css("display", "block");
//                 $('#review').css("display", "block");
//                 $('#review').html('<center><img src="https://loading.io/spinners/spinner/index.ajax-spinner-preloader.gif" class="loading"/>');

//                 fetchUrlPreview(url[0]);
//             } else {
//                 $('#review').css("display", "none");
//             }
//         } else {
//             $('#review').css("display", "none");
//         }
//     }, 50);
// });

function fetchUrlPreview(url) {
    let access_token = "EAAiYtZBMt3wABOxW98U7pZBswevkvjVq7SXIMvchuqWZBwmcCcizmZA0yUAto6jZCq3Ku0wEBXkVj4pW5ZAx1edXUwYc8LpeNMYNrSXL9QEUu0UmG7TZCRZBw3OeluuG8uajjnFO88jgL42z4f8bPAti2UmI2ABj5XzZCcd2NOsZC6jES1GfHDisohwxZBTbumeKhvFjb2QvKSvk3ZB3riApHzv4tmCgBULIGq4fTtwZD";

    $.post("https://graph.facebook.com/v20.0/", {
        id: url,
        scrape: true,
        access_token: access_token
    }).done(function (response) {
        if (response) {
            let title = response.title || '',
                description = response.description || '',
                image = response.image[0] ? response.image[0].url : '',
                domain = url.split("/");

            let review = '<a href="' + url + '" target="_BLANK">'
                + '<img src="' + image + '"/>'
                + '<div><h4>' + title + '</h4>'
                + '<p>' + description + '</p>'
                + '<span>' + domain[2] + '</span></div></a>';

            if (title || description || image) {
                $('#review').html(review);
            } else {
                $('#review').html('<p>No preview available.</p>');
            }

            urlData = {
                url: url,
                title: title,
                description: description,
                image: image,
                domain: domain[2]
            };
        } else {
            $('#review').html('<p>Unable to fetch preview.</p>');
        }
    }).fail(function () {
        $('#review').html('<p>Error fetching preview.</p>');
    });
}
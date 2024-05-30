"use strict";

var settingsMenu = document.querySelector(".setting_menu");
var darkBtn = document.getElementById("dark_btn");

function settingsMenuToggle() {
    settingsMenu.classList.toggle("setting_menu_height");
}

darkBtn.onclick = function () {
    darkBtn.classList.toggle("dark_btn_on");
};

let preview = document.getElementById("preview");
let previewImgs = [];

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

document.querySelectorAll('.add_post_link a').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
        event.preventDefault();
        let clickedAnchorId = event.target.id;
        console.log(clickedAnchorId);
        if (clickedAnchorId === 'post-pic') {
            document.querySelector('.uploadOuter').style.display = 'block';
        } else if (clickedAnchorId === 'post-felling') {
            fetchingApi();
        } else if (clickedAnchorId === 'post-video') {
            document.getElementById('webCam').style.display = 'block';
            let video = document.getElementById("vid");
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
                })
                .catch(alert);
        }
    });
});

document.getElementById('button_value').onclick = () => {
    let inputValue = document.getElementById('input_value').value;
    preview.style.display = 'none';
    document.querySelector('.uploadOuter').style.display = 'none';

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
};


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
                <div>
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

    if (window.location.href === 'http://localhost:8000/userProfile.html') {
        document.body.querySelector('.post_col').appendChild(add_post_container);
    } else {
        document.body.querySelector('.main_content').appendChild(add_post_container);
    }
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
    let posts = JSON.parse(localStorage.getItem('posts')) || [];

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
let urlData = {};

$('#input_value').keydown(function () {
    setTimeout(function () {
        let status = $('#input_value').val();

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

function fetchUrlPreview(url) {
    let access_token = "EAAiYtZBMt3wABOZCMYY44ya5dtvA4SJAFxd2MqZCZBJNTseanjNcg2H8Hl6yYT0IKEJpCEugHaNbVE1NokKfEtXbf4zcUZCRlS2lhqxXSkW7LdK192KkeKXMY5brDQQD3PYQOZBzA4kKyOuvZAlPE93Rc4ep3RbqSXkZBxGk8UWGxzzml8V19xbaMsCzgrjOv0uZAlTmZCJ74Dbfi9a5UT8SvcLogoS8xVdTDrRAZDZD";

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

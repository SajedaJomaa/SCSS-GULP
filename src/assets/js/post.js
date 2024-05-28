"use strict";

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
                    <p>${post.user.name}</p>
                    <small>${new Date(post.date).toLocaleString()}<small>
                </div>
            </div>
            <a href=""><i class=""></i></a>
            <button class="delete_post" onclick="deletePost(${post.id})">Delete</button>
        </div>
        <p>${post.content}</p>
    `;

    if (post.images.length > 0) {
        postContent += `<div class="post_image_container grid_image_container">`;
        post.images.forEach(imgSrc => {
            postContent += `<img class="post_img" src="${imgSrc}" alt="postImage">`;
        });
        postContent += `</div>`;
    }

    postContent += `
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
    `;

    add_post_container.innerHTML = postContent;

    if (window.location.href === 'http://localhost:8000/userProfile.html') {
        document.body.querySelector('.post_col').appendChild(add_post_container);
    } else {
        document.body.querySelector('.main_content').appendChild(add_post_container);
    }
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

document.addEventListener('DOMContentLoaded', loadPostsFromLocalStorage);

const emojiSelector = document.getElementById('emojiSelector');

function fetchingApi() {
    emojiSelector.classList.toggle('active');
    emojiSelector.style.display = 'block';
    fetch('https://emoji-api.com/emojis?access_key=8f1226c4f21f2ba77b7c603b0ade575a4271e3b5')
        .then(res => res.json())
        .then(data => loadEmoji(data))
}

let selectedEmoji = '';

function loadEmoji(data) {
    data.forEach(emoji => {
        let li = document.createElement('li');
        li.textContent = emoji.character;
        li.addEventListener('click', function () {
            console.log(`Emoji clicked ${emoji.character}`);
            selectedEmoji = emoji.character;
            let inputField = document.getElementById('input_value');
            inputField.value = selectedEmoji + ' ' + inputField.value;
            document.querySelector('.post_text').innerHTML = ` ${emoji.character}`;
        });
        emojiSelector.appendChild(li);
    });
}

var settingsMenu = document.querySelector(".setting_menu");
var darkBtn = document.getElementById("dark_btn");

function settingsMenuToggle() {
    settingsMenu.classList.toggle("setting_menu_height");
}
darkBtn.onclick = function () {
    darkBtn.classList.toggle("dark_btn_on");
}

//********************************************************* */
// *********************************************************/
//********************************************************* */
//************************************************************* */
$('#input_value').keydown(function () {
    setTimeout(function () {
        var status = $('#input_value').val();

        var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
            url = status.match(urlRegex);

        if (url) {
            if (url.length > 0) {
                $('#review').css("display", "block");
                $('#review').html('<center><img src="https://loading.io/spinners/spinner/index.ajax-spinner-preloader.svg" class="loading"/></center>');

                urlReview(url);

            } else {
                $('#review').css("display", "none");
            }
        } else {
            $('#review').css("display", "none");
        }
    }, 50);
});

function urlReview(url) {
    var user_agent = "de6874b9d12bdf50878895da84524018";

    $.get("https://query.yahooapis.com/v1/public/yql", {
        q: "SELECT content FROM data.headers WHERE url=\"" + url + "\" and ua=\"" + user_agent + "\"",
        format: "xml",
        env: "store://datatables.org/alltableswithkeys"
    }).done(function (xml) {

        var html = $(xml).find("content").text();

        var title = ($(html).filter("title").text() != null && $(html).filter("title").text() != undefined ? $(html).filter("title").text() : ''),
            description = ($(html).filter('meta[name="description"]').attr("content") != null && $(html).filter('meta[name="description"]').attr("content") != undefined ? $(html).filter('meta[name="description"]').attr("content") : ($(html).filter('meta[property="og:description"]').attr("content") != null && $(html).filter('meta[property="og:description"]').attr("content") != undefined ? $(html).filter('meta[property="og:description"]').attr("content") : '')),
            image = ($(html).filter('meta[property="og:image"]').attr("content") != null && $(html).filter('meta[property="og:image"]').attr("content") != undefined ? $(html).filter('meta[property="og:image"]').attr("content") : ($(html).find("img:eq(0)").attr("src") != null && $(html).find("img:eq(0)").attr("src") != undefined ? $(html).find("img:eq(0)").attr("src") : ''));

        var domain = url.toString().split("/");

        var review = '<a href="' + url + '" target="_BLANK">'
            + '<img src="' + image + '"/>'
            + '<div><h4>' + title + '</h4>'
            + '<p>' + description + '</p>'
            + '<span>' + domain[2] + '</span></div></a>';

        if (title != '' || description != '' || image != '') {
            $('#review').html(review);
        }
    });
}

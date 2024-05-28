"use strict";

let preview = document.getElementById("preview");
let fileName = '';
let previewImg = document.createElement("img");

// Function to handle drag and drop of images
function dragNdrop(event) {
    let files = event.target.files;
    if (files.length > 0) {
        fileName = URL.createObjectURL(files[0]);
        previewImg.setAttribute("src", fileName);
        document.querySelector('.post_img').setAttribute("src", fileName);
        preview.innerHTML = "";
        preview.appendChild(previewImg);
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
            document.querySelector('.post_img').style.display = 'block';
        } else if (clickedAnchorId === 'post-felling') {
            fetchingApi();
        } else if (clickedAnchorId === 'post-video') {
            document.getElementById('webCam').style.display = 'block';
            let video = document.getElementById("vid");
            let mediaDevices = navigator.mediaDevices;
            vid.muted = true;
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
function isValidURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}
document.getElementById('input_value').addEventListener('input', function () {
    const inputValue = document.getElementById('input_value').value;

    if (isValidURL(inputValue)) {

    } else {
        alert('text');
    }
});

document.getElementById('button_value').onclick = () => {
    let inputValue = document.getElementById('input_value').value;
    preview.style.display = 'none';
    document.querySelector('.uploadOuter').style.display = 'none';
    let add_post_container = document.createElement('div');
    add_post_container.classList.add('add_post_container');
    add_post_container.style.display = 'block';
    // let img = document.createElement('img');
    // img.classList.add('add_post_img');
    // let text_input = document.createElement('p');
    // text_input.classList.add('add_post_text_input');


    add_post_container.innerHTML = `
        <div class="post_row">
            <div class="user_profile">
                <img src="images/5.jpg" alt="Pro We Are Pro You Now">
                <div>
                    <p>Sajeda Jomaa</p>
                    <small>${new Date()}<small>
                </div>
            </div>
            <a href=""><i class=""></i></a>
        </div>
        <p>${inputValue}</p>
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
    `;

    if (window.location.href === 'http://localhost:8000/userProfile.html') {
        document.body.querySelector('.post_col').appendChild(add_post_container);
    } else {
        document.body.querySelector('.main_content').appendChild(add_post_container);
    }
    fileName = "";
    inputValue = "";

};




//Emoji Part
const emojiSelector = document.getElementById('emojiSelector');

function fetchingApi() {
    emojiSelector.classList.toggle('active');
    emojiSelector.style.display = 'block';
    fetch('https://emoji-api.com/emojis?access_key=8f1226c4f21f2ba77b7c603b0ade575a4271e3b5')
        .then(res => res.json())
        .then(data => loadEmoji(data))
}

let selectedEmoji = ''; // Global variable to store the selected emoji


function loadEmoji(data) {
    data.forEach(emoji => {
        let li = document.createElement('li');
        li.textContent = emoji.character;
        li.addEventListener('click', function () {
            console.log(`Emoji clicked ${emoji.character}`);
            selectedEmoji = emoji.character; // Set the selected emoji
            let inputField = document.getElementById('input_value');
            inputField.value = selectedEmoji + ' ' + inputField.value; // Append emoji to input field
            document.querySelector('.post_text').innerHTML = ` ${emoji.character}`;
        });
        emojiList.appendChild(li);
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
function passvalue() {
    var message = document.getElementById("")
}

let btnGet = document.querySelector('#button_value');
let inputGet = document.querySelector('#input_vlaue');
let post = document.querySelector('#post');

btnGet.addEventListener('click', () => {
    post.innerText = inputGet.value;
});

//********************************************************* */
// *********************************************************/
//********************************************************* */
//************************************************************* */
function isValidURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

function MiniPreview($el, options) {
    this.$el = $el;
    this.$el.addClass('mini-preview-anchor');
    this.options = $.extend({}, this.defaultOptions, options);
    this.counter = MiniPreview.prototype.sharedCounter++;
}

MiniPreview.prototype = {
    sharedCounter: 0,

    defaultOptions: {
        width: 256,
        height: 144,
        scale: 0.25,
        prefetch: 'pageload'
    },

    generate: function () {
        this.createElements();
        this.setPrefetch();
    },

    createElements: function () {
        var $wrapper = $('<div>', { class: 'mini-preview-wrapper' });
        var $loading = $('<div>', { class: 'mini-preview-loading' }).text('Loading...');
        var $frame = $('<iframe>', { class: 'mini-preview-frame' });
        var $cover = $('<div>', { class: 'mini-preview-cover' }).text('Preview');
        $wrapper.append($loading, $frame, $cover).appendTo(this.$el);

        // sizing
        $wrapper.css({
            width: this.options.width + 'px',
            height: this.options.height + 'px'
        });

        // scaling
        var inversePercent = 100 / this.options.scale;
        $frame.css({
            width: inversePercent + '%',
            height: inversePercent + '%',
            transform: 'scale(' + this.options.scale + ')'
        });

        // positioning
        var fontSize = parseInt(this.$el.css('font-size').replace('px', ''), 10);
        var top = (this.$el.height() + fontSize) / 2;
        var left = (this.$el.width() - $wrapper.outerWidth()) / 2;
        $wrapper.css({
            top: top + 'px',
            left: left + 'px'
        });
    },

    setPrefetch: function () {
        switch (this.options.prefetch) {
            case 'pageload':
                this.loadPreview();
                break;
            case 'parenthover':
                this.$el.parent().one('mouseenter', this.loadPreview.bind(this));
                break;
            case 'none':
                this.$el.one('mouseenter', this.loadPreview.bind(this));
                break;
            default:
                throw 'Prefetch setting not recognized: ' + this.options.prefetch;
        }
    },

    loadPreview: function () {
        var url = this.$el.val();
        if (!isValidURL(url)) {
            alert('Invalid URL');
            return;
        }

        this.$el.find('.mini-preview-frame')
            .attr('src', url)
            .on('load', function () {
                // some sites don't set their background color
                $(this).css('background-color', '#fff');
            });
    },

    destroy: function () {
        this.$el.removeClass('mini-preview-anchor');
        this.$el.parent().off('mouseenter');
        this.$el.off('mouseenter');
        this.$el.find('.mini-preview-wrapper').remove();
    }
};

// Load the preview when the document is ready
$(document).ready(function () {
    var elements = $('#input_value');
    var options = {
        width: 300,
        height: 200,
        scale: 0.5,
        prefetch: 'parenthover'
    };
    initializeMiniPreview(elements, options);
});

// Event listener for input changes
document.getElementById('input_value').addEventListener('input', function () {
    const inputValue = this.value; // Get the current input value

    if (isValidURL(inputValue)) {
        updatePreview(inputValue);
        document.getElementById('previewLink').style.display = 'block';
    } else {
        alert('The input is not a valid URL.');
    }
});


function isValidURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

document.getElementById('input_value').addEventListener('input', function () {
    const inputValue = this.value; // Get the current input value

    if (isValidURL(inputValue)) {
        updatePreview(inputValue);
    } else {
        alert('The input is normal text.');
    }
});

function updatePreview(url) {
    var frame = document.querySelector('.mini-preview-frame');
    if (frame) {
        frame.src = url;
    }
    var previewText = document.getElementById('previewText');
    if (previewText) {
        previewText.textContent = url;
    }
}






// Function to update the preview based on the URL
function updatePreview(url) {
    var previewText = document.getElementById('previewText');
    if (previewText) {
        previewText.textContent = url;
    }


    // Show a regular preview for other URLs
    var frame = document.querySelector('.mini-preview-frame');
    if (frame) {
        frame.src = url;
    }

}

// Event listener for input changes
document.getElementById('input_value').addEventListener('input', function () {
    const inputValue = this.value; // Get the current input value

    if (isValidURL(inputValue)) {
        updatePreview(inputValue);
    } else {
        alert('The input is normal text.');
    }
});

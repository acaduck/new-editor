document.addEventListener("DOMContentLoaded", function (event) {

const setFocusInParent = (obj) => {
    const parent = obj.parentElement
    parent.setAttribute('style',
        'background-color: transparent;' +
        'border-color:#6cbbf7;' +
        'outline:none;' +
        'box-shadow:0 0 0 4px rgba(0,149,255,0.25);' +
        'border-radius:3px;'
    )
}
const setFocusOutParent = (obj) => {
    const parent = obj.parentElement;
    parent.setAttribute('style', 'border:1px solid #c4c4c4;box-shadow:none');
}


const tagContainer = document.querySelector(".tag-container");
const inputBox = document.querySelector("#superficial-tag");
const originInput = document.querySelector("#id_tags");

inputBox.addEventListener('focus', (event) => {
    setFocusInParent(inputBox);
})
inputBox.addEventListener('blur', (event) => {
    setFocusOutParent(inputBox);
})

let tags = []

function createTag(label) {
    const div = document.createElement('div');
    div.setAttribute('class', 'tag')
    const span = document.createElement("span");
    span.innerHTML = label;
    // const cancelButton = document.createElement('button');
    // cancelButton.setAttribute("class", "closeBtn");
    // cancelButton.setAttribute('data-item', label);
    const closeSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    closeSVG.setAttribute("class", "closeBtn");
    closeSVG.setAttribute("height", "16px");
    closeSVG.setAttribute("width", "16px");
    closeSVG.setAttribute("viewBox", "0 0 48 48");
    closeSVG.setAttribute('data-item', label);
    const defsInCloseIcon = document.createElement("defs")
    defsInCloseIcon.innerHTML = '<style>.close-button{fill:#8d96a0;}</style>'
    const pathInCloseIcon = '<path class="close-button" d="M12.45 37.65 10.35 35.55 21.9 24 10.35 12.45 12.45 10.35 24 21.9 35.55 10.35 37.65 12.45 26.1 24 37.65 35.55 35.55 37.65 24 26.1Z"/>'
    closeSVG.appendChild(defsInCloseIcon);
    closeSVG.innerHTML += pathInCloseIcon;

    // cancelButton.appendChild(closeSVG);
    div.appendChild(span);
    div.appendChild(closeSVG);

    return div;
}

function initTags() {
    if (originInput.value) {
        const tags = originInput.value.split(",");
        addTags(tags);
    }
}

initTags();


function reset() {
    document.querySelectorAll('.tag').forEach(function (tag) {
        tag.parentElement.removeChild(tag);
    })
}

function addTags() {
    reset()
    const newTags = Array.from(tags.slice().reverse());
    for (let i = 0; i < newTags.length; i++) {
        const addThis = createTag(newTags[i]);
        tagContainer.prepend(addThis);
    }
    const finalTags = document.querySelectorAll('.tag span');
    let text = '';
    for (let i = 0; i < finalTags.length; i++) {
        text += finalTags[i].textContent + ",";
    }
    originInput.value = text.replace(/,\s*$/, "");
}


// reset the suggest tag box
const resetTagFilter = () => {
    const tagFilter = document.querySelector('#tag-filter');
    tagFilter.innerHTML = ''
    tagFilter.setAttribute('style', 'display:none');
}

// getCookie from project.js
const csrftoken = getCookie('csrftoken');
const searchTag = (searchText) => {
    try {
        fetch('/search/tag/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({q: searchText}),
            mode: 'same-origin'
        })
            .then(response => response.json())
            .then((data) => {
                if (data.length > 0) {
                    const tagFilter = document.querySelector('#tag-filter');
                    tagFilter.setAttribute('style', 'display:grid');
                    tagFilter.replaceChildren()
                    const keys = Object.keys(data)
                    for (let key = 0; key < keys.length; key++) {
                        let tagHtml = "<a class='suggest-tag'><span class='std-badge'>" + data[key].fields.name + "</span></a>";
                        tagFilter.innerHTML += tagHtml;
                    }
                }
            })
    } catch (error) {
        console.log(error)
    }
}
inputBox.addEventListener('keyup', (e) => {
    if (inputBox.value.length >= 1) {
        if (e.keyCode === 13) {
            tags.push(inputBox.value);
            addTags();
            inputBox.value = "";
            resetTagFilter();
        } else {
            searchTag(inputBox.value);
        }
    }
})

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('closeBtn')) {
        const value = e.target.getAttribute('data-item');
        const index = tags.indexOf(value);
        tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
        addTags();
    } else if (e.target.classList.contains('suggest-tag')) {
        tags.push(e.target.firstChild.textContent);
        addTags();
        inputBox.value = "";
        resetTagFilter()
    }
})

});


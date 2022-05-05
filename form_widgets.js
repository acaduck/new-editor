document.addEventListener("DOMContentLoaded", function(event) {

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

    let tags = [];

    function createTag(label) {
        const div = document.createElement('div');
        div.setAttribute('class', 'tag')
        const span = document.createElement("span");
        span.innerHTML = label;
        const closeSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        closeSVG.setAttribute("class", "closeBtn");
        closeSVG.setAttribute("height", "16px");
        closeSVG.setAttribute("width", "16px");
        closeSVG.setAttribute("viewBox", "0 0 48 48");
        closeSVG.setAttribute('data-item', label);
        const defsInCloseIcon = document.createElement("defs")
        defsInCloseIcon.innerHTML = '<style>.close-button{fill:#8d96a0;}.close-button:hover{fill:#0056b3;}</style>'

        const pathInCloseIcon = '<path class="close-button" d="M12.45 37.65 10.35 35.55 21.9 24 10.35 12.45 12.45 10.35 24 21.9 35.55 10.35 37.65 12.45 26.1 24 37.65 35.55 35.55 37.65 24 26.1Z"/>'
        closeSVG.appendChild(defsInCloseIcon);
        closeSVG.innerHTML += pathInCloseIcon;

        div.appendChild(span);
        div.appendChild(closeSVG);

        return div;
    }

    function initTags() {
        if (originInput.value) {
            tags = originInput.value.split(",");
            addTags();
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
        tags.slice().reverse().forEach(function (tag) {
            const addthis = createTag(tag);
            tagContainer.prepend(addthis);
        });
        const finalTags = document.querySelectorAll('.tag span');
        let text = '';
        for (let i = 0; i < finalTags.length; i++) {
            text += finalTags[i].textContent + ",";
        }
        originInput.value = text.replace(/,\s*$/, "");
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const csrftoken = getCookie('csrftoken');
    const searchTag = async (searchText) => {
        try {
            const response = await fetch('/search/tag/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({q: searchText}),
                'X-CSRFToken': csrftoken,
                mode: 'same-origin'
            })
            const data = await response.json();
            if (data.length > 0) {
                var tagFilter = document.querySelector('#tag-filter');
                tagFilter.setAttribute('style', 'display:grid');
                tagFilter.replaceChildren()
                const keys = Object.keys(data)
                for (let key = 0; key < keys.length; key++) {
                    var tagHtml = "<a class='suggest-tag'><span class='std-badge'>" + data[key].fields.name + "</span></a>";
                    tagFilter.innerHTML += tagHtml;
                }
                document.querySelectorAll('.suggest-tag').forEach((element) => {
                    element.addEventListener('click', (e) => {
                        tags.push(e.target.firstChild.textContent);
                        addTags();
                        inputBox.value = "";
                        tagFilter.replaceChildren()
                        tagFilter.setAttribute('style', 'display:none');
                    })
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    inputBox.addEventListener('keyup', (e) => {
        var inputValue = inputBox.value;
        if (inputValue.length >= 1) {
            if (e.key === 'Enter') {
                tags.push(inputValue);
                addTags();
                inputBox.value = "";
            } else {
                searchTag(inputValue);
            }
        }
    })


    document.addEventListener('click', function (e) {
        if (e.target.className.baseVal === 'closeBtn') {
            const value = e.target.getAttribute('data-item');
            const index = tags.indexOf(value);
            tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
            // console.log(tags);
            addTags();
        }
    })

});


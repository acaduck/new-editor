// global functions
const getCookie = (name) => {
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


const fpAlert = (message) => {
    let alertContainer = document.createElement('div');
    alertContainer.setAttribute('class', 'alter-container');
    let fpAlertBox = document.createElement('div');
    fpAlertBox.setAttribute('id', 'fp-alert');
    fpAlertBox.textContent = message;
    fpAlertBox.style.display = 'block';
    alertContainer.appendChild(fpAlertBox)
    document.body.appendChild(alertContainer);
    setTimeout(() => {
        document.body.removeChild(alertContainer);
    }, 2000)
}

// end of global functions


/* Project specific Javascript goes here. */
document.addEventListener("DOMContentLoaded", function (event) {

    // search box style
    const searchInput = document.querySelector('#searchInput');
    searchInput.addEventListener('focus', () => {
        setFocusInParent(searchInput);
    });
    searchInput.addEventListener('blur', () => {
        setFocusOutParent(searchInput);
    });

    // left sidebar

    const toggleLocation = () => {
        const locations = {
            'home-page': '.location1',
            'question-page': '.location2',
            'tag-page': '.location3',
            'users-page': '.location4',
            'job-page': '.location5',
        }
        const pageType = document.querySelector("#fp-general-container")
        if (pageType) {
            const keys = Object.keys(locations)
            for (let i = 0; i < keys.length; i++) {
                if (pageType.classList.contains(keys[i])) {
                    document.querySelector(locations[keys[i]]).classList.add('fp-here');
                }
            }
        }
    }
    toggleLocation()

    var currentUrl = window.location.href;
    if (currentUrl.includes("?next=")) {
        currentUrl = currentUrl.split("?next=")[0]
    }
    if (currentUrl === 'https://www.firprin.com/accounts/login/') {
        document.body.setAttribute('style',
            'background-image: url("https://www.firprin.com/static/images/login.svg");' +
            'background-size: cover;' +
            'background-position: center;',
            'background-repeat: no-repeat;',
        )
    }
    if (currentUrl === 'https://www.firprin.com/accounts/signup/') {
        document.body.setAttribute('style',
            'background-image: url("https://www.firprin.com/static/images/signup.svg");' +
            'background-size: cover;' +
            'background-position: fixed;' +
            'background-repeat: no-repeat;'
        )
    }


// ----end of global---- //
});


function showLogin() {
    document.querySelector('#loginItems').classList.toggle("show");
}

function showLogout() {
    document.querySelector('#logoutItems').classList.toggle("show");
}







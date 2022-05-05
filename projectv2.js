/* Project specific Javascript goes here. */
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
        const pageType = document.querySelector("#std-general-container")
        if (pageType) {
            const keys = Object.keys(locations)
            for (let i = 0; i < keys.length; i++) {
                if (pageType.classList.contains(keys[i])) {
                    document.querySelector(locations[keys[i]]).classList.add('std-here');
                }
            }
        }
    }
    toggleLocation()
    // const pageType = document.querySelector("#std-general-container")
    // if (pageType) {
    //     if (pageType.classList.contains("home-page")) {
    //         console.log('true');
    //         document.querySelector('.location1').classList.add('std-here');
    //     } else if (pageType.classList.contains("question-page")) {
    //         document.querySelector('.location2').classList.add('std-here');
    //     } else if (pageType.classList.contains("tag-page")) {
    //         document.querySelector('.location3').classList.add('std-here');
    //     } else if (pageType.classList.contains("users-page")) {
    //         document.querySelector('.location4').classList.add('std-here');
    //     } else if (pageType.classList.contains("job-page")) {
    //         document.querySelector('.location5').classList.add('std-here');
    //     }
    // }

    document.querySelector('.close').addEventListener('click', () => {
        document.querySelector(".alert-success").style.display = 'none';
    })


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







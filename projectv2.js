/* Project specific Javascript goes here. */
$(document).ready(function () {

    //question comment box hide-show toggle
    $('.object-comment').on('click', function (event) {
        let name1 = $(this).attr('data-pid');
        let commentBox = $('#' + name1)
        let replyToWho = $(this).attr('data-rname')
        let replyToUser = $(".reply-to-user", commentBox)
        let replyToInput = $(">form>input[name='reply_to']", commentBox)

        if (commentBox.is(":visible")) {
            if ($(this).attr('data-rid')) {
                if (parseInt($(this).attr('data-rid')) == parseInt(replyToInput.val())) {
                    commentBox[0].style.display = 'none';
                } else {
                    $('>span', replyToUser).html(replyToWho);
                    replyToUser[0].style.display = 'block';
                    replyToInput.val(parseInt($(this).attr('data-rid')));
                }
            } else {
                if (!replyToInput.val()) {
                    commentBox[0].style.display = 'none';
                } else {
                    replyToInput.val('');
                    $('>span', replyToUser).html('');
                    replyToUser[0].style.display = 'none';
                }
            }
        } else {
            commentBox[0].style.display = 'block';
            var closeButton = $(">form>div>button[name='cancel-comment']", commentBox);
            closeButton.attr("close-target", name1);
            if ($(this).attr('data-rid')) {
                $('>span', replyToUser).html(replyToWho);
                replyToUser[0].style.display = 'block';
                replyToInput.val(parseInt($(this).attr('data-rid')))
            } else {
                replyToInput.val('');
                replyToUser[0].style.display = 'none';
            }
        }
    });
    $('.cancel-comment').on('click', function (event) {
        let closeTarget = $(this).attr('close-target');
        if (closeTarget) {
            let commentBox = $('#' + closeTarget)
            let replyToUser = $(".reply-to-user", commentBox)
            let replyToInput = $(">form>input[name='reply_to']", commentBox)
            $('>span', replyToUser).html("");
            replyToInput.val("");
            commentBox[0].style.display = 'none';
        }
    })

    document.querySelector("#std-general-constainer").forEach((element) => {
        if (element.classList.contains("home-page")){
            document.querySelector('.location1').classList.add('std-here');
        }else if (element.classList.contains("question-page")){
            document.querySelector('.location2').classList.add('std-here');
        }else if (element.classList.contains("tag-page")){
            document.querySelector('.location3').classList.add('std-here');
        }else if (element.classList.contains("users-page")){
            document.querySelector('.location4').classList.add('std-here');
        }else if (element.classList.contains("job-page")){
            document.querySelector('.location5').classList.add('std-here');
        }
    })

    
    $(".close").on("click", function (event) {
        $(".alert-success").hide()
    })


    const tagContainer = document.querySelector(".tag-container");
    const inputBox = document.querySelector(".tag-container input");
    const originInput = document.querySelector("#id_tags");

    inputBox.addEventListener('focusin', (event) => {
        const parent = inputBox.parentElement
        const attrs = [
            'background-color',
            'border-color',
            'outline',
            'box-shadow',
            'border-radius'
        ]
        const values = ['transparent', '#6cbbf7', 'none', '0 0 0 4px rgba(0,149,255,0.25)', '3px']
        for (let i = 0; i < attrs.length; i++) {
            parent.setAttribute(attrs[i],values[i])
        }
    })
    inputBox.addEventListener('focusout',(event)=>{
        const parent = inputBox.parentElement;
        parent.setAttribute('border','1px solid #c4c4c4');
        parent.setAttribute('box-shadow', 'none');
    })

    // const closeIcon = '<svg id="cancel-tag" xmlns="http://www.w3.org/2000/svg" '+
    //      'height="20px" '+
    //      'width="20px" '+
    //      'viewBox="0 0 48 48"> ='+
    //     '<defs>'+
    //         '<style>'+
    //             '.close-button{'+
    //                ' fill:#8d96a0;'+
    //             '}'+
    //             '.close-button:hover{'+
    //                 'fill:#0056b3;'+
    //             '}'+
    //         '</style>'+
    //     '</defs>'+
    //     '<path class="close-button" d="M12.45 37.65 10.35 35.55 21.9 24 10.35 12.45 12.45 10.35 24 21.9 35.55 10.35 37.65 12.45 26.1 24 37.65 35.55 35.55 37.65 24 26.1Z"/>'+
    // '</svg>';


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
            const preTags = originInput.value.split(",");
            tags = preTags;
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

    if (input) {
        input.addEventListener('keyup', function (e) {
            if (e.key === 'Enter') {
                tags.push(input.value);
                addTags();
                input.value = "";
            }
            ;
        });
    }

    document.addEventListener('click', function (e) {
        if (e.target.className.baseVal === 'closeBtn') {
            const value = e.target.getAttribute('data-item');
            const index = tags.indexOf(value);
            tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
            addTags();
        }
    })

    inputBox.addEventListener('keyup', (e) =>{
        var inputValue = inputBox.value;
        if (inputValue.length >= 1) {
            fetch('/search/tag/',{
                method:'POST',
                headers:{
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({q:inputValue})
            }).then(res => res.json())
                .then((res)=>{
                    // const tagFilter = document.querySelector('#tag-filter');
                    // tagFilter.setAttribute("display",'grid');
                    console.log(res);

                })
        }
    })
    // $inputBox.on("input keyup", function (e) {
    //     var inputValue = $(this).val();
    //     if (inputValue.length >= 1) {
    //         $.ajax({
    //             url: '/search/tag/',
    //             data: {'q': inputValue,},
    //             type: 'get',
    //             cache: false,
    //             success: function (data) {
    //                 var tagFilter = $('#tag-filter');
    //                 tagFilter.css({"display": "grid"});
    //                 tagFilter.empty();
    //                 if (data.length > 0) {
    //                     $.each(JSON.parse(data), function (key, value) {
    //                         tagFilter.append("<a class='suggest-tag'><span class='std-badge'>" + value.fields.name + "</span></a>");
    //                     })
    //                 }
    //                 $(".suggest-tag").on('click', function () {
    //                     tags.push($(this).text());
    //                     addTags();
    //                     $inputBox.val("");
    //                     tagFilter.empty();
    //                     tagFilter.css({"display": "none"});
    //                 })
    //             },
    //         })
    //
    //     }
    //     if (e.key === "Enter" && inputValue.length > 0) {
    //         tags.push($(this).val());
    //         addTags();
    //         $(this).val("");
    //     }
    // });

   document.addEventListener('click',function(e){
      if(e.target.className.baseVal === 'closeBtn'){
        const value = e.target.getAttribute('data-item');
        const index = tags.indexOf(value);
        tags = [...tags.slice(0,index), ...tags.slice(index + 1)];
        // console.log(tags);
        addTags();
      }
    })

    var currentUrl = window.location.href;
    if (currentUrl.includes("?next=")) {
        currentUrl = currentUrl.split("?next=")[0]
    }
    if (currentUrl === 'https://www.firprin.com/accounts/login/') {
        $("body").css({
            'background-image': "url('https://www.firprin.com/static/images/login.svg')",
            'background-size': 'cover',
            'background-position': 'center',
            'background-repeat': 'no-repeat',
        })
    }
    if (currentUrl === 'https://www.firprin.com/accounts/signup/') {
        $("body").css({
            'background-image': "url('https://www.firprin.com/static/images/signup.svg')",
            'background-size': 'cover',
            'background-position': 'fixed',
            'background-repeat': 'no-repeat',
        })
    }


// ----end of global---- //
});


function showLogin() {
    $('#loginItems').toggle("show");
}

function showLogout() {
    $('#logoutItems').toggle("show");
}







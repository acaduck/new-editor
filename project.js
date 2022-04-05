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
                if(parseInt($(this).attr('data-rid')) == parseInt(replyToInput.val()) ){
                    commentBox[0].style.display='none';
                } else{
                    $('>span', replyToUser).html(replyToWho);
                    replyToUser[0].style.display='block';
                    replyToInput.val(parseInt($(this).attr('data-rid')));
                }
            } else {
                if (!replyToInput.val()){
                    commentBox[0].style.display='none';
                }else{
                    replyToInput.val('');
                    $('>span', replyToUser).html('');
                    replyToUser[0].style.display='none';
                }
            }
        } else {
            commentBox[0].style.display ='block';
            var closeButton = $(">form>div>button[name='cancel-comment']", commentBox);
            closeButton.attr("close-target",name1);
            if ($(this).attr('data-rid')) {
                $('>span', replyToUser).html(replyToWho);
                replyToUser[0].style.display='block';
                replyToInput.val(parseInt($(this).attr('data-rid')))
            } else {
                replyToInput.val('');
                replyToUser[0].style.display='none';
            }
        }
    });
    $('.cancel-comment').on('click',function(event){
        let closeTarget = $(this).attr('close-target');
        if (closeTarget){
            let commentBox = $('#' + closeTarget)
            let replyToUser = $(".reply-to-user", commentBox)
            let replyToInput = $(">form>input[name='reply_to']", commentBox)
            $('>span', replyToUser).html("");
            replyToInput.val("");
            commentBox[0].style.display='none';
        }
    })


    $("#std-general-container").each(function () {

        if ($(this).hasClass("home-page")) {
            $(".location1").addClass("std-here");
        } else if ($(this).hasClass("question-page")) {
            $(".location2").addClass("std-here");
        } else if ($(this).hasClass("tag-page")) {
            $(".location3").addClass("std-here");
        } else if ($(this).hasClass("users-page")) {
            $(".location4").addClass("std-here");
        }
    })


    $(".close").on("click", function (event) {
        $(".alert-success").hide()
    })


    const $tagContainer = $(".tag-container");
    const $inputBox = $(".tag-container input");
    const $originInput = $("#id_tags");

    $inputBox.focus(function () {
        $(this).parent().css({
            'background-color': 'transparent',
            'border-color': '#6cbbf7',
            'outline': 'none',
            'box-shadow': '0 0 0 4px rgba(0,149,255,0.25)',
            'border-radius': '3px'
        })
    });
    $inputBox.focusout(function () {
        $(this).parent().css({
            border: '1px solid #c4c4c4',
            'box-shadow': 'none',
        })
    })

    let tags = [];

    function createTag(label) {
        var $div = $('<div class="tag"></div>');
        $div.append($("<span>" + label + "</span>"));

        $div.append(
            $("<i/>", {
                class: "fa fa-times",
                "aria-hidden": "true",
                "data-item": label
            })
        );
        return $div;
    }

    function initTags() {
        if ($originInput.val()) {
            preTags = $originInput.val().split(",");
            tags = preTags;
            addTags();
        }
    }

    initTags();

    function reset() {
        $(".tag").each(function () {
            $(this).remove();
        });
    }

    function addTags() {
        reset();
        var len = tags.length;
        var new_tags = $.map(tags, function (v, i) {
            return tags[len - 1 - i];
        });
        for (var i = 0; i < new_tags.length; i++) {
            const addthis = createTag(new_tags[i]);
            $tagContainer.prepend(addthis);
        }
        $originInput.val(new_tags);
    }


    $inputBox.on("input keyup", function (e) {
        var inputValue = $(this).val();
        if (inputValue.length >= 1) {
            $.ajax({
                url: '/search/tag/',
                data: {'q': inputValue,},
                type: 'get',
                cache: false,
                success: function (data) {
                    var tagFilter = $('#tag-filter');
                    tagFilter.css({"display": "grid"});
                    tagFilter.empty();
                    if (data.length > 0) {
                        $.each(JSON.parse(data), function (key, value) {
                            tagFilter.append("<a class='suggest-tag'><span class='std-badge'>" + value.fields.name + "</span></a>");
                        })
                    }
                    $(".suggest-tag").on('click', function () {
                        tags.push($(this).text());
                        addTags();
                        $inputBox.val("");
                        tagFilter.empty();
                        tagFilter.css({"display": "none"});
                    })
                },
            })

        }
        if (e.key === "Enter" && inputValue.length > 0) {
            tags.push($(this).val());
            addTags();
            $(this).val("");
        }
    });

    $(document).on("click", function (e) {
        if (e.target.tagName === "I") {
            const value = e.target.getAttribute("data-item");
            const index = tags.indexOf(value);
            tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
            // console.log(tags);
            addTags();
        }
    });

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







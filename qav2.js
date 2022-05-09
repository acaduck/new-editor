$(function () {
    // function getCookie(name) {
    //     if (document.cookie && document.cookie.length) {
    //         var cookies = document.cookie
    //             .split(';')
    //             .filter(function (cookie) {
    //                 return cookie.indexOf(name + "=") !== -1;
    //             })[0];
    //         try {
    //             return decodeURIComponent(cookies.trim().substring(name.length + 1));
    //         } catch (e) {
    //             if (e instanceof TypeError) {
    //                 console.info("No cookie with key \"" + name + "\". Wrong name?");
    //                 return null;
    //             }
    //             throw e;
    //         }
    //     }
    //     return null;
    // }

    function csrfSafeMethod(method) {
        // These HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    var csrftoken = getCookie('csrftoken');
    // 设置Ajax请求头
    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

    $("#publish").click(function () {
        // function to operate the Publish button in the question form, marking
        // the question status as published.
        $("input[name='status']").val("O");
        // $('#superficial-tag').prop("disabled", true);

        $("#question-form").submit();
    });

    $("#answer").click(function(){
        $("#answerForm").submit();
    });

    //$("#draft").click(function () {
        // Function to operate the Draft button in the question form, marking
        // the question status as draft.
    //    $("input[name='status']").val("D");
    //    $("#question-form").submit();
    //});

    $(".question-vote").click(function () {
        // vote for the question
        var span = $(this);
        var question = $(this).closest(".question").attr("question-id");
        vote = null;
        if ($(this).hasClass("up-vote")) {
            vote = "U";
        } else {
            vote = "D";
        }
        $.ajax({
            url: '/questions/question/vote/',
            data: {
                'question': question,
                'value': vote
            },
            type: 'post',
            cache: false,
        }).done(function(data){
            $("#questionVotes").text(data.votes);
        });
    });

    $(".answer-vote").click(function () {
        // vote for the answer
        const answer_id = $(this).closest(".answer").attr("answer-id");
        const answer = $('div[answer-id=' + answer_id + '] .votes');
        if ($(this).hasClass("up-vote")) {
            vote = "U";
        } else {
            vote = "D";
        }
        $.ajax({
            url: '/questions/answer/vote/',
            data: {
                'answer': answer_id,
                'value': vote
            },
            type: 'post',
            cache: false,
        }).done(function(data){
            answer.text(data.votes);
        })
    });

    $(".acceptAnswer").click(function () {
        // accept answer
        const answer_id = $(this).closest(".answer").attr("answer-id");
        const answer = $('div[answer-id=' + answer_id + '] .acceptAnswer');
        $.ajax({
            url: '/questions/accept-answer/',
            data: {
                'answer': answer_id
            },
            type: 'post',
            cache: false,
        }).done(function(data){
            const accepted = $(".accepted")
            accepted.removeClass("accepted");
            accepted.prop("title", "click to accept the answer");
            answer.addClass("accepted");
            answer.prop("title", "this answer has been accepted");
        });
    });

    // copy share link when click at the button
    document.querySelectorAll('.share-link').forEach(function(a){
        a.addEventListener('click',function(e){
            e.preventDefault();
            navigator.clipboard.writeText(a.href);
            fpAlert('已复制链接(ง •̀_•́)ง');
        })
    })

    // highlighter for answer
    var currentUrl = window.location.href;
    var answerID = currentUrl.split('#');
    if(answerID.length>1 && answerID[1] !== ""){
        console.log(answerID[1]);
        var target = document.getElementById(answerID[1]);
        target.classList.add('target-text-highlighter');
    }



});



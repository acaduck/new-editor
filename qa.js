$(function(){var o=function(t){if(document.cookie&&document.cookie.length){var e=document.cookie.split(";").filter(function(e){return-1!==e.indexOf(t+"=")})[0];try{return decodeURIComponent(e.trim().substring(t.length+1))}catch(e){if(e instanceof TypeError)return console.info('No cookie with key "'+t+'". Wrong name?'),null;throw e}}return null}("csrftoken");$.ajaxSetup({beforeSend:function(e,t){/^(GET|HEAD|OPTIONS|TRACE)$/.test(t.type)||this.crossDomain||e.setRequestHeader("X-CSRFToken",o)}}),$("#publish").click(function(){$("input[name='status']").val("O"),$("#question-form").submit()}),$("#answer").click(function(){$("#answerForm").submit()}),$(".question-vote").click(function(){$(this);var e=$(this).closest(".question").attr("question-id");vote=null,vote=$(this).hasClass("up-vote")?"U":"D",$.ajax({url:"/questions/question/vote/",data:{question:e,value:vote},type:"post",cache:!1}).done(function(e){$("#questionVotes").text(e.votes)})}),$(".answer-vote").click(function(){var e=$(this).closest(".answer").attr("answer-id");const t=$("div[answer-id="+e+"] .votes");vote=$(this).hasClass("up-vote")?"U":"D",$.ajax({url:"/questions/answer/vote/",data:{answer:e,value:vote},type:"post",cache:!1}).done(function(e){t.text(e.votes)})}),$(".acceptAnswer").click(function(){var e=$(this).closest(".answer").attr("answer-id");const o=$("div[answer-id="+e+"] .acceptAnswer");$.ajax({url:"/questions/accept-answer/",data:{answer:e},type:"post",cache:!1}).done(function(e){const t=$(".accepted");t.removeClass("accepted"),t.prop("title","click to accept the answer"),o.addClass("accepted"),o.prop("title","this answer has been accepted")})}),document.querySelectorAll(".share-link").forEach(function(t){t.addEventListener("click",function(e){e.preventDefault(),navigator.clipboard.writeText(t.href),popBox=document.querySelector("#fp-alert"),popBox.textContent="已复制链接(ง •̀_•́)ง",popBox.style.display="block",setTimeout(function(){popBox.style.display="none"},2e3)})});var e=window.location.href.split("#");1<e.length&&""!==e[1]&&(console.log(e[1]),document.getElementById(e[1]).classList.add("target-text-highlighter"))});

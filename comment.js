document.addEventListener("DOMContentLoaded", function (event) {
      Array.from(document.querySelectorAll('.object-comment')).forEach((element) => {
        element.addEventListener('click', (e) => {
            let name1 = e.target.getAttribute('data-pid')
            let commentBox = document.querySelector(`#${name1}`)
            let replyToWho = e.target.getAttribute('data-rname')
            let replyToUser = commentBox.querySelector('.reply-to-user')
            let replyToInput = commentBox.querySelector('[name="reply_to"]')


            // if element is visible
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    console.log(true)
                } else {
                    console.log(false)
                }
            });

            if (observer.observe(commentBox)) {
                // if (e.target.getAttribute('data-rid')) {
                //     if (e.target.getAttribute('data-rid') === parseInt(replyToInput.value)) {
                //         commentBox.setAttribute('style','display:none;');
                //     } else {
                //         replyToUser.querySelector('span').innerText = replyToWho;
                //         replyToInput.value = parseInt(e.target.getAttribute('data-rid'));
                //     }
                // } else {
                //     if (!replyToInput.value) {
                //         commentBox.setAttribute('style','display:none;');
                //     } else {
                //         replyToInput.value = '';
                //         replyToUser.querySelector('span').innerHTML = ''
                //         replyToUser.setAttribute('style','display:none;');
                //     }
                // }
                commentBox.classList.toggle('hidden');
            } else {
                // commentBox.setAttribute('style','display:block;');
                commentBox.classList.toggle('show');
                let closeButton = commentBox.querySelector('[name="cancel-comment"]');
                closeButton.setAttribute("close-target", name1);
                if (e.target.getAttribute('data-rid')) {
                    replyToUser.querySelector('span').innerText=replyToWho;
                    // replyToUser.setAttribute('style','display:block;');
                    replyToUser.classList.toggle('show');

                    replyToInput.value = parseInt(e.target.getAttribute('data-rid'))
                } else {
                    replyToInput.value='';
                    // replyToUser.setAttribute('style','display:none;');
                    replyToUser.classList.toggle('hidden');
                }
            }
        })
    })

     Array.from(document.querySelectorAll('.cancel-comment')).forEach((element)=>{
         element.addEventListener('click',(e)=>{
            let closeTarget = e.target.getAttribute('close-target');
                if (closeTarget) {
                let commentBox = document.querySelector(`#${closeTarget}`);
                let replyToUser = commentBox.querySelector('.reply-to-user');
                let replyToInput =  commentBox.querySelector('[name="reply_to"]')
                replyToUser.querySelector('span').innerHTML=''
                replyToInput.value='';
                // commentBox.setAttribute('style','display:none;')
                commentBox.classList.remove('show');
            }
         })
    })


// GLOABL
});
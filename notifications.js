$(function(){
    var loggedIn = $(".user-info-pc")
    const emptyMessage = '目前没有消息';
    const notice = document.querySelector("#notifications");
    const notifyIcon = $("#notification-icon");

    function CheckNotifications(){
        if (loggedIn.length>0){
            fetch('/notifications/latest-notifications/')
                .then(response => response.text())
                .then(data => {
                    if(data.indexOf(emptyMessage) === -1){
                       notifyIcon.setAttribute('fill','#db786a');
                    }
                })
                .catch((error) =>{
                    console.log(error)
                })
        }
    }
    CheckNotifications(); 

    tippy(notice,{
        allowHTML:true,
        content:'加载中...',
        placement:'bottom',
        theme:'light-border',
        interactive:true,
        appendTo:document.body,
        onShow(instance){
            if (loggedIn.length>0) {
                fetch('/notifications/latest-notifications/')
                    .then(response => response.text())
                    .then(data => {
                        instance.setContent(data);
                    })
                    .catch((error) => {
                        instance.setContent(`加载失败. ${error}`);
                    })
            }else{
                instance.setContent('登录查看消息');
            }
        },
        onHidden(instance){
            instance.setContent('加载中...');
        }
    });
    if (loggedIn.length>0){
        const ws_scheme=window.location.protocol === 'https:' ? 'wss' : 'ws';
        const ws_path = ws_scheme + "://" + window.location.host + "/ws/notifications/";

        const ws = new ReconnectingWebSocket(ws_path);

        ws.onmessage = function(event){
            const data = JSON.parse(event.data);
            switch(data.key){
                case 'notification':
                    if (currentUser !== data.actor_name){ 
                        notifyIcon.addClass('notification-danger');
                    }
                    break;
                default:
                    console.log('error', data);
                    break;
            }
        }
    }
})

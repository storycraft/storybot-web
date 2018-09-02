var box = null;
var stdin = null;
var btn = null;
var manager = null;

const initData = {
    "namespace": "test",
    "service": "testing mode",
    "id": -282
};

window.onload = () => {
    box = document.getElementById('field');
    stdin = document.getElementById('input');
    btn = document.getElementById('btn');
    manager = io.connect('https://bot.storyboard.ml', {
        path: '/storybot-web',
        forceNew: true
    });

    manager.on('connect', () => {
        console.log('connected');
        manager.emit('initialize', initData);
    });

    manager.on('message', (data) => {
        var a = document.createElement('p');

        a.appendChild(document.createTextNode(data.user.nickname + ': ' + data.text));

        box.appendChild(a);
    });

    btn.addEventListener('click', () => {
        manager.emit('message', {
            "channel": {
                "id": 182739123,
                "name": "testing"
            },
            "user": {
                "id": 178293671283,
                "nickname": "tester" 
            },
            "message": {
                "timestamp": new Date,
                "attachments": [],
                "text": stdin.value
            }
        });

        var a = document.createElement('p');

        a.appendChild(document.createTextNode('you: ' + stdin.value));
        
        box.appendChild(a);
    });
}
var box = null;
var stdin = null;
var btn = null;
var manager = null;

const initData = {
    "client-uuid": "4c3fa3fe-d5cb-41ba-be81-2919f9001d3c",
    "service": "web testing"
};

window.onload = () => {
    box = document.getElementById('field');
    stdin = document.getElementById('input');
    btn = document.getElementById('btn');
    manager = io.connect('http://bot.storyboard.ml', {
        path: '/storybot-socket',
        forceNew: true
    });

    manager.on('connect', () => {
        console.log('connected');
        manager.emit('initialize', initData);
        manager.on('initialize', (res) => {
            if (res.status == 0)
                console.log('initialized with ' + res.namespace);
            else
                console.log('error on initializing');
        });
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

const socket=io();
const inp=document.getElementById('inp');
const btn=document.getElementById('btn');
const list=document.getElementById('list');
const loginbtn=document.getElementById('login-btn');
const logininp=document.getElementById('login-inp');
const chat=document.getElementById('chat');
const login=document.getElementById('login');
const inpdiv=document.getElementById('inpdiv');


// btn.addEventListener('click',()=>{
//     if(inp.value!==""){
//         socket.emit('send-msg',{
//             msg:inp.value
//         })
//         inp.value="";
//     }
// })
inp.addEventListener('keypress',(e)=>{
    if(inp.value!="") {
        if(e.keyCode==13){
            socket.emit('send-msg',{
                msg:inp.value
            })
            inp.value="";
        }
    }
})
loginbtn.addEventListener('click',()=>{
    if(logininp.value!="") {
        socket.emit('login',{
            name:logininp.value.toUpperCase()
        })
        login.style.display="none";
        chat.style.display="block";
        inpdiv.style.display="block";
    }
    else {
        logininp.placeholder="Please Enter Name!!";
    }
})

socket.on('received-msg',(data)=>{
    if(socket.id==data.id) {
        const div=document.createElement('div');
    div.setAttribute('id','me');
    const p=document.createElement('p');
    p.setAttribute('id','mep');
    p.append(` ${data.msg}`)
    div.append(p);
    chat.append(div);
    chat.scrollTop=chat.scrollHeight;
    }
    else {
        const div=document.createElement('div');
    div.setAttribute('id','all');
    const p=document.createElement('p');
    const p1=document.createElement('p');
    const sup=document.createElement('strong');
    const space=document.createElement('br');
    p.setAttribute('id','allp');
    sup.append(`${data.name}`);
    p.append(sup);
    p1.append(` ${data.msg}`);
    p.append(p1);
    div.append(p);
    chat.append(div);
    // chat.scrollTop=chat.scrollHeight;
    }
})






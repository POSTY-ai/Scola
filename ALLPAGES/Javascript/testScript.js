const btn=document.getElementById('btn');
const result=document.getElementById('result');

btn.addEventListener('click',()=>{
    fetch('http://localhost:5000/api/test')
    .then(res=>res.json())
    .then(data=>{
        result.textContent=JSON.stringify(data, null, 2);
        })
        .catch(err=>{
            result.textContent='Error connecting to backend';
            console.error(err);
        });
});
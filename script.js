let data;
let col=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
let caste="9";
let branchs=[];
let district=[];
let types=[];
let affiliate=[];
function fetchdata(){
    show();
    fetch("tseamcetfinal.json")
    .then(result=>result.json())
        .then(info=>{
            data=info;
            console.log(data);
            hide();
            rank();   
        });
}
function show() {
    document.getElementById('loader').style.display = 'block';
}
function hide() {
    document.getElementById('loader').style.display = 'none';
}
function rank(){
    let rank=document.getElementById("RANK").value;
    let table=document.getElementById("table");
    if(table.querySelector("thead")){
        table.querySelector("thead").remove();
        table.querySelector("tbody").remove();
    }
        let thead=document.createElement("thead");
        let tbody=document.createElement("tbody");
        let tr=document.createElement("tr");
        for(let i=1;i<963;i++){
            for(let j=i+1;j<963;j++){
               // console.log(i,j);
                if(data[i][caste]>=data[j][caste]){
                    // console.log(caste);
                    // console.log(data[i][caste]);
                    let t=data[i];
                    data[i]=data[j];
                    data[j]=t;
                }
            }
        }
        for(let j=0;j<=28;j++){
            let th=document.createElement("th");
            th.textContent=data[0][col[j]];
            tr.appendChild(th);
        }
        thead.appendChild(tr);
        for(let i=1;i<963;i++){
            tr=document.createElement("tr");
            if((rank<=data[i][caste]) && (branchs.length===0||branchs.includes(data[i][7]))&& (district.length===0||district.includes(data[i][3]))&& (types.length===0||types.includes(data[i][5]))&& (affiliate.length===0||affiliate.includes(data[i][28]))){
              for(let j=0;j<=28;j++){
                let td=document.createElement("td");
                td.textContent=data[i][col[j]];
                tr.appendChild(td);
              }
              tbody.appendChild(tr);
            }
        }
    table.appendChild(thead);
    table.appendChild(tbody);
}
function cast(val){
    caste=val;
    console.log(caste);
    if(caste=="29"){
        col=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
        caste="9";
    }
    else{
        col=[0,1,2,3,4,5,6,7,8,caste,27,28];
    }
    for(let i=1;i<963;i++){
        for(let j=i+1;j<963;j++){
            if(data[i][caste]>=data[j][caste]){
                let t=data[i];
                data[i]=data[j];
                data[j]=t;
            }
        }
    }
}
function branch(val){
    const check=document.getElementById(val);
       if(check.checked){
        branchs.push(val);
       }
       else{
        const index = branchs.indexOf(val);
        if(index!==-1){
            branchs.splice(index,1);
        }
       }
}
function typed(val){
    const check=document.getElementById(val);
       if(check.checked){
        types.push(val);
       }
       else{
        const index = types.indexOf(val);
        if(index!==-1){
            types.splice(index,1);
        }
       }
}
function affiliated(val){
    const check=document.getElementById(val);
       if(check.checked){
        affiliate.push(val);
       }
       else{
        const index = affiliate.indexOf(val);
        if(index!==-1){
            affiliate.splice(index,1);
        }
       }
}
function dist(val){
    const check=document.getElementById(val);
       if(check.checked){
        district.push(val);
       }
       else{
        const index = district.indexOf(val);
        if(index!==-1){
            district.splice(index,1);
        }
       }
}


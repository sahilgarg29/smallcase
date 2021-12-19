async function getData(url){
    try{
        let res=await fetch(url)
        let data=await res.json()
        console.log(data)
        return data
    }
    catch(err){
        console.log("err:",err)
    }
}
function appendData(data,location){
    data.forEach(el => {
        let div=document.createComment("div")
        let p=document.createElement("p")
        let img=document.createElement("img")
        img.src=el.image;
        p.innerTextel.el.title
        div.append(p,img)
        location.append(div,img)
    });
}
export{getData,appendData}
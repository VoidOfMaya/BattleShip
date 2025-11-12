
const createNextBtn=(label, parent)=>{
    const btn = document.createElement('div');
    btn.innerHTML = label;
    btn.style.gridArea= "next";
    btn.className = "in-button";
    btn.id = "next"; 
    parent.appendChild(btn);
    return btn  
}

export {
    createNextBtn,
}
import { body, container, router } from "../dom/mainContainer";
import { view as initView} from "../dom/preInit";

const showMenu = () =>{
    return new Promise(resolve=>{
        container.appendChild(initView);
        initView.style.display= 'grid';

        const modeSelection = (mode)=>{
            initView.style.display = 'none';
            resolve(mode);
        }
        document.getElementById('pvp').addEventListener('click', ()=>{
            console.log('pvp');
            modeSelection('pvp')
        });
        document.getElementById('pvnpc').addEventListener('click', ()=>{
            console.log(`pvnpc`)
            modeSelection('pvnpc')
        });
    })
}

export{
    showMenu,
}
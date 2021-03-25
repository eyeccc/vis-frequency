let uploader = document.createElement('input');
uploader.setAttribute('type','file');
let fileToParse;
uploader.addEventListener('change', e => {
    //console.log(e)
    readFile(e.target.files[0]); // only allow one file for now
});

function readFile(file) {  
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        fileToParse = event.target.result;
        fileToParse = fileToParse.split("\n").slice(1).filter(Boolean);
        //console.log(tmp)
    });
    reader.readAsText(file);
}

document.body.appendChild(uploader);
let idRangeMap = {};
let idArticleMap = {};

function parseTsv(file) { // string
    console.log(file)
    //let rows = file.split("\n");
    for(let row of file) {
        
        let cols = row.split("\t");
        
        let [id, article, range] = cols;
        let startTags = [];
        let endTags = [];
        let rangeArr = range.split(";").map(coord => coord.split(','));
        for(let test of rangeArr) {
            startTags.push(Number(test[0]))
            endTags.push(Number(test[1]))
        }
        
        if(idArticleMap[id]) {
            idRangeMap[id].startTags = idRangeMap[id].startTags.concat(startTags)
            idRangeMap[id].endTags = idRangeMap[id].endTags.concat(endTags)
        } else {
            idArticleMap[id] = article;
            idRangeMap[id] = {
                startTags,
                endTags
            }
        }
    }
}


/*let pEle = document.createElement('p');
pEle.setAttribute('id', 'res');*/

/*let articleInput = document.createElement('textarea');
articleInput.setAttribute('id', 'article');
articleInput.addEventListener('change', e => {
    pEle.innerHTML = e.target.value;
})
let indexInputs = [];
let startTags = [];
let endTags = [];
let idxInput = document.createElement('textarea');
idxInput.setAttribute('id', 'idx-input');
idxInput.addEventListener('change', e => {
    let coords = e.target.value.split(';');
    indexInputs = coords.map(coord => coord.split(','));
    for(let test of indexInputs) {
        startTags.push(Number(test[0]))
        endTags.push(Number(test[1]))
    }
})

document.body.appendChild(articleInput);
document.body.appendChild(idxInput);*/
//document.body.appendChild(pEle);

let btn = document.createElement('button');
btn.setAttribute('id', 'show-freq');
btn.innerHTML = 'Highlight Frequency';
btn.addEventListener('click', () => {
    parseTsv(fileToParse);
    console.log(idRangeMap, idArticleMap)
    let ids = Object.keys(idRangeMap);
    
    for(let id of ids) {
        let newInnerHTML = "";
        let counter = 0;
        let text = idArticleMap[id];
        let {startTags, endTags} = idRangeMap[id];
        //console.log({startTags, endTags})
        for(let i = 0; i < text.length; i++) {
            //console.log(id, startTags)
            if(startTags.includes(i)) {
                counter += startTags.filter(t => t === i).length; // count how many times
                newInnerHTML += `<span class="cnt-${counter}" title="${counter}">`;
            } else if(endTags.includes(i)) {
                newInnerHTML += "</span>";
                counter -= endTags.filter(t => t === i).length;
            }
            newInnerHTML += text[i];
        }
        let h4 = document.createElement('h4');
        h4.innerText = `Article #${id}`;
        document.body.appendChild(h4);

        let pEle = document.createElement('p');
        pEle.setAttribute('id', 'result-'+id);
        pEle.innerHTML = newInnerHTML;
        document.body.appendChild(pEle)
    }
    // update pEle to show things
    /*let newInnerHTML = "";
    let counter = 0;
    for(let i = 0; i < pEle.innerText.length; i++) {
        if(startTags.includes(i)) {
            counter += 1;
            newInnerHTML += `<span class="cnt-${counter}" title="${counter}">`;
        } else if(endTags.includes(i)) {
            newInnerHTML += "</span>";
            counter -= 1;
        }
        newInnerHTML += pEle.innerText[i];
    }
    pEle.innerHTML = newInnerHTML;*/
});
document.body.appendChild(btn);


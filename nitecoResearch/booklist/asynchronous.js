document.getElementById('button').addEventListener('click', loadData);

function loadData(){
    // create an xhr object
    const xhr = new XMLHttpRequest();

    // OPEN
    xhr.open('GET', 'asynchronous.txt', true);

    // optional - uesd for spinners/loaders
    xhr.onprogress = function(){
        console.log('readystate',xhr.readyState);
    }


    xhr.onload = function(){
        console.log('readystate', xhr.readyState);
        if(this.status === 200) {
            // console.log(this.responseText);
            document.getElementById('output').innerHTML = `<h1>${this.responseText}</h1>`
        }
    }

    // xhr.onreadystatechange = function(){
    //     console.log('readystate', xhr.readyState);
    //     if(this.status === 200 && this.readyState === 4) {
    //         console.log(this.responseText);
    //     }
    // }

    xhr.onerror = function(){
        console.log('request error...');
    }
    
    xhr.send();

};
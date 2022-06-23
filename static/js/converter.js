(function() {
    const label_file = document.getElementById('file_label');
    const input_file = document.getElementById('file');
    const section = document.getElementById('add_img');
    const base64button = document.querySelector('.i-button')

    let currentFile = null;

    const createImageElement = (source, alt='user_imagen', callback = function() {}) => {
        const img = document.createElement('img');
        img.src = source;
        img.alt = alt;
        img.addEventListener('load', callback);
        return img;
    }

    const setMainMenuFunctions = () => {
        const label_file = document.getElementById('file_label');
        const input_file = document.getElementById('file');
        const base64button = document.querySelector('.i-button')

        base64button.addEventListener('click', getBase64Menu)
        input_file.addEventListener('change', createImageUrl);
    }

    const setConverterMenuFunctions = () => {
        const cancel = document.querySelector('#cancel');
        cancel.addEventListener('click', getMainMenu);
    }

    const setBase64MenuFunctions = () => {
        const textarea = document.querySelector('#base64')

        const sendBase64 = () => {
            const formdata = new FormData();
            formdata.append('img_base64', textarea.value)
            fetch('/img/base64', {method: 'put', body: formdata})
                .then(res => res.blob())
                .then(blob => {
                    let a = document.createElement("a");
                    document.body.appendChild(a);
                    a.style = "display: none";
                    const url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.download = 'imagen.jpeg';
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                })
            getMainMenu();
        }

        const cancel = document.querySelector('#cancel');
        cancel.addEventListener('click', getMainMenu);
        const send = document.querySelector('#send');
        send.addEventListener('click', sendBase64)
    }

    const getMainMenu = () => { 
        deleteAllChildren(section);
        section.innerHTML = `<h1>Convierte tus imágenes</h1>
        <p class="null">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, quos necessitatibus! Aut, officia dolor tempora eligendi voluptas ex ipsa cumque!</p>
        <label class="img_container" for="file" id="file_label">
            <svg viewBox="0 0 122.88 88.98" style="enable-background:new 0 0 122.88 88.98" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M85.33,16.83c12.99-9.83,31.92,1.63,31.92,13.63c0,7.75-2.97,10.79-7.57,14.03 c23.2,12.41,12.7,39.86-7.54,44.49l-70.69,0c-33.2,0-45.48-44.99-10.13-55.89C14.69,6.66,66.5-17.2,85.33,16.83L85.33,16.83z M53.37,69.54V53.66H39.16l22.29-26.82l22.29,26.82H69.53v15.88H53.37L53.37,69.54z"/></g></svg>
            <p>Ingrese su archivo</p>
            <input type="file" name="" id="file" accept='image/*'>
        </label>
        <button class="i-button">Convertir imagen base64</button>`;
        setMainMenuFunctions();
    }

    const getConverterMenu = (img) => {
        deleteAllChildren(section);
        section.innerHTML = `<div id="img_c">
                <img class="main_img" src="${img.src}" alt="">
                <div class="r_container">
                    <div class="resize">
                        <div class="r-ne"></div><div class="r-se"></div><div class="r-nw"></div><div class="r-sw"></div><div class="r-n"></div><div class="r-s"></div><div class="r-w"></div><div class="r-e"></div>
                    </div>
                </div>
            </div>
            <div id='img_info'>
                <p>Dimensiones: ${img.w} x ${img.h}px.</p>
                <p>Peso: ${img.size} KB</p>
            </div>
            <div id="img_actions">
                <button id='cancel' class="outline-btn">Cancelar</button>
                <button id="send" class="btn">Recortar</button>
            </div>`;
        setConverterMenuFunctions();
    }

    const getBase64Menu = () => {
        section.innerHTML = `
        <h2>Imagen base64</h2>
        <div class="textarea">
        <textarea placeholder="Ingresa la imagen base64..." id="base64" cols="30" rows="10"></textarea>
        </div>
        <div id="img_actions">
                <button id='cancel' class="outline-btn">Cancelar</button>
                <button id="send" class="btn">Convertir</button>
        </div>`;
        setBase64MenuFunctions();
    }

    const deleteChildren = (parent, clases) => {
        const children = parent.children;
        
        for (const child of children) {
            const isBubble = child.classList.value.includes(clases);
            if (!isBubble) {
                child.parentNode.removeChild(child);
            }
        }
    }

    const deleteAllChildren = (parent) => {
        while (parent.firstChild) parent.removeChild(parent.firstChild);
    }

    function createImageUrl() {
        currentFile = this.files[0];
        const size = currentFile.size;
        console.log(currentFile)
        const source = URL.createObjectURL(currentFile);

        deleteAllChildren(section);

        function getImage() {
            let w = this.clientWidth;
            let h = this.clientHeight;

            // const canvas = document.createElement('canvas');
            // const ctx = canvas.getContext('2d');
            // canvas.width = w;
            // canvas.height = h;

            // const formdata = new FormData();
            // formdata.append('img', input_file.files[0])

            // fetch('/img/', {method: 'post', body: formdata})
            // .then(res => res.blob())
            // .then(blob => {
            //     let a = document.createElement("a");
            //     document.body.appendChild(a);
            //     a.style = "display: none";
            //     const url = window.URL.createObjectURL(blob);
            //     a.href = url;
            //     a.download = 'algo.jpeg';
            //     a.click();
            //     window.URL.revokeObjectURL(url);
            //     document.body.removeChild(a);
            // });  

            // Draw the image
            // ctx.drawImage(this, 0, 0);
            // Get Base64 img, 0.8 means quality
            // console.log(canvas.toDataURL('image/jpeg', 0.8))
            // const pw = createTextElement(w);
            // const ph = createTextElement(h);
            // appendChildrenToElement([pw, ph], section)
            }

        const img = createImageElement(source, "", getImage)
        // img.id = 'img_c'
        const i = new Image()
        i.src = source;
        i.onload = function () {
            getConverterMenu({size : size, src: source, w : this.width, h : this.height});
        }
    }

    input_file.addEventListener('change', createImageUrl);

    // const label_file = document.querySelector('#file_label')

    label_file.addEventListener('drag', e => {e.preventDefault();})
    label_file.addEventListener('dragstart', e => {e.preventDefault();})
    label_file.addEventListener('dragover', e => {e.preventDefault();})
    label_file.addEventListener('dragend', e => {e.preventDefault();})
    label_file.addEventListener('dragenter', e => {e.preventDefault();})
    label_file.addEventListener('dragleave', e => {e.preventDefault();})

    label_file.addEventListener('drop', e => {
        e.preventDefault();
        console.log(e.dataTransfer.files)
    })

    // const resizeCont = document.querySelector('.r_container');
    // const resizeDiv = document.querySelector('.resize');
    
    // const rne = document.querySelector('.r-ne');
    // const rse = document.querySelector('.r-se');
    // const rnw = document.querySelector('.r-nw');
    // const rsw = document.querySelector('.r-sw');
    // const rn = document.querySelector('.r-n');
    // const rs = document.querySelector('.r-s');
    // const rw = document.querySelector('.r-w');
    // const re = document.querySelector('.r-e');

    // let contW = resizeCont.clientWidth;
    // let contH = resizeCont.clientHeight;
    // let min = Math.min(contW, contH);
    // let r = contW - contH;
    // let u = r / 2;
    // let width = min;
    // let height = min;

    // let actualLeft = u;
    // let actualTop = 0;
    // let pointLeft = u;
    // let pointTop = 0;

    // resizeDiv.style.width = `${min}px`;
    // resizeDiv.style.height = `${min}px`;
    // resizeDiv.style.top = `${0}px`;
    // resizeDiv.style.left = `${u}px`;

    // let moving = false;

    // let pointInitialX = 0;
    // let pointInitialY = 0;
    // let restoX = 0;
    // let restoY = 0;
    // let dir = ''

    // const mousedown = (e, dire) => {
    //     e.stopPropagation();
    //     e.stopImmediatePropagation();
    //     e.preventDefault();
    //     moving = true;
    //     pointInitialX = e.clientX;
    //     pointInitialY = e.clientY;
    //     dir = dire;
    // }

    // const mouseover = (e) => {
    //     if (!moving) return;
    //     let spaceLeft = resizeCont.getBoundingClientRect().left;
    //     let spaceTop = resizeCont.getBoundingClientRect().top;

    //     if (dir.includes('w')) {
    //         actualLeft = e.clientX - spaceLeft;
    //         restoX = pointLeft + spaceLeft - e.clientX;
    //         resizeDiv.style.left = `${actualLeft}px`;
    //         resizeDiv.style.width = `${width + restoX}px`;
    //     }
        
    //     if (dir.includes('n')) {
    //         actualTop = e.clientY - spaceTop;
    //         restoY = pointTop + spaceTop - e.clientY;
    //         resizeDiv.style.top = `${actualTop}px`;
    //         resizeDiv.style.height = `${height + restoY}px`;
    //     }

    //     if (dir.includes('s')) {
    //         height = e.clientY - (spaceTop + pointTop);
    //         resizeDiv.style.height = `${height}px`;
    //     }

    //     if (dir.includes('e')) {
    //         width = e.clientX - (spaceLeft + pointLeft);
    //         resizeDiv.style.width = `${width}px`;
    //     }

    //     if (dir.includes('l')) {
    //         actualLeft = pointLeft + (e.clientX - pointInitialX);
    //         actualTop = pointTop + (e.clientY - pointInitialY);
    //         resizeDiv.style.left = `${actualLeft}px`;
    //         resizeDiv.style.top = `${actualTop}px`;
    //     }
    // }

    // const mouseup = () => {
    //     moving = false;
    //     pointLeft = actualLeft;
    //     pointTop = actualTop;
    //     width += restoX;
    //     height += restoY; 
    //     restoX = 0;
    //     restoY = 0;
    // }

    // rw.addEventListener('mousedown', (e) => mousedown(e, 'w'));
    // re.addEventListener('mousedown', (e) => mousedown(e, 'e'));
    // rn.addEventListener('mousedown', (e) => mousedown(e, 'n'));
    // rs.addEventListener('mousedown', (e) => mousedown(e, 's'));
    
    // rnw.addEventListener('mousedown', (e) => mousedown(e, 'nw'));
    // rne.addEventListener('mousedown', (e) => mousedown(e, 'ne'));
    // rsw.addEventListener('mousedown', (e) => mousedown(e, 'sw'));
    // rse.addEventListener('mousedown', (e) => mousedown(e, 'se'));
    
    // resizeDiv.addEventListener('mousedown', (e) => mousedown(e, 'l'));

    // resizeCont.addEventListener('mousemove', mouseover)
    // resizeCont.addEventListener('mouseup', mouseup)
    // resizeCont.addEventListener('mouseleave', mouseup)

    // const sendButton = document.querySelector('#send');
    // sendButton.addEventListener('click', () => {
    //     console.log(pointTop, pointTop + width)
    //     console.log(pointLeft, pointLeft + height)
    // });
    base64button.addEventListener('click', getBase64Menu)

})()
(function() {
    const label_file = document.getElementById('file_label');
    const input_file = document.getElementById('file');
    const section = document.getElementById('add_img')
    let currentFile = null;

    const createTextElement = (text, type='p') => {
        const element = document.createElement(type);
        element.innerHTML = text;
        return element;
    }

    const createImageElement = (source, alt='user_imagen', callback = function() {}) => {
        const img = document.createElement('img');
        img.src = source;
        img.alt = alt;
        img.addEventListener('load', callback);
        return img;
    }

    const createContainerElement = (children = [], type='div') => {
        const container = document.createElement(type);
        for (const child of children) {
            container.appendChild(child)
        }
    }

    const appendChildrenToElement = (children = [], parentNode) => {
        for (const child of children) {
            parentNode.appendChild(child)
        }
    }

    const initialMenu = `<h1>Convierte tus imágenes</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, quos necessitatibus! Aut, officia dolor tempora eligendi voluptas ex ipsa cumque!</p>
    <label class="img_container" for="file" id="file_label">
        <svg viewBox="0 0 122.88 88.98" style="enable-background:new 0 0 122.88 88.98" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M85.33,16.83c12.99-9.83,31.92,1.63,31.92,13.63c0,7.75-2.97,10.79-7.57,14.03 c23.2,12.41,12.7,39.86-7.54,44.49l-70.69,0c-33.2,0-45.48-44.99-10.13-55.89C14.69,6.66,66.5-17.2,85.33,16.83L85.33,16.83z M53.37,69.54V53.66H39.16l22.29-26.82l22.29,26.82H69.53v15.88H53.37L53.37,69.54z"/></g></svg>
        <p>Ingrese su archivo</p>
        <input type="file" name="" id="file">
    </label>`

    const converterMenu = () => `
        <img src=${img.src} id="img_c" alt="">
        <div id='img_info'>
            <p>${img.size}</p>
        </div>
        <button>Recortar</button>
        <button>Cancelar</button>
    `

    const deleteChildren = (parent, clases) => {
        const children = parent.children;
        console.log(children)
        
        for (const child of children) {
            const isBubble = child.classList.value.includes(clases);
            if (!isBubble) {
                child.parentNode.removeChild(child);
            }
        }
    }

    const deleteAllChildren = (parent) => {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    function createImageUrl() {
        for (const file of this.files) {
            const source = URL.createObjectURL(file);
            deleteAllChildren(section);

            function getImage() {
                let w = this.clientWidth;
                let h = this.clientHeight;
                const pw = createTextElement(w);
                const ph = createTextElement(h);
                appendChildrenToElement([pw, ph], section)
            }

            const img = createImageElement(source, "", getImage)
            const p_size = createTextElement(`${file.size} KB`)

            appendChildrenToElement([img, p_size], section)
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
})()
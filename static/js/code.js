(function() {
    const fallbackCopyTextToClipboard = (text) => {
        let textArea = document.createElement("textarea");
        textArea.value = text;
        
        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
      
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
      
        try {
          let successful = document.execCommand('copy');
          let msg = successful ? 'successful' : 'unsuccessful';
          console.log('Fallback: Copying text command was ' + msg);
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
        }
      
        document.body.removeChild(textArea);
      }

    const copyTextToClipboard = (text) => {
        if (!navigator.clipboard) {
            fallbackCopyTextToClipboard(text);
            return;
        }
        navigator.clipboard.writeText(text);
    }

    const copy1 = document.querySelector('#copy1');
    const copy2 = document.querySelector('#copy2');
    const copy3 = document.querySelector('#copy3');
    const copy4 = document.querySelector('#copy4');
    const copy5 = document.querySelector('#copy5');
    const copy6 = document.querySelector('#copy6');
    const copy7 = document.querySelector('#copy7');
    const copy8 = document.querySelector('#copy8');

    copy1.addEventListener('click', () => copyTextToClipboard('<iframe src="http://localhost:8000/converter" width="500px" height="500px">'));
    copy2.addEventListener('click', () => copyTextToClipboard('<iframe src="http://localhost:8000/converter?color=green" width="500px" height="500px">'));
    copy8.addEventListener('click', () => copyTextToClipboard('<iframe src="http://localhost:8000/co?color=green" width="500px" height="500px">'));
    copy3.addEventListener('click', () => copyTextToClipboard(`const URL_ = window.URL || window.webkitURL;
        const downloadBlob = (blob) => {
            let a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            const url = URL_.createObjectURL(blob);
            a.href = url;
            a.download = 'imagen.jpeg';
            a.click();
            URL_.revokeObjectURL(url);
            document.body.removeChild(a);
    }`));

    copy4.addEventListener('click', () => copyTextToClipboard(`const sendImg = () => { 
        const formdata = new FormData();
        formdata.append('img', currentFile)
        fetch('http://localhost:8000/img/', {method: 'post', body: formdata})
            .then(res => res.blob())
            .then(downloadBlob)
    }`));

    copy5.addEventListener('click', () => copyTextToClipboard(`const sendBase64 = () => { 
        const formdata = new FormData();
        formdata.append('img_base64', textarea.value);
        fetch('http://localhost:8000/img/base64', {method: 'put', body: formdata});
            .then(res => res.blob())
            .then(downloadBlob)
    }`));

    copy6.addEventListener('click', () => copyTextToClipboard(`const sendImg = () => { 
        const formdata = new FormData();
        formdata.append('img', currentFile)
        formdata.append('size', sizeInput.value)
        formdata.append('b64', b64Checkbox.checked)
        formdata.append('box', boxCheckbox.checked)
    
        fetch('http://localhost:8000/img/', {method: 'post', body: formdata})
            .then(res => res.json()
                .then(e => console.log(e))
        )
    }`));

    copy7.addEventListener('click', () => copyTextToClipboard(`const sendImg = () => { 
        const formdata = new FormData();
        formdata.append('img', currentFile)
        formdata.append('top', 50)
        formdata.append('left', 50)
        formdata.append('right', 100)
        formdata.append('bottom', 100)
    
        fetch('http://localhost:8000/img/', {method: 'post', body: formdata})
            .then(res => res.blob())
                .then(downloadBlob)
    }`));
})()
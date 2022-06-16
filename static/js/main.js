(function() {
    const body = document.querySelector('body');
    const header = document.getElementById('header');
    const list = document.getElementById('lista');
    const barras = document.getElementById('barras');
    const shadow = document.getElementById('shadow');
    let active = false;

    const handleMenu = () => {
        barras.classList.toggle('oc');

        list.style.left = active ? '-25rem' : '0';
        shadow.style.opacity = active ? 0 : 1;
        shadow.style.visibility = active ? 'hidden' : 'visible';
        body.style.overflow = active ? 'visible' : 'hidden';
        
        active = !active;
    }

    let oldPosition = window.scrollY;
    const scrollHandler = () => {
        let newPosition = window.scrollY;
        header.style.top = (newPosition > oldPosition) ? '-3.4375rem' : 0;
        header.style.background = (newPosition > 20) ? 'var(--light)' : 'transparent';
        header.style.boxShadow = (newPosition > 20) ? '0 0 0.3125rem var(--shadow)' : 'none';
        oldPosition = newPosition;
    }

    const handleResize = () => {
        if (window.innerWidth / 7 > window.innerHeight / 6) {
            if (active) handleMenu();
        }
    }

    barras.addEventListener('click', handleMenu);
    shadow.addEventListener('click', handleMenu);

    scrollHandler();    
    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', handleResize);
})()
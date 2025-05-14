function setBackgroundImage() {
    const backgroundImage = localStorage.getItem('backgroundImage');
    const bgImd = JSON.parse(backgroundImage)
    console.log(bgImd)
  
    if (bgImd.bg == 3) {
        document.body.style.backgroundColor = `var(--background-noir-profond)`;
        document.body.style.backgroundImage = ''
    } else {
        document.body.style.backgroundImage = `url(${bgImd.tab[bgImd.bg]})`;
    }
}

window.addEventListener('DOMContentLoaded', setBackgroundImage);
// localStorage.removeItem('backgroundImage')
window.onclick = () => {
    console.log(window.screen.width)
}

let screenWidth = window.screen.width,
    screenHeight = window.screen.height,
    val1 = 0,
    val2 = 0

switch (screenWidth) {
    case 320 :
        val1 = 10.200
        val2 = 10.200
        break
    case 1920 :
        val1 = 4.100
        val2 = 4.200
        break
}



window.onscroll = function(){
    scrollFunc()
}

function scrollFunc(){
    let element = document.getElementById('section2'),
        scrollVal = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    if(element.offsetTop - scrollVal < 180){
        let makeVisual = document.getElementById('makeVisual'),
            animation = anime.timeline({loop: false}),
            mVclasses = ['animate__animated','animate__fadeIn']

        if(makeVisual){
            makeVisual.style.visibility = 'visible'
            makeVisual.style.setProperty('--animate-duration', '5s');
            makeVisual.classList.add(...mVclasses)
        }
        if(window.screen.width > 1200){
            let visualContainer = document.getElementById('visualContainer'),
                img = document.createElement("img")
            img.setAttribute("src","./assets/makeVisual.png")
            img.setAttribute("class","makeVisualImg")
            if(visualContainer.childElementCount === 1){
                setTimeout(()=> {
                    if(makeVisual) {
                        let oldChild = document.getElementById('makeVisual')
                        visualContainer.removeChild(oldChild)
                        visualContainer.appendChild(img)
                    }
                }, 5000)
            }
        }
        // animation.add({
        //         targets: '.ml5 .line',
        //         opacity: [0.5,1],
        //         scaleX: [0, 1],
        //         easing: "easeInOutExpo",
        //         duration: 700
        //     }).add({
        //         targets: '.ml5 .line',
        //         duration: 600,
        //         easing: "easeOutExpo",
        //         translateY: (el, i) => (-val1 + val2*2*i) + "em"
        //     }).add({
        //         targets: '.ml5 .ampersand',
        //         opacity: [0,1],
        //         scaleY: [0.5, 1],
        //         easing: "easeOutExpo",
        //         duration: 600,
        //         offset: '-=600'
        //     }).add({
        //         targets: '.ml5 .letters-left',
        //         opacity: [0,1],
        //         translateX: ["0.5em", 0],
        //         easing: "easeOutExpo",
        //         duration: 600,
        //         offset: '-=300'
        //     }).add({
        //         targets: '.ml5 .letters-right',
        //         opacity: [0,1],
        //         translateX: ["-0.5em", 0],
        //         easing: "easeOutExpo",
        //         duration: 600,
        //         offset: '-=600'
        //     }).add({
        //         targets: '.ml5',
        //         opacity: 0,
        //         duration: 1000,
        //         easing: "easeOutExpo",
        //         delay: 1000
        //     });
        // window.onscroll = animation.play
    }
}


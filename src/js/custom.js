let screenWidth = window.screen.width,
    screenHeight = window.screen.height,
    val1 = 0,
    val2 = 0,
    imageDataArray = [],
    canvasCount = 35

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
    if(element.offsetTop - scrollVal < 529){
        let makeVisual = document.getElementById('makeVisual'),
            animation = anime.timeline({loop: false}),
            mVclasses = ['animate__animated','animate__fadeIn']

        if(makeVisual){
            makeVisual.style.visibility = 'visible'
            makeVisual.style.setProperty('--animate-duration', '1s')
            makeVisual.classList.add(...mVclasses)
            let visualContainer = document.getElementById('visualContainer'),
                img = document.createElement("img")


            img.setAttribute("src","./assets/makeVisual.png")
            img.setAttribute("class","makeVisualImg")
            if(visualContainer.childElementCount === 2){
                setTimeout(()=> {
                    let oldChild = document.getElementById('makeVisual')
                    visualContainer.removeChild(oldChild)
                    visualContainer.appendChild(img)
                    html2canvas(visualContainer).then(canvas => {
                        let ctx = canvas.getContext("2d"),
                            imageData = ctx.getImageData(0,0,canvas.width,canvas.height),
                            pixelArr = imageData.data
                        createBlankImageData(imageData)
                        // put pixel info to imageDataArray (Weighted Distributed)
                        for (let i = 0; i < pixelArr.length; i+=4){
                            //find the highest probability canvas the pixel should be in
                            let p = Math.floor((i/pixelArr.length) * canvasCount),
                                a = imageDataArray[weightedRandomDistrib(p)]
                            a[i] = pixelArr[i]
                            a[i+1] = pixelArr[i+1]
                            a[i+2] = pixelArr[i+2]
                            a[i+3] = pixelArr[i+3]
                        }

                        //create canvas for each imageData and append to target element
                        for (let i = 0; i < canvasCount; i++){
                            let c = newCanvasFromImageData(imageDataArray[i],canvas.width,canvas.height)
                            c.classList.add("dust")
                            $('#visualContainer').append(c)
                        }
                        $('#visualContainer').children().not(".dust").fadeOut(3500)
                        $(".dust").each(function(index){
                            animateBlur($(this),0.8,800)
                            setTimeout(()=>{
                                animateTransform($(this),100,-100,chance.integer({min : -15, max : 15}),800+(110*index))
                            },70*index)
                            $(this).delay(70*index).fadeOut((100*index) + 800,"easeInQuint",() => {
                                $(this).remove()
                                if (visualContainer.childElementCount === 20){
                                    visualContainer.removeChild(document.querySelector('.makeVisualImg'))
                                    visualContainer.style.alignItems = 'normal'
                                    let portfolioContainer = document.querySelector('.portfolioContainer'),
                                        animateArr = ['animate__animated','animate__flipInX','animate__delay-3s']
                                    portfolioContainer.style.display = 'inline-flex'
                                    let children = portfolioContainer.children
                                    for(let i = 0; i < children.length; i++){
                                        animateArr[animateArr.length-1] = `animate__delay-${i+1}s`
                                        children[i].classList.add(...animateArr)
                                    }
                                }
                            })
                        })
                    })
                }, 1000)
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

function weightedRandomDistrib(peak){
    let prob = [], seq = []
    for(let i = 0; i < canvasCount;i++){
        prob.push(Math.pow(canvasCount - Math.abs(peak - i),3))
        seq.push(i)
    }
    return chance.weighted(seq,prob)
}


function createBlankImageData(imageData) {
    for (let i = 0; i < canvasCount;i++){
        let arr = new Uint8ClampedArray(imageData.data)
        for (let j = 0; j < arr.length;j++){
            arr[j] = 0
        }
    imageDataArray.push(arr)
    }
}

function newCanvasFromImageData(imageDataArray,w ,h){
    let canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    let tempCtx = canvas.getContext("2d")
    tempCtx.putImageData(new ImageData(imageDataArray,w,h),0,0)
    return canvas
}

function animateTransform(elem,sx,sy,angle,duration) {
    let td = tx = ty =0
    $({x: 0, y:0, deg:0}).animate({x: sx, y:sy, deg:angle}, {
        duration: duration,
        easing: "easeInQuad",
        step: function(now, fx) {
            if (fx.prop == "x")
                tx = now
            else if (fx.prop == "y")
                ty = now
            else if (fx.prop == "deg")
                td = now
            elem.css({
                transform: 'rotate(' + td + 'deg)' + 'translate(' + tx + 'px,'+ ty +'px)'
            });
        }
    });
}

function animateBlur(elem,radius,duration) {
    let r =0
    $({rad:0}).animate({rad:radius}, {
        duration: duration,
        easing: "easeOutQuad",
        step: function(now) {
            elem.css({
                filter: 'blur(' + now + 'px)'
            })
        }
    });
}


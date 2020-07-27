window.onscroll = function(){
  scrollFunc()
}

function scrollFunc(){
  let element = document.getElementById('section2'),
      scrollVal = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
  if(element.offsetTop - scrollVal < 180){
    let animation = anime.timeline({loop: false})
        .add({
          targets: '.ml5 .line',
          opacity: [0.5,1],
          scaleX: [0, 1],
          easing: "easeInOutExpo",
          duration: 700
        })
        .add({
          targets: '.ml5 .line',
          duration: 600,
          easing: "easeOutExpo",
          translateY: (el, i) => (-4.500 + 4.700*2*i) + "em"
        })
        .add({
          targets: '.ml5 .ampersand',
          opacity: [0,1],
          scaleY: [0.5, 1],
          easing: "easeOutExpo",
          duration: 600,
          offset: '-=600'
        })
        .add({
          targets: '.ml5 .letters-left',
          opacity: [0,1],
          translateX: ["0.5em", 0],
          easing: "easeOutExpo",
          duration: 600,
          offset: '-=300'
        })
        .add({
          targets: '.ml5 .letters-right',
          opacity: [0,1],
          translateX: ["-0.5em", 0],
          easing: "easeOutExpo",
          duration: 600,
          offset: '-=600'
        });
    window.onscroll = animation.play
  }
}


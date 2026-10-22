function modChart_notesBump(all = true,{ all_type = [0,1], speed = 1, intensity = 10 }) {
    if (all) {
        for (var i = 0; i < game.notes.length; i++) {
            var e = game.notes[i].style.top.split("px")[0];
            FMS_makeCSSanim(game.notes[i].id,speed,"ease-in",1,[{ top: (e-intensity)+"px" },{ top: e+"px" }]).play()
        }
    }
}

function modChart_notesSpin(all = true, { all_type = [0, 1], speed = 1, intensity = 10 }) {
    if (all) {
        for (var i = 0; i < game.notes.length; i++) {
            var e = game.notes[i].style.top.split("px")[0];
            var c = 2;
            const s = i;
            
            const loop = setInterval(() => {
                if (c <= 1) {
                    clearInterval(loop)
                }
                c -= 0.003;
                game.notes[s].style.transform = "scale("+(ease_easeInElastic(c,2)+1)+",1)";
            },10)
        }
    }
}


    //modChart_notesBump(true,{ speed: 0.5, intensity: 30 });
    //modChart_notesSpin(true, {})


// if FMS engine is disable ( probably impossible)
/* document.getElementById(id).animate(anim, { duration: duration * 1000, easing: easing, iterations: loopTime, }) */

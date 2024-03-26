function change(){
    let switch_log =document.getElementById("switch-login");
    let checked = true;

    document.querySelector(".sing").addEventListener('click',function(){
        if(checked === true){
            document.getElementById("gif").src ="videos/gif2.gif"
            switch_log.style.transition = "0.8s"
            switch_log.style.transform = "translateX(100%)"
            switch_log.style.background = "#0a0a0a"
            switch_log.style.borderRadius = "0px"
            switch_log.style.borderTopRightRadius = "25px"
            switch_log.style.borderBottomRightRadius = "25px"
            this.innerHTML = "CREATE";
            checked = false;
        }else{
            document.getElementById("gif").src ="videos/gif1.gif"
            switch_log.style.transition = "0.8s"
            switch_log.style.transform = "translateX(0%)"
            switch_log.style.background = "#222"
            switch_log.style.borderRadius = "0px"
            switch_log.style.borderTopLeftRadius = "25px"
            switch_log.style.borderBottomLeftRadius = "25px"
            this.innerHTML = "LOGIN";
            checked = true;
        }
    })
}
change();
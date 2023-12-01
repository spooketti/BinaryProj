let sidevis = true;
let sideModal = document.getElementById("SideNavModal")

document.addEventListener("keydown",function(e)
{
    if(e.key == "Tab")
    {
        e.preventDefault()
        sidevis = !sidevis
        if(sidevis == false)
        {
            sideNav.style.transform = "translateX(0%)"
            sideModal.style.opacity = 1;
            sideModal.style.pointerEvents = "all"
            return;
        }
        sideModal.style.opacity = 0;
        sideNav.style.transform = "translateX(-100%)"
        sideModal.style.pointerEvents = "none"

        
    }
})
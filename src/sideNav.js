let sidevis = true;
let sideNav = document.getElementById("SideNav")
let sideModal = document.getElementById("SideNavModal")

document.addEventListener("keydown",function(e)
{
    if(e.key == "Tab")
    {
        e.preventDefault()
        sideBar()

        
    }
})

function sideBar()
{
    sidevis = !sidevis
    if(sidevis == false)
    {
        sideNav.style.transform = "translateX(0%)"
        sideModal.style.opacity = 1;
        return;
    }
    sideModal.style.opacity = 0;
    sideNav.style.transform = "translateX(-100%)"
}
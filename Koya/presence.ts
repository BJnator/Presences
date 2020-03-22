const presence = new Presence({
    clientId: "691325899307483197",
    mediaKeys: false
});

var user : any;
var title : any;
var replace : any;
var search : any;

var browsingStamp = Math.floor(Date.now()/1000);

presence.on("UpdateData", async () => {
    let presenceData: presenceData = {
        largeImageKey: "logo"
    };

    var route = document.location.pathname.split('/');

    if(document.location.pathname === "/") {
        presenceData.details = "Home";
    } else if(document.location.pathname.includes("/dashboard")) {
        presenceData.details = "Dashboard";
        presenceData.state = "Choosing a server...";
    } else if(document.location.pathname.includes("/server/")) {
        presenceData.details = "Edit a server : " + document.querySelector(".title").textContent;
        if(!route[3]) {
            presenceData.state = "Main";
        } else {
            presenceData.state = document.querySelector("a.is-active").textContent;
        }
    } else if(document.location.pathname.includes("/status")) {
        presenceData.details = "Status";
        presenceData.state = "Watching current status of Koya";
    } else if(document.location.pathname.includes("/commands")) {
        presenceData.details = "Commands";
        presenceData.state = document.querySelector("a.cat-toggle.is-active").textContent;
    } else if(document.location.pathname.includes("/premium")) {
        presenceData.details = "Premium";
        presenceData.state = "Watching premium page";
    }

    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        if(presenceData.state == null) presenceData.state = "Navigate...";
        presence.setActivity(presenceData);
    }
});

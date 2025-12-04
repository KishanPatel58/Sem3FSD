const startbutton = document.getElementById("Windowsicon");
const startmenu = document.getElementById("start-menu");
const main = document.getElementById("main");
const terminalpanel = document.getElementById("terminal");
const terminalbtn = document.getElementById("terminalbtn");
const restordown = document.getElementById("restordown");
const maximise = document.getElementById("maximise");
const closebtn = document.querySelector(".closebtn");
const myFolder = document.querySelectorAll(".myFolder");
let fleg = 0
let terminal = 0
startbutton.addEventListener("click", (e) => {
    if (fleg == 0) {
        startmenu.style.bottom = "-100%"
        fleg = 1
    } else {
        startmenu.style.bottom = "10%"
        fleg = 0
    }
})
main.addEventListener("click", (e) => {
    startmenu.style.bottom = "-100%"
})

// for working terminal
const input = document.getElementById("cmdInput");
const output = document.getElementById("output");
const cmdspan = document.getElementById("cmdspan");
let foldername = null
function fetchfolders() {
    window.addEventListener("load", () => {
    Object.keys(localStorage).forEach((folderName) => {
        createFolderUI(folderName);
    });
});
}
fetchfolders()
function createFolderUI(foldername) {
    const div = document.createElement("div");
    div.classList.add("myFolder");

    const img = document.createElement("img");
    img.src = "assets/folder.svg";
    img.alt = "Folder Icon";
    div.appendChild(img);

    const h1 = document.createElement("h1");
    h1.innerText = foldername;
    div.appendChild(h1);

    main.appendChild(div);

    // Double click event
    div.addEventListener("dblclick", (event) => {
        const actualFolder = event.target.closest(".myFolder");
        const name = actualFolder.querySelector("h1").innerText;

        // delete from localStorage
        localStorage.removeItem(name);

        // remove from UI
        actualFolder.remove();

        console.log("Deleted:", name);
    });
}
function CreateFolder(){
    // const foldername = folderInput.value.trim();

    if (!foldername) return;

    // Save in storage
    localStorage.setItem(foldername, foldername);

    createFolderUI(foldername);
}

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        const cmd = input.value;
        output.innerHTML += `<div>C:\\> ${cmd}</div>`;
        const word = input.value.split(" ")
        // simple responses
        if (cmd === "help") {
            output.innerHTML += "<div>Available commands: help, clear, time</div>";
        } else if (cmd === "time") {
            output.innerHTML += `<div>${new Date().toLocaleTimeString()}</div>`;
        } else if (cmd === "cd Desktop") {
            cmdspan.innerHTML = `<div>C:\\Desktop></div>`;
        } else if (cmd === "cd ..") {
            cmdspan.innerHTML = `<div>C:\\></div>`;
        }
        else if (cmd === "clear") {
            output.innerHTML = "";
        } else if (cmd === "cls") {
            output.innerHTML = "";
        }
        else if (cmd === `mkdir ${word[1]}`) {
            if (word.length == 2) {
                foldername = word[1]
                CreateFolder();
            } else {
                console.log(word, "is not recognize")
            }
        }
        else {
            output.innerHTML += "<div>'" + cmd + "' is not recognized...</div>";
        }

        input.value = "";
        output.scrollTop = output.scrollHeight;
    }
});

// for open command prompt
terminalbtn.addEventListener("click", (e) => {
    if (terminal == 0) {
        terminalpanel.style.bottom = "-100%"
        terminal = 1
    } else {
        terminalpanel.style.bottom = "10%"
        terminal = 0
    }
})
closebtn.addEventListener("click", () => {
    terminalpanel.style.bottom = "-100%"
    input.value = "";
    output.innerHTML = "";
    output.scrollTop = output.scrollHeight;
})
maximise.addEventListener("click", () => {
    terminalpanel.style.width = "99%"
    terminalpanel.style.height = "90%"
    restordown.style.display = "block"
    maximise.style.display = "none"
})
restordown.addEventListener("click", () => {
    terminalpanel.style.width = "65vh"
    terminalpanel.style.height = "60vh"
    restordown.style.display = "none"
    maximise.style.display = "block"
})

document.addEventListener("keydown", (e) => {
    if (e.metaKey && e.shiftKey && e.key === 'X') {
        startmenu.style.bottom = "10%"
        fleg = 0
    }
});
document.querySelectorAll(".myFolder").forEach((folder) => {
    folder.addEventListener("dblclick", (event) => {
        const folderName = folder.querySelector("h1").innerText;
        localStorage.removeItem(folder);
        console.log("Removed:", folderName);
    });
});
const refreshmenu = document.getElementById("refreshmenu");
main.addEventListener("dblclick",(e)=>{
    refreshmenu.style.transform = `translate(${e.x,e.y})`;
    refreshmenu.style.display = "flex"
    console.log(e)
})

const reload = ()=>{
    window.location.reload();
}

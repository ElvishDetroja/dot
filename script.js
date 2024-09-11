
const input = document.querySelector(".input");

const output = document.querySelector(".output");

const table = document.querySelector(".table");

const tbody = table.querySelector(".tbody");

let MainArray = [];








// textarea to table


input.addEventListener("keyup", printGraph);



function printGraph() {

    MainArray = input.value.split("\n");


    for (let i in MainArray) {

        MainArray[i] = MainArray[i].split(",");

        for (let j in MainArray[i]) {

            MainArray[i][j] = parseInt(MainArray[i][j]);

        }
    }


    var result = "";

    for (let i in MainArray) {


        result += "<tr>";

        for (let j = 1; j < 21; j++) {


            if (MainArray[i].indexOf(j) > -1) {

                result += `<td data-row="${i}" data-column="${j}"><span></span></td>`;
            }
            else {
                result += `<td data-row="${i}" data-column= "${j}"></td>`;
            }

        }

        result += "</tr>";

    }

    tbody.innerHTML = result;

    console.log(MainArray);


}










// table to textarea method 1



// tbody.addEventListener("click", printBlack);


// function printBlack(event) {

//     let final = "";

//     function printReturn() {

//         for (i = 0; i < MainArray.length; i++) {


//             if (String(MainArray[i][0]) == "NaN") {
//                 MainArray[i] = [];
//             }

//             final += `${MainArray[i]}`;

//             if (!(i == MainArray.length - 1)) {
//                 final += `\n`;
//             }
//         }

//         input.value = final;
//     }





//     if (event.target.hasAttribute("data-row")) {

//         let resultRow = Number(event.target.getAttribute("data-row"));
//         let resultColumn = Number(event.target.getAttribute("data-column"));

//         if (String(MainArray[resultRow][0]) == "NaN") {
//             MainArray[resultRow] = [];
//         }

//         console.log(MainArray)

//         MainArray[resultRow].push(resultColumn);

//         printReturn();

//         event.target.innerHTML = "<span>";

//         console.log(MainArray);

//     }



//     else {

//         let resultRow = Number(event.target.parentNode.getAttribute("data-row"));
//         let resultColumn = Number(event.target.parentNode.getAttribute("data-column"));

//         let idx = MainArray[resultRow].indexOf(resultColumn);
//         delete MainArray[resultRow].splice(idx, 1);

//         printReturn();

//         event.target.parentNode.innerHTML = "";

//         console.log(MainArray);

//     }


// }













// table to textarea method 2


tbody.addEventListener("click", printBlack);


function printBlack(event) {

    MainArray = [];


    if (event.target.hasAttribute("data-row")) {
        event.target.innerHTML = "<span>";
    }

    else {
        event.target.parentNode.innerHTML = "";
    }


    for (let i = 0; i < tbody.childElementCount; i++) {

        MainArray[i] = [];

        for (let j = 0; j < tbody.children[i].childElementCount; j++) {

            if (!tbody.children[i].children[j].innerHTML == "") {

                MainArray[i].push(Number(j + 1));
            }

        }
    }

    let final = "";

    for (i = 0; i < MainArray.length; i++) {

        final += `${MainArray[i]}`;

        if (!(i == MainArray.length - 1)) {
            final += `\n`;
        }
    }

    input.value = final;

    console.log(MainArray);

}























// #############################################################






// download image


const png = document.querySelector(".png");

png.addEventListener("click", capturePNG);


function capturePNG() {

    domtoimage.toBlob(table).then(function (table) {
        console.log("aa");
        window.saveAs(table, "DOT.png");
    });

}





const jpg = document.querySelector(".jpg");

jpg.addEventListener("click", captureJPG);


function captureJPG() {

    domtoimage.toBlob(table).then(function (table) {
        window.saveAs(table, "DOT.jpg");
    });

}








const eye = document.querySelector(".eye");

const imgSection = document.querySelector(".img-section");
const imgSectionContent = document.querySelector(".img-section-content");

eye.addEventListener("click", captureEYE);


function captureEYE() {

    imgSection.style.display = "block";

    domtoimage.toPng(table).then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        imgSectionContent.innerHTML = "";
        imgSectionContent.appendChild(img);
    }).catch(function (error) {
        console.error('oops, something went wrong!', error);
    });

}



const close = document.querySelector(".img-section-close");

close.addEventListener("click", imgSectionClose);

function imgSectionClose() {

    imgSection.style.display = "none";
}












// full screen

const full = document.querySelector(".full");


function openFullscreen() {

    var elem = document.documentElement;

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem = window.top.document.body; //To break out of frame in IE
        elem.msRequestFullscreen();
    }
}


full.addEventListener("click", openFullscreen);
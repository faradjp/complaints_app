// console.log('Hi There')
// const promise = $.ajax({ url: "https://data.cityofnewyork.us/resource/erm2-nwe9.json" });

// promise.then(
//     // if successful
//     (data) => {

//         for (let index = 0; index < data.length; index++) {
//             const borough = data[index].borough;
//             console.log(borough)
//         }
//     }
// )

const APP_TOKEN = "3nMPlHyMofEykN2kh1YXuq6vz";
const NYPD_AGENCY = "New York City Police Department";
const BOROUGHS = ["BROOKLYN", "MANHATTAN", "QUEENS", "STATEN ISLAND", "BRONX"];
const NUM_OF_BOROUGH_DIVS = BOROUGHS.length
let backgroundColors = ["green", "blue", "red", "orange", "purple"];
const MY_URL = "https://data.cityofnewyork.us/resource/erm2-nwe9.json?";
const DEFAULT_LIMIT = 10;


$(() => {
    $("body").css({
    "background-color" : "lightgrey"
    });
    $(".copyright-spacing").css({
    "display": "flex",
    "justify-content": "center"
    })
    $(".copyright").css({
    "font-weight": "bold",
    "font-size": "16px",
    "margin": "8px"
    })
    $("h2").css({
    "font-size" : "2rem",
    "text-transform" : "capitalize"
    })
    $(".boroughDiv").append('<button class="getAnswers">');
    $(".getAnswers").text("check");
    $(".getAnswers").css({
        "height" : "4rem",
        "width" : "8rem",
        "color" : "white",
        "font-size" : "1.5rem",
        "font-weight" : "bolder",
        "text-transform" : "capitalize",
        "background" : "rgba(0,0,0,0.25)",
        "cursor" : "pointer"
    });
    $(".paragraphDiv").append('<button class="closeResults">')
    $(".closeResults").css({
            "height" : "2rem",
            "width" : "5rem",
            "display" : "none"
    })
    $(".closeResults").text("Close");
    $(".closeResults").css({
        "cursor" : "pointer"
    })

    
    backgroundColors.forEach((item, index) => {
        $(".boroughDiv").eq(index).css({
            "background-color" : item,
            "margin-right" : "50%"
        })
    })



    for(let i = 0; i < NUM_OF_BOROUGH_DIVS; i++) {
        let userInput;
        let paragraphStyle;
        $(".getAnswers").eq(i).on("submit", (e) => {
            e.preventDefault();
        })
        $("h2").eq(i).append("<input>");
        $(".closeResults").eq(i).click(() => {
            $("p").eq(i).html("");
            $("p").eq(i).css({
                "width" : "0",
                "background" : "none",
                "margin" : "0",
                "padding" : "0"
        })
            $(".closeResults").eq(i).css({
                "display" : "none"
            })
        })
        
        $(".getAnswers").eq(i).click(()=>{
            userInput = parseInt($("input:text").eq(i).val());
            paragraphStyle = 
                $("p").eq(i).css({
                    "width" : "50%",
                    "background" : "lightblue",
                    "margin" : "1rem",
                    "padding" : "1rem"
                });
            if(typeof userInput === "number" && isNaN(userInput) === false) {
                $.ajax({
                    url: MY_URL,
                    type: "GET",
                    data: {
                        "$limit" : userInput,
                        "$$app_token" : APP_TOKEN,
                        "agency_name" : NYPD_AGENCY,
                        "borough" : BOROUGHS[i]
                    }
                }).done((data) => {
                    $("p").eq(i).html("");
                    paragraphStyle;
                    $(".closeResults").eq(i).css({
                        "display" : "block"
                    })
                    for (let j = 0; j < userInput; j ++) {
                        $("p").eq(i).append(`<p>${data[j].borough}: Compalint: ${data[j].complaint_type} - ${data[j].descriptor} <button class=responseButton id=responseButton${j}>police response</button></p>\n`);
                        $(".responseButton").css({
                            "text-transform" : "capitalize",
                            "background-color" : "red",
                            "cursor" : "pointer"
                        })
                        let toggle = true;
                        $(`#responseButton${j}`).on("click", () => {
                            if(toggle === true){
                                $(`#responseButton${j}`).text(` Resolution: ${data[j].resolution_description}`)
                                toggle = false;
                            }else {
                                $(`#responseButton${j}`).text("Police Response")
                                toggle = true;
                            }
                        })
                    }
                }) 
            } else {
                $.ajax({
                    url: MY_URL,
                    type: "GET",
                    data: {
                        "$limit" : DEFAULT_LIMIT,
                        "$$app_token" : APP_TOKEN,
                        "agency_name" : NYPD_AGENCY,
                        "borough" : BOROUGHS[i]
                    }
                }).done((data) => {
                    $("p").eq(i).html("");
                    paragraphStyle;
                    $(".closeResults").eq(i).css({
                        "display" : "block"
                    })
                    for (let j = 0; j < DEFAULT_LIMIT; j ++) {
                        $("p").eq(i).append(`<p>${data[j].borough}: Compalint: ${data[j].complaint_type} - ${data[j].descriptor} <button class=responseButton id=responseButton${j}>police response</button></p>\n`);
                        $(".responseButton").css({
                            "text-transform" : "capitalize",
                            "background-color" : "red",
                            "cursor" : "pointer"
                        })
                        let toggle = true;
                        $(`#responseButton${j}`).on("click", () => {
                            if(toggle === true){
                                $(`#responseButton${j}`).text(` Resolution: ${data[j].resolution_description}`)
                                toggle = false;
                            }else {
                                $(`#responseButton${j}`).text("Police Response")
                                toggle = true;
                            }
                        })
                    }
                });
            }
        })
    }
    $("input:text").css({
        "margin-left" : "1rem"
    })
    $("input:text").attr("placeholder", "Type your number here");

    
})





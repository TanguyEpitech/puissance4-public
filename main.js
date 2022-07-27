(function($) {
    $.fn.myPlugin = function(obj) {

        var game = new connect4(obj.colonne, obj.ligne, obj.div);
        //var map = $(".col")






    };

})(jQuery);


class Player {
    color;
    id;

    constructor(id, color) {
        this.id = id;
        this.color = color;
    }

    getColor() {
        return this.color;
    }

    getId() {
        return this.id;
    }
}


class connect4 {

    map;
    players = []
    turn = 0
    compt;
    cols;
    line;
    constructor(col, lines, div) {
        this.cols = col;
        this.line = lines;
        this.draw(col, lines, div);
        let playerYellow = new Player(0, 'yellow');
        let playerRed = new Player(1, 'blue');
        this.players = [playerYellow, playerRed];
        this.map = $(".col");
        this.createEventClick();
    }

    draw(col, row, contener) {
        var c = 1;
        // c = colonne
        // r = row
        var z = 1;
        contener.css("display", "grid");
        contener.css('grid-template-columns', 'repeat(' + col + ', 64px)');
        var col_div;

        for (c; c <= col; c++) {
            contener.append("<div class='col' id='col-" + c + "'></div>")
                // creer la col
            for (let r = 1; r <= row; r++) {
                col_div = $("#col-" + c);
                // creer le rond
                col_div.append('<div class="round empty row row' + z + '" id="row' + z + '"></div>')
                z++
            }
        }
    }

    // parsing de collonne
    winCol() {
        var div_row = [];

        for (let k = 0; k < 42; k++) {
            div_row.push($("#row" + k))
        }
        for (let g = 0; g < div_row.length - 4; g++) {
            if (div_row[g].hasClass("blue") && div_row[g + 1].hasClass("blue") && div_row[g + 2].hasClass("blue") &&
                div_row[g + 3].hasClass("blue")) {
                $("#map").append("<p>les bleus remportent !!!!!</p>");
                $("p").append(" <br> <a href=''>  rejouer </a> ");
            }
            if (div_row[g].hasClass("yellow") && div_row[g + 1].hasClass("yellow") && div_row[g + 2].hasClass("yellow") &&
                div_row[g + 3].hasClass("yellow")) {
                $("#map").append("<p>les jaunes remportent !!!!!</p>");
                $("p").append(" <br> <a href=''>  rejouer </a> ");
            }
        }
    }

    // parsing de lines
    isWinnerLine() {
        let div_tab = $(".col");

        for (let x = 0; x <= this.cols; x++) {
            let blue = 0;
            let yellow = 0;

            for (let y = 0; y <= this.line; y++) {
                if ($(div_tab[y].children[x]).hasClass("blue")) {

                    blue++
                    yellow = 0;

                    if (blue == 4) {
                        $("#map").append("<p>les bleus remportent !!!!!</p>");
                        $("p").append(" <br> <a href=''>  rejouer </a> ");
                    }
                } else if ($(div_tab[y].children[x]).hasClass("yellow")) {
                    yellow++
                    blue = 0;

                    if (yellow == 4) {
                        $("#map").append("<p>les jaunes remportent !!!!!</p>");
                        $("p").append(" <br> <a href=''>  rejouer </a> ");
                    }
                } else {
                    blue = 0;
                    yellow = 0;
                }
            }
            blue = 0;
            yellow = 0;
        }

    }

    winnerDiago() {
        let div_tab = $(".col");
        let winblue = 0;
        let winyellow = 0


        for (let a = 0; a <= this.cols; a++) {
            for (let m = 0; m <= this.line; m++) {

                if ($(div_tab[m].children[m + a]).hasClass("blue") || $(div_tab[m].children[m - a]).hasClass("blue")) {
                    winblue++;
                    winyellow = 0;
                    console.log(winblue)
                    if (winblue == 4) {
                        $("#map").append("<p>les bleus remportent !!!!!</p>");
                        $("p").append(" <br> <a href=''>  rejouer </a> ");
                    }
                } else if ($(div_tab[m].children[m + a]).hasClass("yellow") || $(div_tab[m].children[m - a]).hasClass("yellow")) {
                    winyellow++;
                    winblue = 0;
                    if (winyellow == 4) {
                        $("#map").append("<p>les jaunes remportent !!!!!</p>");
                        $("p").append(" <br> <a href=''>  rejouer </a> ");
                    }
                } else {
                    winblue = 0;
                    winyellow = 0;
                }

            }


        }

    }

    createEventClick() {
        this.map.click(e => {
            // manque les lignes a changer la couleur !  ----debut

            if (this.compt == 1) {
                var color = "yellow";
                

                var joueur0 =  document.querySelector("#joueur")
                joueur0.innerHTML = "Joueur 2 ";
                this.compt = 0;
            } else {
                var color = "blue";
                var joueur1 =  document.querySelector("#joueur")

           joueur1.innerHTML = "Joueur 1 ";

                this.compt = 1;
            }
            for (let f = 0; f <= this.map.length; f++) {
                if (e.currentTarget == this.map[f - 1]) {
                    let tableCol = $("#col-" + f).children('.empty');
                    tableCol.last().removeClass('empty').addClass(color);
                }
            }
            this.checkVictory()
        })
    }


    checkVictory() {
        this.winCol()
        this.isWinnerLine()
        this.winnerDiago()
    }

}














// if ($(div_tab[m].children[m + a]).hasClass("blue") || $(div_tab[m].children[m - a]).hasClass("blue")) {
//     winblue++
//     console.log(winblue)
//     if (winblue == 4) {
//         console.log("win")


//     }


// } else if ($(div_tab[m].children[m + a]).hasClass("yellow") || $(div_tab[m].children[m - a]).hasClass("yellow")) {
//     winyellow++
//     if (winyellow == 4) {
//         console.log("win")
//     }

// } else {
//     winblue = 0;
//     winyellow = 0;
// }
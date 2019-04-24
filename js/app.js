/*
 * Create a list that holds all of your cards
 */
const movies = ['movie1.jpg', 'movie2.jpg', 'movie3.jpg', 'movie4.jpg', 'movie5.jpg', 'movie6.jpg', 'movie7.jpg', 'movie8.jpg'];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
/* game objection (its moves /timer/open-cards array ) */
let  gameStartegy = function () {
    this.matchedCards = 0;
    this.openCards = [];
    this.moves = 0;
    this.seconds = 0;
    this.interval={};
    this.store = [];
};
/* game start (suffle cards and calling function to add cards images ) */
gameStartegy.prototype.gameStart = function () {
    $('.moves').text(this.moves);
    const suffledMovies = shuffle([...movies, ...movies]);
    addCards(this, suffledMovies);
};
/*  add cards images / handling click event and calling function to match cards ) */
addCards = function (obj, suffledMovies) {
    $(".card img").each(function (index) {
        $(this).attr("src", "img/" + suffledMovies[index]);
    });
    $(".card").each(function (index) {
        $(this).click(function () {
            $(this).attr("id" ,index);
            obj.openCards.push($(this));
            obj.store.push($(this).attr("id"));
            var flag= true;
            if (obj.store.length === 2)
            {
                if(obj.store[0] === obj.store[1])
                {
                    flag = false;
                }    
                obj.store = [];
                 if(flag === true)
                    {
                    obj.moves++;
                     }
                       if (obj.moves === 1) {
                obj.timer();
            }
                      if(obj.moves ===3 && flag === true )
            {
                console.log("hereeeeeeeeeeeee33")
                obj.deleteStar();
            }else if (obj.moves ===7 && flag === true)
            {
                console.log("oops")
                 obj.deleteStar();
            }
            
            }
           
            console.log(obj.moves);
            console.log(flag);
           
            $('.moves').text(obj.moves);
            $(this).find("img").addClass('open-card');
          
            obj.matchCard();      
        });
    });
};
/*  function to determine game timer */
gameStartegy.prototype.timer = function ()
{
    this.interval=setInterval(() => {        
        this.seconds++;
        $('.seconds').text(this.seconds);
    }, 1000);
};
/*  function to reset game timer to 0 and start again */
gameStartegy.prototype.stopTimer =function () {
    clearInterval(this.interval);
    this.seconds = 0;

    $('.seconds').text(this.seconds);
}
/*  function to delete star when called */
gameStartegy.prototype.deleteStar = function ()
{
    $('.stars li:last-child').remove(); 
};
/* determine state of opened cards to see if they match or not */
gameStartegy.prototype.matchCard = function ()
{
    
    if (this.openCards.length === 2)
    {
        var oneCard = this.openCards[0];
        var twoCard1 = this.openCards[1];
        console.log(oneCard);
        twoCard = twoCard1.find("img").attr("src");
        if(oneCard.attr("id") === twoCard1.attr("id"))
        {
         twoCard="";         
        }
        oneCard = oneCard.find("img").attr("src");
        if (oneCard === twoCard && twoCard != "")
        {
            perfectMatch(this);
        }
        else
        {
            failMatch(this);
        }
    }
};
/* called when cards are matched and opens win model when all cards are opened */
function perfectMatch(obj)
{
    
    var oneCard = obj.openCards[0];
    
    oneCard = oneCard.unbind('click');
    var twoCard = obj.openCards[1];
    twoCard = twoCard.unbind('click');
    twoCard.addClass("shakeit-card");
    oneCard.addClass("shakeit-card");
    setTimeout(function () {
       oneCard.removeClass('shakeit-card');
       twoCard.removeClass('shakeit-card');
    } ,500);
    
    obj.matchedCards++;
    obj.openCards = [];
    if (obj.matchedCards === 8) {
        $(".timespent").text(obj.seconds);
        obj.stopTimer();
         setTimeout(function() {
      $('#Modal').show();
    }, 800);
    $(".model-stars").text($('.stars li').length);
    }
}
/* called when cards are not matched and return cards to hidden state */
function failMatch(obj)
{
    setTimeout(function () {
        var oneCard = obj.openCards[0];
        oneCard = oneCard.find("img").removeClass('open-card');
        var twoCard = obj.openCards[1];
        twoCard = twoCard.find("img").removeClass('open-card');
        obj.openCards = [];

    }, 300);
}
;
 /*  */
var game = new gameStartegy();
game.gameStart();

/* called when player wants to restart the game any time or when he want to play again*/
function refactor()
{
     setTimeout(function() {
      $('#Modal').hide();
    }, 500);   
    game.stopTimer();
    let cards = $('.card');
    game.matchedCards = 0;
    game.openCards = [];
    game.moves = 0;
    for (const card of cards) {
        $(card).find('img').removeClass("open-card");
        $(card).find('img').attr("src", " ");
        $(card).unbind();
    }
    $('.stars').text(" ");
    let i =0;
    while(i<=2) {
        $('.stars').append('<li><i class="fa fa-star"></i></li>');
        i++;
    }
    game.gameStart();
}

$("#restart").click(function () {
    refactor();
});

 $('#play-agin').click(function () {
    refactor();
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

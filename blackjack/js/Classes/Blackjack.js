/*
Properties of Blackjack:
app - The actual 'Div' element for outputting our game.
deck - 52 cards
shoe - 6 Decks of Cards
fileName - Reference to the img src
indx - Reference for Personal Use
suit - Club, Spade, Heart, or Diamon
value - Value represented on the Card
numVal - Numeric Value of Cards
*/

class Blackjack {
    constructor(element){
        //let tempValue;
        this.playerArray = [];
        this.dealerArray = [];
        this.playerScore = 0;
        this.dealerScore = 0;
        this.dealerHiddenScore = 0;
        this.monies = 500;
        this.dealerAce=0;
        this.playerAce=0;
        this.app = document.getElementById(element);//Pass <div id='app'></div> to a JS object; app is now the Div;
        
        //~~~~~Build the Deck -- Insert into this.deck[]~~~~~
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //~~~~~~~~BUILD THE DECK~~~~~~~~
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //const deck = [];
        let suits = ["Clubs", "Spades", "Hearts", "Diamonds"];
        let values = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];
        this.deck = [];
        for (let i=0; i<suits.length; i++){//for-loop-1
            for(let j=0; j<values.length; j++){//for-loop-2
            //tempValue IF STATEMENT to assign CARD VALUES..... 
                let tempValue;
                switch(values[j]){
                    case 'Jack':  tempValue = 10;
                        break;
                    case 'Queen': tempValue = 10;
                        break;
                    case 'King': tempValue = 10;
                        break;
                    case 'Ace': tempValue = 11;
                        break;
                    default: tempValue=values[j]; 
                }
            //End tempValue statements.....

                let card = {
                    fileName: `${values[j]}-of-${suits[i]}.png`,
                    indx: `${values[j]}-${suits[i]}`,
                    value: values[j],
                    suit: suits[i],
                    numVal: tempValue
                }
                this.deck.push(card);
            }//end for-loop-2
        }//end for-loop-1

        this.shoe = [...this.deck, ...this.deck, ...this.deck, ...this.deck, ...this.deck, ...this.deck];
        //Shuffle Deck
        this.shoe.sort((a,b) => {
            return 0.5 - Math.random()
        });



        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //~~~~~~~~BUILD THE DOM~~~~~~~~
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        this.header = document.createElement('header');
        document.body.insertBefore(this.header, document.body.firstChild);
        //----
        //Deal Button
        this.btnDeal = document.createElement('button');
        this.btnDeal.innerHTML='Deal';
        this.btnDeal.addEventListener('click', this.deal.bind(this));
        this.header.appendChild(this.btnDeal);
        //----
        //Hit Button
        this.btnHit = document.createElement('button');
        this.btnHit.innerHTML='Hit';
        this.btnHit.addEventListener('click', this.hit.bind(this));
        this.header.appendChild(this.btnHit);
        //----
        //Stand Button
        this.btnStand = document.createElement('button');
        this.btnStand.innerHTML='Stand';
        this.btnStand.addEventListener('click', this.stand.bind(this));
        this.header.appendChild(this.btnStand);
        //----
        //Message Box
        this.headbox1 = document.createElement('div');
        this.headbox1.innerHTML = 'Click Deal to Begin';
        this.headbox1.style.cssText = 'border-style: none; margin: 10px;';
        this.header.appendChild(this.headbox1);
        //----
        //Player Score Box
        this.headbox2 = document.createElement('div');
        this.headbox2.innerHTML = 'Player Score';
        this.header.appendChild(this.headbox2);
        //----
        //Dealer Score Box
        this.headbox3 = document.createElement('div');
        this.headbox3.innerHTML = 'Dealer Score';
        this.header.appendChild(this.headbox3);
        //----
        //Money Box
        this.headbox4 = document.createElement('div');
        let textnode =  document.createTextNode('Monies');
        this.headbox4.appendChild(textnode);
        this.header.appendChild(this.headbox4);
        this.headbox4.innerHTML = `$${this.monies}`;
        //----
        //Dealer Card Box
        this.dealerCardBox = document.createElement('div');
        this.app.appendChild(this.dealerCardBox);
        //----
        //Player Card Box
        this.playerCardBox = document.createElement('div');
        //this.playerCardBox.innerHTML = 'Fuck.';
        this.app.appendChild(this.playerCardBox);
        //----
        

//Below is the Output Fun for Testing      
        console.log(this.shoe);
        var x = 0;
        let texty =`<table>
                        <tr>
                            <th colspan='2'>Tester Table &nbsp; &nbsp;[x]=${x}</th>
                        </tr>
                        <tr>
                            <td>fileName:</td>
                            <td>${this.deck[x].fileName}</td>
                        </tr>
                        <tr>
                            <td>numVal:</td>
                            <td>${this.deck[x].numVal}</td>
                        </tr>
                        <tr>
                            <td>indx:</td>
                            <td>${this.deck[x].indx}</td>
                        </tr>
                    </table>`;
        //let textnode =  document.createTextNode(texty);    
        //this.app.innerHTML = texty;
    }//end constructor

    deal(){
        this.reset();
        this.flashBorder('red', 'white');
    //~~~~~~~~~~~~~~~~~~~~~~
    //How to keep track of current cards on table?
        //--Separate Array for dealer and player?
    //Keep track of score. 
        //--So probably need separate arrays
    //SetTimeout takes a function as an argument. The second argument is the timer --- when you run the function;


        //ADD PLAYER SCORE IN EACH TIMEOUT FUNCTION!!!!!!!
        setTimeout(()=>{
            this.playerArray[0] = this.shoe.shift();
            console.log(`PlayerCard1: ${this.playerArray[0].fileName}`);
            let card = new Image();
            card.src = `images/cards350px/${this.playerArray[0].fileName}`;
            this.playerCardBox.appendChild(card);
            this.playerScore += this.playerArray[0].numVal;
            this.headbox2.innerHTML = `Player Score:<br>${this.playerScore}`;
        }, 500);

        setTimeout(()=>{
            this.dealerArray[0] = this.shoe.shift();
            console.log(`DealerCard1: ${this.dealerArray[0].fileName}`);
            let card = new Image();
            card.src = `images/cards350px/${this.dealerArray[0].fileName}`;
            this.dealerCardBox.appendChild(card);
            this.dealerScore = this.dealerArray[0].numVal;
            this.dealerHiddenScore = this.dealerArray[0].numVal;
            this.headbox3.innerHTML += `Dealer Score:<br>${this.dealerScore}`;
        }, 1000);

        setTimeout(()=>{ //Player recieves 2nd Card. Checks for Blackjack.
            this.playerArray[1] = this.shoe.shift();
            console.log(`PlayerCard2: ${this.playerArray[1].fileName}`);
            let card = new Image();
            card.src = `images/cards350px/${this.playerArray[1].fileName}`;
            this.playerCardBox.appendChild(card);
            this.playerScore += this.playerArray[1].numVal;
            this.headbox2.innerHTML = `Player Score:<br>${this.playerScore}`;
        }, 1500);

        setTimeout(()=>{ //Dealer recieves 2nd Card. Checks for Blackjack.
            this.dealerArray[1] = this.shoe.shift();
            console.log(`DealerCard2: ${this.dealerArray[1].fileName}`);
            this.dealerHiddenScore += this.dealerArray[1].numVal;
            console.log(`DealerHiddenScore:${this.dealerHiddenScore}`);
            let card = new Image();
            card.src = `images/cards350px/0-Back-of-Card-Red.png`;
            this.dealerCardBox.appendChild(card);
        }, 2000);
/*
        setTimeout(()=>{
            console.log('Make sure shoe has less cards:');
            console.log(this.shoe);
            console.log('Check Player Array:');
            console.log(this.playerArray);
        },2100);
*/
//After hand is dealt, this code will compare the first situation
        setTimeout(()=>{
            if (this.dealerHiddenScore == 21){
                //delete turned card
                let toDelete = this.dealerCardBox.childNodes[1];
                toDelete.parentNode.removeChild(toDelete);
                //add card back with new image
                let card = new Image();
                card.src = `images/cards350px/${this.dealerArray[1].fileName}`;
                this.dealerCardBox.appendChild(card);
                this.dealerScore += this.dealerArray[1].numVal;
                this.headbox3.innerHTML = `Dealer Score:<br>${this.dealerScore}`;
                setTimeout(() => {
                    alert('21 for the Dealer.');
                },500);
            }
            
            if(this.dealerScore == 22){
                this.dealerScore = 12;
            }
            
            if (this.playerScore == 21){
                this.flip();
                alert('Congrats on your Blackjack!');
                this.monies = this.monies + 25;
                console.log(`You Win $15! Total Monies: ${this.monies}`);
                this.headbox4.innerHTML = `$${this.monies}`;
                
            }else if (this.playerScore == 22){
                this.playerScore = 12;
            }  
        }, 2100); //End Last Interval


    }//end deal()


    hit(){
        console.log('Hit');
        setTimeout(()=>{
            this.playerArray[this.playerArray.length] = this.shoe.shift();
            console.log(this.playerArray.);
            let card = new Image();
            card.src = `images/cards350px/${this.playerArray[this.playerArray.length-1].fileName}`;
            this.playerCardBox.appendChild(card);
            this.playerScore += this.playerArray[this.playerArray.length-1].numVal;
            this.headbox2.innerHTML = `Player Score:<br>${this.playerScore}`;
            console.log('wtf');
            console.log(`Calculate Score Method: ${this.calculatePlayerScore()}`);
            
            if (this.playerScore > 21){
                this.disable();
                alert('Bust!');
                this.flip();
                this.headbox1.innerHTML='Bust! You lose.';
            }
            if (this.playerArray[this.playerArray.length-1].value == "Ace" && this.playerScore > 10 && this.playerScore<21){
                alert('A WILD ACE APPEARED!!!');
                this.playerScore += 1;
                this.headbox2.innerHTML = `Player Score:<br>${this.playerScore}`;
            } 
            

            
        }, 100);
    }//end hit()

    stand(){
        this.disable();
        this.flip();
        //This code flips the card over
        /*
        let toDelete = this.dealerCardBox.childNodes[1];
        toDelete.parentNode.removeChild(toDelete);
        let card = new Image();
        card.src = `images/cards350px/${this.dealerArray[1].fileName}`;
        this.dealerCardBox.appendChild(card);
        this.dealerScore += this.dealerArray[1].numVal; //Dealer score is now the official value, replaceing HiddenValue
        this.headbox3.innerHTML = `Dealer Score:<br>${this.dealerScore}`;
        console.log(this.dealerScore);
        */

        //check to see if ace is in dealer array
        //.....
                                                                                                                       
        if (this.dealerScore == this.playerScore && this.dealerScore>17){
           this.push();//add soft 17
        }
        if (this.dealerScore > this.playerScore && this.dealerScore>17){
            this.dealerWin();
        }
        if (this.dealerScore<this.playerScore && this.dealerScore>17){
            this.playerWin();
        }
        if (this.dealerScore==17 && this.dealerScore == this.playerScore){
            this.dealerWin();
        }
        if (this.dealerScore < 17){
            var int = setInterval(()=>{
                console.log('Under 17..Hitting..');
                    this.dealerArray[this.dealerArray.length] = this.shoe.shift();
                    let card = new Image();
                    card.src = `images/cards350px/${this.dealerArray[this.dealerArray.length-1].fileName}`;
                    this.dealerCardBox.appendChild(card);
                    this.dealerScore += this.dealerArray[this.dealerArray.length-1].numVal;
                    
                    console.log(`DealerScore: ${this.dealerScore}`);
                    this.headbox3.innerHTML = `Dealer Score:<br>${this.dealerScore}`;   
                
                if (this.dealerScore == 21){
                    clearInterval(int);
                    this.dealerWin();
                }
                if (this.dealerScore > 21){
                    clearInterval(int);
                   this.dealerBust();
                }
            },900);
        }
    }//end stand()

    flip(){
        let toDelete = this.dealerCardBox.childNodes[1];
        toDelete.parentNode.removeChild(toDelete);
        let card = new Image();
        card.src = `images/cards350px/${this.dealerArray[1].fileName}`;
        this.dealerCardBox.appendChild(card);
        this.dealerScore += this.dealerArray[1].numVal; //Dealer score is now the official value, replaceing HiddenValue
        this.headbox3.innerHTML = `Dealer Score:<br>${this.dealerScore}`;
        console.log(this.dealerScore);
    }//end flip()

    hasAce(){
        this.dealerScore.map((e)=>{
            if(this.dealerScore.value.includes('Ace') == true){
                dealerAce=1;
            }
        });
    }

    calculatePlayerScore(){
    //Use this to run through the card array to calculate the values from the array.
        
        this.playerArray.reduce((t,e)=>{
            return t += e.numVal;
        },0)
    }

    disable(){
        this.btnHit.disabled=true;
        this.btnHit.style.cssText='background-color:red;';
        this.btnStand.disabled=true;
        this.btnStand.style.cssText='background-color:red;'
    }
    enable(){
        this.btnHit.disabled=false;
        this.btnHit.style.cssText='background-color:white;';
        this.btnStand.disabled=false;
        this.btnStand.style.cssText='backgound-color:white;';
    }

    dealerBust(){
        this.monies += 20;
        this.headbox4.innerHTML = `$${this.monies}`;
        this.headbox1.innerHTML = 'Dealer Busts. Congrats!';
        this.toggleFlash();
        //alert('Dealer bust. Congrats Player.');
    }

    dealerWin(){
        this.headbox1.innerHTML = 'Dealer Wins! <br> Better luck next round, Player!';
        this.toggleFlash();
        //alert('Dealer Wins!');
    }
    playerWin(){
        this.toggleFlash();
        this.monies += 20;
        this.headbox1.innerHTML = 'You Win!';
        this.headbox4.innerHTML = this.monies;
    }
//~~~FILL THIS IN~~~~
    playerBust(){

    }
//~~~FILL THIS IN~~~~^^^^^^^^^^

    push(){
        this.headbox1.innerHTML = 'Push!';
        this.monies += 10;
        this.headbox4.innerHTML = this.monies;
        this.toggleFlash();
        //alert('Push...');
    }

    toggleFlash(){
        //this.headbox1.style.cssText = 'border: 1px solid white';
        //this.headbox1.style.borderColor = 'white';
        //this.headbox1.className = 'blinky'
      /*
        setInterval(()=>{
            if(this.headbox1.style.borderColor == 'red'){
                this.headbox1.style.borderColor= 'white';
            }
            if(this.headbox1.style.borderColor == 'white'){
                this.headbox1.style.borderColor = 'red';
            }
        }, 100);//End SetInterval
    */
      // this.flashBorder(red, white);

    
    }

    reset(){
        this.headbox1.style.borderColor = 'transparent';
        this.enable();
        this.headbox1.innerHTML = 'Godspeed';
        this.monies -= 10;
        this.headbox4.innerHTML = `$${this.monies}`;
        this.playerArray = [];
        this.dealerArray = [];
        this.playerCardBox.innerHTML = '';
        this.dealerCardBox.innerHTML = '';
        this.playerScore = 0;
        this.dealerScore = 0;
        this.dealerHiddenScore = 0;
        this.headbox2.innerHTML = '';
        this.headbox3.innerHTML = '';
    }

    flashBorder(colorB, colorA){
        this.headbox1.style.borderColor = colorB ;
        setInterval( function(){
          this.flashBorder(colorA, colorB);
          colorB = null;
          colorA = null;
          elementId = null;
          time = null;
        } , 100) ;
      }
}//end class






/*
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//********************************************** 
//*************Test & Practice Code*************
//********************************************** 

//Grab just the file names
var z = this.shoe.map(e => `${e.fileName}`);
console.log(z);

//Filter just the diamonds
var zzz = z.filter(e => {
    return e.includes('Diamonds');
})
console.log(zzz);





//********************************************** 
//*************Test & Practice Code*************
//********************************************** 
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

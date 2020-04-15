class Blackjack {

    constructor(elem) { // pass "app" in as an arg
        
        // pass <div id="app"></app> to a JS Obj
        this.app = document.getElementById(elem)
        
        let values = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"]
        let suits = ["Diamonds", "Clubs", "Hearts", "Spades"]
        this.deck = []
        
        // a nested for loop to run 52 times
        for(let i = 0; i < values.length; i++) { // run this 13x
            for(let j = 0; j < suits.length; j++) { // run this 4x
                
                let numVal = 0
                
                // is it an Ace?
                if(values[i] == "Ace") {
                    numVal = 11
                } else if(values[i].length > 3) { // "Jack", "Queen", "King"
                    numVal = 10
                } else { // It is already a number
                    numVal = values[i]
                }
                
                let card = {     
                    fileName: `${values[i]}-of-${suits[j]}.png`,
                    value: values[i], // Queen is Queen, 3 is 3, Ace is Ace, etc.
                    numValue: numVal // Queen is 10, 3 is 3, Ace is 11, etc     
                }
                this.deck.push(card)
                
            } // for loop
        } // for loop
        
        // Spread Operator for copying deck array 6x to shoe
        this.shoe = [ ...this.deck, ...this.deck, ...this.deck, ...this.deck, ...this.deck, ...this.deck]
                
        // Testing: how do I output all 312 file names ONLY in the app div
        // Hint: map, filter or reduce oughta come in handy
        
        // SHUFFLE CARDS
        for(let i = 0; i < this.shoe.length; i++) { // run this 312x
            
            // take each array item in order starting w index 0
            // and swap it w a random item
            let tempItem = this.shoe[i] // current item
            let randNum = Math.floor(Math.random()*this.shoe.length)
            this.shoe[i] = this.shoe[randNum]
            this.shoe[randNum] = tempItem
            
        } // end for 
        
        //this.app.innerHTML = this.shoe.map(e => e.fileName)
        
        // TESTING RANDOMNESS: Map all 312 file names to new array & output all to the app div. Look for random scattering of various files, suits & values.
//        this.fileNames = this.shoe.map(e => {
//            return e.fileName
//        });
//        this.app.innerHTML = this.fileNames // 312 file names
        
        // Make the DOM Elements
        // header goes before (above) the app div
        this.header = document.createElement('header')
        document.body.insertBefore(this.header, document.body.firstChild)
        
        // make the DEAL button
        this.btnDeal = document.createElement('button')
        this.btnDeal.innerHTML = "DEAL"
        this.btnDeal.addEventListener('click', this.deal.bind(this))
        this.header.appendChild(this.btnDeal)
        
        // make the HIT button
        this.btnHit = document.createElement('button')
        this.btnHit.innerHTML = "HIT"
        this.btnHit.addEventListener('click', this.hit.bind(this))
        this.header.appendChild(this.btnHit)
         
        // make the STAND button
        this.btnStand = document.createElement('button')
        this.btnStand.innerHTML = "STAND"
        this.btnStand.addEventListener('click', this.stand.bind(this))
        this.header.appendChild(this.btnStand)
        
        // make the 4 divs in the header;
        // messageBox, playerScoreBox, dealerScoreBox and moneyBox 
        this.messageBox = document.createElement('div')
        this.messageBox.innerHTML = "CLICK DEAL TO BEGIN"
        // turn off the border and bg-color and make text color #FFF
        this.messageBox.style.cssText = "border:0; background-color:transparent; color:#FFF; font-size:1.1rem; width:200px; margin:0 25px"
        this.header.appendChild(this.messageBox)
        
        this.playerScoreBox = document.createElement('div')
        this.playerScoreBox.innerHTML = "Player: "
        this.header.appendChild(this.playerScoreBox)
        
        this.dealerScoreBox = document.createElement('div')
        this.dealerScoreBox.innerHTML = "Dealer: "
        this.header.appendChild(this.dealerScoreBox)
        
        this.moneyBox = document.createElement('div')
        this.moneyBox.innerHTML = "$500"
        this.header.appendChild(this.moneyBox)
        
        // 2 divs inside app div for holding cards             
        this.dealerCardBox = document.createElement('div')
        this.app.appendChild(this.dealerCardBox)
        
        this.playerCardBox = document.createElement('div')
        this.app.appendChild(this.playerCardBox)
        
        this.myMoney = 500 // player's starting $
    
    } // close constructor()
    
    // deal() method called on click of DEAL button
    deal() {
        
      // reinitialize
      this.player = []
      this.dealer = []
      this.playerScore = 0
      this.dealerScore = 0
        
      // clear the boxes before dealing a new hand
      this.playerCardBox.innerHTML = ''
      this.dealerCardBox.innerHTML = ''
      this.playerScoreBox.innerHTML = 'Player:'
      this.dealerScoreBox.innerHTML = 'Dealer:'
      this.messageBox.innerHTML = 'GOOD LUCK!'
      
      // deal player card 1
      setTimeout(() => {
         // store last card object in shoe array at player[0] 
         this.player[0] = this.shoe.pop()
         let cardPic = new Image()
         cardPic.src = 'images/cards350px/' + this.player[0].fileName
         // output card to the player box on the table
         this.playerCardBox.appendChild(cardPic)
         // increment player score
         this.playerScore += this.player[0].numValue
         this.playerScoreBox.innerHTML = 'Player: '+ this.playerScore
      }, 1000);
        
     // deal dealer card 1
     setTimeout(() => {
         // store last card object in shoe array at player[0] 
         this.dealer[0] = this.shoe.pop()
         let cardPic = new Image()
         cardPic.src = 'images/cards350px/' + this.dealer[0].fileName
         // output card to the player box on the table
         this.dealerCardBox.appendChild(cardPic)
         // increment player score
         this.dealerScore += this.dealer[0].numValue
         // output card value, not score: "Jack" not 10
         this.dealerScoreBox.innerHTML = 'Dealer: '+ this.dealer[0].value
      }, 2000);
        
     // deal player card 2
      setTimeout(() => {
         // store last card object in shoe array at player[1] 
         this.player[1] = this.shoe.pop()
         let cardPic = new Image()
         cardPic.src = 'images/cards350px/' + this.player[1].fileName
         // output card to the player box on the table
         this.playerCardBox.appendChild(cardPic)
         // increment player score
         this.playerScore += this.player[1].numValue
         this.playerScoreBox.innerHTML = 'Player: '+ this.playerScore
      }, 3000);
        
     // deal dealer card 2 face-down (The Hole Card)
     setTimeout(() => {
         // store last card object in shoe array at dealer[1] 
         this.dealer[1] = this.shoe.pop()
         let cardPic = new Image()
         cardPic.src = 'images/cards350px/0-Back-of-Card-Red.png'
         // output card to the dealer box on the table
         this.dealerCardBox.appendChild(cardPic)
         // increment dealer score
         this.dealerScore += this.dealer[1].numValue
      }, 4000);
        
      // check to see if anyone got dealt two Aces
      // does player have 2 Aces?
      if(this.playerScore == 22) {
         // reduce score by 10
         this.playerScore -= 10
      }
        
      if(this.dealerScore == 22) {
         // reduce score by 10
         this.dealerScore -= 10
      }
      
      // ANYONE GOT BLACKJACK..??
      // check to see if anyone got dealt Blackjack (21)
      // if one hand got Blackjack, must check to see if other
      // hand is also Blackjack, resulting in a push (tie)
      // if only one hand got dealt Blackjack, we have a winner
      // if player only has Blackjack, player wins $15
      // if dealer only has Blackjack, player loses $10
      // Announce BLACKJACK in message box
      // Output score of 21 in score box
      // if dealer has blackjack, prove it by turning over the Hole Card
      // optional refinement: if player ONLY has blackjack but dealer's up-card is an Ace, 10 or face card, then turn over the Hole Card to show that the dealer does not also have blackjack
      if(this.playerScore == 21) {
          // check to see if dealer also has blackjack
          if() {
            
          } else {
             
          }
      }
        
      if(this.dealerScore == 21) {
          // check to see if dealer also has blackjack
          if() {
            
          } else {
             
          }
      }
        
    } // deal()
    
    hit() {
        alert('hello from the hit method')
    }
    
    stand() {
        alert('hello from the stand method')
    }
    
} // close class













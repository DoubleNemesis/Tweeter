// set/change the character limit easily (nowadays it's 280 characters!)
const charLimit = 140

// set remaining chars globally so both functions can use it
let remainingChars = charLimit;

// store the tweet prior to sending

let tweet = ''

//grab the counter div
const counterFooter = document.getElementById('counterFooter')

//grab the button
const btn = document.getElementById('btn')

//grab the button text
const btnText = document.getElementById('btnText')

//grab the text area
const textArea = document.getElementById('textArea');

//set the counter to start
counterFooter.textContent =`${charLimit}/${charLimit}`

//add eventlistener on keyup
document.addEventListener('keyup', checkCharacterCount)

//add eventistener to tweet button click
btn.addEventListener('click', handleClick)

//add eventlistener to stop/start cursor blinking
document.addEventListener('click', stopBlink)

//cursor: stop/start blinking
function stopBlink(e){
    if (e.target.id === 'textArea'){
        if (remainingChars === charLimit){textArea.value = ''}
        textArea.style.animation = 'unset'
         }
    else{
        if(remainingChars === charLimit){
            textArea.value = '|'
            textArea.style.animation = '1s blink step-end infinite'
            }
        } 
}

// check character count and change counter color / disable button if necessary
function checkCharacterCount(e){
    let textBoxCharCount = e.target.value.length;
    tweet = e.target.value;
    remainingChars = charLimit - textBoxCharCount
    counterFooter.textContent = `${remainingChars}/${charLimit}`
    counterFooter.style.color = remainingChars <= 20 ? 'red' : 'white'; 
    if (remainingChars < 0){
      btn.classList.add('buttonDisabled')  
    }
    if (remainingChars >= 0 && btn.classList.contains('buttonDisabled')){
       btn.classList.remove('buttonDisabled')  
    }  
}

// handle the "tweet" button
function handleClick(){
    if (remainingChars >=0 && remainingChars < charLimit){
            window.open(`https://twitter.com/intent/tweet?text=${tweet}`)
            btnText.innerHTML = "Tweet sent!"
            setTimeout(()=>{
              btnText.innerHTML = "Tweet"  
            }, 3000)
            textArea.value = '|'
            textArea.style.animation = '1s blink step-end infinite'
        }
    else if (remainingChars >=0 && remainingChars === charLimit){
       btnText.innerHTML = "Please compose a tweet!"
            setTimeout(()=>{
              btnText.innerHTML = "Tweet"  
            }, 2500)
    }
}
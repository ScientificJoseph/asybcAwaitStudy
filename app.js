const button = document.querySelector('button');
const output = document.querySelector('p');

const getPosition = (opts) => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(success => {
      resolve(success)
    }, error => {
      reject(error); //marks promise as failed
    }, opts);

  });
  return promise;
};

const setTimer = (duration) => {
  const promise = new Promise((resolve, reject) => { // constructor function / Class built into JS - function passed into the constructor is exe right away. Takes to arguments
    setTimeout(() => { //timer is set when promise is created. Async code exe after timer is done
      resolve('Done'); // JS engine internally marks the promise as resolved/done. called when timer is done
    },duration) //duration is an argument of setTimeout received from setTimer
  }); 
  return promise; // returned after creating the promise. can be used where you call setTimer
}

function trackUserHandler() { //callBack
  let positionData; // initiallizes variable for position data
  getPosition()
    .then(posData => { //posData received from getPosition resolve
      positionData = posData; //receives posData from getPosition
      return setTimer(2000) // calls setTimer and passes duration. back to pending status waiting for seTtimer
    })
    .catch( err => { // will cancel any prior thens if one fails any after will still execute
      console.log(err)
      return 'on we go...'
    })
    .then(data => { // promise chaining. pending and executed after getPosition is resolved
      console.log(data, positionData) //recieves data from setTimer and positon data from get position after its call to setTimer is resolved
    });
  setTimer(1000).then(() =>{ // returns a Promise. then executes when the promise is resolved. Passes duration to setTimer.
    console.log('Timer Done')
      })
    console.log('Getting Position...') // runs first
}

button.addEventListener('click', trackUserHandler);

// let result = 0;

// for (i=0; i < 10000000; i++) {
//   result += i;
// }

// console.log(result)
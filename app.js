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

const setTimer = duration => {
  const promise = new Promise((resolve, reject) => { // constructor function / Class built into JS - function passed into the constructor is exe right away. Takes to arguments
    setTimeout(() => { //timer is set when promise is created. Async code exe after timer is done
      resolve('Done'); // JS engine internally marks the promise as resolved/done. called when timer is done
    },duration) //duration is an argument of setTimeout received from setTimer
  }); 
  return promise; // returned after creating the promise. can be used where you call setTimer
}

async function trackUserHandler() { //callBack. with async the function wraps code into a promise and automatically returns a promise. internally then mechanisms are still performed
  // let positionData; // initiallizes variable for position data
  let posData;
  let timerData;
  try{
    posData = await getPosition() // returns a promise. await waits  for the promise to resolve or fail 
    timerData = await setTimer(2000)
  } catch (error) {
    console.log(error)
  }
  console.log(timerData, posData)
    // .then(posData => { //posData received from getPosition resolve
    //   positionData = posData; //receives posData from getPosition
    //   return setTimer(2000) // calls setTimer and passes duration. back to pending status waiting for seTtimer
    // })
    // .catch( err => { // will cancel any prior thens if one fails any after will still execute
    //   console.log(err)
    //   return 'on we go...'
    // })
    // .then(data => { // promise chaining. pending and executed after getPosition is resolved
    //   console.log(data, positionData) //recieves data from setTimer and positon data from get position after its call to setTimer is resolved
    // });
  // setTimer(1000).then(() =>{ // returns a Promise. then executes when the promise is resolved. Passes duration to setTimer.
  //   console.log('Timer Done')
  //     })
  //   console.log('Getting Position...') // runs first
}

button.addEventListener('click', trackUserHandler);

// Promise.race([getPosition(), setTimer(1000)]).then(data => { // returns the result of the fatest promise
//   console.log(data)
// }) 

// Promise.all([getPosition(), setTimer(1000)]).then(promiseData => { // returns an array of all promises on resolution of all. if one promise is rejected we just get an error
//   console.log(promiseData)
// })

Promise.allSettled([getPosition(), setTimer(1000)]).then(promiseData => { // does not cancel the execution of other promisies if one is rejected and the others are resolved like Promise.all
  console.log(promiseData)
});



// let result = 0;

// for (i=0; i < 10000000; i++) {
//   result += i;
// }

// console.log(result)
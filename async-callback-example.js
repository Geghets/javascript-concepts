// Description: Demonstrates asynchronous behavior using callback functions
// Concepts Covered:
// - setTimeout (asynchronous function)
// - Callback functions
// - Random success/failure simulation

function AsyncProcess(onSuccess, onFailure) {
    setTimeout(() => {
        const randomNumber = Math.floor(Math.random() * 11);
        randomNumber % 2 === 0 ? onSuccess() : onFailure();
    }, 2000);
}

function onSuccess() {
    console.log('Yeeeey Success!');
}

function onFailure() {
    console.log('Oooops Failure!');
}

AsyncProcess(onSuccess, onFailure);

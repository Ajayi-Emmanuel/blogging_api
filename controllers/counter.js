// const readCounter = () => {
//     const button = document.getElementById('counter-button');
//     button.addEventListener('click', function(e) {
//         counter = counter + 1;
//     });
//     fetch('/clicked', {method: 'GET'})
//     .then(function(response) {
//       if(response.ok) {
//         console.log('Click was recorded');
//         return;
//       }
//       throw new Error('Request failed.');
//     })
//     .catch(function(error) {
//       console.log(error);
//     });
// }

// module.exports = readCounter;
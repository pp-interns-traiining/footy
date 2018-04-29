//premier league
// const button1 = document.getElementById('get-players');
// button1.addEventListener('click', getPl);
// const display1 = document.getElementById('players');

//when you click on a position it should hide the other positions.
const filteredPlayers = document.getElementById('results');

//Delete player selected
const removePlayer = document.getElementById('pitch');

//get Midfielders
const button2 = document.getElementById('get-midfielders');
button2.addEventListener('click', getMidfielders);
const display2 = document.getElementById('midfielders');
//get Defenders
const button3 = document.getElementById('get-defenders');
button3.addEventListener('click', getDefenders);
const display3 = document.getElementById('defenders');
//get Goalkeepers
const button4 = document.getElementById('get-keepers');
button4.addEventListener('click', getGoalkeepers);
const display4 = document.getElementById('keepers');
//get Forwards
const button5 = document.getElementById('get-forwards');
button5.addEventListener('click', getForwards);
const display5 = document.getElementById('forwards');

let playerType = null;

let pl = [];

const headers = {
  "X-Auth-Token": "1834cce485de4e43a5cd5430d1b1e4d9"
};
function getPl() {
  // const number3 = document.getElementById('number3').value || 1;
  // fetch(`http://api.football-data.org/v1/competitions/445/teams`, {
  //   method: "GET",
  //   headers
  // }).then(res => {
  //   if (res.status === 200) {
  //     res.json().then(data => {
  //       console.log(data)
  //       data.teams.forEach(team => {
  //         console.log(team._links.players)
  //         fetch(team._links.players.href, {
  //           method: 'GET',
  //           headers
  //         }).then(response => {
  //
  //           if (response.status === 200) {
  //             response.json().then(result => {
  //               result.players.forEach(item => {
  //                 pl.push(item);
  //               });
  //             });
  //           }
  //         })
  //       });
  //     });
  //   } else if (res.status == 401) {
  //     console.log("error");
  //   }
  // })
  fetch('./premier.json', {
    method: 'GET'
  }).then(res => {
    res.json().then(data => {
      pl = data;
    })
  }) ;
}
console.log(pl);


//This displays the selected option in the results div.

function getMidfielders(e) {
  e.preventDefault();
  // display5 = document.getElementById('centre-mid');
  let midfielders = pl.filter(item => {
    if (item.position == "Right Midfield" || item.position == "Left Midfield" || item.position == "Attacking Midfield" || item.position == "Central Midfield" || item.position == "Left Wing" || item.position == "Right Wing" || item.position == "Defensive Midfield") {
      return item
    }
  });
  // display2.innerHTML += `<li>${item.name}; ${item.jerseyNumber}</li>`;
  playerType = "midfielders";
  filteredPlayers.innerHTML = midfielders.reduce((acc, current) => {
    return acc +  `<li>${current.name}; ${current.jerseyNumber}</li>`;
  }, '');
  console.log(midfielders);
  // centerMid.forEach(item => {
  //   display2.innerHTML += `<li>Name: ${item.name}, Position: ${item.position}</li>`;
  // });
  // display.
}

function getDefenders(e) {
  // display5 = document.getElementById('centre-mid');
  e.preventDefault();

  let defenders = pl.filter(item => {
    if (item.position == "Right-Back" || item.position == "Left-Back" || item.position == "Centre-Back") {
      return item
    }
  });
  playerType = "defenders";
  filteredPlayers.innerHTML = defenders.reduce((acc, current) => {
    return acc +  `<li>${current.name}; ${current.jerseyNumber}</li>`;
  }, '');
  console.log(defenders);
  // centerMid.forEach(item => {
  //   display3.innerHTML += `<li>Name: ${item.name}, Position: ${item.position}</li>`;
  // });
  // display.
}

function getGoalkeepers(e) {
  // display5 = document.getElementById('centre-mid');
  e.preventDefault();
  let goalKeepers = pl.filter(item => {
    if (item.position == "Keeper") {
      return item;
    }
  });

  playerType = "keeper";
  filteredPlayers.innerHTML = goalKeepers.reduce((acc, current) => {
    return acc +  `<li>${current.name}; ${current.jerseyNumber}</li>`;
  }, '');
  console.log(goalKeepers);
  // centerMid.forEach(item => {
  //   display4.innerHTML += `<li>Name: ${item.name}, Position: ${item.position}</li>`;
  // });
  // display.
}

function getForwards(e) {
  // display5 = document.getElementById('centre-mid');
  e.preventDefault();

  let forwards = pl.filter(item => {
    if (item.position == "Centre-Forward" || item.position == "Secondary Striker") {
      return item;
    }
  });
  playerType = "forwards";
  filteredPlayers.innerHTML = forwards.reduce((acc, current) => {
    return acc + `<li>${current.name}: ${current.jerseyNumber}</li>`;
  }, '');
  console.log(forwards);
  // centerMid.forEach(item => {
  //   display5.innerHTML += `<li>Name: ${item.name}, Position: ${item.position}</li>`;
  // });
  // display.
}


//Store players selected;
let keeper = [];

let defenders = [];

let midfielders = [];

let forwards = [];

//add players to the pitch/field;
filteredPlayers.addEventListener('click', function(e) {
  let positionArr = null;
  let maxPlayers = null;
  let display = null;
  switch(playerType) {
    case "keeper":
      positionArr = keeper;
      maxPlayers = 1;
      display = document.getElementById('keeper-selected');
      break;

    case "defenders":
      positionArr = defenders;
      maxPlayers = 4;
      display = document.getElementById('defender-selected');
      break;

    case "midfielders":
      positionArr = midfielders;
      maxPlayers = 4;
      display = document.getElementById('midfielder-selected');
      break;

    case "forwards":
      positionArr = forwards;
      maxPlayers = 2;
      display = document.getElementById('forward-selected');
      break;

      default:
      console.log('please select a valid option');
      return
  }
  if (positionArr.length < maxPlayers) {
    if (!positionArr.includes(e.target.outerText)) {
    positionArr.push(`<li>${e.target.outerText}</li>`);
    display.innerHTML = positionArr;
    console.log(positionArr);
  } else {
    console.log(`You have already selected ${positionArr}`);
  }
  } else {
    console.log(`You have already selected ${maxPlayers} ${playerType}`);
  }
});

removePlayer.addEventListener('click', function(e) {
  console.log(e.target)
});

getPl()

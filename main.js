const url = "http://50.21.190.71/get_tweets";
let paused = true;
let intervalPause;
const tweetContainer = document.getElementById("tweets-container");
const button = document.querySelector(".pauseButton"); //the . infront is selecting the class
let tweets = [];

function Pauseed() {
  paused = !paused; //Lets pause switch boolean wise
  if (paused) {
    button.innerHTML = "<b>Unpause</b>";
    clearInterval(intervalPause);
    console.log("PAUSED");
  } else {
    button.innerHTML = "<b>Pause</b>";
    intervalPause = setInterval(fetchTweets, 5000);
    console.log("Continue");
  }
}
function removeDuplicates(duplicatesDataArr) {
  duplicatesDataArr = duplicatesDataArr.filter((value, index, self) =>
  index === self.findIndex((t) => (
  t.user_description === value.user_description && t.user_name === value.user_name && t.text === value.text
)));
  return duplicatesDataArr;
}

let searchString = "" // here we use a global variable
const handleSearch = event => {
  searchString = event.target.value.trim().toLowerCase();
  ClearTweets();
  // you may want to update the displayed HTML here too
}
document.getElementById("searchBar").addEventListener("input", handleSearch)

function fetchTweets(){
  fetch(url)
  .then(res => res.json())
  .then(data => {
    //Sorts the tweets from new to old currently listed
    tweets = [...tweets, ...data]
    tweets = tweets.sort((b, a) => new Date(a.date) - new Date(b.date)); //ChatGPT for this line
    // add each new tweet to the list
    tweets = removeDuplicates(tweets);
  }).catch(err => {
    console.log(err);
  });
  ClearTweets();
}

function ClearTweets() {
  //This while loop is provided
    while (tweetContainer.firstChild) {
      tweetContainer.removeChild(tweetContainer.firstChild);
    }
    tweets.filter(twt => twt.text.toLowerCase().includes(searchString)).forEach(tweet => {
        //Profile Picture
        const listPic = document.createElement("img");
        listPic.setAttribute("class", "ratatprof");
        listPic.setAttribute("src", tweet.avatar);
        listPic.setAttribute("alt", "profile1");
        listPic.onerror = function() {
          listPic.setAttribute("src", "images/clonebot.jpg");
        }
        //Username
        const listName = document.createElement("span");
        listName.setAttribute("class", "me1");
        const tweetName = document.createTextNode(tweet.user_name);
        const boldName = document.createElement("b"); //bold element
        boldName.appendChild(tweetName); //bolds it
        listName.appendChild(boldName); //text appears
        //Tag and Date
        const listTag = document.createElement("span");
        const tweetTag = document.createTextNode("@Bot  " + tweet.date);
        listTag.appendChild(tweetTag);
        listName.appendChild(listTag);

        //Tweet
        const listItem = document.createElement("div");
        listItem.setAttribute("class", "tweet1");

        const listTweet = document.createElement("span");
        listTweet.setAttribute("class", "tweet");
        const tweetContent = document.createTextNode(tweet.text);
        listTweet.appendChild(tweetContent);
        listItem.appendChild(listPic);
        listItem.appendChild(listName);
        listItem.appendChild(listTweet);
        tweetContainer.appendChild(listItem);
  });
}

//Search provided

    // you may want to update the displayed HTML here too
document.getElementById("searchBar").addEventListener("input", handleSearch)

function appendTweets(dataArrUnsort){
    //Get the content-center element we want to add tweets to this

    //Suggest emptying the current tweets at some point

    //Sort the array of tweets chronologically
    //For each tweet
        //create a div that you can append to content-center
        //we want to include the pfp
        //
}
//const tweetContainer = document.getElementById('tweet-container');
const searchBar = document.getElementById("searchBar")



//tweetText = $("<div id = "tweetText"></div>');
//user = $('<div id = "user"></div>');
//username = $('<p id="username">' = dataArr[index].user)
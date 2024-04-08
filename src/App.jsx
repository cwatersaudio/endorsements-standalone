import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  update,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import React from "react";
import Header from "./Components/Header";
import Input from "./Components/Input";
import Display from "./Components/Display";
import "./App.css";

const appSettings = {
  databaseURL: "https://endorsements-aa2b6-default-rtdb.firebaseio.com",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementDb = ref(database, "endorsements");
let firebaseEndorsements = [];
let localLikeArray = [];

export default function App() {
  const [endorsements, setEndorsements] = React.useState({
    pastEndorsements: firebaseEndorsements, //local state is set by firebase DB
    currentEndorsement: { from: "", to: "", accolade: "", likes: 0 },
  });

  React.useEffect(() => {
    onValue(endorsementDb, (snapshot) => {
      firebaseEndorsements = Object.entries(snapshot.val());
      setEndorsements((prevEndorsements) => {
        return {
          ...prevEndorsements,
          pastEndorsements: firebaseEndorsements, //state is updated by firebase DB
        };
      });
    });
  }, []);

  function initializeLocalLikeArray() {

    localLikeArray = firebaseEndorsements.map((item) => {
      //local array of item IDs; hasLiked boolean will be added by addLike() function
      return {
        likeID: item[0],
      };
    })
    console.log(localLikeArray)
  };

  React.useEffect(() => {
    console.log("initializing")
    setTimeout(() => {
      initializeLocalLikeArray()
      localStorage.setItem("endorsements", JSON.stringify(localLikeArray)); //localStorage keeps copy of endorsements as well, for the purpose of hasLiked
    }, 2000)
    console.log(localStorage.getItem("endorsements"))

  }, []);

  React.useEffect(() => {
    console.log("updating")
    localStorage.setItem("endorsements", JSON.stringify(localLikeArray));
  }, [localLikeArray])

  console.log(endorsements);

  function addEndorsement(event) {
    event.preventDefault();

    resetCurrentEndorsement();
    push(endorsementDb, endorsements.currentEndorsement); //how to add to beginning of firebase db??
  }

  function resetCurrentEndorsement() {
    //clears input fields and resets currentEndorsement
    setEndorsements((prevEndorsements) => {
      return {
        ...prevEndorsements,
        currentEndorsement: { from: "", to: "", accolade: "", likes: 0 },
      };
    });
  }

  function handleChange(event) {
    //updates currentValue live
    const { value, name } = event.target;

    setEndorsements((prevEndorsements) => {
      return {
        ...prevEndorsements,
        currentEndorsement: {
          ...prevEndorsements.currentEndorsement,
          [name]: value,
        },
      };
    });
  }
  function addLike(id) {
    const localStoragearray = JSON.parse(localStorage.getItem('endorsements'))
    console.log(localStoragearray)
    const localValue = localStoragearray.find((item) => item.likeID === id);
    const localIndex = localStoragearray.findIndex((item) => item.likeID === id);
    const itemToUpdate = endorsements.pastEndorsements.find(
      (item) => item[0] === id
    );

    if (!localValue.hasLiked) {
      itemToUpdate[1].likes += 1;
      localStoragearray[localIndex].hasLiked = true;
      console.log(localStoragearray);

      const updates = {}; //updates likes in DB
      updates[itemToUpdate[0] + "/" + "likes"] = itemToUpdate[1].likes;
      update(endorsementDb, updates);

      localStorage.setItem("endorsements", JSON.stringify(localStoragearray))
    }
  }

  function resetLike(id) {
    console.log("double click");
    const localIndex = localLikeArray.findIndex((item) => item.likeID === id);

    localStorage.setItem("endorsements", (prevLocal) => {
      return [...prevLocal, (prevLocal[localIndex].hasLiked = false)];
    });
  }

  return (
    <>
      <main>
        <Header />
        <Input
          handleChange={handleChange}
          currentEndorsement={endorsements.currentEndorsement}
          addEndorsement={addEndorsement}
        />
        <Display
          pastEndorsements={endorsements.pastEndorsements}
          handleChange={handleChange}
          addLike={addLike}
          resetLike={resetLike}
        />
      </main>
    </>
  );
}

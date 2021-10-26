import React from "react";
import axios from "axios";

const TOKEN_API = process.env.REACT_APP_TOKEN_API;
const CORS_ANYWARE = process.env.REACT_APP_CORS_ANYWARE;
// For development
// const searchUrl = `https://superheroapi.com/api/${TOKEN_API}/search/`;
// const heroUrl = `https://superheroapi.com/api/${TOKEN_API}/`;
const searchUrl = `${CORS_ANYWARE}https://superheroapi.com/api/${TOKEN_API}/search/`;
const heroUrl = `${CORS_ANYWARE}https://superheroapi.com/api/${TOKEN_API}/`;

const HeroesContext = React.createContext(null);

export function HeroesProvider(props) {
  const [heroes, setHeroes] = React.useState();
  const [teamMembers, setTeamMembers] = React.useState([]);
  const [teamStats, setTeamStats] = React.useState({});
  const [displayModal, setDisplayModal] = React.useState(null);
  const [typeModal, setTypeModal] = React.useState(null);
  const [saveHeroId, setSaveHeroId] = React.useState(null);

  const [goodOnes, setGoodOnes] = React.useState([]);
  const [badOnes, setBadOnes] = React.useState([]);

  React.useEffect(() => {
    setTeamMembers([...goodOnes, ...badOnes]);
  }, [goodOnes, badOnes]);

  const showModal = (type) => {
    setTypeModal(type);
    setDisplayModal(true);
  };

  const hideModal = () => setDisplayModal(false);

  const saveHeroIdHandler = (id) => setSaveHeroId(id);

  function heroDetailsHandler(heroId, handler) {
    axios
      .get(`${heroUrl}${heroId}`, {
        headers: {
          "Content-Type": "aplication/json",
        },
      })
      // The handler will be the setState from HeroDetails page
      .then((res) => handler(res.data))
      .catch((err) => console.log(err.response));
  }

  // This works find heroes based on his name
  function findHeroesHandler(inputName) {
    axios
      .get(`${searchUrl}${inputName}`)
      .then((res) => {
        let data = res.data.results;
        setHeroes(data);
      })

      .catch((error) => console.log(error.response));
  }

  // Add heroe
  function addHeroesHandler(hero) {
    if (teamMembers.length === 6) {
      showModal("noMore");
      return;
    }
    // Test if the hero already exist
    if (teamMembers.some((h) => h.id === hero.id)) {
      showModal("exist");
      return;
    }
    addGoodOnesHandler(hero);
    addBadOnesHandler(hero);
  }

  const addGoodOnesHandler = (hero) => {
    if (hero.biography.alignment === "good") {
      if (goodOnes.length === 3) {
        showModal("noMoreGoods");
        return;
      }
      // fires the modal to user feedback
      showModal("success");
      return setGoodOnes((prev) => [...prev, hero]);
    }
  };

  const addBadOnesHandler = (hero) => {
    if (hero.biography.alignment === "bad") {
      if (badOnes.length === 3) {
        showModal("noMoreBads");
        return;
      }
      // fires the modal to user feedback
      showModal("success");
      return setBadOnes((prev) => [...prev, hero]);
    }
  };
  // Remove Hero
  function removeHeroTeamHandler(heroId) {
    setGoodOnes(goodOnes.filter((hero) => hero.id !== heroId)) ||
      setBadOnes(badOnes.filter((hero) => hero.id !== heroId));
  }

  // Manages the stats
  React.useEffect(() => {
    let stats = teamMembers.map((stat) => {
      return stat.powerstats;
    });
    let getStats = (stat) => {
      if (stats.length === 0) {
        return;
      }
      return stats
        .map((s) => s[stat])
        .filter((s) => s !== "null")
        .reduce((a, b) => {
          return +a + +b;
        });
    };
    return setTeamStats({
      combat: getStats("combat"),
      durability: getStats("durability"),
      intelligence: getStats("intelligence"),
      power: getStats("power"),
      speed: getStats("speed"),
      strength: getStats("strength"),
    });
  }, [teamMembers]);

  return (
    <HeroesContext.Provider
      value={{
        heroes,
        teamMembers,
        teamStats,
        displayModal,
        typeModal,
        saveHeroId,
        showModal,
        hideModal,
        saveHeroIdHandler,
        findHeroesHandler,
        addHeroesHandler,
        removeHeroTeamHandler,
        heroDetailsHandler,
      }}
    >
      {props.children}
    </HeroesContext.Provider>
  );
}

export default HeroesContext;

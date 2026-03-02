const { Router } = require("express");
const axios = require("axios");
const db = require("../config/firebase");
require("dotenv").config();

const router = Router();

router.get("/entrenador", async (req, res) => {
  let errorEncontrado = null;

  
    try {
      const response = await axios.get(
        "https://apiv2.allsportsapi.com/football/?met=Fixtures&leagueId=44&timezone=America/La_Paz&APIkey=6822bc38a5057063344790a7c10e252a3b1f1dc9221d2a7b106089ad394e8e59&from=2026-03-01&to=2026-03-03"
      );

      console.log(response.data.result[6].lineups.home_team.starting_lineups)
    } catch (error) {
      

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Mensaje:", error.response.data);
        errorEncontrado = {
          numero: i,
          status: error.response.status,
          mensaje: error.response.data
        };
      } else {
        console.log("Error de red:", error.message);
      }

      
    }
  

  res.json({
    resultado: "Prueba terminada",
    errorEncontrado
  });
});

module.exports = router;
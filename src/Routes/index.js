const { Router } = require("express");
const axios = require("axios");
const db = require("../config/firebase");
require("dotenv").config();

const router = Router();

router.get("/entrenador", async (req, res) => {
  let errorEncontrado = null;

  
    try {
      const response = await axios.get(
        "https://apiv2.allsportsapi.com/football/?met=Fixtures&leagueId=302&timezone=America/La_Paz&APIkey=6822bc38a5057063344790a7c10e252a3b1f1dc9221d2a7b106089ad394e8e59&from=2026-03-01&to=2026-03-03"
      );
      
      console.log(response.data.result[0].event_status)
      await db.collection("Equipo").doc("8pKIYI9usy1lIcOJ1ywB").update({
        Tiempo: response.data.result[0].event_status
      })
      res.json({
        tiempo: response.data.result[0].event_status,
      });
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
  

});

router.get("/tiempo", async (req,res)=>{
  try {
    const queryStapshot = await db.collection("Equipo").get()
    const final = queryStapshot.docs[0].data().Tiempo
    res.json({
      final
    }
    )
  } catch (error) {
    res.send(error)
  }

})

module.exports = router;
module.exports = function ({ app, dbConn }) {
  app.get("/meetings/:id", async(req, res) => {
    const id = req.params.id;
    const findMeetingsSql = "SELECT * FROM meeting WHERE created_by = ?";
    await dbConn.query(findMeetingsSql, [id], function (error, meetings) {
      res.status(200).jsonp(meetings);
    });
  });

  app.get("/meetings/:id/get", (req, res) => {
    const id = req.params.id;
    const findMeetingSql = "SELECT * FROM meeting WHERE meeting_uid = ?";
    dbConn.query(findMeetingSql, [id], function (error, meeting) {
      res.status(200).jsonp(meeting);
    });
  });

  app.post("/meetings", async(req, res) => {
    const { meeting_name, meeting_uid, created_by } = req.body;
    if (!meeting_name || !meeting_uid) {
      return res.status(200).jsonp({ message: "Please provide the meeting name and meeting uid" });
    }
    const meetings = [[meeting_name, meeting_uid, created_by]];
    const createMeetingSql = "INSERT INTO meeting (meeting_title, meeting_uid, created_by) VALUES ?";
    await dbConn.query(createMeetingSql, [meetings], function (error, insertedMeeting) {
      if (insertedMeeting) {
        res.status(200).jsonp({ insertId: insertedMeeting.insertId });
      } else {
        console.log(error);
        res.status(200).jsonp({ message: 'Cannot create your meeting, please try again' });
      }
    });
  });

  app.delete("/meetings/:id/delete", async (req, res)=> {
    const meeting_uid = req.params.id;
    try{
      const deleteMeetingSql = "DELETE FROM meeting where meeting_uid = ?"
      await dbConn.query(deleteMeetingSql, [meeting_uid], function (error, status){
        if (status===201){
          res.send("Meeting deleted");
        }else{
          console.log(error);
          res.status(200).jsonp({ message: 'Cannot delete your meeting, please try again' });
        }
      });
    }catch(error){
      console.log(error);
      throw error;
    }
  }); 
}

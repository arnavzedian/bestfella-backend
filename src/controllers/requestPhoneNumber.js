let { Unlock, User, Donation } = require("../../database/db");

async function requestPhoneNumber(req, res, next) {
  let fields = ["donationID", "createdAt"];
  let requester = req.user.id 

  if(!requester) return next("login in required")
 

  for (let index of fields) {
    if (!req.body[index]) return next(index + " field is required");
  }

  

  let existingEntry = await Unlock.findOne({
    donationID: req.body.donationID,
    requester: requester,
  });

  if (existingEntry) sendData()


  let today = new Date().toISOString().slice(0, 10)
  
  let sameDateEntry = await Unlock.findOne({
    requester: requester,
    dateOfEntry: today,
  });

  if(sameDateEntry){
    return next("you can only request one phone number in a day"); 
  }else{
    

    var newEntry = new Unlock();
    newEntry.donationID = req.body.donationID;
    newEntry.requester = requester;
    newEntry.dateOfEntry = today;

    try{
      await newEntry.save()
      sendData()
    }catch(e){
      next(e)
    }
    
  }

  //ALGORIHM
  //check if the same entry exists search
  //  yes -> return phone no.
  //  no -> take following step
  //check if an entry exist for this date search
  //  no -> make entry
  //  yes -> deny


  function sendData() {
    let donation = await Donation.findOne({
      donationID: req.body.donationID,
    });

    if(!donation) return next("donation has been deleted")
   

    let user = await User.findOne({
      _id: donation.donater,
    });

    if(!user) return next("user not found")

    res.json({
      data: user.phoneNumber,
    });
  }
}

module.exports = requestPhoneNumber;

const Ride = require('../model/RideSchema');

/*
POST -> Save
PUT -> Update
GET -> Fetch
DELETE -> Remove
*/

const saveRide = (req, resp)=>{
    const tempRide = new Ride({
        from:req.body.from,
        to:req.body.to,
        date:req.body.date,
        time:req.body.time,
        passenger:req.body.passenger,
        no_of_seats_available:req.body.no_of_seats_available,
        vehicle:req.body.vehicle,
        vehicleNo:req.body.vehicleNo,
        organization:req.body.organization,
        amount:req.body.amount,
        other:req.body.other    
    });
    tempRide.save().then(result=>{
        resp.status(201).json({status:true, message:'Ride was saved!'});
    }).catch(error=>{
        resp.status(500).json(error);
    });    
};

const findRide = (req, resp)=>{
    Ride.findOne({email:req.headers.email}).then(result=>{
        if(result==null){
            resp.status(404).json({status:false, message:'Ride not found!'});
        }else{
            resp.status(200).json({status:true, data:result});  
        }
    }).catch(error=>{
        resp.status(500).json(error);
    });    
};

const updateRide = (req, resp)=>{
    Ride.updateOne({email:req.headers.email},{
        $set:{
            from:req.body.from,
            to:req.body.to,
            date:req.body.date,
            time:req.body.time,
            passenger:req.body.passenger,
            no_of_seats_available:req.body.no_of_seats_available,
            vehicle:req.body.vehicle,
            vehicleNo:req.body.vehicleNo,
            organization:req.body.organization,
            amount:req.body.amount,
            other:req.body.other  
        }
    }).then(result=>{
        if(result.modifiedCount>0){
            resp.status(201).json({status:true, message:'Ride was Updated!'});
        }else{
            resp.status(200).json({status:false, message:'try again!'});  
        }
    }).catch(error=>{
        resp.status(500).json(error);
    });     
};

const deleteRide = (req, resp)=>{
    Ride.deleteOne({email:req.headers.email}).then(result=>{
        if(result.deletedCount>0){
            resp.status(204).json({status:true, message:'Ride was deleted!'});
        }else{
            resp.status(400).json({status:false, message:'try again!'});  
        }
    }).catch(error=>{
        resp.status(500).json(error);
    });  
};

const findAllRides = (req, resp)=>{
    Ride.find().then(result=>{
         resp.status(200).json({status:true, data:result});    
    }).catch(error=>{
        resp.status(500).json(error);
    });     
};

module.exports= {
    saveRide,
    findRide,
    updateRide,
    deleteRide,
    findAllRides
}
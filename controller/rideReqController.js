const RideRequest = require('../model/RideReqSchema');

/*
POST -> Save
PUT -> Update
GET -> Fetch
DELETE -> Remove
*/

const saveRideRequest = (req, resp)=>{
    const tempRideRequest = new RideRequest({
        from:req.body.from,
        to:req.body.to,
        date:req.body.date,
        time:req.body.time,
        driver:req.body.driver,
        vehicleType:req.body.vehicleType,
        organization:req.body.organization,
        amount:req.body.amount,
        other:req.body.other    
    });
    tempRideRequest.save().then(result=>{
        resp.status(201).json({status:true, message:'Ride Request was saved!'});
    }).catch(error=>{
        resp.status(500).json(error);
    });    
};

const findRideRequest = (req, resp)=>{
    RideRequest.findOne({email:req.headers.email}).then(result=>{
        if(result==null){
            resp.status(404).json({status:false, message:'Ride Request not found!'});
        }else{
            resp.status(200).json({status:true, data:result});  
        }
    }).catch(error=>{
        resp.status(500).json(error);
    });    
};

const updateRideRequest = (req, resp)=>{
    RideRequest.updateOne({email:req.headers.email},{
        $set:{
            from:req.body.from,
            to:req.body.to,
            date:req.body.date,
            time:req.body.time,
            driver:req.body.driver,
            vehicleType:req.body.vehicleType,
            organization:req.body.organization,
            amount:req.body.amount,
            other:req.body.other  
        }
    }).then(result=>{
        if(result.modifiedCount>0){
            resp.status(201).json({status:true, message:'Ride Request was Updated!'});
        }else{
            resp.status(200).json({status:false, message:'try again!'});  
        }
    }).catch(error=>{
        resp.status(500).json(error);
    });     
};

const deleteRideRequest = (req, resp)=>{
    RideRequest.deleteOne({email:req.headers.email}).then(result=>{
        if(result.deletedCount>0){
            resp.status(204).json({status:true, message:'Ride Request was deleted!'});
        }else{
            resp.status(400).json({status:false, message:'try again!'});  
        }
    }).catch(error=>{
        resp.status(500).json(error);
    });  
};

const findAllRideRequests = (req, resp)=>{
    RideRequest.find().then(result=>{
         resp.status(200).json({status:true, data:result});    
    }).catch(error=>{
        resp.status(500).json(error);
    });     
};

module.exports= {
    saveRideRequest,
    findRideRequest,
    updateRideRequest,
    deleteRideRequest,
    findAllRideRequests
}
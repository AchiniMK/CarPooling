const Vehicle = require('../model/VehicleSchema');

/*
POST -> Save
PUT -> Update
GET -> Fetch
DELETE -> Remove
*/

const saveVehicle = async (req, resp) => {
    try {
        const existingVehcile = await Vehicle.findOne({ vehicleNo: req.body.vehicleNo });

        if (existingVehcile) {
            resp.status(409).json({ status: false, message: 'Vehicle with the same number already exists!' });
        } else {
            const tempVehicle = new Vehicle({
                vehicleNo: req.body.vehicleNo,
                vehicleType: req.body.vehicleType,
                no_of_seats: req.body.no_of_seats  
            });

            await tempVehicle.save();
            resp.status(201).json({ status: true, message: 'Vehicle was saved!' });
        }
    } catch (error) {
        resp.status(500).json(error);
    }
};


const findVehicle = (req, resp)=>{
    Vehicle.findOne({email:req.headers.email}).then(result=>{
        if(result==null){
            resp.status(404).json({status:false, message:'Vehicle not found!'});
        }else{
            resp.status(200).json({status:true, data:result});  
        }
    }).catch(error=>{
        resp.status(500).json(error);
    });    
};




const updateVehicle = (req, resp)=>{
    Vehicle.updateOne({email:req.headers.email},{
        $set:{
            vehicleno:req.body.vehicleno,
            vehicleType:req.body.vehicleType,
            no_of_seats:req.body.no_of_seats
        }
    }).then(result=>{
        if(result.modifiedCount>0){
            resp.status(201).json({status:true, message:'Vehicle was Updated!'});
        }else{
            resp.status(200).json({status:false, message:'try again!'});  
        }
    }).catch(error=>{
        resp.status(500).json(error);
    });     
};

const deleteVehicle = (req, resp)=>{
    Vehicle.deleteOne({email:req.headers.email}).then(result=>{
        if(result.deletedCount>0){
            resp.status(204).json({status:true, message:'Vehicle was deleted!'});
        }else{
            resp.status(400).json({status:false, message:'try again!'});  
        }
    }).catch(error=>{
        resp.status(500).json(error);
    });  
};

const findAllVehicles = (req, resp)=>{
    Vehicle.find().then(result=>{
         resp.status(200).json({status:true, data:result});    
    }).catch(error=>{
        resp.status(500).json(error);
    });     
};

module.exports= {
    saveVehicle,
    findVehicle,
    updateVehicle,
    deleteVehicle,
    findAllVehicles

}
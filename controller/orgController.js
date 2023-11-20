const Organization = require('../model/OrgSchema');

/*
POST -> Save
PUT -> Update
GET -> Fetch
DELETE -> Remove
*/

const saveOrganization = async (req, resp) => {
    try {
        const existingOrganization = await Organization.findOne({ orgName:req.body.orgName });

        if (existingOrganization) {
            resp.status(409).json({ status: false, message: 'Organization with the same name already exists!' });
        } else {
            const tempOrganization = new Organization({
                orgName: req.body.orgName,
                orgType: req.body.orgType,
                orgEmail: req.body.orgEmail,
                orgLocation: req.body.orgLocation 
            });

            await tempOrganization.save();
            resp.status(201).json({ status: true, message: 'Organization was saved!' });
        }
    } catch (error) {
        resp.status(500).json(error);
    }
};


const findOrganization = (req, resp)=>{
    Organization.findOne({email:req.headers.email}).then(result=>{
        if(result==null){
            resp.status(404).json({status:false, message:'Organization not found!'});
        }else{
            resp.status(200).json({status:true, data:result});  
        }
    }).catch(error=>{
        resp.status(500).json(error);
    });    
};




const updateOrganization = (req, resp)=>{
    Organization.updateOne({email:req.headers.email},{
        $set:{
            orgName:req.body.orgName,
            orgType:req.body.orgType,
            orgEmail:req.body.orgEmail,
            orgLocation:req.body.orgLocation
        }
    }).then(result=>{
        if(result.modifiedCount>0){
            resp.status(201).json({status:true, message:'Organization was Updated!'});
        }else{
            resp.status(200).json({status:false, message:'try again!'});  
        }
    }).catch(error=>{
        resp.status(500).json(error);
    });     
};

const deleteOrganization = (req, resp)=>{
    Organization.deleteOne({email:req.headers.email}).then(result=>{
        if(result.deletedCount>0){
            resp.status(204).json({status:true, message:'Organization was deleted!'});
        }else{
            resp.status(400).json({status:false, message:'try again!'});  
        }
    }).catch(error=>{
        resp.status(500).json(error);
    });  
};

const findAllOrganizations = (req, resp)=>{
    Organization.find().then(result=>{
         resp.status(200).json({status:true, data:result});    
    }).catch(error=>{
        resp.status(500).json(error);
    });     
};

module.exports= {
    saveOrganization,
    findOrganization,
    updateOrganization,
    deleteOrganization,
    findAllOrganizations

}
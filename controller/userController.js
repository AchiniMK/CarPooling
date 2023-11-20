const User = require('../model/UserSchema');

/*
POST -> Save
PUT -> Update
GET -> Fetch
DELETE -> Remove
*/

const saveUser = async (req, resp) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            resp.status(409).json({ status: false, message: 'User with the same email already exists!' });
        } else {
            const tempUser = new User({
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password,
                phoneNo: req.body.phoneNo
            });

            await tempUser.save();
            resp.status(201).json({ status: true, message: 'User was saved!' });
        }
    } catch (error) {
        resp.status(500).json(error);
    }
};

const findUser = (req, resp)=>{
    User.findOne({email:req.headers.email}).then(result=>{
        if(result==null){
            resp.status(404).json({status:false, message:'User not found!'});
        }else{
            resp.status(200).json({status:true, data:result});  
        }
    }).catch(error=>{
        resp.status(500).json(error);
    });    
};

const updateUser = (req, resp)=>{
    User.updateOne({email:req.headers.email},{
        $set:{
            email:req.body.email,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            password:req.body.password,
            phoneNo:req.body.phoneNo    
        }
    }).then(result=>{
        if(result.modifiedCount>0){
            resp.status(201).json({status:true, message:'User was Updated!'});
        }else{
            resp.status(200).json({status:false, message:'try again!'});  
        }
    }).catch(error=>{
        resp.status(500).json(error);
    });     
};

const deleteUser = (req, resp)=>{
    User.deleteOne({email:req.headers.email}).then(result=>{
        if(result.deletedCount>0){
            resp.status(204).json({status:true, message:'User was deleted!'});
        }else{
            resp.status(400).json({status:false, message:'try again!'});  
        }
    }).catch(error=>{
        resp.status(500).json(error);
    });  
};

const findAllUsers = (req, resp)=>{
    User.find().then(result=>{
         resp.status(200).json({status:true, data:result});    
    }).catch(error=>{
        resp.status(500).json(error);
    });     
};

module.exports= {
    saveUser,
    findUser,
    updateUser,
    deleteUser,
    findAllUsers
}
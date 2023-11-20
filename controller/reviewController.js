const Review = require('../model/ReviewSchema');

/*
POST -> Save
PUT -> Update
GET -> Fetch
DELETE -> Remove
*/

const saveReview = (req, resp)=>{
    const tempReview = new Review({
        comment:req.body.comment,
        rate:req.body.rate
    });
    tempReview.save().then(result=>{
        resp.status(201).json({status:true, message:'Review was saved!'});
    }).catch(error=>{
        resp.status(500).json(error);
    });    
};


const findReview = (req, resp)=>{
    Review.findOne({email:req.headers.email}).then(result=>{
        if(result==null){
            resp.status(404).json({status:false, message:'Review not found!'});
        }else{
            resp.status(200).json({status:true, data:result});  
        }
    }).catch(error=>{
        resp.status(500).json(error);
    });    
};




const updateReview = (req, resp)=>{
    Review.updateOne({email:req.headers.email},{
        $set:{
            comment:req.body.comment,
            rate:req.body.rate
        }
    }).then(result=>{
        if(result.modifiedCount>0){
            resp.status(201).json({status:true, message:'Review was Updated!'});
        }else{
            resp.status(200).json({status:false, message:'try again!'});  
        }
    }).catch(error=>{
        resp.status(500).json(error);
    });     
};

const deleteReview = (req, resp)=>{
    Review.deleteOne({email:req.headers.email}).then(result=>{
        if(result.deletedCount>0){
            resp.status(204).json({status:true, message:'Review was deleted!'});
        }else{
            resp.status(400).json({status:false, message:'try again!'});  
        }
    }).catch(error=>{
        resp.status(500).json(error);
    });  
};

const findAllReviews = (req, resp)=>{
    Review.find().then(result=>{
         resp.status(200).json({status:true, data:result});    
    }).catch(error=>{
        resp.status(500).json(error);
    });     
};

module.exports= {
    saveReview,
    findReview,
    updateReview,
    deleteReview,
    findAllReviews

}
const userSchema = require('../model/UserSchema')
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');


const signup = async (req, resp) => {
	userSchema.findOne({ email: req.body.email }).then((result) => {
			if (result == null) {
				bcrypt.hash(req.body.password, 10, function (err, hash) {
					if (err) {
						return resp.status(500).json({ message: "something went wrong!" });
					}
					const user = new userSchema({
						email: req.body.email,
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						password: hash,
						phoneNo: req.body.phoneNo,
					});
					user.save().then((savedData) => {
							resp.status(201).json({ message: "user was saved!" });
						})
						.catch((error) => {
							resp.status(500).json(error);
						});
				});
			} else {
				resp.status(409).json({ message: "already exists!" });
			}
		})
		.catch((error) => {
			resp.status(500).json(error);
		});
};

const login = async (req, resp) => {
	userSchema.findOne({ email: req.body.email }).then(selectedUser => {
			if (selectedUser == null) {
				return resp.status(404).json({ message: " Email not found!" });
			} else {
				bcrypt.compare(req.body.password, selectedUser.password, function (err, result) {
					if(err){
						return resp.status(500).json(err);
					}
					if(result){
						const expiresIn = 3600;
						const token = jsonWebToken.sign({'email':selectedUser.email}, 
						process.env.SECRET_KEY,
						{ expiresIn }
						);
						resp.setHeader("Authorization", `Bearer ${token}`);

					return resp.status(200).json({ message:"check the headers" });	
					}else{
					return resp.status(401).json({ message: " password is incorrect" });	
					}
				});
				
			}
		
		}).catch(error => {
			resp.status(500).json(error);
		});
};



module.exports = {
	signup,
	login
};

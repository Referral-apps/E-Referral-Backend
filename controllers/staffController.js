const Staff = require("../models/Staff");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//Creating Authentication Token
let returnToken = (staff, res) => {
    const token = jwt.sign(
      {
        _id: staff._id,
        email: staff.email,
      },
      process.env.JWT_KEY
    );
    return res
      .status(200)
      .json({ message: "Auth succeed", token: token, staff: staff });
  };
  
//Login Controller
  exports.login = async (req, res) => {
    try {
      let staff = await Staff.find({ email: req.body.email });
  
      if (bcrypt.compareSync(req.body.password, staff[0].password))
        returnToken(staff[0], res);
      else return res.status(422).json({ error: "Incorrect email or password" });
    } catch (e) {
      console.log(e);
      return res.status(422).json({ message: "Incorrect email or password" });
    }
  };

//Register Staff Controller
exports.register = async(req, res)=>{
    try{
        let staff = await Staff.find({email: req.body.email});

        if(staff.length>0)
        return res.status(422).json({message: "Staff with similar email already exists"});
        else {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync("12345", salt);
            
            const user = new Staff({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                middleName: req.body.middleName,
                email: req.body.email, 
                role: req.body.role,
                contact: req.body.contact,
                password: hash, 
                region: req.body.region,
                district: req.body.district,
                facility: req.body.facility,
                signature: req.body.signature
            })
            user.save()
                .then((result)=>{
                    res.status(201).json({staff: result});
                })
                .catch((err)=>{
                    console.log(err);
                    res.status(500).json({message: "Could not create Staff"});
                });
        }
    } catch (e){
        res.status(500).json({message: "Something went wrong"});
    }
}


//Update Staff Controller 
exports.update = async (req, res)=>{

    let id = await Staff.findById(req.params.id)
    if(!id){
        return res.status(404).json({message:"Staff not found"});
    }

    let staff = await Staff.find({email: req.body.email}); 
    console.log(staff[0].email)
    
    if(staff.length>1)
        return res.status(422).json({message: "Staff Email already exists"});

    let updateUser = await Staff.findOneAndUpdate(
        {_id: req.params.id},
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            middleName: req.body.middleName,
            email: req.body.email,
            role: req.body.role,
            contact: req.body.contact,
            region: req.body.region,
            district: req.body.district,
            facility: req.body.facility,
            signature: req.body.signature

        }, { new: true}
        );
        updateUser.save()
                   .then((result)=>{
                       console.log(result)
                       return res.status(200).json({staff: result});
                    // Staff.findById(req.params.id).then((result)=> {
                    //     return res.status(200).json({staff: result});
                    // });
                   }) 
                   .catch((err)=>{
                       console.log(err);
                       if(err.kind==="ObjectID")
                        return res.status(404).json({message: "Staff Not Found"})
                   })
}

//Change Staff Password
exports.change_password = async (req, res) => {

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
   try{ 
       let passupdate = await Staff.findByIdAndUpdate(res.staffData._id, {
      password: hash
      //res.staffData._id comes from the Token: thus data is picked from the token
    })
        passupdate.save()
        return res.status(200).json({success: true})
    } catch(e){
        return res.status(500).json({message: 'Could not change password'})
    }
  }

  //Delete Staff
  exports.destroy = (req, res) => {
    Staff.findOneAndDelete({ _id: req.params.id })
      .then((result) => {
  
        if (!result)  {
          return res.status(404).json({message: 'Staff Not Found'})
        }
        return res.status(204).json({message: 'deleted'});
      })
      .catch((err) => {
        if (err.kind == "ObjectId")
          return res.status(404).json({ message: "Staff not Found" });
        res.status(500).json({ message: "Could not delete staff" });
      });
  };

//Show All Staff
exports.show = (req, res) => {
    Staff.findById(req.params.id)
    .exec()
    .then(staff => {
      if (!staff) return res.status(404).json({message: 'Staff Not Found'})
      res.status(200).json({staff})
    })
    .catch(err => {
      res.status(500).json({message: 'Could not access staff data'})
    })
  }
  
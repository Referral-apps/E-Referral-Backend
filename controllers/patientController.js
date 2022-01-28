const Patient = require('../models/Patient')

exports.register = async (req, res)=>{
  try{
    const patient = new Patient ({
        facility_referred_to: req.body.facility_referred_to_id,
        facility_referred_from: req.body.facility_referred_from_id,
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        sex: req.body.sex,
        insurance: req.body.insurance,
        relative_name: req.body.relative_name,
        contact: req.body.contact,
        presenting_complaints: req.body.presenting_complaints,
        exam_findings: req.body.exam_findings,
        temperature: req.body.temperature,
        pulse: req.body.pulse,
        respiratory_rate: req.body.respiratory_rate,
        weight: req.body.weight,
        investigation_carried: req.body.investigation_carried,
        diagnosis: req.body.diagnosis,
        treatment: req.body.treatment,
        reason_for_referral: req.body.reason_for_referral,
        commitment_for_next_level: req.body.commitment_for_next_level,
        officer: req.body.officer_id  
    })
  
    try{
        patient.save()
                .then((patient)=>{
                    res.status(201).json({patient: patient})
                })
                .catch((err)=>{
                    console.log(err)
                    res.status(500).json({message: "Could not Create Patient"})
                })
    }catch(e){
        res.status(500).json({message: "An Error Occured"})
    }
    }catch(e){
        console.log(e)
        res.status(500).json({message: " Huge Error"})
    }
}

exports.allPatients = (req, res)=>{
    Patient.find()
        .exec()
        .then((patients)=>{
            res.status(200).json({patients: patients});
        })
        .catch((error)=>{
            res.status(500).json({message: "Could not Fetch Patients"})
        })
}

//Kindly err.kind Error
exports.update = (req, res)=>{   
    Patient.findOne({id: req.params.id})
            .exec()
            .then((patient)=>{
                if(!patient) return res.status(404).json({message: "Patient cannot found"})
                Patient.updateOne(
                    {id: req.params.id},
                    {
                        facility_referred_to: req.body.facility_referred_to_id,
                        // facility_referred_from: req.body.facility_referred_from_id,
                        firstname: req.body.firstname,
                        middlename: req.body.middlename,
                        lastname: req.body.lastname,
                        sex: req.body.sex,
                        insurance: req.body.insurance,
                        relative_name: req.body.relative_name,
                        contact: req.body.contact,
                        presenting_complaints: req.body.presenting_complaints,
                        exam_findings: req.body.exam_findings,
                        temperature: req.body.temperature,
                        pulse: req.body.pulse,
                        respiratory_rate: req.body.respiratory_rate,
                        weight: req.body.weight,
                        investigation_carried: req.body.investigation_carried,
                        diagnosis: req.body.diagnosis,
                        treatment: req.body.treatment,
                        reason_for_referral: req.body.reason_for_referral,
                        commitment_for_next_level: req.body.commitment_for_next_level,
                        // officer: req.body.officer_id 
                    }
                ) .then(update=>{
                    Patient.findOne({id: req.params.id}).then(patient=>{
                        return res.status(200).json({patient})
                    })
                })
            })
            .catch((err) => {
                console.log(err);
                if (err.kind == "ObjectId")
                  return res.status(404).json({ message: "Patient Not Found" });
                res.status(500).json({message: "Invalid Id or Id related error"})
              });
}

exports.showone = (req, res)=>{
        Patient.findOne({id: req.params.id})
        .exec()
        .then((patient)=>{
                if(!patient) return res.status(404).json({message: "Patient Not Found"})
            res.status(200).json({patient:patient})
        })
        .catch((err)=>{
            console.log(err)
            if(err.kind=="ObjectId")
                return res.status(404).json({message:"Patient Not Found"})
            res.status(500).json({message: "Invalid Id or Id related error"});
        })
}

exports.deletepatient = (req, res)=>{
    Patient.findOneAndDelete({id: req.params.id})
        .exec()
        .then((patient)=>{
                if(!patient) return res.status(404).json({message: "Patient Not Found"})
            res.status(204).json({message: "Deleted"})
        })
        .catch((err)=>{
            if(err.kind=="ObjectId")
                return res.status(404).json({message: "Patient Not Found"})
            res.status(500).json({message: "Invalid ID or ID related error"})
        })
}


exports.acceptreferral = (req, res)=>{   
    Patient.findOne({id: req.params.id})
            .exec()
            .then((patient)=>{
                if(!patient) return res.status(404).json({message: "Patient cannot found"})
                Patient.updateOne(
                    {id: req.params.id},
                    {
                        accepted: req.body.accepted
                    }
                ) .then(update=>{
                    Patient.findOne({id: req.params.id}).then(patient=>{
                        return res.status(200).json({patient})
                    })
                })
            })
            .catch((err) => {
                console.log(err);
                if (err.kind == "ObjectId")
                  return res.status(404).json({ message: "Patient Not Found" });
                res.status(500).json({message: "Invalid Id or Id related error"})
              });
}

exports.forwardreferral=(req, res)=>{
    Patient.findOne({id: req.params.id})
    .exec()
    .then((patient)=>{
        if(!patient) return res.status(404).json({message: "Patient cannot found"})
        Patient.updateOne(
            {id: req.params.id},
            {
            forward: req.body.forward,
            forwardDetails: {
                forward: req.body.forward,
                forwardingFacility: req.body.forwardingFacility_id,
                forwardingTo: req.body.forwardingTo_id,
                reason: req.body.reason
            },
            accepted:false
            }
        ) .then(update=>{
            Patient.findOne({id: req.params.id}).then(patient=>{
                return res.status(200).json({patient})
            })
        })
    })
    .catch((err) => {
        console.log(err);
        if (err.kind == "ObjectId")
          return res.status(404).json({ message: "Patient Not Found" });
        res.status(500).json({message: "Invalid Id or Id related error"})
      });
}
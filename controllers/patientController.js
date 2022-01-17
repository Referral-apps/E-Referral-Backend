const Patient = require('../models/Patient')



exports.register = async (req, res)=>{
  try{
    const patient = new Patient ({
        regno: req.body.regno,
        facility_referred_to: req.body.facility_referred_to_id,
        // facility_referred_from: req.facility_referred_from,
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
        // officer: req.user._id
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
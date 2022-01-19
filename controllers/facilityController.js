const Facility = require("../models/Facility");

exports.register = async (req, res)=>{
    let facility = await new Facility({
        name: req.body.name,
        region: req.body.region,
        district: req.body.district,
        type_of_facility: req.body.type_of_facility
    })

    try{
        await facility.save()
        res.status(201).json({facility})
    }catch(e){
        res.status(500).json({message: "Could not Create Facility"})
    }
}

exports.update = async (req, res)=>{
    Facility.findOne({id: req.params.id})
        .exec()
        .then((facility)=>{
            if(!facility) return res.status(404).json({message: 'Facility not found'})
        Facility.updateOne(
            {id: req.params.id},
            {
               name: req.body.name,
               region: req.body.region,
               district: req.body.district,
               type_of_facility: req.body.type_of_facility 
            }
        )
        .then(update=>{
            Facility.findOne({id: req.params.id})
                .then(facility=>{
                    return res.status(200).json({facility})
                })
        })
        .catch(err=>{
            console.log(err);
            if(err.kind==="ObjectID")
             return res.status(404).json({message: "Facility Not Found"})
        })
        })
}

exports.findfacility = (req, res)=>{
        Facility.findOne({id: req.params.id})
            .exec()
            .then((facility)=>{
                if(!facility) return res.status(404).json({message: "Facility Not Found"})
                res.status(200).json({facility: facility})
            })
            .catch((err)=>{
                console.log(err)
                if(err.kind=="ObjectId")
                    return res.status(404).json({message: "Facility Not Found"});
                res.status(500).json({message: "Could not query DB"});
            })
}

exports.allfacilities = async(req, res)=>{
            facilities = await Facility.find({})
            try{
                return res.status(200).json({facilities})
            }catch(e){
                console.log(e)
                return res.status(400).json({message: "Could not Fetch Facilities Data"})
            }
}

//Delet facility
// exports.deletefacility = async(req, res)=>{
//     facility = await Facility.findOneAndDelete({_id: req.params.id})
//         try{
//             if(!facility){
//                 return res.status(404).json({message: "Facility Not Found"})
//             }
//             return res.status(204).json({message: "Facility Deleted"})
//         } catch(e){
//             // console.log(e)
//             // if(err.kind==="ObjectId")
//             //     return res.status(404).json({message: "Facility Not Found"})
//             // return res.status(500).json({message: "Facility could not be Deleted"})
//         }
// }

    exports.deletefacility = async(req, res)=>{
        Facility.findOneAndDelete({_id: req.params.id})
            .then((result)=>{
                if(!result){
                    return res.status(404).json({message: "Facility Not Found"})
                }
                return res.status(204).json({message: "Deleted"})
            })
            .catch((err)=>{
                if(err.kind==="ObjectId")
                    return res.status(404).json({message: "Facility Not Founds"});
                res.status(500).json({message: "Could not Delete Facility"})
            });
    }
const IndustryInternshipRequest = require("../../schema/Request/IndustryInternshipRequest.schema");
const User = require("../../schema/User.schema");
const cloudinary = require("cloudinary").v2;

const addIndustryInternshipRequest = async (req, res) => {
    try {
        console.log(req.body);
        const user = req.user.id;
        // if (req.user.choice !== 'IND') {
        //     return res.status(400).json('You are not allowed to make this request');
        // }
        const userdoc = await User.findById(user);
        const fileName = userdoc.rollNo + "-" + "offer-letter";
        const offerLetterFile = req.files.offerLetter;
        const cloudResponse = await cloudinary.uploader.upload(
            offerLetterFile.tempFilePath,
            { public_id: `offer-letters/${fileName}` }
        );
        const offerLetter = cloudResponse.url
        let {
            role,
            companyName,
            city,
            pincode,
            state,
            country,
            googleMapLink,
            companyWebsite,
            stipend,
            joiningDate,
            endingDate,
        } = req.body;
      
        const companyDetails = {
            companyName,
            companyAddress: {
                city,
                pincode,
                state,
                country,
                googleMapLink,
            },
            companyWebsite,
        };
        const newIndustryInternshipRequest = new IndustryInternshipRequest({
            user,
            role,
            companyDetails,
            stipend,
            joiningDate,
            endingDate,
            offerLetter,
        });
        await newIndustryInternshipRequest.save();
        return res.status(200).json("Request added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
    }
};

const updateIndustryRequest = async (req, res) => {
    try {
        const user = req.user.id;
        const { message, status } = req.body;
        const newUpdate = {
            user,
            message,
        };
        await IndustryInternshipRequest.findByIdAndUpdate(req.params.id, {
            status: status,
            update: newUpdate,
        });
        res.status(200).json("Request updated successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
    }
};

const getIndustryRequests = async (req, res) => {
    try {
        const user = req.user;
        const query = {};
        const projection = {
            __v: 0,
        };

        let requests = [];
        if (user.role === 2) {
            query["user"] = user.id;
            projection["user"] = 0;
            requests = await IndustryInternshipRequest.find(
                query,
                projection
            ).populate("update.user", "name , email");
        } else {
            requests = await IndustryInternshipRequest.find(query, projection)
                .populate("update.user", "name , email")
                .populate("user", "name , email , rollNo").sort({'user.roleNo': 1})
        }
        res.status(200).json(requests);
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
    }
};

module.exports = {
    addIndustryInternshipRequest,
    updateIndustryRequest,
    getIndustryRequests,
};

export const  getCropHealthC =async(req,res) => {
    try {
        const {id} = req.params;
        const mockData={
            cropId: id,
            cropType:"Wheat",
            metrics: {
                soilMoisture : 10.6, //in Percent
                temprature: 48.2,//C
                humidity: 5.33, //in Percent
                windSpeed: 44,//Km hr
                rainFall: 1,//mm
            },
            status: "Critical boom,boom",//status of health 
            lastUpdated:new Date().toISOString()
        }

        return res.status(200).json({
            success: true,
            data: mockData
        })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message:err.message

        })
    }

};
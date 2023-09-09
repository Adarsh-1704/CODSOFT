import mongoose from 'mongoose';

const url = 'http://localhost:8000';

let gridfsBucket;
const conn = mongoose.connection;

conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
});

export const uploadImage = (request, response) => {
    if (!request.file) 
        return response.status(404).json("File not found");
    
    const imageUrl = `${url}/file/${request.file.filename}`;

    return response.status(200).json(imageUrl);    
}

export const getImage = async (request, response) => {
    try {   
        const file = await gridfsBucket.find({ filename: request.params.filename }).toArray();
        if (!file || file.length === 0) {
            return response.status(404).json("File not found");
        }
        
        const fileId = file[0]._id;
        const downloadStream = gridfsBucket.openDownloadStream(fileId);
        downloadStream.pipe(response);
    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
}

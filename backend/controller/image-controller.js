import File from "../models/file.js";

export const uploadImage = async (req, res) => {
    let fileObj = {
        path: req.file.path,
        name: req.file.originalname
    }

    try {
        let file = await File.create(fileObj);
        res.status(200).json({ path: `http://localhost:2716/file/${file._id}` });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}
export const downloadImage = async (req, res) => {
    let fileId = req.params.fileId;
    try {
        const myfile = await File.findById(fileId);
        myfile.downloadContent++;
        await myfile.save();
        res.download(myfile.path, myfile.name);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
}
export const deleteAllImage = async (req, res) => {
    try {
        await File.findByIdAndDelete({ _id: req.params.delId });
        res.status(200).json({ message: "Deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
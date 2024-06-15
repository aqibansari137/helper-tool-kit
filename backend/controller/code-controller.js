import Code from "../models/codestore.js";

export const getCode = async (req, res) => {
  try {
    const codeData = await Code.find();
    res.status(200).json(codeData);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
export const addCode = async (req, res) => {
  const { heading, code, category } = req.body;
  try {
    const codeData = new Code({ heading, code, category });
    await codeData.save();
    res.status(200).json({ message: "Data Added Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
export const deleteCode = async (req, res) => {
  const _id = req.params.id;
  try {
    await Code.findByIdAndDelete(_id);
    res.status(200).json({ message: "Data Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
export const updateCode = async (req, res) => {
  const _id = req.params.id;
  const { heading, code, category } = req.body;
  try {
    let response = await Code.findByIdAndUpdate(_id, {
      heading,
      code,
      category,
    });
    res.status(200).json({ message: "Data Updated Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

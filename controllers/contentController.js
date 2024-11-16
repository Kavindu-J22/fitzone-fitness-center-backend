const Content = require('../models/Content');

// Create new content
exports.createContent = async (req, res) => {
  try {
    const { category, name, description, image, username } = req.body;
    const content = new Content({ category, name, description, image, username });
    await content.save();
    res.status(201).json({ message: 'Content created successfully', content });
  } catch (error) {
    res.status(500).json({ message: 'Error creating content', error });
  }
};

// Get all contents
exports.getAllContents = async (req, res) => {
  try {
    const contents = await Content.find();
    res.status(200).json(contents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contents', error });
  }
};

// Update content by ID
exports.updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, name, description, image } = req.body;
    const updatedContent = await Content.findByIdAndUpdate(
      id,
      { category, name, description, image, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedContent) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.status(200).json({ message: 'Content updated successfully', updatedContent });
  } catch (error) {
    res.status(500).json({ message: 'Error updating content', error });
  }
};

// Delete content by ID
exports.deleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContent = await Content.findByIdAndDelete(id);

    if (!deletedContent) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.status(200).json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting content', error });
  }
};

// Get all content categories
exports.getAllContentCategories = async (req, res) => {
  try {
    const categories = await Content.distinct('category');
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

// Find content by category
exports.findContentByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const contents = await Content.find({ category });
    res.status(200).json(contents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content by category', error });
  }
};

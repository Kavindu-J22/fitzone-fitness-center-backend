const Query = require('../models/Query');

// Create a new query
exports.createQuery = async (req, res) => {
  try {
    const { userId, userName, title, about, message } = req.body;
    const newQuery = new Query({ userId, userName, title, about, message });
    await newQuery.save();
    res.status(201).json({ message: 'Query submitted successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a query
exports.deleteQuery = async (req, res) => {
  try {
    const { id } = req.params;
    await Query.findByIdAndDelete(id);
    res.status(200).json({ message: 'Query deleted successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all queries
exports.getQueries = async (req, res) => {
  try {
    const queries = await Query.find();
    res.status(200).json(queries);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Update reply and status of a query
exports.updateQuery = async (req, res) => {
  try {
    const { id } = req.params; // Get the query ID from the request parameters
    const { reply, status } = req.body; // Get reply and status from the request body

    // Find the query by ID and update the reply and status
    const updatedQuery = await Query.findByIdAndUpdate(
      id,
      { reply, status },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedQuery) {
      return res.status(404).json({ message: 'Query not found' });
    }

    res.status(200).json({ message: 'Query updated successfully', query: updatedQuery });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
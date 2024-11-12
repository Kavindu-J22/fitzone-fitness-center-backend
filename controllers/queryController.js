const Query = require('../models/Query');  // Ensure this model is defined

// Submit a query
exports.submitQuery = async (req, res) => {
  const { userId, subject, message } = req.body;

  try {
    const newQuery = new Query({ userId, subject, message });
    await newQuery.save();
    res.status(201).json({ message: 'Query submitted successfully', query: newQuery });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting query' });
  }
};

// Respond to a query
exports.respondToQuery = async (req, res) => {
  const { queryId, response } = req.body;

  try {
    const query = await Query.findById(queryId);
    query.response = response;
    await query.save();
    res.json({ message: 'Response added successfully', query });
  } catch (error) {
    res.status(500).json({ error: 'Error responding to query' });
  }
};

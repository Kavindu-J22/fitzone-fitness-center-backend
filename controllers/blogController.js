const Blog = require('../models/Blog');  // Ensure this model is defined

// Create a blog post
exports.createBlogPost = async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const newBlogPost = new Blog({ title, content, author });
    await newBlogPost.save();
    res.status(201).json({ message: 'Blog post created successfully', blog: newBlogPost });
  } catch (error) {
    res.status(500).json({ error: 'Error creating blog post' });
  }
};

// Get all blog posts
exports.getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await Blog.find();
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving blog posts' });
  }
};

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*Explanation:
title: The title of the page.
slug: A URL-friendly identifier for the page (like my-page-title).
content: The main content of the page.
author: Reference to the user who created the page. This assumes you have a User model.
dateCreated: Timestamp for when the page was created.
dateModified: Timestamp for when the page was last modified.
status: Page status (e.g., published, draft, pending).
parent: Allows for hierarchical pages, where a page can be a child of another page.
meta: SEO metadata including a description and SEO title.
customFields: A flexible field to store additional metadata or custom data, using a Map to store various types of data.
*/
// Define the page schema
const pageSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user', // Assuming you have a User model
    required: true
  },
  isMenu: {
    type: Boolean,
    default: false, // Optional: sets a default value
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateModified: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['published', 'draft', 'pending'],
    default: 'draft'
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Page' // Reference to itself for hierarchical structure
  },
  meta: {
    description: {
      type: String,
      trim: true
    },
    seoTitle: {
      type: String,
      trim: true
    }
  },
  customFields: {
    type: Map,
    of: Schema.Types.Mixed
  }
});

// Create a model using the schema
const Page = new mongoose.model('cms_pages', pageSchema);
module.exports = Page;

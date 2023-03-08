const _ = require('lodash');

const dummy = (blogs) => {
  console.log(blogs);
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (prev, current) => ((prev.likes > current.likes) ? prev : current);

  const result = blogs.reduce(reducer);

  return {
    title: result.title,
    author: result.author,
    likes: result.likes,
  };
};

const mostBlogs = (blogs) => {
  const authors = _.countBy(blogs, (blog) => blog.author);
  const authorNames = Object.keys(authors);
  const blogCounts = Object.values(authors);
  const highestCount = Math.max(...blogCounts);
  const highestCountIndex = blogCounts.indexOf(highestCount);

  return {
    author: authorNames[highestCountIndex],
    blogs: highestCount,
  };
};

const mostLikes = (blogs) => {
  const authors = _.groupBy(blogs, (blog) => blog.author);
  const blogGroups = Object.values(authors);

  const reducer = (total, current) => total + current.likes;

  const totalAuthorLikes = blogGroups.map((group) => group.reduce(reducer, 0));
  const highestLikes = Math.max(...totalAuthorLikes);
  const highestLikesIndex = totalAuthorLikes.indexOf(highestLikes);
  const authorNames = Object.keys(authors);

  return {
    author: authorNames[highestLikesIndex],
    likes: highestLikes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};

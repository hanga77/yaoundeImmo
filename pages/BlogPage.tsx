
import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { useData } from '../DataContext';

const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group flex flex-col">
    <Link to={`/blog/${post.id}`} className="block h-full flex flex-col">
      <img className="h-56 w-full object-cover" src={post.imageUrl} alt={post.title} />
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-sm text-gray-500">{post.date} &bull; par {post.author}</p>
        <h3 className="mt-2 text-xl font-bold text-brand-blue group-hover:text-brand-gold transition-colors duration-300">{post.title}</h3>
        <p className="mt-3 text-gray-600 flex-grow">{post.excerpt}</p>
        <p className="mt-4 font-semibold text-brand-gold">Lire la suite &rarr;</p>
      </div>
    </Link>
  </div>
);

const BlogPage: React.FC = () => {
  const { blogPosts } = useData();

  return (
    <div className="bg-brand-light">
      {/* Page Header */}
      <div className="bg-brand-blue py-20 text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold font-serif">Blog & Actualités</h1>
          <p className="mt-2 text-lg text-gray-300">Conseils, analyses et actualités du marché immobilier de Yaoundé.</p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../DataContext';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

const BlogPostDetailPage: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const { blogPosts } = useData();
    const navigate = useNavigate();
    const post = blogPosts.find(p => p.id === postId);

    if (!post) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold">Article non trouvé</h1>
                <p className="mt-4">L'article que vous recherchez n'existe pas.</p>
                <Link to="/blog" className="mt-8 inline-block bg-brand-gold text-white font-bold py-2 px-4 rounded hover:bg-yellow-600">
                    Retour au blog
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-brand-blue font-semibold hover:text-brand-gold mb-8 transition-colors">
                    <ArrowLeftIcon className="h-5 w-5" />
                    Retour au blog
                </button>

                <article className="max-w-4xl mx-auto">
                    <header className="mb-8">
                        <img src={post.imageUrl} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg mb-6" />
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-brand-blue mb-4">{post.title}</h1>
                        <p className="text-gray-500 text-base">
                            Publié le {post.date} par <span className="font-semibold text-brand-dark">{post.author}</span>
                        </p>
                    </header>
                    
                    <div 
                        className="prose lg:prose-xl max-w-none text-gray-800"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>
            </div>
        </div>
    );
};

export default BlogPostDetailPage;
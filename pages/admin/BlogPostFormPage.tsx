import React from 'react';
import { useParams } from 'react-router-dom';
import BlogPostForm from '../../components/admin/BlogPostForm';
import { useData } from '../../DataContext';
import { BlogPost } from '../../types';

const BlogPostFormPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const { blogPosts, addBlogPost, updateBlogPost } = useData();
  
  const isEditing = Boolean(postId);
  const postToEdit = isEditing ? blogPosts.find(p => p.id === postId) : null;

  // FIX: Correctly handle blog post updates to preserve existing data like the date.
  const handleSubmit = (formData: Omit<BlogPost, 'id' | 'date'>) => {
    if (isEditing && postToEdit) {
      updateBlogPost({ ...postToEdit, ...formData });
    } else {
      addBlogPost(formData);
    }
  };

  return (
    <div>
        <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-brand-dark font-serif">
                {isEditing ? 'Modifier l\'article' : 'Écrire un nouvel article'}
            </h1>
            <p className="text-gray-600 mt-1">
                {isEditing ? 'Mettez à jour le contenu ci-dessous.' : 'Remplissez le formulaire pour publier un nouvel article.'}
            </p>
        </div>
        <BlogPostForm onSubmit={handleSubmit} initialData={postToEdit} />
    </div>
  );
};

export default BlogPostFormPage;

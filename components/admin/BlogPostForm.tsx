import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogPost } from '../../types';
import { PhotoIcon } from '@heroicons/react/24/solid';

// FIX: Corrected prop types for type safety.
interface BlogPostFormProps {
  onSubmit: (post: Omit<BlogPost, 'id' | 'date'>) => void;
  initialData?: BlogPost | null;
}

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

const BlogPostForm: React.FC<BlogPostFormProps> = ({ onSubmit, initialData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    imageUrl: '',
    author: '',
    content: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        excerpt: initialData.excerpt,
        imageUrl: initialData.imageUrl,
        author: initialData.author,
        content: initialData.content,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const base64 = await fileToBase64(e.target.files[0]);
          setFormData(prev => ({ ...prev, imageUrl: base64 }));
      }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    navigate('/admin/blog');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre de l'article</label>
          <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">Auteur</label>
          <input type="text" name="author" id="author" value={formData.author} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Image de couverture</label>
        <div className="mt-2 flex items-center gap-x-3">
          {formData.imageUrl ? 
            <img src={formData.imageUrl} alt="Aperçu" className="h-32 w-full object-cover rounded-md" /> : 
            <div className="h-32 w-full bg-gray-100 rounded-md flex items-center justify-center">
                <PhotoIcon className="h-16 w-16 text-gray-300" aria-hidden="true" />
            </div>
          }
        </div>
        <label htmlFor="image-upload" className="mt-2 cursor-pointer inline-block rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <span>{formData.imageUrl ? 'Changer l\'image' : 'Choisir une image'}</span>
            <input id="image-upload" name="image-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
        </label>
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">Extrait</label>
        <textarea name="excerpt" id="excerpt" rows={3} value={formData.excerpt} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold"></textarea>
        <p className="mt-1 text-xs text-gray-500">Court résumé affiché sur la page principale du blog.</p>
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Contenu de l'article</label>
        <textarea name="content" id="content" rows={15} value={formData.content} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold"></textarea>
        <p className="mt-1 text-xs text-gray-500">Vous pouvez utiliser des balises HTML simples comme &lt;p&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt; pour formater le texte.</p>
      </div>

      <div className="flex justify-end space-x-4 pt-4 border-t">
        <button type="button" onClick={() => navigate('/admin/blog')} className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-md hover:bg-gray-300 transition-colors">
            Annuler
        </button>
        <button type="submit" className="bg-brand-gold hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-md transition-colors">
          {initialData ? 'Mettre à jour' : 'Publier l\'article'}
        </button>
      </div>
    </form>
  );
};

export default BlogPostForm;

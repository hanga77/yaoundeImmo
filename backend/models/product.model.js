import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  imageUrls: { type: [String], default: [] },
  description: { type: String, required: true },
  isFeatured: { type: Boolean, default: false },
}, {
  timestamps: true,
});

productSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

productSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
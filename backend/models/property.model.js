import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ['À Vendre', 'À Louer', 'Meublé']
  },
  price: { type: Number, required: true },
  address: { type: String, required: true },
  commune: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  area: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  imageUrls: { type: [String], default: [] },
  description: { type: String, required: true },
  isFeatured: { type: Boolean, default: false },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Virtual for id
propertySchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtuals are included in toJSON and toObject outputs
propertySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

const Property = mongoose.model('Property', propertySchema);

export default Property;

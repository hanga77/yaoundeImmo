import mongoose from 'mongoose';

const carouselSlideSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
}, {
  timestamps: true,
});

carouselSlideSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

carouselSlideSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

const CarouselSlide = mongoose.model('CarouselSlide', carouselSlideSchema);

export default CarouselSlide;
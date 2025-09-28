import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: { type: String, required: true },
  icon: { type: String, required: true },
}, {
  timestamps: true,
});

// The 'id' field for services in the frontend constants is a string like 'construction'.
// To maintain compatibility when seeding, we will use the default _id and also allow a custom 'id' field if needed,
// but for API consistency, we'll rely on the virtual 'id'.
serviceSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

serviceSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
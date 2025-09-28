import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  bio: { type: String, required: true },
}, {
  timestamps: true,
});

agentSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

agentSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

const Agent = mongoose.model('Agent', agentSchema);

export default Agent;
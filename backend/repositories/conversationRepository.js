const mongoose = require('mongoose');
const Repository = require('./generalRepository');
const Conversation = require('../schemas/conversationSchema');

const conversationRepository = Object.create(Repository.prototype);
conversationRepository.model = Conversation;

conversationRepository.findOneAndPopulate = function (id, callback) {
  this.model.findById({ _id: id })
    .populate('participants.user')
    .populate({
      path: 'messages',
      populate: { path: 'author.item' },
    }).exec(callback);
};

conversationRepository.getConversationsByUserId = function (id) {
  const model = this.model;
  return model.find({ 'participants.user': id }) // query под вопросом
    .populate('participants.user')
    .populate({
      path: 'messages',
      populate: { path: 'author.item' },
    }).exec();
};

conversationRepository.getAllConversations = function (callback) {
  this.model.find({ $where: 'this.messages.length > 0' }).populate('participants.user').populate({
    path: 'messages',
    populate: { path: 'author.item' },
  }).exec(callback);
};

conversationRepository.getReceiverByIds = function (conversationId, senderId, senderType, callback) {
  this.model.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(conversationId), participants: { $exists: true } } },
    { $unwind: '$participants' },
    { $match: { 'participants.userType': senderType === 'Admin' ? 'User' : 'Admin' } },
    { $project: {
      'participants.user': 1,
      _id: 0
    } }
  ]).exec(callback);
};

module.exports = conversationRepository;

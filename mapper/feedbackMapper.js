const feedbackMapper = {};

feedbackMapper.convertToDto = async feedbackModels => {
  const feedbackDtoList = [];
  for (feedbackModel of feedbackModels) {
    const mappedFeedback = {};
    const updateRecord = await feedbackModel.getUpdate_record();
    const user = await updateRecord.getUser();
    const story = await feedbackModel.getStory();
    const storyStatus = await story.getStory_status();

    mappedFeedback.createdDate = updateRecord.createdDate;
    mappedFeedback.userName = user.userName;
    mappedFeedback.feedBackStatus = storyStatus.statusName;
    mappedFeedback.feedbackText = feedbackModel.feedbackText;
    mappedFeedback.feedbackId = feedbackModel.feedbackId;
    mappedFeedback.preparedStatement = feedbackModel.preparedStatement;
    feedbackDtoList.push(mappedFeedback);
  }
  return feedbackDtoList;
  // if (feedbackModel) {
  //   feedbackModel
  //     .getUpdateRecord()
  //     .then(updateRecord => {
  //       mappedFeedback.createdDate = updateRecord.createdDate;
  //       updateRecord.getCreatedBy();
  //     })
  //     .then(user => (mappedFeedback.userName = user.userName));
  //   feedbackModel
  //     .getStory()
  //     .then(story => {
  //       mappedFeedback.storyId = story.storyId;
  //       story.getStoryStatus();
  //     })
  //     .then(
  //       storyStatus => (feedbackMapper.feedBackStatus = storyStatus.statusName)
  //     );
  // }
};

module.exports = feedbackMapper;

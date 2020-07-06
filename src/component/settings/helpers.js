const createTemplateOfStoreSettings = (store) => {
  const inputSettings = {
    optional: {
      btnComplicated: store.settings.optional.btnComplicated,
      btnDelete: store.settings.optional.btnDelete,
      btnShow: store.settings.optional.btnShow,
      customSwitch: store.settings.optional.customSwitch,
      difficultyLevel: store.settings.optional.difficultyLevel,
      informationDescription: store.settings.optional.informationDescription,
      informationExample: store.settings.optional.informationExample,
      informationPicture: store.settings.optional.informationPicture,
      informationTranscription: store.settings.optional.informationTranscription,
      informationTranslate: store.settings.optional.informationTranslate,
      levelButtons: store.settings.optional.levelButtons,
      newCardsPerDay: store.settings.optional.newCardsPerDay,
    },
    wordsPerDay: store.settings.wordsPerDay,
  };
  return inputSettings;
};

export default createTemplateOfStoreSettings;

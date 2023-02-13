describe('Application Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  // beforeEach(async () => {
  //   await device.reloadReactNative();
  // });

  it('should logout if the test make the app to login', async () => {
    try {
      await element(by.id('logout-button')).tap();
    } catch (err) {
      console.log('the user has not logged in');
    }
  });

  it('should show home screen title and button', async () => {
    await expect(element(by.id('title'))).toBeVisible();
    await expect(element(by.id('sign-in-button'))).toBeVisible();
  });

  it('should show game categories screen after tap', async () => {
    await element(by.id('sign-in-button')).tap();
    await expect(element(by.text('Wordly'))).toBeVisible();
    await expect(element(by.text('ANIMALS'))).toBeVisible();
    await expect(element(by.text('CITIES'))).toBeVisible();
    await expect(element(by.text('FOOD'))).toBeVisible();
    await expect(element(by.text('Leaderboard'))).toBeVisible();
  });

  it('should show game screen when clicking on category', async () => {
    await element(by.text('ANIMALS')).tap();
    await expect(element(by.id('game-question'))).toBeVisible();
    await expect(element(by.id('game-word-holder'))).toBeVisible();
  });

  it('should skip question when clicking on skip', async () => {
    const attributes = await element(by.id('game-question')).getAttributes();
    const initialText = attributes.text;
    await element(by.id('skip-button')).tap();
    await expect(element(by.id('game-question'))).not.toHaveValue(initialText);
  });

  it('should go to leaderboard screen after all the questions', async () => {
    await element(by.id('skip-button')).tap();
    await element(by.id('skip-button')).tap();
    await element(by.id('skip-button')).tap();
    await expect(element(by.id('leaderboard'))).toBeVisible();
  });
});

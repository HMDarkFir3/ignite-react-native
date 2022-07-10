describe("Home Screen", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should have welcome screen", async () => {
    await expect(element(by.id("welcome"))).toBeVisible();
  });

  it("verify if registered a new skill correctly", async () => {
    const inputNewSkill = await element(by.id("input-new-skill"));
    const buttonAddSkill = await element(by.id("button-add-skill"));
    const flatListSkills = await element(by.id("flat-list-skills"));

    await inputNewSkill.tap();
    await inputNewSkill.typeText("React Native");
    await buttonAddSkill.tap();
    await flatListSkills.tap();

    await expect(element(by.id("flat-list-skills"))).toBeVisible();
  });

  it("verify if have a My Skills text", async () => {
    await expect(element(by.id("myskills"))).toBeVisible();
  });
});

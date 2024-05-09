import { Profiles } from '../profile/Profiles';

// Function to calculate the level up threshold based on the user's level
function threshold(userId) {
  // Get user info
  const profile = Profiles.collection.findOne({ owner: userId });

  if (profile) {
    const currentLevel = profile.level;
    let levelUpThreshold = 100; // Base threshold for level 1

    // Calculate level up threshold based on current level
    for (let i = 1; i < currentLevel; i++) {
      levelUpThreshold = Math.ceil(levelUpThreshold * 1.5); // Increase threshold by 1.5 times
    }

    return levelUpThreshold;
  }
  return null;
}

// Function to update user's level and experience points
function LevelSystem(userId, exp) {
  // Get user info
  const profile = Profiles.collection.findOne({ owner: userId });
  console.log(profile);

  if (profile) {
    const currentLevel = profile.level;
    const currentExp = profile.exp;

    let newExp = currentExp + exp;
    let newLevel = currentLevel;
    let levelUpThreshold = threshold(userId); // Calculate level up threshold using the exported function

    // Check if new exp reaches or surpasses level up threshold
    while (newExp >= levelUpThreshold) {
      newLevel++;
      newExp -= levelUpThreshold; // Reduce exp by the level up threshold

      // Update level up threshold for the next level
      levelUpThreshold = Math.ceil(levelUpThreshold * 1.5);
    }

    // Update the user's profile with new level and exp
    Profiles.collection.update(profile._id, { $set: { level: newLevel, exp: newExp } });
  } else {
    // Handle case where user profile is not found (optional)
    console.log('User profile not found for ID:', userId);
  }
}

// Function to subtract user's experience points and level down if exp goes below 0
function subtractExp(userId, exp) {
  // Get user info
  const profile = Profiles.collection.findOne({ owner: userId });

  if (profile) {
    const currentExp = profile.exp;
    const currentLevel = profile.level;

    let newExp = currentExp - exp;
    let newLevel = currentLevel;

    // Check if new exp is below 0
    if (newExp < 0) {
      // Level down
      newLevel--;

      // Calculate the new level up threshold based on the new level
      let levelUpThreshold = 100; // Base threshold for level 1
      for (let i = 1; i < newLevel; i++) {
        levelUpThreshold = Math.ceil(levelUpThreshold * 1.5); // Increase threshold by 1.5 times
      }

      // Set exp to the remaining amount needed for the current level
      newExp = levelUpThreshold + newExp;
    }

    // Update the user's profile with new level and exp
    Profiles.collection.update(profile._id, { $set: { level: newLevel, exp: newExp } });
  } else {
    // Handle case where user profile is not found (optional)
    console.log('User profile not found for ID:', userId);
  }
}

export { LevelSystem, threshold, subtractExp }; // Export both functions

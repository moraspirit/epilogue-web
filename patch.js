const fs = require('fs');
const file = 'src/components/Hero.jsx';
let content = fs.readFileSync(file, 'utf8');

// Replace Scene configuration
content = content.replace(
  /<Scene duration=\{2000\} triggerHook="onLeave" pin>/,
  '<Scene duration="100%" triggerHook="onLeave">'
);

// Update progress math
content = content.replace(
  /const bandY = -progress \* 250;/,
  'const bandY = progress * 200; // Parallax down'
);
content = content.replace(
  /const bandOpacity = Math\.max\(0, 1 - progress \* 1\.5\);/,
  'const bandOpacity = 1; // Keep visible'
);
content = content.replace(
  /const videoOpacity = Math\.max\(0, 0\.4 - progress \* 0\.4\);/,
  'const videoOpacity = 0.4; // Keep visible'
);
content = content.replace(
  /const mobileBandY = -progress \* 150;/,
  'const mobileBandY = progress * 100;'
);
content = content.replace(
  /const mobileBandOpacity = Math\.max\(0, 1 - progress \* 2\);/,
  'const mobileBandOpacity = 1;'
);

fs.writeFileSync(file, content);
console.log("Patched Hero.jsx");

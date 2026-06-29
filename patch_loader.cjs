const fs = require('fs');
const file = 'src/components/Loader.jsx';
let content = fs.readFileSync(file, 'utf8');

// Remove lottie import
content = content.replace(/import lottie from 'lottie-web';\n/, '');

// Remove lottie refs
content = content.replace(/const lottieContainer1 = useRef\(null\);\n  const lottieContainer2 = useRef\(null\);\n/, '');

// Remove lottie effect
content = content.replace(/useEffect\(\(\) => \{\n    let anim1, anim2;\n    if \(loading\) \{[\s\S]*?if \(!loading\) return null;/m, 'if (!loading) return null;');

// Remove lottie HTML
content = content.replace(/\{\/\* Fullscreen Lottie Background Overlay \*\/\}\n      <div className="lottie-backdrop-container">\n        <div ref=\{lottieContainer1\} className="lottie-visualizer-bg"><\/div>\n        <div ref=\{lottieContainer2\} className="lottie-notes-bg"><\/div>\n      <\/div>/m, '');

fs.writeFileSync(file, content);
console.log("Patched Loader.jsx");

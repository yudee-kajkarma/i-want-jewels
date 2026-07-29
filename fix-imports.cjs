const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      results.push(file);
    }
  });
  return results;
}

const files = walk('src/app/[locale]').filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // replace import X from '../...'
  content = content.replace(/from\s+(['"])((\.\.\/)+)/g, (match, quote, dots) => {
    return 'from ' + quote + '../' + dots;
  });
  
  fs.writeFileSync(file, content);
});
console.log('Fixed imports in ' + files.length + ' files.');
